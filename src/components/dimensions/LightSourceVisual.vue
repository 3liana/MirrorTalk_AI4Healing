<template>
  <svg viewBox="0 0 300 300" class="dimension-visual">
    <!-- 中心人影 -->
    <g class="person-silhouette">
      <ellipse cx="150" cy="140" rx="20" ry="28" fill="rgba(255,255,255,0.3)" />
      <circle cx="150" cy="100" r="15" fill="rgba(255,255,255,0.3)" />
    </g>

    <!-- 光源：不同方向 -->
    <!-- 关系稳定 - 左侧 -->
    <g v-if="value < 40" class="light-external">
      <circle cx="50" cy="150" :r="radiusLeft" fill="rgba(107,140,255,0.2)">
        <animate attributeName="r" values="40;50;40" dur="3s" repeatCount="indefinite" />
      </circle>
      <line x1="50" y1="150" x2="130" y2="140" stroke="rgba(107,140,255,0.6)" stroke-width="2" />
      <text x="50" y="200" text-anchor="middle" class="label">关系稳定</text>
    </g>

    <!-- 被理解 - 上方 -->
    <g v-if="value < 50" class="light-external">
      <circle cx="150" cy="30" :r="radiusTop" fill="rgba(167,139,255,0.2)">
        <animate attributeName="r" values="35;45;35" dur="3s" repeatCount="indefinite" />
      </circle>
      <line x1="150" y1="30" x2="150" y2="85" stroke="rgba(167,139,255,0.6)" stroke-width="2" />
      <text x="150" y="20" text-anchor="middle" class="label">被理解</text>
    </g>

    <!-- 独处 - 内部光源 -->
    <g v-if="value > 60" class="light-internal">
      <circle cx="150" cy="120" :r="radiusCenter" fill="rgba(255,200,100,0.3)">
        <animate attributeName="r" values="30;40;30" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="150" y="230" text-anchor="middle" class="label">内在发光</text>
    </g>

    <!-- 冲突后 - 右侧微弱 -->
    <g v-if="value < 60" class="light-weak" opacity="0.4">
      <circle cx="250" cy="150" r="25" fill="rgba(255,100,100,0.2)" />
      <line x1="250" y1="150" x2="170" y2="140" stroke="rgba(255,100,100,0.4)" stroke-width="1" stroke-dasharray="5,5" />
      <text x="250" y="200" text-anchor="middle" class="label">冲突后</text>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  value: number; // 0-100
}>();

const radiusLeft = computed(() => props.value < 40 ? 50 : 30);
const radiusTop = computed(() => props.value < 50 ? 45 : 25);
const radiusCenter = computed(() => props.value > 60 ? 40 : 20);
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

.person-silhouette {
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.3));
}
</style>
