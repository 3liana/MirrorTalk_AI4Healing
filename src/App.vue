<script setup lang="ts">
import { onMounted, ref } from 'vue'

// 萤火虫光点数据
const fireflies = ref<Array<{ id: number; style: Record<string, string> }>>([])

onMounted(() => {
  // 生成萤火虫光点
  const count = 20
  fireflies.value = Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${6 + Math.random() * 8}s`,
    }
  }))
})
</script>

<template>
  <div id="app" class="app-container">
    <!-- 萤火虫背景 -->
    <div class="fireflies-container">
      <div
        v-for="firefly in fireflies"
        :key="firefly.id"
        class="firefly"
        :style="firefly.style"
      />
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}

.app-container {
  position: relative;
  z-index: 2;
}

/* 萤火虫容器 */
.fireflies-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

/* 极光光点 */
.firefly {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: radial-gradient(circle,
    rgba(129, 140, 248, 0.9) 0%,
    rgba(139, 92, 246, 0.6) 40%,
    transparent 70%
  );
  box-shadow:
    0 0 6px rgba(129, 140, 248, 0.8),
    0 0 12px rgba(139, 92, 246, 0.5),
    0 0 20px rgba(99, 102, 241, 0.3);
  animation: fireflyFloat 8s ease-in-out infinite, fireflyGlow 3s ease-in-out infinite;
}

/* 不同大小的光点 */
.firefly:nth-child(3n) {
  width: 3px;
  height: 3px;
}

.firefly:nth-child(5n) {
  width: 5px;
  height: 5px;
  background: radial-gradient(circle,
    rgba(167, 139, 250, 0.9) 0%,
    rgba(124, 58, 237, 0.6) 40%,
    transparent 70%
  );
}

.firefly:nth-child(7n) {
  width: 6px;
  height: 6px;
}

@keyframes fireflyFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -20px) scale(1.1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-20px, -40px) scale(0.9);
    opacity: 0.5;
  }
  75% {
    transform: translate(40px, -10px) scale(1.05);
    opacity: 0.8;
  }
}

@keyframes fireflyGlow {
  0%, 100% {
    box-shadow:
      0 0 6px rgba(129, 140, 248, 0.5),
      0 0 12px rgba(139, 92, 246, 0.3),
      0 0 20px rgba(99, 102, 241, 0.2);
  }
  50% {
    box-shadow:
      0 0 10px rgba(129, 140, 248, 0.9),
      0 0 20px rgba(139, 92, 246, 0.6),
      0 0 35px rgba(99, 102, 241, 0.35);
  }
}
</style>
