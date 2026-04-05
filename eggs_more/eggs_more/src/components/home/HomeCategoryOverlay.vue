<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { homeCategoryOverlayItems } from '@/config/homeCategoryOverlayLayout'

const router = useRouter()
const route = useRoute()

function handleNavigate(targetPath: string) {
  router.push({
    path: targetPath,
    query: route.query,
  })
}
</script>

<template>
  <div class="home-category-overlay">
    <button
      v-for="item in homeCategoryOverlayItems"
      :key="item.key"
      class="category-hit"
      type="button"
      :aria-label="`打开${item.label}`"
      :style="{
        top: `${item.top}px`,
        left: `${item.left}px`,
        width: `${item.width}px`,
        height: `${item.height}px`,
      }"
      @click.stop="handleNavigate(item.targetPath)"
      @touchend.stop.prevent="handleNavigate(item.targetPath)"
    />
  </div>
</template>

<style scoped>
.home-category-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.category-hit {
  position: absolute;
  pointer-events: auto;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}
</style>
