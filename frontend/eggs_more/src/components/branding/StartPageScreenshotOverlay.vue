<script setup lang="ts">
import startPageImage from '@/assets/开始页.png'
</script>

<template>
  <div class="start-page-screenshot-overlay">
    <img class="start-page-image" :src="startPageImage" alt="" />
  </div>
</template>

<style scoped>
.start-page-screenshot-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 6;
}

.start-page-image {
  display: block;
  width: 375px;
  height: 812px;
}
</style>
