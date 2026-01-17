<template>
  <div class="device-container">
    <div :class="['boundary-shape', { active: isActive }]" />
    <div :class="['boundary-dash', { active: isActive }]" />
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

.boundary-shape {
  width: 80px;
  height: 80px;
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 999px;
  transition: all 1s ease;
  animation: morph 8s ease-in-out infinite;
}

.boundary-shape.active {
  width: 96px;
  height: 96px;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  transform: rotate(45deg);
}

.boundary-dash {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 1px dashed rgba(129, 140, 248, 0.5);
  border-radius: 12px;
  opacity: 0;
  transition: all 1s ease;
  animation: rotate-dash 10s linear infinite;
}

.boundary-dash.active {
  width: 112px;
  height: 112px;
  border-radius: 999px;
  opacity: 1;
}

@keyframes morph {
  0%, 100% { border-radius: 999px; }
  50% { border-radius: 30% 70% 60% 40% / 30% 40% 70% 60%; }
}

@keyframes rotate-dash {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
