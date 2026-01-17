<template>
  <div class="dimension-page">
    <div class="dimension-content">
      <!-- 维度名称 -->
      <h2 class="dimension-title">{{ dimension.name }}</h2>
      
      <!-- 可视化图形 -->
      <div class="visual-container">
        <component :is="visualComponent" :value="dimension.value" />
      </div>

      <!-- 用户表现描述 -->
      <div class="behavior-section">
        <h3>你的表现</h3>
        <p class="behavior-text">{{ dimension.userBehavior }}</p>
      </div>

      <!-- 一句话总结 -->
      <div class="summary-section">
        <div class="summary-label">✨ 总结</div>
        <p class="summary-text">{{ dimension.summary }}</p>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Dimension } from '@/journey/types';

import AgencyInstrument from './dimensions/AgencyInstrument.vue';
import AttributionInstrument from './dimensions/AttributionInstrument.vue';
import ValidationInstrument from './dimensions/ValidationInstrument.vue';
import BoundaryInstrument from './dimensions/BoundaryInstrument.vue';
import DesireInstrument from './dimensions/DesireInstrument.vue';
import EmotionInstrument from './dimensions/EmotionInstrument.vue';
import ResponsibilityInstrument from './dimensions/ResponsibilityInstrument.vue';
import ResistanceInstrument from './dimensions/ResistanceInstrument.vue';

const props = defineProps<{
  dimension: Dimension;
}>();

const visualComponent = computed(() => {
  const map: Record<string, any> = {
    'agency_source': AgencyInstrument,
    'attribution': AttributionInstrument,
    'value_path': ValidationInstrument,
    'boundary': BoundaryInstrument,
    'desire_visibility': DesireInstrument,
    'emotion_path': EmotionInstrument,
    'responsibility': ResponsibilityInstrument,
    'resistance': ResistanceInstrument,
  };
  return map[props.dimension.id] || AgencyInstrument;
});
</script>

<style scoped>
.dimension-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.dimension-content {
  max-width: 600px;
  width: 100%;
  text-align: center;
}

.dimension-title {
  font-size: 36px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 40px;
}

.visual-container {
  margin: 40px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

.behavior-section {
  margin: 40px 0;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  text-align: left;
}

.behavior-section h3 {
  color: #6b8cff;
  font-size: 20px;
  margin-bottom: 16px;
}

.behavior-text {
  color: rgba(255, 255, 255, 0.85);
  font-size: 16px;
  line-height: 1.8;
}

.summary-section {
  margin: 40px 0;
  padding: 24px;
  background: linear-gradient(135deg, rgba(107, 140, 255, 0.1), rgba(167, 139, 255, 0.1));
  border-radius: 16px;
  border: 1px solid rgba(107, 140, 255, 0.3);
}

.summary-label {
  color: #a78bff;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.summary-text {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
}

</style>
