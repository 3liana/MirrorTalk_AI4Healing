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
  background: transparent;
  padding: 40px 20px;
  position: relative;
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
  animation: fadeIn 0.8s ease;
}

.report-header {
  text-align: center;
  margin-bottom: 60px;
}

.back-btn {
  display: inline-block;
  color: var(--purple-light);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 24px;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: var(--indigo-light);
  background: rgba(124, 58, 237, 0.1);
}

.report-header h1 {
  font-size: 38px;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  animation: gradientShift 6s ease infinite;
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
  font-size: 21px;
  color: var(--text-primary);
  margin-bottom: 28px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(124, 58, 237, 0.25);
}

.pattern-card,
.need-card {
  padding: 24px;
  background: rgba(124, 58, 237, 0.08);
  border-left: 4px solid var(--purple-main);
  border-radius: 12px;
  margin-bottom: 18px;
  transition: all 0.4s ease;
}

.pattern-card:hover,
.need-card:hover {
  background: rgba(124, 58, 237, 0.12);
  border-left-color: var(--indigo-light);
  transform: translateX(6px);
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.15);
}

.pattern-card h3,
.need-card h3 {
  color: var(--text-primary);
  margin: 0 0 10px;
  font-size: 17px;
  font-weight: 600;
}

.pattern-card p,
.need-card p {
  color: var(--text-secondary);
  margin: 0 0 14px;
  line-height: 1.6;
}

.example,
.reminder {
  font-size: 14px;
  color: var(--indigo-soft);
  font-style: italic;
  padding: 12px;
  background: rgba(129, 140, 248, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(129, 140, 248, 0.15);
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.action-card {
  padding: 28px;
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  text-align: center;
  transition: all 0.4s ease;
}

.action-card:hover {
  background: rgba(124, 58, 237, 0.15);
  border-color: rgba(129, 140, 248, 0.4);
  transform: translateY(-6px);
  box-shadow:
    0 15px 35px rgba(124, 58, 237, 0.2),
    0 0 25px rgba(99, 102, 241, 0.15);
}

.action-number {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 18px;
  box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
}

.action-card h3 {
  color: var(--text-primary);
  margin: 0 0 14px;
  font-size: 17px;
  font-weight: 600;
}

.action-why {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 14px;
  line-height: 1.5;
}

.action-how {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 14px 0;
  text-align: left;
  padding: 12px;
  background: rgba(124, 58, 237, 0.08);
  border-radius: 8px;
}

.action-time {
  font-size: 13px;
  color: var(--indigo-light);
  margin-top: 14px;
  font-weight: 500;
}

.closing-letter {
  padding: 32px;
  background: rgba(124, 58, 237, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: var(--text-secondary);
  line-height: 2;
  font-size: 16px;
  position: relative;
}

.closing-letter::before {
  content: '"';
  position: absolute;
  top: 12px;
  left: 20px;
  font-size: 48px;
  color: rgba(129, 140, 248, 0.3);
  font-family: Georgia, serif;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 18px;
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
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(129, 140, 248, 0.4);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.15);
}

.resource-type {
  font-size: 36px;
  margin-bottom: 12px;
  filter: drop-shadow(0 0 8px rgba(129, 140, 248, 0.4));
}

.resource-card h4 {
  color: var(--text-primary);
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
}

.resource-card p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
}

.report-footer {
  text-align: center;
  padding-top: 50px;
  border-top: 1px solid rgba(124, 58, 237, 0.2);
}

.restart-btn {
  display: inline-block;
  padding: 16px 44px;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 200%;
  color: white;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.4s ease;
  animation: gradientShift 4s ease infinite;
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.35);
}

.restart-btn:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 35px rgba(124, 58, 237, 0.45),
    0 0 30px rgba(99, 102, 241, 0.25);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
