<template>
  <div class="progress-bar">
    <div class="progress-fill" :style="{ width: progressPercent }"></div>
    <div class="progress-text">{{ currentTurn }}/{{ maxTurns }} 轮</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  currentTurn: number;
  maxTurns: number;
}

const props = defineProps<Props>();

const progressPercent = computed(() => {
  return `${(props.currentTurn / props.maxTurns) * 100}%`;
});
</script>

<style scoped>
.progress-bar {
  position: relative;
  height: 5px;
  background: rgba(124, 58, 237, 0.15);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 100%;
  transition: width 0.5s ease;
  animation: progressGlow 3s ease infinite;
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.4);
}

@keyframes progressGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.progress-text {
  position: absolute;
  right: 8px;
  top: -20px;
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
