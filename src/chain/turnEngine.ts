/**
 * Turn Generator - 使用 LLM 生成每一轮对话
 */

import type { TurnSpec } from "@/journey/schema";
import { TurnSpecSchema } from "@/journey/schema";
import type { JourneyState } from "@/journey/types";
import { callLLM } from "@/llm/client";
import { getSystemPrompt, getTurnGeneratorPrompt } from "./prompts";
import { generateFallbackTurn } from "./repair";

/**
 * 生成下一轮对话
 */
export async function generateNextTurn(journeyState: JourneyState): Promise<TurnSpec> {
  const { role, currentTurn, maxTurns, answers } = journeyState;

  // 确定当前模块
  const module = getModule(currentTurn, maxTurns);
  
  // 构建上下文
  const context = buildTurnContext(journeyState);
  
  // 生成 prompt
  const userPrompt = getTurnGeneratorPrompt(
    role,
    currentTurn,
    maxTurns,
    module,
    context
  );

  // 调用 LLM
  let spec: TurnSpec;
  try {
    const response = await Promise.race([
      callLLM([
        {
          role: "system",
          content: getSystemPrompt(),
        },
        {
          role: "user",
          content: userPrompt,
        },
      ]),
      // 30 秒超时（给 LLM 充足时间）
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error("LLM timeout")), 30000)
      ),
    ]);

    // 解析响应
    try {
      const jsonResponse = extractJSON(response);
      console.log("Extracted JSON:", jsonResponse.substring(0, 500));
      const parsed = JSON.parse(jsonResponse);
      console.log("Parsed object keys:", Object.keys(parsed));
      console.log("Parsed turnIndex:", parsed.turnIndex, typeof parsed.turnIndex);
      console.log("Parsed module:", parsed.module, typeof parsed.module);

      // 补全缺失字段，避免 LLM 遗漏 turnIndex/module
      const hydrated = {
        ...parsed,
        turnIndex: parsed.turnIndex ?? currentTurn,
        module: parsed.module ?? module,
        endCondition: parsed.endCondition ?? { canEnd: false, reason: null },
      };

      spec = TurnSpecSchema.parse(hydrated);
    } catch (parseError) {
      // 重试一次（给 20 秒）
      console.warn("Parse failed, retrying...", parseError);
      const retryResponse = await Promise.race([
        callLLM([
          {
            role: "system",
            content: getSystemPrompt(),
          },
          {
            role: "user",
            content: userPrompt,
          },
        ]),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error("LLM retry timeout")), 20000)
        ),
      ]);
      const jsonRetry = extractJSON(retryResponse);
      const parsedRetry = JSON.parse(jsonRetry);
      const hydratedRetry = {
        ...parsedRetry,
        turnIndex: parsedRetry.turnIndex ?? currentTurn,
        module: parsedRetry.module ?? module,
        endCondition: parsedRetry.endCondition ?? { canEnd: false, reason: null },
      };
      spec = TurnSpecSchema.parse(hydratedRetry);
    }
  } catch (error) {
    // LLM 调用失败或超时，快速返回 fallback
    console.warn("Failed to generate turn from LLM (timeout or error), using fallback", error);
    console.log("Fallback params:", { 
      role: role.name, 
      currentTurn, 
      module, 
      answersLength: answers.length 
    });
    spec = generateFallbackTurn(role, currentTurn, answers);
    console.log("Fallback generated:", spec);
  }

  // 确保 turnIndex 正确设置
  spec.turnIndex = currentTurn;

  // 好东西角色：随机分配场景图片
  if (role.id === "haodongxi") {
    const images = ["1.png", "2.png", "3.png", "4.png"];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    spec.sceneImage = `/images/haodongxi/${randomImage}`;
  }

  return spec;
}

/**
 * 提取 JSON - 处理 markdown 代码块格式
 */
function extractJSON(text: string): string {
  // 尝试提取 markdown 代码块中的 JSON
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch && jsonMatch[1]) {
    return jsonMatch[1].trim();
  }
  
  // 尝试直接提取 JSON 对象
  const jsonObjectMatch = text.match(/\{[\s\S]*\}/);
  if (jsonObjectMatch) {
    return jsonObjectMatch[0];
  }
  
  // 返回原始文本
  return text;
}

/**
 * 根据轮数确定模块
 */
function getModule(turnIndex: number, maxTurns: number): "enter" | "explore" | "action" {
  if (turnIndex <= 3) return "enter";
  if (turnIndex <= maxTurns - 3) return "explore";
  return "action";
}

/**
 * 构建当前轮次的上下文
 */
function buildTurnContext(journeyState: JourneyState): string {
  const { answers } = journeyState;
  
  const recentAnswers = answers.slice(-3);
  const context: string[] = [];

  for (const answer of recentAnswers) {
    if (answer.selectedChoiceIds && answer.selectedChoiceIds.length > 0) {
      context.push(`用户选择了: ${answer.selectedChoiceIds.join(", ")}`);
    }
    if (answer.comment) {
      context.push(`用户评论: ${answer.comment}`);
    }
  }

  return context.join("\n");
}
