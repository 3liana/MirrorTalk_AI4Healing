<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 容器 -->
    <rect x="75" y="75" width="150" height="150" fill="rgba(255,255,255,0.05)" />

    <!-- 边界形态 - 根据 value 变化 -->
    <!-- 模糊边界 (value < 35) -->
    <g v-if="value < 35">
      <path d="M 75 75 Q 90 70, 105 75 T 135 75 T 165 75 T 195 75 T 225 75" 
            stroke="rgba(107,140,255,0.6)" stroke-width="3" fill="none" stroke-dasharray="5,5" opacity="0.5" />
      <path d="M 225 75 Q 230 90, 225 105 T 225 135 T 225 165 T 225 195 T 225 225"
            stroke="rgba(107,140,255,0.6)" stroke-width="3" fill="none" stroke-dasharray="5,5" opacity="0.5" />
      <path d="M 225 225 Q 210 230, 195 225 T 165 225 T 135 225 T 105 225 T 75 225"
            stroke="rgba(107,140,255,0.6)" stroke-width="3" fill="none" stroke-dasharray="5,5" opacity="0.5" />
      <path d="M 75 225 Q 70 210, 75 195 T 75 165 T 75 135 T 75 105 T 75 75"
            stroke="rgba(107,140,255,0.6)" stroke-width="3" fill="none" stroke-dasharray="5,5" opacity="0.5" />
      <text x="150" y="270" text-anchor="middle" class="label">波浪虚线 - 边界模糊</text>
    </g>

    <!-- 可协商边界 (value 35-65) -->
    <g v-if="value >= 35 && value <= 65">
      <rect x="75" y="75" width="150" height="150" 
            stroke="rgba(120,120,255,0.7)" stroke-width="2.5" fill="none" stroke-dasharray="10,5" />
      <text x="150" y="270" text-anchor="middle" class="label">半透明墙 - 边界可协商</text>
    </g>

    <!-- 清晰边界 (value > 65) -->
    <g v-if="value > 65">
      <rect x="75" y="75" width="150" height="150" 
            stroke="rgba(167,139,255,0.9)" stroke-width="4" fill="none" />
      <text x="150" y="270" text-anchor="middle" class="label">实线围栏 - 边界清晰</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
}>();
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
  font-size: 12px;
  font-family: system-ui;
}
</style>
