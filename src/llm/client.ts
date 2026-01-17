/**
 * LLM 客户端（OpenAI 和 Minimax 兼容）
 */

import { getApiKey, getApiBaseUrl, getModel } from "./config";

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
 * 调用 LLM API（支持 OpenAI 和 Minimax）
 */
export async function callLLM(messages: ChatMessage[]): Promise<string> {
  const apiKey = getApiKey();
  const baseUrl = getApiBaseUrl();
  const model = getModel();

  // 检查是否是 Minimax API
  const isMinimaxApi = baseUrl.includes("minimax.chat");

  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(isMinimaxApi
        ? { Authorization: `Bearer ${apiKey}` }
        : { Authorization: `Bearer ${apiKey}` }),
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.8,
      max_tokens: 2000,  // 增加到 2000，确保 LLM 有足够空间生成完整响应
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error: ${response.status} - ${error}`);
  }

  const data: CompletionResponse = await response.json();
  return data.choices[0]?.message.content || "";
}
