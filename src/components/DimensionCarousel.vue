<template>
  <div class="dimension-carousel">
    <div class="carousel-header">
      <h2>🌈 你的8维内在画像</h2>
      <p class="carousel-subtitle">左右滑动或点击按钮查看每个维度</p>
      <div class="progress-dots">
        <button
          v-for="(dim, index) in dimensions"
          :key="dim.id"
          @click="goToPage(index)"
          class="dot"
          :class="{ active: currentIndex === index }"
          :aria-label="`第${index + 1}个维度：${dim.name}`"
        >
          <span class="dot-number">{{ index + 1 }}</span>
        </button>
      </div>
    </div>

    <div class="carousel-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div v-for="dimension in dimensions" :key="dimension.id" class="carousel-slide">
          <DimensionPage
            :dimension="dimension"
          />
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button
        @click="prevPage"
        :disabled="currentIndex === 0"
        class="control-btn prev-btn"
        aria-label="上一个维度"
      >
        ← 上一个
      </button>
      <div class="page-indicator">{{ currentIndex + 1 }} / {{ dimensions.length }}</div>
      <button
        @click="nextPage"
        :disabled="currentIndex === dimensions.length - 1"
        class="control-btn next-btn"
        aria-label="下一个维度"
      >
        下一个 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Dimension } from '@/journey/types';
import DimensionPage from './DimensionPage.vue';

const props = defineProps<{
  dimensions: Dimension[];
}>();

const currentIndex = ref(0);
let touchStartX = 0;

function goToPage(index: number) {
  currentIndex.value = index;
}

function nextPage() {
  if (currentIndex.value < props.dimensions.length - 1) {
    currentIndex.value++;
  }
}

function prevPage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function handleTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX;
}

function handleTouchEnd(e: TouchEvent) {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      nextPage();
    } else {
      prevPage();
    }
  }
}

</script>

<style scoped>
.dimension-carousel {
  width: 100%;
  max-width: 1200px;
  margin: 60px auto;
}

.carousel-header {
  text-align: center;
  margin-bottom: 40px;
}

.carousel-header h2 {
  font-size: 32px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.carousel-subtitle {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  margin-bottom: 24px;
}

.progress-dots {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.dot {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid rgba(107, 140, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot:hover {
  border-color: rgba(107, 140, 255, 0.6);
  background: rgba(107, 140, 255, 0.1);
}

.dot.active {
  border-color: #6b8cff;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
}

.dot-number {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  font-weight: 600;
}

.dot.active .dot-number {
  color: white;
}

.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 40px;
}

.control-btn {
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(107, 140, 255, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  background: rgba(107, 140, 255, 0.1);
  border-color: #6b8cff;
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-indicator {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  font-weight: 600;
  min-width: 80px;
  text-align: center;
}
</style>
