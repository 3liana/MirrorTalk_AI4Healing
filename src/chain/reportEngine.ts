/**
 * Report Generator - 生成最终的 Mirror Report
 */

import { MirrorReportSchema } from "@/journey/schema";
import type { MirrorReport, JourneyState } from "@/journey/types";
import { callLLM } from "@/llm/client";
import { getSystemPrompt, getReportGeneratorPrompt } from "./prompts";

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
 * 生成最终报告
 */
export async function generateReport(journeyState: JourneyState): Promise<MirrorReport> {
  const { role, discovered, turns } = journeyState;

  // 构建报告 prompt
  const userPrompt = getReportGeneratorPrompt(
    role.name,
    discovered,
    journeyState.answers,
    turns
  );

  // 调用 LLM
  let report: MirrorReport;
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
      // 45 秒超时（报告生成需要更多时间）
      new Promise<string>((_, reject) =>
        setTimeout(() => reject(new Error("Report generation timeout")), 45000)
      ),
    ]);

    // 解析响应
    try {
      const jsonResponse = extractJSON(response);
      report = MirrorReportSchema.parse(JSON.parse(jsonResponse));
    } catch (parseError) {
      // 重试一次（给 30 秒）
      console.warn("Report parse failed, retrying...", parseError);
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
          setTimeout(() => reject(new Error("Report retry timeout")), 30000)
        ),
      ]);
      const retryJsonResponse = extractJSON(retryResponse);
      report = MirrorReportSchema.parse(JSON.parse(retryJsonResponse));
    }
  } catch (error) {
    // LLM 调用失败或超时，使用 fallback
    console.warn("Failed to generate report from LLM, using fallback", error);
    report = generateFallbackReport(journeyState);
  }

  return report;
}

/**
 * 生成备用报告（当 LLM 失败时）
 */
export function generateFallbackReport(journeyState: JourneyState): MirrorReport {
  const { discovered, role } = journeyState;

  return {
    headline: `${role.name} 看到了你，你呢？`,
    thinkingPatterns: discovered.shouldStatements.slice(0, 2).map((stmt, _i) => ({
      name: `思维模式 ${_i + 1}: "${stmt}"`,
      description: "这是你在对话中重复出现的思维方式",
      exampleFromYou: stmt,
    })),
    overlookedNeeds: discovered.needs.slice(0, 2).map((need, _i2) => ({
      need,
      howItShowsUp: "在你的选择和评论中体现",
      gentleReminder: `你可能更需要${need}，而不是你以为的。`,
    })),
    microActions: [
      {
        title: "停下来感受",
        why: "你总是在'应该'，很少停下来问自己真实的感受",
        how: "每天找5分钟，就问自己一个问题：'现在我真的想要什么？'",
        timeCost: "5分钟/每天",
      },
      {
        title: "说一个'不'",
        why: "你习惯性地同意别人，但这让你更累了",
        how: "这周找一个小的、低风险的请求，温和地拒绝它",
        timeCost: "2分钟/本周一次",
      },
      {
        title: "写下来",
        why: "文字能帮你整理思路，看清自己的模式",
        how: "每天写3句话：今天我的感受、我的想法、我的需求",
        timeCost: "3分钟/每天",
      },
    ],
    closingLetter: `在这次对话中，我看到了你的温柔、你的困惑、和你想要改变的渴望。最重要的是，你已经开始问"为什么"了。这已经是改变的开始。\n\n不要催促自己。小的改变，积累起来，就是大的转变。我相信你。`,
    resources: [
      {
        type: "book",
        title: "《非暴力沟通》",
        note: "帮你理解真实的需求是什么",
      },
      {
        type: "podcast",
        title: "《自我觉察笔记》",
        note: "每周一个小故事，都在讲某个人的改变",
      },
    ],
  };
}
