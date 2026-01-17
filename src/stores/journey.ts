/**
 * Journey Pinia Store
 */

import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type {
  JourneyState,
  TurnAnswer,
  MirrorReport,
} from "@/journey/types";
import { mergeDiscoveredInsights } from "@/journey/state";
import { getRoleById } from "@/roles/roles";
import { generateNextTurn } from "@/chain/turnEngine";
import { generateReport, generateFallbackReport } from "@/chain/reportEngine";
import { generateFallbackTurn } from "@/chain/repair";

export const useJourneyStore = defineStore("journey", () => {
  // State
  const journeyState = ref<JourneyState | null>(null);
  const currentReport = ref<MirrorReport | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Computed
  const isJourneyActive = computed(() => journeyState.value !== null);
  const progress = computed(() => {
    if (!journeyState.value) return 0;
    return (journeyState.value.currentTurn / journeyState.value.maxTurns) * 100;
  });

  // Actions
  async function startJourney(roleId: string) {
    const role = getRoleById(roleId);
    if (!role) {
      throw new Error(`Role not found: ${roleId}`);
    }

    isLoading.value = true;
    error.value = null;

    try {
      // 初始化状态
      journeyState.value = {
        role,
        maxTurns: 12,
        currentTurn: 1,
        turns: [],
        answers: [],
        discovered: {
          clues: [],
          shouldStatements: [],
          needs: [],
          tone: "warm",
        },
      };

      // 生成第一轮
      const firstTurn = await generateNextTurn(journeyState.value);
      journeyState.value.turns.push(firstTurn);
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to start journey";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function submitAnswer(answer: TurnAnswer) {
    if (!journeyState.value) {
      throw new Error("No active journey");
    }

    isLoading.value = true;
    error.value = null;

    try {
      // 保存答案
      journeyState.value.answers.push(answer);

      // 获取当前轮次的 memoryPatch
      const currentTurn = journeyState.value.turns[answer.turnIndex - 1];
      if (currentTurn?.memoryPatch) {
        journeyState.value.discovered = mergeDiscoveredInsights(
          journeyState.value.discovered,
          currentTurn.memoryPatch
        );
      }

      // 判断是否应该结束
      const shouldEnd =
        journeyState.value.currentTurn >= journeyState.value.maxTurns ||
        (currentTurn?.endCondition?.canEnd &&
          journeyState.value.currentTurn >= 6);

      if (shouldEnd) {
        // 生成报告
        await generateFinalReport();
      } else {
        // 生成下一轮
        journeyState.value.currentTurn += 1;

        try {
          const nextTurn = await generateNextTurn(journeyState.value);
          journeyState.value.turns.push(nextTurn);
        } catch (err) {
          // Fallback
          console.warn("Failed to generate turn, using fallback", err);
          const fallbackTurn = generateFallbackTurn(
            journeyState.value.role,
            journeyState.value.currentTurn,
            journeyState.value.answers
          );
          journeyState.value.turns.push(fallbackTurn);
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to submit answer";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function generateFinalReport() {
    if (!journeyState.value) {
      throw new Error("No active journey");
    }

    isLoading.value = true;

    try {
      try {
        currentReport.value = await generateReport(journeyState.value);
      } catch (err) {
        console.warn("Failed to generate report, using fallback", err);
        currentReport.value = generateFallbackReport(journeyState.value);
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Failed to generate report";
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function resetJourney() {
    journeyState.value = null;
    currentReport.value = null;
    error.value = null;
  }

  return {
    // State
    journeyState,
    currentReport,
    isLoading,
    error,

    // Computed
    isJourneyActive,
    progress,

    // Actions
    startJourney,
    submitAnswer,
    generateFinalReport,
    resetJourney,
  };
});
