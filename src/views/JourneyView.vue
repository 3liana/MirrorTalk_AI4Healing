<template>
  <div class="journey-view">
    <!-- Split Screen Container -->
    <div class="split-layout" v-if="journeyState && currentTurn">
      
      <!-- Left Panel: Video / Character Presence -->
      <div class="left-panel">
        <VideoPlayer
          :poster-src="journeyState.role.poster"
          :video-src="journeyState.role.video"
          :text="currentTurn.roleText" 
        />
        
        <!-- Back Button (Floating on top left) -->
        <router-link to="/role" class="back-btn floating-back">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </router-link>
      </div>

      <!-- Right Panel: Interaction & Analysis -->
      <div class="right-panel">
        
        <!-- Top Status Bar -->
        <div class="panel-header">
           <div class="live-status">
              <span class="eye-icon">👁</span> 实时觉察
           </div>
           <div class="live-indicator">
              LIVE <span class="dot"></span>
           </div>
        </div>

        <div class="panel-content">
           <!-- Scene Info -->
           <div class="scene-info">
              <span class="scene-tag">SCENE {{ currentTurn.turnIndex + 1 }}</span>
           </div>

           <!-- The Question / Prompt -->
           <div class="interaction-card">
              <div class="question-text">
                <Transition name="msg-slide" mode="out-in" appear>
                  <TypewriterText
                    :key="currentTurn.interaction.prompt"
                    :text="currentTurn.interaction.prompt"
                    :speed="speed"
                    @complete="onTextComplete"
                  />
                </Transition>
              </div>

              <!-- Choice Cards -->
              <Transition name="fade-slide">
                <div class="choices-area" v-if="showInteraction">
                   <ChoiceCards
                      v-if="
                        currentTurn.interaction.type === 'single_choice' ||
                        (currentTurn.interaction.type === 'choice_plus_comment' && comment.length === 0)
                      "
                      :choices="currentTurn.interaction.choices || []"
                      :max-select="currentTurn.interaction.maxSelect || 1"
                      @select="onChoiceSelect"
                    />

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
                    
                    <!-- Submit Button (Only show if valid selection made) -->
                    <div class="actions-row" v-if="canSubmit">
                        <button 
                          @click="submitAnswer" 
                          class="submit-btn" 
                          :disabled="isSubmitting"
                        >
                           {{ isSubmitting ? "分析中..." : "确认" }}
                           <svg v-if="!isSubmitting" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </div>
              </Transition>
           </div>
        </div>



      </div>
    </div>

    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>正在生成下一层觉察...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useJourneyStore } from "@/stores/journey";
import VideoPlayer from "@/components/VideoPlayer.vue";
import TypewriterText from "@/components/TypewriterText.vue";
import ChoiceCards from "@/components/ChoiceCards.vue";
import CommentBox from "@/components/CommentBox.vue";
// removed ProgressBar use as it's not in the design reference

const router = useRouter();
const journeyStore = useJourneyStore();

const speed = ref<"slow" | "normal" | "fast">("normal");
const showInteraction = ref(false); // Controls when choices appear (after text)
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
  if (type === "choice_plus_comment") return hasChoice || hasComment; 
  return false;
});

function onTextComplete() {
  showInteraction.value = true;
}

function onChoiceSelect(choiceIds: string[]) {
  selectedChoiceIds.value = choiceIds;
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

    if (journeyStore.currentReport) {
      router.push("/report");
    } else {
      // Reset for next turn
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
  width: 100vw;
  height: 100vh;
  background: #0f172a; /* Dark background base */
  overflow: hidden;
  color: #fff;
}

.split-layout {
  display: flex;
  width: 100%;
  height: 100%;
}

/* LEFT PANEL (Video) */
.left-panel {
  flex: 65; /* 65% width */
  position: relative;
  background: #000;
  display: flex; /* Ensure VideoPlayer fills it */
}

.floating-back {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 20;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: white;
  transition: all 0.3s;
  border: 1px solid rgba(255,255,255,0.1);
}

.floating-back:hover {
    background: rgba(255,255,255,0.2);
    transform: translateX(-2px);
}

/* RIGHT PANEL (Interaction) */
.right-panel {
  flex: 35; /* 35% width */
  background: #111425; /* Dark blue/purple shade from UI */
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-left: 1px solid rgba(255,255,255,0.05);
  position: relative;
  height: 100%; /* Ensure full height for flex calc */
  overflow: hidden; /* Prevent outer scroll */
}

/* Right Panel Header */
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    font-size: 13px;
    letter-spacing: 1px;
    color: rgba(167, 139, 250, 0.8);
    font-weight: 600;
    text-transform: uppercase;
    flex-shrink: 0; /* Keep header fixed size */
}

.panel-content {
    flex: 1; /* Take remaining height */
    overflow-y: auto; /* Enable vertical scrolling */
    min-height: 0; /* Allow shrinking below content size */
    padding-right: 8px; /* Space for scrollbar */
    display: flex;
    flex-direction: column;
}

/* Custom Scrollbar for Panel Content */
.panel-content::-webkit-scrollbar {
    width: 6px;
}
.panel-content::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}
.panel-content::-webkit-scrollbar-thumb {
    background: rgba(167, 139, 250, 0.3);
    border-radius: 4px;
}
.panel-content::-webkit-scrollbar-thumb:hover {
    background: rgba(167, 139, 250, 0.5);
}

.live-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255,255,255,0.5);
}

.dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    box-shadow: 0 0 10px #10b981;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

/* Scene Info */
.scene-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    font-size: 14px;
    color: rgba(255,255,255,0.4);
    flex-shrink: 0;
} 

.scene-tag {
    background: rgba(124, 58, 237, 0.2);
    color: #a78bfa;
    padding: 4px 10px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 12px;
}

/* Interaction Card */
.interaction-card {
    /* flex: 1;  Removed to allow content to dictate height within scroll area */
    display: flex;
    flex-direction: column;
}

.question-text {
    font-size: 22px;
    line-height: 1.4;
    font-weight: 600;
    margin-bottom: 32px;
    min-height: 80px; /* Prevent layout jump */
}



/* Buttons */
.submit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 24px;
    background: #2dd4bf; /* Teal/Cyan accent */
    color: #0f172a;
    border: none;
    border-radius: 8px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;
    margin-top: 20px;
}

.submit-btn:hover:not(:disabled) {
    background: #14b8a6;
    transform: translateY(-1px);
}

.submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Loading */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 23, 42, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: #a78bfa;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* ANIMATIONS */
/* Question Text Slide */
.msg-slide-enter-active,
.msg-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}
.msg-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.msg-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Choices Area Slide */
.fade-slide-enter-active {
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
