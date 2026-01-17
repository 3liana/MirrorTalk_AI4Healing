<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 地面线 -->
    <line x1="50" y1="100" x2="250" y2="100" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
    
    <!-- 树干 -->
    <rect x="140" y="50" width="20" height="50" fill="rgba(255,255,255,0.2)" rx="5" />

    <!-- 根系 - 自我逻辑（深而独） -->
    <g v-if="value < 40" class="deep-roots">
      <path d="M 150 100 Q 150 150, 150 200" stroke="rgba(107,140,255,0.7)" stroke-width="4" fill="none" />
      <path d="M 150 150 Q 140 180, 130 210" stroke="rgba(107,140,255,0.5)" stroke-width="2" fill="none" />
      <path d="M 150 150 Q 160 180, 170 210" stroke="rgba(107,140,255,0.5)" stroke-width="2" fill="none" />
      <text x="150" y="270" text-anchor="middle" class="label">深根独立</text>
    </g>

    <!-- 根系 - 他人理解（浅而广） -->
    <g v-if="value > 60" class="shallow-roots">
      <path d="M 150 100 Q 100 120, 60 130" stroke="rgba(167,139,255,0.7)" stroke-width="3" fill="none" />
      <path d="M 150 100 Q 120 115, 80 125" stroke="rgba(167,139,255,0.6)" stroke-width="2" fill="none" />
      <path d="M 150 100 Q 200 120, 240 130" stroke="rgba(167,139,255,0.7)" stroke-width="3" fill="none" />
      <path d="M 150 100 Q 180 115, 220 125" stroke="rgba(167,139,255,0.6)" stroke-width="2" fill="none" />
      <path d="M 150 100 Q 140 110, 110 120" stroke="rgba(167,139,255,0.5)" stroke-width="2" fill="none" />
      <path d="M 150 100 Q 160 110, 190 120" stroke="rgba(167,139,255,0.5)" stroke-width="2" fill="none" />
      <text x="150" y="270" text-anchor="middle" class="label">浅根广布</text>
    </g>

    <!-- 中等 -->
    <g v-if="value >= 40 && value <= 60" class="mixed-roots">
      <path d="M 150 100 Q 150 130, 150 160" stroke="rgba(120,120,255,0.6)" stroke-width="3" fill="none" />
      <path d="M 150 100 Q 120 120, 90 140" stroke="rgba(120,120,255,0.5)" stroke-width="2" fill="none" />
      <path d="M 150 100 Q 180 120, 210 140" stroke="rgba(120,120,255,0.5)" stroke-width="2" fill="none" />
      <text x="150" y="270" text-anchor="middle" class="label">根系交织</text>
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
