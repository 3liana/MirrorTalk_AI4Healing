/**
 * 错误修复和降级策略
 */

import type { TurnSpec } from "@/journey/schema";
import type { TurnAnswer, RoleProfile } from "@/journey/types";

/**
 * 生成默认的 fallback Turn（当 LLM 失败时）
 * 注：Fallback 只在网络/超时时触发，应尽量与主 prompt 一致
 */
export function generateFallbackTurn(
  _role: RoleProfile,
  turnIndex: number,
  recentAnswers: TurnAnswer[]
): TurnSpec {
  const module = turnIndex <= 3 ? "enter" : turnIndex > 9 ? "action" : "explore";
  
  // 根据模块提供基础 fallback 文本
  const fallbackText = 
    module === "enter"
      ? "我注意到你说的这件事...好像触碰到了什么对你很重要的东西。你的真实感受是什么？"
      : module === "action"
      ? "到了这个时刻，如果换成是你，你会做什么选择？"
      : "你刚才的选择很有意思。在这样的情境里，你通常会怎样保护自己？";

  // 根据最近的答案调整选项
  const recentComment = recentAnswers[recentAnswers.length - 1]?.comment;
  const hasRecentComment = !!recentComment && recentComment.length > 5;

  const fallbackChoices = hasRecentComment
    ? [
        { id: "a", title: "我觉得这正是问题所在", intent: "insight_moment" },
        { id: "b", title: "但我还是会这样做", intent: "conflicted_choice" },
        { id: "c", title: "我从没这样想过", intent: "new_awareness" },
        { id: "d", title: "这太复杂了", intent: "overwhelmed" },
      ]
    : [
        { id: "a", title: "我经常这样", intent: "pattern_recognition" },
        { id: "b", title: "有时候吧", intent: "conditional_response" },
        { id: "c", title: "很少这样", intent: "rare_response" },
        { id: "d", title: "我不确定", intent: "uncertain" },
      ];

  return {
    turnIndex,
    module,
    roleText: fallbackText,
    interaction: {
      type: "choice_plus_comment",
      prompt: "你觉得哪个最接近你的实际反应？",
      maxCommentChars: 80,
      minSelect: 1,
      maxSelect: 1,
      choices: fallbackChoices,
    },
    probeTag: "pattern_exploration",
    memoryPatch: {
      clues: ["用户在反思自己的反应方式"],
    },
  };
}
