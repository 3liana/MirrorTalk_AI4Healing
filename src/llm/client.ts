/**
 * LLM 客户端（OpenAI 和 Minimax 兼容）
 */

import { getApiKey, getApiBaseUrl, getModel, getProviderMode } from "./config";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface CompletionResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

/**
 * 调用 LLM API（支持 Minimax、智谱、Gemini）
 */
export async function callLLM(messages: ChatMessage[]): Promise<string> {
  const apiKey = getApiKey();
  const baseUrl = getApiBaseUrl();
  const model = getModel();
  const providerMode = getProviderMode();

  // Gemini 使用不同的 API 格式
  if (providerMode === 3) {
    return callGeminiAPI(messages, apiKey, baseUrl, model);
  }

  // Minimax 和智谱均使用 OpenAI 兼容的 chat completions
  // Minimax: https://api.minimax.chat/v1/chat/completions
  // Zhipu:   https://open.bigmodel.cn/api/paas/v4/chat/completions

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: providerMode === 1 ? 0.95 : 0.8,  // Minimax 用更高温度增加创造性
      max_tokens: 2500,  // 增加到 2500，给 Minimax 更多输出空间
      top_p: providerMode === 1 ? 0.95 : undefined,  // Minimax 增加多样性
      presence_penalty: providerMode === 1 ? 0.6 : undefined,  // 减少重复内容
      frequency_penalty: providerMode === 1 ? 0.5 : undefined,  // 减少重复词汇
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error: ${response.status} - ${error}`);
  }

  const data: CompletionResponse = await response.json();
  return data.choices[0]?.message.content || "";
}

/**
 * 调用 Gemini API（格式不同于 OpenAI）
 */
async function callGeminiAPI(
  messages: ChatMessage[],
  apiKey: string,
  baseUrl: string,
  model: string
): Promise<string> {
  // 转换消息格式：OpenAI format -> Gemini format
  const contents = messages
    .filter((m) => m.role !== "system") // Gemini 不支持 system role
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // system prompt 合并到第一条 user 消息
  const systemMsg = messages.find((m) => m.role === "system");
  if (systemMsg && contents.length > 0 && contents[0].role === "user") {
    contents[0].parts[0].text = `${systemMsg.content}\n\n${contents[0].parts[0].text}`;
  }

  const response = await fetch(
    `${baseUrl}/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 1.0,  // 提高到 1.0，增加创造性
          maxOutputTokens: 2000,
          topP: 0.95,  // 增加多样性
          topK: 40,    // 增加词汇选择范围
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
}
