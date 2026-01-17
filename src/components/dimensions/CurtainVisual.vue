<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 窗户框架 -->
    <rect x="75" y="75" width="150" height="150" stroke="rgba(255,255,255,0.3)" stroke-width="3" fill="none" />
    <line x1="150" y1="75" x2="150" y2="225" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
    <line x1="75" y1="150" x2="225" y2="150" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

    <!-- 窗帘 - 根据透明度变化 -->
    <!-- 完全遮蔽 (value < 35) -->
    <rect v-if="value < 35" x="75" y="75" width="150" height="150" 
          fill="rgba(50,50,80,0.9)" />
    
    <!-- 半透明 (value 35-65) -->
    <rect v-if="value >= 35 && value <= 65" x="75" y="75" width="150" height="150"
          fill="rgba(107,140,255,0.4)" />
    
    <!-- 透明/敞开 (value > 65) -->
    <g v-if="value > 65">
      <rect x="75" y="75" width="60" height="150" fill="rgba(255,255,255,0.1)" />
      <rect x="165" y="75" width="60" height="150" fill="rgba(255,255,255,0.1)" />
    </g>

    <!-- 光线效果 -->
    <g v-if="value > 50" opacity="0.6">
      <line x1="150" y1="75" x2="150" y2="150" stroke="rgba(255,200,100,0.5)" stroke-width="20" />
      <line x1="150" y1="75" x2="120" y2="180" stroke="rgba(255,200,100,0.3)" stroke-width="15" />
      <line x1="150" y1="75" x2="180" y2="180" stroke="rgba(255,200,100,0.3)" stroke-width="15" />
    </g>

    <!-- 标签 -->
    <text x="150" y="270" text-anchor="middle" class="label">
      {{ value < 35 ? '窗帘紧闭' : value > 65 ? '窗户敞开' : '纱窗半透' }}
    </text>
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
