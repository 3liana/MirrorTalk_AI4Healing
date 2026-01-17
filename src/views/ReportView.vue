<template>
  <div class="report-view">
    <div class="report-container">
      <!-- Header -->
      <div class="report-header">
        <router-link to="/role" class="back-btn">← 重新开始</router-link>
        <h1>{{ report?.headline }}</h1>
      </div>

      <!-- Report Content -->
      <div v-if="report" class="report-content">
        <!-- Dimensions Carousel - NEW -->
        <section v-if="report.dimensions" class="report-section dimensions-section">
          <DimensionCarousel
            :dimensions="report.dimensions"
          />
        </section>

        <!-- 合成画像（八维一张） -->
        <section v-if="report.dimensions?.length" class="report-section image-merge-section">
          <h2>🎨 你的心灵画像</h2>
          <div class="merge-actions">
            <button
              v-if="!mergedImageUrl && !isGeneratingMerged"
              class="merge-btn"
              @click="generateMergedImage"
            >
              生成合成画像
            </button>
            <div v-if="isGeneratingMerged" class="merge-loading">
              <div class="spinner"></div>
              <span>生成中...</span>
            </div>
          </div>
          <div v-if="mergedImageUrl" class="merge-image">
            <img :src="mergedImageUrl" alt="八维合成画像" />
          </div>
        </section>

        <!-- Thinking Patterns -->
        <section class="report-section">
          <h2>📸 你的思维模式画像</h2>
          <div
            v-for="(pattern, idx) in report.thinkingPatterns"
            :key="idx"
            class="pattern-card"
          >
            <h3>{{ pattern.name }}</h3>
            <p>{{ pattern.description }}</p>
            <div class="example">
              <strong>你说过：</strong>"{{ pattern.exampleFromYou }}"
            </div>
          </div>
        </section>

        <!-- Overlooked Needs -->
        <section class="report-section">
          <h2>💭 被忽略的真实需求</h2>
          <div
            v-for="(need, idx) in report.overlookedNeeds"
            :key="idx"
            class="need-card"
          >
            <h3>{{ need.need }}</h3>
            <p>{{ need.howItShowsUp }}</p>
            <div class="reminder">{{ need.gentleReminder }}</div>
          </div>
        </section>

        <!-- Micro Actions -->
        <section class="report-section">
          <h2>🎯 3个Micro-Action（本周就能尝试）</h2>
          <div class="actions-grid">
            <div
              v-for="(action, idx) in report.microActions"
              :key="idx"
              class="action-card"
            >
              <div class="action-number">{{ idx + 1 }}</div>
              <h3>{{ action.title }}</h3>
              <p class="action-why">{{ action.why }}</p>
              <div class="action-how">
                <strong>怎么做：</strong>{{ action.how }}
              </div>
              <div class="action-time">⏱ {{ action.timeCost }}</div>
            </div>
          </div>
        </section>

        <!-- Closing Letter -->
        <section class="report-section">
          <h2>💌 一封朋友的信</h2>
          <div class="closing-letter">{{ report.closingLetter }}</div>
        </section>

        <!-- Resources -->
        <section v-if="report.resources?.length" class="report-section">
          <h2>📚 延伸资源</h2>
          <div class="resources-grid">
            <div
              v-for="(resource, idx) in report.resources"
              :key="idx"
              class="resource-card"
            >
              <div class="resource-type">{{ resourceEmoji(resource.type) }}</div>
              <h4>{{ resource.title }}</h4>
              <p>{{ resource.note }}</p>
            </div>
          </div>
        </section>

        <!-- Footer CTA -->
        <div class="report-footer">
          <router-link to="/role" class="restart-btn">
            开始新的对话
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useJourneyStore } from "@/stores/journey";
import { RouterLink } from "vue-router";
import { MOCK_TEST_DATA } from "@/llm/mockData";
import DimensionCarousel from "@/components/DimensionCarousel.vue";
import type { Dimension } from "@/journey/types";
import { quickGeneratePixelCute } from "@/llm/imageClient";

const route = useRoute();
const journeyStore = useJourneyStore();

const report = computed(() => journeyStore.currentReport);

const mergedImageUrl = ref<string | null>(null);
const isGeneratingMerged = ref(false);

// 检测是否为测试模式
onMounted(() => {
  const isTestMode = route.meta.isTestMode === true;
  if (isTestMode) {
    // 在测试模式下，注入 mock 数据
    journeyStore.currentReport = MOCK_TEST_DATA.report;
    console.log("🧪 ReportView Test Mode - Mock data loaded");
    console.log("Mock Report:", MOCK_TEST_DATA.report);
  }
});

function resourceEmoji(type: string): string {
  const emojis: Record<string, string> = {
    book: "📖",
    podcast: "🎙️",
    community: "👥",
  };
  return emojis[type] || "📌";
}

async function generateMergedImage() {
  if (!report.value?.dimensions?.length) return;
  isGeneratingMerged.value = true;
  try {
    const dims = report.value.dimensions;
    const picked = dims[Math.floor(Math.random() * dims.length)];
    const prompt = `像素风可爱，禁止出现人物/角色/人脸，只用抽象符号、光、能量和环境意象。做一张让人感觉“灵性被触碰、灵魂被读懂”的收束画面，带一点结局感与温柔的光。仅使用这个维度的意象：${picked.name}：${picked.summary || picked.userBehavior || ''}`;
    const url = await quickGeneratePixelCute(prompt);
    mergedImageUrl.value = url;
  } catch (error) {
    console.error('合成画像生成失败:', error);
  } finally {
    isGeneratingMerged.value = false;
  }
}
</script>

<style scoped>
.report-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%);
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
}

/* 星星闪烁层 */
.report-view::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  mix-blend-mode: screen;
  animation: twinkle 6s ease-in-out infinite alternate;
  background-image:
    radial-gradient(2px 2px at 12% 18%, rgba(255, 255, 255, 0.95), transparent 62%),
    radial-gradient(2.4px 2.4px at 32% 42%, rgba(255, 255, 255, 0.8), transparent 62%),
    radial-gradient(2px 2px at 52% 14%, rgba(255, 255, 255, 0.9), transparent 62%),
    radial-gradient(2.6px 2.6px at 72% 32%, rgba(255, 255, 255, 0.7), transparent 62%),
    radial-gradient(1.8px 1.8px at 88% 24%, rgba(255, 255, 255, 1), transparent 62%),
    radial-gradient(1.8px 1.8px at 22% 72%, rgba(255, 255, 255, 0.9), transparent 62%),
    radial-gradient(1.6px 1.6px at 42% 82%, rgba(255, 255, 255, 0.8), transparent 62%),
    radial-gradient(1.8px 1.8px at 68% 78%, rgba(255, 255, 255, 0.95), transparent 62%),
    radial-gradient(1.6px 1.6px at 84% 66%, rgba(255, 255, 255, 0.85), transparent 62%),
    radial-gradient(2.2px 2.2px at 56% 58%, rgba(255, 255, 255, 0.9), transparent 62%),
    radial-gradient(2px 2px at 15% 55%, rgba(255, 255, 255, 0.8), transparent 62%),
    radial-gradient(1.8px 1.8px at 75% 20%, rgba(255, 255, 255, 0.75), transparent 62%),
    radial-gradient(1.8px 1.8px at 48% 70%, rgba(255, 255, 255, 0.85), transparent 62%);
  opacity: 0.75;
}

.report-container {
  position: relative;
  z-index: 1;
}

@keyframes twinkle {
  0% { opacity: 0.35; filter: drop-shadow(0 0 2px rgba(255,255,255,0.35)); }
  50% { opacity: 1; filter: drop-shadow(0 0 4px rgba(255,255,255,0.6)); }
  100% { opacity: 0.55; filter: drop-shadow(0 0 2px rgba(255,255,255,0.4)); }
}

.report-container {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease;
}

.report-header {
  text-align: center;
  margin-bottom: 60px;
}

.back-btn {
  display: inline-block;
  color: #6b8cff;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 20px;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #a78bff;
}

.report-header h1 {
  font-size: 36px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
}

.report-content {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.report-section {
  animation: slideIn 0.6s ease;
}

.dimensions-section {
  margin-bottom: 60px;
  padding: 40px 0;
  background: linear-gradient(180deg, rgba(107,140,255,0.03) 0%, rgba(0,0,0,0) 100%);
  border-radius: 24px;
}

.report-section h2 {
  font-size: 20px;
  color: #e0e0e0;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(107, 140, 255, 0.2);
}

.pattern-card,
.need-card {
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-left: 3px solid #6b8cff;
  border-radius: 6px;
  margin-bottom: 16px;
  transition: all 0.3s ease;
}

.pattern-card:hover,
.need-card:hover {
  background: rgba(107, 140, 255, 0.1);
  transform: translateX(4px);
}

.pattern-card h3,
.need-card h3 {
  color: #e0e0e0;
  margin: 0 0 8px;
  font-size: 16px;
}

.pattern-card p,
.need-card p {
  color: #ccc;
  margin: 0 0 12px;
  line-height: 1.5;
}

.example,
.reminder {
  font-size: 13px;
  color: #999;
  font-style: italic;
  padding: 8px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 4px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.action-card {
  padding: 24px;
  background: rgba(107, 140, 255, 0.1);
  border: 1px solid rgba(107, 140, 255, 0.3);
  border-radius: 8px;
  text-align: center;
}

.action-number {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
}

.action-card h3 {
  color: #e0e0e0;
  margin: 0 0 12px;
  font-size: 16px;
}

.action-why {
  font-size: 13px;
  color: #999;
  margin: 0 0 12px;
  line-height: 1.4;
}

.action-how {
  font-size: 13px;
  color: #ccc;
  margin: 12px 0;
  text-align: left;
}

.action-time {
  font-size: 12px;
  color: #6b8cff;
  margin-top: 12px;
}

.closing-letter {
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ccc;
  line-height: 1.8;
  font-size: 15px;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.resource-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  transition: all 0.3s ease;
}

.image-merge-section {
  text-align: center;
}

.merge-hint {
  color: rgba(255, 255, 255, 0.7);
  margin: 12px 0 20px;
}

.merge-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.merge-btn {
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  color: white;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(107, 140, 255, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.merge-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(107, 140, 255, 0.45);
}

.merge-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.85);
}

.merge-image {
  margin-top: 12px;
}

.merge-image img {
  width: 100%;
  max-width: 640px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
}

.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #6b8cff;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.resource-card:hover {
  background: rgba(107, 140, 255, 0.1);
  border-color: rgba(107, 140, 255, 0.3);
  transform: translateY(-4px);
}

.resource-type {
  font-size: 32px;
  margin-bottom: 8px;
}

.resource-card h4 {
  color: #e0e0e0;
  margin: 0 0 8px;
  font-size: 13px;
}

.resource-card p {
  color: #999;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.report-footer {
  text-align: center;
  padding-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.restart-btn {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(107, 140, 255, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
