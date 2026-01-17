<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <!-- Video Element (if src exists) -->
      <video
        v-if="videoSrc"
        ref="videoRef"
        class="video-element"
        :poster="posterSrc"
        playsinline
        loop
        muted
        :src="videoSrc"
        @error="handleVideoError"
      ></video>

      <!-- Fallback Image (if no video or load error) -->
      <img
        v-else
        :src="posterSrc"
        class="poster-image"
        alt="Scene Visual"
      />

      <!-- Overlay Gradient -->
      <div class="overlay-gradient"></div>

      <!-- Subtitles / Role Dialogue -->
      <div class="subtitle-area" v-if="text">
        <div class="subtitle-text">“{{ text }}”</div>
      </div>
          
      <!-- Progress Bar (Visual Mock) -->
      <div class="progress-container">
         <div class="progress-track">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <div class="progress-thumb" :style="{ left: progress + '%' }">
                <div class="thumb-inner"></div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  videoSrc?: string;
  posterSrc: string;
  text?: string;
}

const props = defineProps<Props>();

const videoRef = ref<HTMLVideoElement | null>(null);
const isPlaying = ref(false);
const showControls = ref(true);
const progress = ref(30); // Mock progress

function handleVideoError() {
  // If video fails to load, we just stick to poster
  console.warn("Video failed to load, falling back to poster.");
}

function togglePlay() {
  if (videoRef.value) {
    if (videoRef.value.paused) {
      videoRef.value.play();
      isPlaying.value = true;
    } else {
      videoRef.value.pause();
      isPlaying.value = false;
    }
  } else {
    // Mock toggle state for static image
    isPlaying.value = !isPlaying.value;
  }
}
</script>

<style scoped>
.video-player-container {
  width: 100%;
  height: 100%;
  background: #000;
  border-radius: 20px 0 0 20px;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 0 30px rgba(0,0,0,0.5);
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.video-element,
.poster-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.1) 0%,
    rgba(0,0,0,0) 50%,
    rgba(0,0,0,0.6) 80%,
    rgba(0,0,0,0.9) 100%
  );
  pointer-events: none;
}

.center-controls {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.play-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.subtitle-area {
  position: absolute;
  bottom: 60px; /* Leave room for progress bar */
  left: 0;
  right: 0;
  padding: 0 40px;
  text-align: left;
  z-index: 10;
}

.subtitle-text {
  font-family: "Songti SC", "Noto Serif SC", serif;
  font-size: 28px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.4;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  font-weight: 500;
  font-style: italic;
}

.progress-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px 40px;
    z-index: 10;
}

.progress-track {
    width: 100%;
    height: 2px;
    background: rgba(255,255,255,0.2);
    position: relative;
    display: flex;
    align-items: center;
}

.progress-fill {
    height: 100%;
    background: white;
    position: absolute;
    left: 0;
    top: 0;
}

.progress-thumb {
    position: absolute;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    cursor: grab;
}

.thumb-inner {
    width: 6px;
    height: 6px;
    background: black;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}
</style>
