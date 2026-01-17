<template>
  <div class="dimensions-visualization">
    <h2>🌈 你的内在维度画像</h2>
    <p class="dimensions-intro">
      基于对话，我们识别出你在8个维度上的特质。这不是评判，而是帮你看见自己的独特模式。
    </p>

    <div class="dimensions-grid">
      <div
        v-for="dimension in dimensions"
        :key="dimension.id"
        class="dimension-card"
      >
        <div class="dimension-header">
          <h3>{{ dimension.name }}</h3>
          <div class="dimension-metaphor">{{ dimension.visualMetaphor }}</div>
        </div>

        <!-- 视觉化进度条 -->
        <div class="dimension-visual">
          <div class="dimension-bar">
            <div
              class="dimension-fill"
              :style="{ width: dimension.value + '%' }"
              :class="getDimensionClass(dimension.value)"
            ></div>
          </div>
        </div>

        <p class="dimension-description">{{ dimension.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dimension } from "@/journey/types";

defineProps<{
  dimensions: Dimension[];
}>();

function getDimensionClass(value: number): string {
  if (value < 35) return "low";
  if (value > 65) return "high";
  return "mid";
}
</script>

<style scoped>
.dimensions-visualization {
  margin: 60px 0;
}

.dimensions-visualization h2 {
  font-size: 32px;
  text-align: center;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.dimensions-intro {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.dimensions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.dimension-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.dimension-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(107, 140, 255, 0.3);
  transform: translateY(-2px);
}

.dimension-header h3 {
  font-size: 18px;
  color: #6b8cff;
  margin-bottom: 8px;
}

.dimension-metaphor {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  margin-bottom: 16px;
}

.dimension-visual {
  margin: 16px 0;
}

.dimension-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.dimension-fill {
  height: 100%;
  border-radius: 4px;
  transition: all 0.6s ease;
  background: linear-gradient(90deg, #6b8cff, #a78bff);
}

.dimension-fill.low {
  background: linear-gradient(90deg, #4a90e2, #6b8cff);
}

.dimension-fill.mid {
  background: linear-gradient(90deg, #6b8cff, #a78bff);
}

.dimension-fill.high {
  background: linear-gradient(90deg, #a78bff, #d46bff);
}

.dimension-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-top: 12px;
}

@keyframes fillAnimation {
  from {
    width: 0;
  }
}

.dimension-fill {
  animation: fillAnimation 1.2s ease-out;
}
</style>
