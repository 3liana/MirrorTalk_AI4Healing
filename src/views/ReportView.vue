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
import { computed } from "vue";
import { useJourneyStore } from "@/stores/journey";
import { RouterLink } from "vue-router";

const journeyStore = useJourneyStore();

const report = computed(() => journeyStore.currentReport);

function resourceEmoji(type: string): string {
  const emojis: Record<string, string> = {
    book: "📖",
    podcast: "🎙️",
    community: "👥",
  };
  return emojis[type] || "📌";
}
</script>

<style scoped>
.report-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%);
  padding: 40px 20px;
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
