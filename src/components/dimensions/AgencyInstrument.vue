<template>
  <div class="device-container">
    <div :class="['agency-shell', { active: isActive }]">
      <div :class="['agency-core', { active: isActive }]" />
      <div class="agency-ring" />
    </div>
    <div class="agency-glow" />
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

.agency-shell {
  width: 80px;
  height: 80px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  position: relative;
  transition: all 1s ease;
  animation: slow-spin 18s linear infinite;
}

.agency-shell.active {
  background: rgba(255, 255, 255, 0.08);
  transform: scale(1.08);
}

.agency-core {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #facc15;
  filter: drop-shadow(0 0 12px rgba(250, 204, 21, 0.8));
  transition: transform 2s ease;
  transform: translateX(-24px);
  animation: core-shift 3.4s ease-in-out infinite alternate;
}

.agency-core.active {
  transform: translateX(24px);
}

.agency-ring {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  animation: pulse 2.4s ease-in-out infinite;
}

.agency-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 0.3; }
  100% { transform: scale(1); opacity: 0.7; }
}

@keyframes core-shift {
  0% { transform: translateX(-26px); }
  50% { transform: translateX(0px); }
  100% { transform: translateX(26px); }
}

@keyframes slow-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
