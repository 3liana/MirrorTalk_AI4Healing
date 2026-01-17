<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 天平支点 -->
    <circle cx="150" cy="100" r="5" fill="rgba(255,255,255,0.5)" />
    <line x1="150" y1="100" x2="150" y2="80" stroke="rgba(255,255,255,0.4)" stroke-width="2" />

    <!-- 天平横杆 -->
    <line x1="80" y1="100" x2="220" y2="100" stroke="rgba(255,255,255,0.5)" stroke-width="3" />

    <!-- 左侧（自己承担的重量） -->
    <g :transform="`translate(0, ${leftWeight})`">
      <line x1="80" y1="100" x2="80" y2="140" stroke="rgba(167,139,255,0.6)" stroke-width="2" />
      <rect x="60" y="140" width="40" height="60" fill="rgba(167,139,255,0.3)" stroke="rgba(167,139,255,0.6)" stroke-width="2" />
      <text x="80" y="220" text-anchor="middle" class="label" fill="rgba(167,139,255,0.8)">我</text>
    </g>

    <!-- 右侧（对方承担的重量） -->
    <g :transform="`translate(0, ${rightWeight})`">
      <line x1="220" y1="100" x2="220" y2="140" stroke="rgba(107,140,255,0.6)" stroke-width="2" />
      <rect x="200" y="140" width="40" height="30" fill="rgba(107,140,255,0.3)" stroke="rgba(107,140,255,0.6)" stroke-width="2" />
      <text x="220" y="220" text-anchor="middle" class="label" fill="rgba(107,140,255,0.8)">对方</text>
    </g>

    <!-- 说明文字 -->
    <text x="150" y="270" text-anchor="middle" class="label">
      {{ value > 65 ? '我承担大部分' : value < 35 ? '责任共担' : '动态分配' }}
    </text>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number;
}>();

// 根据value计算天平倾斜
const leftWeight = computed(() => {
  if (props.value > 65) return 30; // 承担多，下沉
  if (props.value < 35) return -10; // 承担少，上升
  return 10;
});

const rightWeight = computed(() => {
  if (props.value > 65) return -10;
  if (props.value < 35) return 30;
  return 10;
});
</script>

<style scoped>
.dimension-visual {
  width: 100%;
  height: auto;
  max-width: 300px;
  margin: 0 auto;
}

.label {
  fill: rgba(255,255,255,0.6);
  font-size: 14px;
  font-family: system-ui;
}
</style>
