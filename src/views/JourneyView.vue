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
  background: transparent;
  padding: 40px 20px;
  position: relative;
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
  color: var(--purple-light);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.back-btn:hover {
  color: var(--indigo-light);
  background: rgba(124, 58, 237, 0.1);
}

.header-top h2 {
  font-size: 26px;
  color: var(--text-primary);
  margin: 0;
  font-weight: 600;
}

.header-spacer {
  width: 60px;
}

.journey-content {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease;
}

.interaction-area {
  animation: fadeIn 0.5s ease;
}

.prompt-text {
  font-size: 15px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  font-weight: 500;
}

.next-btn {
  display: block;
  margin: 36px auto 0;
  padding: 14px 40px;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.4s ease;
  animation: gradientShift 4s ease infinite;
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.3);
}

.next-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow:
    0 10px 30px rgba(124, 58, 237, 0.4),
    0 0 20px rgba(99, 102, 241, 0.25);
}

.next-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  animation: none;
}

.choice-summary,
.comment-summary {
  padding: 14px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(129, 140, 248, 0.3);
  border-radius: 10px;
  color: var(--indigo-light);
  font-size: 14px;
  text-align: center;
  margin-bottom: 18px;
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
  background: radial-gradient(circle at 50% 50%, rgba(49, 46, 129, 0.95) 0%, rgba(15, 13, 36, 0.98) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(124, 58, 237, 0.2);
  border-top-color: #7c3aed;
  border-right-color: #818cf8;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
  margin-bottom: 20px;
  box-shadow: 0 0 20px rgba(124, 58, 237, 0.35);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.loading-overlay p {
  color: var(--text-secondary);
  font-size: 15px;
  letter-spacing: 1px;
}
</style>
