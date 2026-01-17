<script setup lang="ts">
useRouter()

function useRouter() {
  return null
}
</script>

<template>
  <div id="app" class="app-container">
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
</style>
