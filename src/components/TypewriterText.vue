<template>
  <div class="typewriter-container">
    <div class="typewriter-text" :class="{ 'show-all': showAll }">
      {{ displayText }}
      <span class="cursor" v-if="!showAll && isAnimating"></span>
    </div>
    <div class="typewriter-controls">
      <button
        v-if="!showAll"
        @click="showAll = true"
        class="skip-btn"
        title="Show all text immediately"
      >
        跳过打字
      </button>
      <span class="speed-info">速度: {{ speedLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";

interface Props {
  text: string;
  speed?: "slow" | "normal" | "fast";
  autoStart?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  speed: "normal",
  autoStart: true,
});

const emit = defineEmits<{
  complete: [];
}>();

const displayText = ref("");
const showAll = ref(false);
const isAnimating = ref(false);
let animationId: number | null = null;
let currentIndex = 0;

const speedMs = {
  slow: 80,
  normal: 40,
  fast: 15,
};

const speedLabel = {
  slow: "慢",
  normal: "中",
  fast: "快",
};

function animate() {
  if (currentIndex < props.text.length) {
    displayText.value += props.text[currentIndex];
    currentIndex++;
    isAnimating.value = true;
    animationId = window.setTimeout(
      animate,
      speedMs[props.speed]
    );
  } else {
    isAnimating.value = false;
    emit("complete");
  }
}

function start() {
  if (displayText.value === "" && props.autoStart) {
    animate();
  }
}

watch(
  () => props.text,
  () => {
    displayText.value = "";
    currentIndex = 0;
    showAll.value = false;
    if (animationId) clearTimeout(animationId);
    start();
  }
);

watch(showAll, (newVal) => {
  if (newVal) {
    displayText.value = props.text;
    if (animationId) clearTimeout(animationId);
    isAnimating.value = false;
    emit("complete");
  }
});

onMounted(() => {
  start();
});

onUnmounted(() => {
  if (animationId) clearTimeout(animationId);
});
</script>

<style scoped>
.typewriter-container {
  position: relative;
  padding: 28px;
  background: rgba(124, 58, 237, 0.08);
  backdrop-filter: blur(12px);
  border-radius: 18px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  margin-bottom: 28px;
  transition: all 0.3s ease;
}

.typewriter-container:hover {
  border-color: rgba(129, 140, 248, 0.35);
}

.typewriter-text {
  font-size: 17px;
  line-height: 1.8;
  color: var(--text-warm);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  min-height: 60px;
  white-space: pre-wrap;
  word-break: break-word;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: linear-gradient(180deg, #7c3aed, #818cf8);
  animation: blink 0.8s ease-in-out infinite;
  margin-left: 2px;
  border-radius: 1px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.typewriter-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 12px;
  color: var(--text-secondary);
}

.skip-btn {
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: var(--purple-light);
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.skip-btn:hover {
  background: rgba(124, 58, 237, 0.25);
  border-color: rgba(129, 140, 248, 0.5);
  color: var(--indigo-light);
}
</style>
