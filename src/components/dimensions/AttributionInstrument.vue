<template>
  <div class="device-container">
    <svg
      class="attribution-svg"
      viewBox="0 0 100 100"
      :class="{ active: isActive }"
    >
      <line
        v-for="i in 12"
        :key="i"
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke="currentColor"
        stroke-width="1"
        stroke-linecap="round"
        :stroke-dasharray="isActive ? '1 4' : '0'"
        :transform="`rotate(${(i - 1) * 30} 50 50)`"
        class="spoke"
      />
      <circle cx="50" cy="50" r="3" fill="currentColor" :class="{ ping: isActive }" />
    </svg>
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
  color: rgba(255, 255, 255, 0.8);
  animation: float 6s ease-in-out infinite;
}

.attribution-svg {
  width: 100px;
  height: 100px;
  transition: transform 1s ease;
  animation: slow-rotate 14s linear infinite;
}

.attribution-svg.active {
  transform: rotate(90deg);
}

.spoke {
  opacity: 0.3;
  transition: all 1s ease;
  stroke-dashoffset: 0;
  animation: wave 3s ease-in-out infinite;
}

.ping {
  animation: ping 1.2s ease-in-out infinite;
}

@keyframes ping {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.8); opacity: 0.4; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes slow-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes wave {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: 6; opacity: 0.5; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
