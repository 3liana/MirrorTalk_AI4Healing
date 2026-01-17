<template>
  <div class="device-container">
    <svg class="validation-svg" viewBox="0 0 100 100">
      <path :d="rootPath" fill="none" stroke="currentColor" stroke-width="1.5" class="root" />
      <circle :cx="50" :cy="nodeY" r="2" fill="currentColor" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ value?: number }>();
const isActive = computed(() => (props.value ?? 50) >= 50);

const rootPath = computed(() => isActive.value
  ? 'M50 100 L50 40 M50 80 L20 50 M50 70 L80 40'
  : 'M50 100 L50 10 M20 40 L50 60 L80 40'
);

const nodeY = computed(() => (isActive.value ? 40 : 10));
</script>

<style scoped>
.device-container {
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 16px;
  overflow: hidden;
  animation: float 6s ease-in-out infinite;
}

.validation-svg {
  width: 120px;
  height: 120px;
  opacity: 0.7;
  animation: sway 5.5s ease-in-out infinite;
}

.root {
  transition: all 1s ease;
}

@keyframes sway {
  0% { transform: rotate(0deg) translateY(0); }
  50% { transform: rotate(-2deg) translateY(-4px); }
  100% { transform: rotate(0deg) translateY(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
</style>
