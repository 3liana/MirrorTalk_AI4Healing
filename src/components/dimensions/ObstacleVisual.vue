<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 道路 -->
    <rect x="120" y="50" width="60" height="200" fill="rgba(255,255,255,0.1)" />
    <line x1="150" y1="50" x2="150" y2="250" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="10,10" />

    <!-- 障碍物 - 根据抵抗方式变化 -->
    <!-- 回避 - 绕路 (value < 35) -->
    <g v-if="value < 35">
      <rect x="130" y="120" width="40" height="40" fill="rgba(255,100,100,0.5)" stroke="rgba(255,100,100,0.7)" stroke-width="2" />
      <path d="M 150 100 Q 90 140, 150 180" stroke="rgba(107,140,255,0.8)" stroke-width="3" fill="none" marker-end="url(#arrow)" />
      <text x="150" y="280" text-anchor="middle" class="label">绕路回避</text>
    </g>

    <!-- 妥协 - 变软 (value 35-50) -->
    <g v-if="value >= 35 && value < 50">
      <ellipse cx="150" cy="140" rx="30" ry="25" fill="rgba(255,200,100,0.4)" stroke="rgba(255,200,100,0.6)" stroke-width="2" />
      <path d="M 150 100 L 150 180" stroke="rgba(107,140,255,0.8)" stroke-width="3" fill="none" marker-end="url(#arrow)" />
      <text x="150" y="280" text-anchor="middle" class="label">柔软妥协</text>
    </g>

    <!-- 延迟 - 暂停 (value 50-65) -->
    <g v-if="value >= 50 && value < 65">
      <rect x="125" y="120" width="50" height="10" fill="rgba(255,150,50,0.6)" stroke="rgba(255,150,50,0.8)" stroke-width="2" />
      <path d="M 150 100 L 150 120" stroke="rgba(107,140,255,0.8)" stroke-width="3" fill="none" />
      <circle cx="150" cy="135" r="5" fill="rgba(107,140,255,0.8)" />
      <text x="150" y="280" text-anchor="middle" class="label">减速暂停</text>
    </g>

    <!-- 内在抽离 - 透明化 (value >= 65) -->
    <g v-if="value >= 65">
      <rect x="130" y="120" width="40" height="40" fill="rgba(200,200,255,0.2)" stroke="rgba(200,200,255,0.4)" stroke-width="2" stroke-dasharray="5,5" />
      <path d="M 150 100 L 150 180" stroke="rgba(107,140,255,0.8)" stroke-width="3" fill="none" marker-end="url(#arrow)" />
      <text x="150" y="280" text-anchor="middle" class="label">穿透抽离</text>
    </g>

    <!-- 箭头定义 -->
    <defs>
      <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="rgba(107,140,255,0.8)" />
      </marker>
    </defs>
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
