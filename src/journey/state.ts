/**
 * Journey 状态工具函数
 */

import type { DiscoveredInsights, MemoryPatch } from "./types";

const MAX_CLUES = 20;
const MAX_SHOULD_STATEMENTS = 12;
const MAX_NEEDS = 12;

/**
 * 合并和更新发现的洞察
 */
export function mergeDiscoveredInsights(
  current: DiscoveredInsights,
  patch?: MemoryPatch
): DiscoveredInsights {
  if (!patch) return current;

  return {
    clues: truncate([...new Set([...current.clues, ...(patch.clues || [])])], MAX_CLUES),
    shouldStatements: truncate(
      [...new Set([...current.shouldStatements, ...(patch.shouldStatements || [])])],
      MAX_SHOULD_STATEMENTS
    ),
    needs: truncate([...new Set([...current.needs, ...(patch.needs || [])])], MAX_NEEDS),
    tone: patch.needs ? "warm" : current.tone,
  };
}

/**
 * 截断数组到指定长度
 */
function truncate<T>(arr: T[], maxLen: number): T[] {
  return arr.slice(0, maxLen);
}

/**
 * 获取发现摘要（用于上下文）
 */
export function getDiscoveredSummary(discovered: DiscoveredInsights): string {
  const parts = [];
  
  if (discovered.clues.length > 0) {
    parts.push(`线索: ${discovered.clues.slice(0, 3).join(", ")}`);
  }
  
  if (discovered.shouldStatements.length > 0) {
    parts.push(`"应该"声明: ${discovered.shouldStatements.slice(0, 2).join(", ")}`);
  }
  
  if (discovered.needs.length > 0) {
    parts.push(`需求: ${discovered.needs.slice(0, 2).join(", ")}`);
  }
  
  return parts.join(" | ");
}
