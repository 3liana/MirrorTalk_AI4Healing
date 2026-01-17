<template>
  <div class="landing-view">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <h1 class="hero-title">光影识人</h1>
        <p class="hero-subtitle">Mirror Me</p>
        <p class="hero-description">
          通过与电影角色的AI对话，帮助你看见习惯性的思维模式，找回被忽略的真实自我。
        </p>
      </div>

      <!-- Value Props -->
      <div class="value-props">
        <div class="prop-card">
          <div class="prop-icon">✨</div>
          <h3>不评判</h3>
          <p>一个温暖的同行者，而不是导师</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon">🎭</div>
          <h3>有共鸣</h3>
          <p>用电影隐喻降低直面自我的压力</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon">🔍</div>
          <h3>有追问</h3>
          <p>识别你的"应该"，温和地问"为什么"</p>
        </div>
        <div class="prop-card">
          <div class="prop-icon">🎯</div>
          <h3>有落地</h3>
          <p>具体的、低门槛的行动建议</p>
        </div>
      </div>

      <!-- Journey Preview -->
      <div class="journey-preview">
        <h2>你的15-20分钟沉浸式旅程</h2>
        <div class="journey-steps">
          <div class="step">
            <div class="step-number">1</div>
            <p>选择一个电影角色</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">2</div>
            <p>开始深度对话</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">3</div>
            <p>获得Mirror Report</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <div class="step-number">4</div>
            <p>实践Micro-Action</p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="cta-section">
        <router-link to="/role" class="cta-button">
          开始我的旅程
          <span class="arrow">→</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<style scoped>
.landing-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%);
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  max-width: 1000px;
  width: 100%;
}

.hero {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInDown 0.8s ease;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.hero-subtitle {
  font-size: 20px;
  color: #999;
  margin-bottom: 24px;
}

.hero-description {
  font-size: 18px;
  color: #ccc;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

.value-props {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.prop-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;
}

.prop-card:hover {
  background: rgba(107, 140, 255, 0.1);
  border-color: rgba(107, 140, 255, 0.3);
  transform: translateY(-4px);
}

.prop-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.prop-card h3 {
  font-size: 16px;
  margin-bottom: 8px;
  color: #e0e0e0;
}

.prop-card p {
  font-size: 13px;
  color: #999;
}

.journey-preview {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease 0.4s both;
}

.journey-preview h2 {
  font-size: 28px;
  margin-bottom: 40px;
  color: #e0e0e0;
}

.journey-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(107, 140, 255, 0.2);
}

.step-number {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  border-radius: 50%;
  color: white;
  font-weight: 700;
  margin-bottom: 8px;
}

.step p {
  font-size: 14px;
  color: #ccc;
  margin: 0;
}

.step-arrow {
  font-size: 20px;
  color: #6b8cff;
  font-weight: bold;
}

.cta-section {
  text-align: center;
  animation: fadeInUp 0.8s ease 0.6s both;
}

.cta-button {
  display: inline-block;
  padding: 16px 48px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.cta-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(107, 140, 255, 0.4);
}

.arrow {
  margin-left: 8px;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
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
