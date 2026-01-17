<template>
  <div class="role-select-view">
    <div class="header">
      <h1>选择你的镜子</h1>
      <p>选择一个角色，开始你的自我觉察之旅</p>
    </div>

    <div class="roles-grid">
      <div
        v-for="role in roles"
        :key="role.id"
        class="role-card"
        @click="selectRole(role.id)"
      >
        <div class="role-avatar">{{ role.name[0] }}</div>
        <h3>{{ role.name }}</h3>
        <p class="role-vibe">{{ role.vibeTags.join(" • ") }}</p>
        <p class="role-intro">{{ role.introHook }}</p>
        <div class="role-cta">选择这个角色 →</div>
      </div>
    </div>

    <div v-if="isLoading" class="crystal-ball-loading">
      <div class="black-hole"></div>
      <div class="spinner-wrapper">
        <div class="spinner"></div>
      </div>
      <p class="loading-text">进入故事...</p>
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
.role-select-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #0f0f1e 100%);
  padding: 60px 20px;
}

.header {
  text-align: center;
  margin-bottom: 60px;
}

.header h1 {
  font-size: 40px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.header p {
  font-size: 16px;
  color: #999;
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto 60px;
}

.role-card {
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
}

.role-card:hover {
  background: rgba(107, 140, 255, 0.15);
  border-color: rgba(107, 140, 255, 0.4);
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(107, 140, 255, 0.2);
}

.role-avatar {
  width: 60px;
  height: 60px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #6b8cff, #a78bff);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.role-card h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #e0e0e0;
}

.role-vibe {
  font-size: 12px;
  color: #6b8cff;
  margin-bottom: 12px;
}

.role-intro {
  font-size: 14px;
  color: #ccc;
  line-height: 1.5;
  margin-bottom: 20px;
  flex-grow: 1;
}

.role-cta {
  font-size: 13px;
  color: #6b8cff;
  font-weight: 600;
  transition: all 0.2s;
}

.role-card:hover .role-cta {
  color: #a78bff;
}

/* 水晶球加载效果 */
.crystal-ball-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at 50% 50%, rgba(15, 15, 30, 0.3) 0%, rgba(0, 0, 0, 0.95) 100%);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 黑洞中心效果 */
.black-hole {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(107, 140, 255, 0.3) 0%,
    rgba(107, 140, 255, 0.1) 20%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.95) 100%
  );
  box-shadow: 
    0 0 60px rgba(107, 140, 255, 0.4),
    0 0 100px rgba(107, 140, 255, 0.2),
    inset 0 0 40px rgba(0, 0, 0, 0.8);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 
      0 0 60px rgba(107, 140, 255, 0.4),
      0 0 100px rgba(107, 140, 255, 0.2),
      inset 0 0 40px rgba(0, 0, 0, 0.8);
    transform: scale(1);
  }
  50% {
    box-shadow: 
      0 0 80px rgba(107, 140, 255, 0.6),
      0 0 140px rgba(107, 140, 255, 0.3),
      inset 0 0 50px rgba(0, 0, 0, 0.7);
    transform: scale(1.05);
  }
}

/* 旋转圆环 */
.spinner-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  z-index: 10;
}

.spinner {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top-color: #6b8cff;
  border-right-color: #a78bff;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  box-shadow: 0 0 30px rgba(107, 140, 255, 0.5);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 加载文字 */
.loading-text {
  position: relative;
  z-index: 10;
  margin-top: 80px;
  font-size: 18px;
  color: #a78bff;
  letter-spacing: 2px;
  animation: shimmer 1.5s ease-in-out infinite;
  font-weight: 300;
}

@keyframes shimmer {
  0%, 100% {
    color: #6b8cff;
    opacity: 0.7;
  }
  50% {
    color: #a78bff;
    opacity: 1;
  }
}

.loading p {
  color: #999;
}
</style>
