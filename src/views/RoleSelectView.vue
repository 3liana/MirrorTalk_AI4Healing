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
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
  animation: gradientShift 6s ease infinite;
}

.header p {
  font-size: 17px;
  color: var(--text-secondary);
}

.roles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
  max-width: 1200px;
  margin: 0 auto 60px;
  animation: fadeInUp 0.8s ease 0.2s both;
}

.role-card {
  padding: 36px 28px;
  background: rgba(124, 58, 237, 0.08);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.4s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  animation: auroraPulse 4s ease-in-out infinite;
}

.role-card:nth-child(2) { animation-delay: 1.5s; }
.role-card:nth-child(3) { animation-delay: 3s; }

.role-card:hover {
  background: rgba(124, 58, 237, 0.12);
  border-color: rgba(129, 140, 248, 0.5);
  transform: translateY(-10px) scale(1.02);
  box-shadow:
    0 25px 50px rgba(124, 58, 237, 0.25),
    0 0 40px rgba(99, 102, 241, 0.2);
}

.role-avatar {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, #7c3aed, #6366f1, #818cf8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: white;
  box-shadow: 0 8px 25px rgba(124, 58, 237, 0.4);
  transition: all 0.4s ease;
}

.role-card:hover .role-avatar {
  transform: scale(1.1);
  box-shadow:
    0 12px 35px rgba(124, 58, 237, 0.5),
    0 0 25px rgba(99, 102, 241, 0.35);
}

.role-card h3 {
  font-size: 22px;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-weight: 600;
}

.role-vibe {
  font-size: 13px;
  color: var(--indigo-light);
  margin-bottom: 14px;
  letter-spacing: 1px;
}

.role-intro {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
}

.role-cta {
  font-size: 14px;
  color: var(--purple-light);
  font-weight: 600;
  transition: all 0.3s ease;
}

.role-card:hover .role-cta {
  color: var(--indigo-light);
}

/* 水晶球加载效果 - 极光紫版 */
.crystal-ball-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: radial-gradient(circle at 50% 50%, rgba(49, 46, 129, 0.6) 0%, rgba(15, 13, 36, 0.98) 100%);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 光晕中心效果 - 极光版 */
.black-hole {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(129, 140, 248, 0.25) 0%,
    rgba(124, 58, 237, 0.15) 25%,
    rgba(30, 27, 75, 0.5) 50%,
    rgba(15, 13, 36, 0.9) 100%
  );
  box-shadow:
    0 0 60px rgba(124, 58, 237, 0.4),
    0 0 100px rgba(99, 102, 241, 0.25),
    0 0 140px rgba(139, 92, 246, 0.15),
    inset 0 0 50px rgba(15, 13, 36, 0.6);
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow:
      0 0 60px rgba(124, 58, 237, 0.4),
      0 0 100px rgba(99, 102, 241, 0.25),
      0 0 140px rgba(139, 92, 246, 0.15),
      inset 0 0 50px rgba(15, 13, 36, 0.6);
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 80px rgba(124, 58, 237, 0.5),
      0 0 130px rgba(99, 102, 241, 0.35),
      0 0 180px rgba(139, 92, 246, 0.2),
      inset 0 0 60px rgba(15, 13, 36, 0.5);
    transform: scale(1.08);
  }
}

/* 旋转圆环 - 极光版 */
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
  border-top-color: #7c3aed;
  border-right-color: #818cf8;
  border-radius: 50%;
  animation: spin 2.5s linear infinite;
  box-shadow:
    0 0 25px rgba(124, 58, 237, 0.5),
    0 0 50px rgba(99, 102, 241, 0.25);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 加载文字 - 极光版 */
.loading-text {
  position: relative;
  z-index: 10;
  margin-top: 80px;
  font-size: 18px;
  color: var(--purple-soft);
  letter-spacing: 3px;
  animation: shimmer 2s ease-in-out infinite;
  font-weight: 400;
}

@keyframes shimmer {
  0%, 100% {
    color: #8b5cf6;
    opacity: 0.7;
    text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
  }
  50% {
    color: #818cf8;
    opacity: 1;
    text-shadow: 0 0 20px rgba(129, 140, 248, 0.5);
  }
}

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

@keyframes auroraPulse {
  0%, 100% { border-color: rgba(139, 92, 246, 0.2); }
  50% { border-color: rgba(129, 140, 248, 0.4); }
}
</style>
