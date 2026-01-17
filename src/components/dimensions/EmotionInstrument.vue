<template>
  <div class="device-container">
    <div class="emotion-track">
      <div :class="['emotion-flow', { active: isActive }]" />
    </div>
    <div :class="['emotion-drop', { active: isActive }]" />
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

.emotion-track {
  width: 128px;
  height: 4px;
  background: rgba(191, 219, 254, 0.2);
  border-radius: 999px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 0 12px rgba(59, 130, 246, 0.2);
}

.emotion-flow {
  position: absolute;
  inset: 0;
  background: rgba(59, 130, 246, 0.6);
  transform: translateX(-100%);
  transition: all 3s ease;
  background: linear-gradient(90deg, rgba(59,130,246,0.0), rgba(59,130,246,0.7), rgba(59,130,246,0.0));
  background-size: 200% 100%;
  animation: flow-loop 5s linear infinite;
}

.emotion-flow.active {
  transform: translateX(0%);
}

.emotion-drop {
  position: absolute;
  width: 12px;
  height: 12px;
  background: rgba(96, 165, 250, 0.4);
  border-radius: 999px;
  filter: blur(4px);
  transition: all 1s ease;
  transform: translateY(0px);
  opacity: 0;
  animation: drop-bob 4s ease-in-out infinite;
}

.emotion-drop.active {
  transform: translateY(24px);
  opacity: 1;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes flow-loop {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

@keyframes drop-bob {
  0%, 100% { transform: translateY(0px); opacity: 0.35; }
  50% { transform: translateY(12px); opacity: 0.8; }
}
</style>
