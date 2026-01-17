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
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #6b8cff, #a78bff);
  transition: width 0.4s ease;
}

.progress-text {
  position: absolute;
  right: 8px;
  top: -18px;
  font-size: 12px;
  color: #999;
}
</style>
