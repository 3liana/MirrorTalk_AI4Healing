<template>
  <div class="pixel-art-section">
    <h2>🎨 你的内在风景</h2>
    <p class="pixel-art-intro">
      基于你的8个维度特质，我们为你生成了一幅独特的像素画。它是你内在世界的视觉化呈现。
    </p>

    <div class="pixel-art-container">
      <div v-if="isGenerating" class="generating-state">
        <div class="loading-spinner"></div>
        <p>正在生成你的专属像素画...</p>
        <p class="loading-hint">这可能需要10-30秒</p>
      </div>

      <div v-else-if="error" class="error-state">
        <p>😔 像素画生成失败</p>
        <p class="error-message">{{ error }}</p>
        <button @click="retryGeneration" class="retry-btn">重试</button>
      </div>

      <div v-else-if="imageUrl" class="pixel-art-display">
        <img :src="imageUrl" alt="你的内在风景" class="pixel-art-image" />
        <p class="pixel-art-caption">{{ caption }}</p>
      </div>

      <div v-else class="initial-state">
        <button @click="generateArt" class="generate-btn">
          🎨 生成我的像素画
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { generatePixelArt, generatePixelArtPrompt } from "@/llm/pixelArtGenerator";
import type { Dimension } from "@/journey/types";

const props = defineProps<{
  dimensions: Dimension[];
}>();

const emit = defineEmits<{
  (e: "generated", url: string): void;
}>();

const imageUrl = ref<string>("");
const isGenerating = ref(false);
const error = ref<string>("");
const caption = ref<string>("");

async function generateArt() {
  isGenerating.value = true;
  error.value = "";

  try {
    // 生成提示词并显示
    const prompt = generatePixelArtPrompt(props.dimensions);
    caption.value = `这幅画象征着：${prompt}`;

    // 调用智谱API生成图像
    const url = await generatePixelArt(props.dimensions);
    imageUrl.value = url;
    emit("generated", url);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "生成失败，请重试";
  } finally {
    isGenerating.value = false;
  }
}

async function retryGeneration() {
  await generateArt();
}
</script>

<style scoped>
.pixel-art-section {
  margin: 60px 0;
  text-align: center;
}

.pixel-art-section h2 {
  font-size: 32px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
}

.pixel-art-intro {
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.pixel-art-container {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 40px;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 生成中状态 */
.generating-state {
  text-align: center;
}

.loading-spinner {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(107, 140, 255, 0.2);
  border-top-color: #6b8cff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.generating-state p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 8px;
}

.loading-hint {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

/* 错误状态 */
.error-state {
  text-align: center;
}

.error-state p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  margin-bottom: 8px;
}

.error-message {
  color: rgba(255, 100, 100, 0.8);
  font-size: 14px;
  margin-bottom: 20px;
}

.retry-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(107, 140, 255, 0.4);
}

/* 图像展示 */
.pixel-art-display {
  max-width: 100%;
}

.pixel-art-image {
  max-width: 512px;
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

.pixel-art-caption {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  font-style: italic;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 初始状态 */
.generate-btn {
  padding: 16px 48px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(107, 140, 255, 0.3);
}

.generate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(107, 140, 255, 0.5);
}

.generate-btn:active {
  transform: translateY(0);
}
</style>
