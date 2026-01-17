<template>
  <div class="movie-select-view">
    <div class="header">
      <h1>从电影中看见自己</h1>
      <p>选择一部触动你的电影，开启自我探索之旅</p>
    </div>

    <div class="movies-grid">
      <div
        v-for="role in roles"
        :key="role.id"
        class="movie-card"
        @click="selectRole(role.id)"
      >
        <div class="poster-wrapper">
          <img :src="role.poster" :alt="role.movie" class="poster-img" />
          <div class="poster-overlay"></div>
        </div>
        
        <div class="card-content">
          <h3 class="movie-title">{{ role.movie }}</h3>
          <p class="theme-keywords">{{ role.themeKeywords.join(" • ") }}</p>
          <p class="theme-desc">{{ role.description }}</p>
          
          <div class="card-footer">
            <span class="cta-text">探索这个主题</span>
            <span class="arrow">→</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="crystal-ball-loading">
      <div class="black-hole"></div>
      <div class="spinner-wrapper">
        <div class="spinner"></div>
      </div>
      <p class="loading-text">进入电影世界...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useJourneyStore } from "@/stores/journey";
import { ROLES } from "@/roles/roles";

const router = useRouter();
const journeyStore = useJourneyStore();
const isLoading = ref(false);
const roles = computed(() => ROLES);

async function selectRole(roleId: string) {
  isLoading.value = true;
  try {
    await journeyStore.startJourney(roleId);
    router.push("/journey");
  } catch (err) {
    console.error("Failed to start journey:", err);
    isLoading.value = false;
  }
}
</script>

<style scoped>
.movie-select-view {
  min-height: 100vh;
  background: transparent;
  padding: 60px 20px;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInDown 0.8s ease;
}

.header h1 {
  font-size: 42px;
  background: linear-gradient(135deg, #e9d5ff, #c084fc, #a855f7);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  animation: gradientShift 6s ease infinite;
  letter-spacing: -0.02em;
}

.header p {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
}

.movies-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto 60px;
  animation: fadeInUp 0.8s ease 0.2s both;
}

@media (max-width: 1024px) {
  .movies-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: 1fr;
  }
}

.movie-card {
  background: rgba(30, 27, 75, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.movie-card:hover {
  transform: translateY(-4px);
  border-color: rgba(167, 139, 250, 0.5);
  box-shadow: 
    0 20px 40px -10px rgba(124, 58, 237, 0.3),
    0 0 20px rgba(139, 92, 246, 0.2);
}

.poster-wrapper {
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
}

.poster-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.movie-card:hover .poster-img {
  transform: scale(1.05);
}

.poster-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, rgba(30, 27, 75, 0.9), transparent);
  pointer-events: none;
}

.card-content {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.movie-title {
  font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  font-size: 20px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 12px;
  line-height: 1.4;
}

.theme-keywords {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: #c084fc;
  margin-bottom: 16px;
  letter-spacing: 0.03em;
  opacity: 0.9;
}

.theme-desc {
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: 24px;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
}

.cta-text {
  font-size: 14px;
  font-weight: 600;
  color: #e9d5ff;
  transition: color 0.3s ease;
}

.arrow {
  color: #e9d5ff;
  transition: transform 0.3s ease;
}

.movie-card:hover .cta-text {
  color: #fff;
}

.movie-card:hover .arrow {
  transform: translateX(4px);
  color: #fff;
}

/* 动画定义保持不变 */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Loading 样式保持不变 (略微复用之前的) */
.crystal-ball-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at 50% 50%, rgba(49, 46, 129, 0.8) 0%, rgba(15, 13, 36, 0.98) 100%);
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.loading-text {
  margin-top: 40px;
  color: #c084fc;
  letter-spacing: 2px;
}

/* Spinner 复用 */
.spinner-wrapper {
  width: 60px;
  height: 60px;
}
.spinner {
  width: 100%;
  height: 100%;
  border: 3px solid rgba(139, 92, 246, 0.3);
  border-top-color: #c084fc;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
