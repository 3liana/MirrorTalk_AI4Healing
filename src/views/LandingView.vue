<template>
  <div class="landing-view">
    <div class="container">
      <!-- Hero Section -->
      <div class="hero">
        <h1 class="hero-title">MIRROR ME</h1>
        <p class="hero-subtitle">在光影的镜像里，看见未被定义的自己</p>
      </div>

      <!-- Value Props -->
      <div class="value-props">
        <div class="prop-card">
          <div class="icon-wrapper">
             <!-- Mirror Icon -->
             <svg class="prop-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 4C13.1046 4 14 4.89543 14 6V18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18V6C10 4.89543 10.8954 4 12 4Z" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round"/>
               <path d="M14 6H16C17.1046 6 18 6.89543 18 8V16C18 17.1046 17.1046 18 16 18H14" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round"/>
               <path d="M10 6H8C6.89543 6 6 6.89543 6 8V16C6 17.1046 6.89543 18 8 18H10" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round"/>
               <defs>
                 <linearGradient id="icon-gradient" x1="6" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
                   <stop stop-color="#a78bfa"/>
                   <stop offset="1" stop-color="#c4b5fd"/>
                 </linearGradient>
               </defs>
             </svg>
          </div>
          <h3>镜像自我</h3>
          <p>在角色的悲喜中，照见深度的自我</p>
        </div>
        <div class="prop-card">
          <div class="icon-wrapper">
             <!-- Search/Inquiry Icon -->
             <svg class="prop-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="11" cy="11" r="8" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round"/>
               <path d="M21 21L16.65 16.65" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round"/>
               <circle cx="11" cy="11" r="3" stroke="url(#icon-gradient)" stroke-width="2" stroke-opacity="0.5"/>
             </svg>
          </div>
          <h3>觉察追问</h3>
          <p>温和而有力地提问，识别你的“必须”与“应该”</p>
        </div>
        <div class="prop-card">
          <div class="icon-wrapper">
             <!-- Target Icon -->
             <svg class="prop-icon-svg" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" stroke="url(#icon-gradient)" stroke-width="2"/>
               <circle cx="12" cy="12" r="6" stroke="url(#icon-gradient)" stroke-width="2"/>
               <circle cx="12" cy="12" r="2" fill="#a78bfa"/>
               <path d="M22 2L12 12" stroke="url(#icon-gradient)" stroke-width="2" stroke-linecap="round"/>
             </svg>
          </div>
          <h3>行动改变</h3>
          <p>从微小的动作开始，重建生活的掌控感</p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="cta-section">
        <router-link to="/role" class="cta-button">
          <span class="btn-content">开启探索之旅</span>
          <div class="btn-glow"></div>
        </router-link>
         <p class="cta-subtext">约 15-20 分钟 · 沉浸式心理探索</p>
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
  /* Dark textured background handled globally or by parent, keeping transparent here */
  background: transparent; 
  padding: 100px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow-x: hidden;
}

.container {
  max-width: 1100px;
  width: 100%;
  position: relative;
  z-index: 2;
}

/* HERO SECTION */
.hero {
  text-align: center;
  margin-bottom: 120px;
  animation: fadeInDown 1s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 96px; /* Significantly larger */
  font-weight: 800;
  line-height: 1.1;
  background: linear-gradient(180deg, #FFFFFF 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 24px;
  filter: drop-shadow(0 0 40px rgba(167, 139, 250, 0.5));
  letter-spacing: -2px;
}

.hero-subtitle {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
}

/* VALUE PROPS CARDS */
.value-props {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Changed to 3 columns */
  gap: 32px;
  margin-bottom: 100px;
}

/* Responsive adjustment */
@media (max-width: 900px) {
  .value-props { grid-template-columns: 1fr; }
  .hero-title { font-size: 64px; }
}

.prop-card {
  position: relative;
  padding: 40px 32px;
  /* Premium Dark Glass */
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  height: 100%;
}

.prop-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(139, 92, 246, 0.06), transparent 40%);
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

/* Subtle inner glow on hover */
.prop-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 32px;
  padding: 2px; /* Border thickness */
  background: linear-gradient(135deg, rgba(167, 139, 250, 0), rgba(167, 139, 250, 0.3));
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.5;
  transition: opacity 0.5s;
}

.prop-card:hover {
  transform: translateY(-10px);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  box-shadow: 
    0 20px 50px -12px rgba(0, 0, 0, 0.7),
    0 0 30px rgba(139, 92, 246, 0.15) inset;
}

.prop-card:hover::after {
  opacity: 1;
}

.icon-wrapper {
  width: 72px;
  height: 72px;
  margin: 0 auto 32px;
  background: rgba(255,255,255,0.03);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: inset 0 0 20px rgba(255,255,255,0.02);
  transition: all 0.5s ease;
}

.prop-card:hover .icon-wrapper {
  transform: scale(1.1) rotate(6deg);
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
}

.prop-icon-svg {
  width: 32px;
  height: 32px;
  filter: drop-shadow(0 0 4px rgba(167, 139, 250, 0.4));
  transition: all 0.5s ease;
}

.prop-card:hover .prop-icon-svg {
  filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.8));
  transform: scale(1.1);
}

.prop-card h3 {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: 1px;
}

.prop-card p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  font-weight: 300;
  padding: 0 10px;
}

/* CTA SECTION */
.cta-section {
  text-align: center;
  margin-top: 60px;
}

.cta-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 18px 48px;
  text-decoration: none;
  font-weight: 600;
  font-size: 18px;
  color: #fff;
  border-radius: 100px;
  background: linear-gradient(90deg, #7c3aed, #4f46e5);
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.4);
}

.cta-button:hover {
  transform: scale(1.05);
}

.btn-content {
  position: relative;
  z-index: 2;
  letter-spacing: 1px;
}

.btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%);
  transform: scale(0);
  transition: transform 0.6s ease;
  z-index: 1;
}

.cta-button:hover .btn-glow {
  transform: scale(1);
  animation: shine 1.5s infinite;
}

.cta-subtext {
  margin-top: 16px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  font-family: 'Space Mono', monospace;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-40px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes shine {
  0% { transform:  translate(-50%, -50%) rotate(0deg); }
  100% { transform:  translate(-50%, -50%) rotate(360deg); }
}
</style>
