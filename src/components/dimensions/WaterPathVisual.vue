<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 蓄水池 - 延后 (value < 35) -->
    <g v-if="value < 35">
      <rect x="75" y="150" width="150" height="100" fill="rgba(107,140,255,0.2)" stroke="rgba(107,140,255,0.5)" stroke-width="2" />
      <path d="M 75 170 Q 110 165, 150 170 T 225 170" fill="rgba(107,140,255,0.4)" />
      <text x="150" y="280" text-anchor="middle" class="label">蓄水池 - 情绪延后</text>
    </g>

    <!-- 流动小溪 - 逐步处理 (value 35-65) -->
    <g v-if="value >= 35 && value <= 65">
      <path d="M 50 100 Q 80 120, 100 100 T 150 100 T 200 100 T 250 100" 
            stroke="rgba(120,150,255,0.7)" stroke-width="8" fill="none" />
      <circle cx="100" cy="100" r="3" fill="rgba(255,255,255,0.6)">
        <animate attributeName="cx" values="50;250" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="150" y="280" text-anchor="middle" class="label">流动小溪 - 逐步处理</text>
    </g>

    <!-- 喷泉 - 即时行动 (value > 65) -->
    <g v-if="value > 65">
      <ellipse cx="150" cy="200" rx="40" ry="20" fill="rgba(167,139,255,0.2)" />
      <path d="M 150 200 Q 140 150, 130 100" stroke="rgba(167,139,255,0.7)" stroke-width="3" fill="none" />
      <path d="M 150 200 Q 150 140, 150 80" stroke="rgba(167,139,255,0.8)" stroke-width="4" fill="none" />
      <path d="M 150 200 Q 160 150, 170 100" stroke="rgba(167,139,255,0.7)" stroke-width="3" fill="none" />
      <circle cx="150" cy="80" r="4" fill="rgba(255,255,255,0.7)">
        <animate attributeName="cy" values="200;80;200" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="150" y="280" text-anchor="middle" class="label">喷泉 - 即时行动</text>
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
  font-size: 14px;
  font-family: system-ui;
}
</style>
