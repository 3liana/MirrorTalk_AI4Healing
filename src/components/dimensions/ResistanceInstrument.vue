<template>
  <div class="device-container">
    <svg class="resistance-svg" viewBox="0 0 120 40">
      <circle cx="60" cy="20" r="10" fill="none" stroke="currentColor" stroke-width="1" class="obstacle" />
      <path
        :d="pathD"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        class="flow"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value?: number }>();
const isActive = computed(() => (props.value ?? 50) >= 50);

const pathD = computed(() => (isActive.value ? 'M0 20 Q60 -20 120 20' : 'M0 20 L120 20'));
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

.resistance-svg {
  width: 140px;
  height: 60px;
  overflow: visible;
  animation: gentle-tilt 7s ease-in-out infinite;
}

.obstacle {
  opacity: 0.2;
  animation: pulse-obstacle 3.5s ease-in-out infinite;
}

.flow {
  transition: all 1s ease;
  stroke: #fb7185;
  stroke-dasharray: 6 4;
  animation: flow-dash 2.8s linear infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes gentle-tilt {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-3deg); }
}

@keyframes pulse-obstacle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.5; }
}

@keyframes flow-dash {
  0% { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: -20; }
}
</style>
