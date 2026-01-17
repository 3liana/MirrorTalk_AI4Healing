<template>
  <div class="device-container">
    <div :class="['desire-block', { active: isActive }]" />
    <div class="desire-ring" :class="{ active: isActive }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value?: number }>();
const isActive = computed(() => (props.value ?? 50) >= 50);
</script>

<style scoped>
.device-container {
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: float 6s ease-in-out infinite;
}

.desire-block {
  width: 80px;
  height: 64px;
  background: linear-gradient(135deg, rgba(251, 146, 60, 0.4), rgba(234, 88, 12, 0.1));
  border-radius: 4px;
  filter: blur(10px);
  opacity: 0.4;
  transform: scale(0.9);
  transition: all 1s ease;
  background-size: 200% 200%;
  animation: shimmer 4s ease-in-out infinite;
}

.desire-block.active {
  filter: blur(0px);
  opacity: 1;
  transform: scale(1.1);
}

.desire-ring {
  position: absolute;
  width: 96px;
  height: 96px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  opacity: 0.2;
  transition: opacity 1s ease;
  animation: breathe 5s ease-in-out infinite;
}

.desire-ring.active {
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes breathe {
  0%, 100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.08); opacity: 0.6; }
}
</style>
