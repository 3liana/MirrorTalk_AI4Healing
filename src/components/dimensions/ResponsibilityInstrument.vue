<template>
  <div class="device-container">
    <div :class="['lever', { active: isActive }]">
      <div class="heavy" />
      <div :class="['light', { active: isActive }]" />
    </div>
    <div class="caption">修复的重量</div>
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
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: float 6s ease-in-out infinite;
}

.lever {
  position: relative;
  width: 144px;
  height: 2px;
  background: rgba(168, 162, 158, 0.6);
  transition: transform 0.7s ease;
  transform-origin: 10% 50%;
  animation: wobble 6s ease-in-out infinite;
}

.lever.active {
  transform: rotate(20deg);
}

.heavy {
  position: absolute;
  top: -24px;
  left: 8px;
  width: 24px;
  height: 24px;
  background: #1f2937;
  border-radius: 999px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.light {
  position: absolute;
  top: -14px;
  right: 8px;
  width: 12px;
  height: 12px;
  background: #e5e7eb;
  border-radius: 999px;
  opacity: 0.3;
  transition: opacity 0.5s ease;
}

.light.active {
  opacity: 1;
}

.caption {
  position: absolute;
  bottom: 12px;
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(168, 162, 158, 0.8);
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-4deg); }
  50% { transform: rotate(3deg); }
  75% { transform: rotate(-2deg); }
}
</style>
