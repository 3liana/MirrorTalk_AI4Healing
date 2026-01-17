<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 中心点 -->
    <circle cx="150" cy="150" r="8" fill="rgba(255,255,255,0.5)" />

    <!-- 向内收缩的箭头 -->
    <g v-if="value < 40">
      <path
        v-for="(angle, i) in inwardAngles"
        :key="'in-' + i"
        :d="getArrowPath(angle, true)"
        stroke="rgba(107,140,255,0.7)"
        stroke-width="2"
        fill="none"
        marker-end="url(#arrowhead-in)"
      />
      <text x="150" y="280" text-anchor="middle" class="label">向内归因</text>
    </g>

    <!-- 向外扩散的箭头 -->
    <g v-if="value > 60">
      <path
        v-for="(angle, i) in outwardAngles"
        :key="'out-' + i"
        :d="getArrowPath(angle, false)"
        stroke="rgba(167,139,255,0.7)"
        stroke-width="2"
        fill="none"
        marker-end="url(#arrowhead-out)"
      />
      <text x="150" y="280" text-anchor="middle" class="label">向外归因</text>
    </g>

    <!-- 箭头标记定义 -->
    <defs>
      <marker id="arrowhead-in" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="rgba(107,140,255,0.7)" />
      </marker>
      <marker id="arrowhead-out" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="rgba(167,139,255,0.7)" />
      </marker>
    </defs>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number;
}>();

const inwardAngles = [0, 60, 120, 180, 240, 300];
const outwardAngles = [0, 45, 90, 135, 180, 225, 270, 315];

function getArrowPath(angle: number, inward: boolean): string {
  const rad = (angle * Math.PI) / 180;
  const startRadius = inward ? 100 : 15;
  const endRadius = inward ? 15 : 100;
  
  const x1 = 150 + Math.cos(rad) * startRadius;
  const y1 = 150 + Math.sin(rad) * startRadius;
  const x2 = 150 + Math.cos(rad) * endRadius;
  const y2 = 150 + Math.sin(rad) * endRadius;
  
  return `M ${x1} ${y1} L ${x2} ${y2}`;
}
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
