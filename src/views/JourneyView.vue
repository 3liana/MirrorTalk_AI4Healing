<template>
  <div class="journey-view">
    <div class="journey-header">
      <div class="header-top">
        <router-link to="/role" class="back-btn">← 返回选择</router-link>
        <h2>{{ journeyState?.role.name }}</h2>
        <div class="header-spacer"></div>
      </div>

      <ProgressBar
        v-if="journeyState"
        :current-turn="journeyState.currentTurn"
        :max-turns="journeyState.maxTurns"
      />
    </div>

    <div v-if="journeyState && currentTurn" class="journey-content">
      <TypewriterText
        :text="currentTurn.roleText"
        :speed="speed"
        @complete="onTextComplete"
      />

      <div v-if="showInteraction" class="interaction-area">
        <div class="prompt-text">{{ currentTurn.interaction.prompt }}</div>

        <!-- Choice Cards -->
        <ChoiceCards
          v-if="
            currentTurn.interaction.type === 'single_choice' ||
            (currentTurn.interaction.type === 'choice_plus_comment' && comment.length === 0)
          "
          :choices="currentTurn.interaction.choices || []"
          :max-select="currentTurn.interaction.maxSelect || 1"
          @select="onChoiceSelect"
        />

        <!-- Choice Summary (when choice_plus_comment has selection) -->
        <div v-if="currentTurn.interaction.type === 'choice_plus_comment' && selectedChoiceIds.length > 0" class="choice-summary">
          <span class="summary-label">✓ 已选择</span>
        </div>

        <!-- Comment Box -->
        <CommentBox
          v-if="
            currentTurn.interaction.type === 'short_comment' ||
            (currentTurn.interaction.type === 'choice_plus_comment' && selectedChoiceIds.length === 0)
          "
          :max-chars="currentTurn.interaction.maxCommentChars || 80"
          @update="onCommentUpdate"
          ref="commentBoxRef"
        />

        <!-- Comment Summary (when choice_plus_comment has comment) -->
        <div v-if="currentTurn.interaction.type === 'choice_plus_comment' && comment.length > 0" class="comment-summary">
          <span class="summary-label">✓ 已输入</span>
        </div>

        <!-- Next Button -->
        <button
          v-if="canSubmit"
          @click="submitAnswer"
          class="next-btn"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "处理中..." : "继续" }}
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>生成下一轮对话...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useJourneyStore } from "@/stores/journey";
import TypewriterText from "@/components/TypewriterText.vue";
import ChoiceCards from "@/components/ChoiceCards.vue";
import CommentBox from "@/components/CommentBox.vue";
import ProgressBar from "@/components/ProgressBar.vue";

const router = useRouter();
const journeyStore = useJourneyStore();

const speed = ref<"slow" | "normal" | "fast">("normal");
const showInteraction = ref(false);
const selectedChoiceIds = ref<string[]>([]);
const comment = ref("");
const isSubmitting = ref(false);
const commentBoxRef = ref<{ clear: () => void } | null>(null);

const journeyState = computed(() => journeyStore.journeyState);
const isLoading = computed(() => journeyStore.isLoading);

const currentTurn = computed(() => {
  if (!journeyState.value) return null;
  return journeyState.value.turns[journeyState.value.currentTurn - 1];
});

const canSubmit = computed(() => {
  if (!currentTurn.value) return false;

  const type = currentTurn.value.interaction.type;
  const hasChoice = selectedChoiceIds.value.length > 0;
  const hasComment = comment.value.trim().length > 0;

  if (type === "single_choice") return hasChoice;
  if (type === "short_comment") return hasComment;
  if (type === "choice_plus_comment") return hasChoice || hasComment; // 选择或输入其一即可
  return false;
});

function onTextComplete() {
  showInteraction.value = true;
}

function onChoiceSelect(choiceIds: string[]) {
  selectedChoiceIds.value = choiceIds;
  console.log("选择已更新:", choiceIds);
}

function onCommentUpdate(text: string) {
  comment.value = text;
}

async function submitAnswer() {
  if (!currentTurn.value || !canSubmit.value) return;

  isSubmitting.value = true;
  try {
    const answer = {
      turnIndex: currentTurn.value.turnIndex,
      selectedChoiceIds: selectedChoiceIds.value.length > 0 ? selectedChoiceIds.value : undefined,
      comment: comment.value || undefined,
      createdAt: Date.now(),
    };

    await journeyStore.submitAnswer(answer);

    // 检查是否完成
    if (journeyStore.currentReport) {
      router.push("/report");
    } else {
      // 重置交互状态
      showInteraction.value = false;
      selectedChoiceIds.value = [];
      comment.value = "";
      if (commentBoxRef.value) {
        commentBoxRef.value.clear();
      }
    }
  } catch (err) {
    console.error("Failed to submit answer:", err);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<style scoped>
.journey-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%);
  padding: 40px 20px;
}

.journey-header {
  max-width: 800px;
  margin: 0 auto 40px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.back-btn {
  color: #6b8cff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #a78bff;
}

.header-top h2 {
  font-size: 24px;
  color: #e0e0e0;
  margin: 0;
}

.header-spacer {
  width: 60px;
}

.journey-content {
  max-width: 800px;
  margin: 0 auto;
}

.interaction-area {
  animation: fadeIn 0.4s ease;
}

.prompt-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
  font-weight: 500;
}

.next-btn {
  display: block;
  margin: 32px auto 0;
  padding: 12px 32px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(107, 140, 255, 0.3);
}

.next-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.choice-summary,
.comment-summary {
  padding: 12px;
  background: rgba(107, 140, 255, 0.1);
  border: 1px solid rgba(107, 140, 255, 0.3);
  border-radius: 6px;
  color: #6b8cff;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
}

.summary-label {
  font-weight: 500;
}
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 15, 30, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(107, 140, 255, 0.3);
  border-top-color: #6b8cff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-overlay p {
  color: #999;
  font-size: 14px;
}
</style>
