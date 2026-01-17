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
  background: transparent;
  padding: 60px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.container {
  max-width: 1000px;
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInDown 1s ease;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
  animation: gradientShift 6s ease infinite;
  text-shadow: 0 0 60px rgba(124, 58, 237, 0.3);
}

.hero-subtitle {
  font-size: 20px;
  color: var(--purple-soft);
  margin-bottom: 24px;
  letter-spacing: 4px;
}

.hero-description {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto;
}

.value-props {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-bottom: 80px;
  animation: fadeInUp 1s ease 0.3s both;
}

.prop-card {
  padding: 28px 24px;
  background: rgba(124, 58, 237, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s ease;
  animation: auroraPulse 4s ease-in-out infinite;
}

.prop-card:nth-child(2) { animation-delay: 1s; }
.prop-card:nth-child(3) { animation-delay: 2s; }
.prop-card:nth-child(4) { animation-delay: 3s; }

.prop-card:hover {
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(129, 140, 248, 0.5);
  transform: translateY(-6px);
  box-shadow:
    0 20px 40px rgba(124, 58, 237, 0.2),
    0 0 30px rgba(99, 102, 241, 0.2);
}

.prop-icon {
  font-size: 36px;
  margin-bottom: 16px;
  filter: drop-shadow(0 0 8px rgba(129, 140, 248, 0.5));
}

.prop-card h3 {
  font-size: 17px;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-weight: 600;
}

.prop-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.journey-preview {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInUp 1s ease 0.5s both;
}

.journey-preview h2 {
  font-size: 28px;
  margin-bottom: 40px;
  color: var(--text-primary);
  font-weight: 600;
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
  padding: 24px 28px;
  background: rgba(124, 58, 237, 0.08);
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;
}

.step:hover {
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(129, 140, 248, 0.4);
}

.step-number {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  border-radius: 50%;
  color: white;
  font-weight: 700;
  margin-bottom: 12px;
  box-shadow: 0 4px 15px rgba(124, 58, 237, 0.4);
}

.step p {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
}

.step-arrow {
  font-size: 20px;
  color: var(--indigo-light);
  font-weight: bold;
  opacity: 0.7;
}

.cta-section {
  text-align: center;
  animation: fadeInUp 1s ease 0.7s both;
}

.cta-button {
  display: inline-block;
  padding: 18px 52px;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 200%;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 600;
  transition: all 0.4s ease;
  border: none;
  cursor: pointer;
  animation: gradientShift 4s ease infinite, breatheGlow 4s ease-in-out infinite;
  box-shadow:
    0 8px 30px rgba(124, 58, 237, 0.35),
    0 0 20px rgba(99, 102, 241, 0.25);
}

.cta-button:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow:
    0 15px 40px rgba(124, 58, 237, 0.45),
    0 0 40px rgba(99, 102, 241, 0.35);
}

.arrow {
  margin-left: 8px;
  display: inline-block;
  transition: transform 0.3s ease;
}

.cta-button:hover .arrow {
  transform: translateX(4px);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
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

@keyframes auroraPulse {
  0%, 100% { border-color: rgba(139, 92, 246, 0.2); }
  50% { border-color: rgba(129, 140, 248, 0.4); }
}

@keyframes breatheGlow {
  0%, 100% {
    box-shadow:
      0 8px 30px rgba(124, 58, 237, 0.35),
      0 0 20px rgba(99, 102, 241, 0.25);
  }
  50% {
    box-shadow:
      0 12px 40px rgba(124, 58, 237, 0.45),
      0 0 35px rgba(99, 102, 241, 0.35);
  }
}
</style>
