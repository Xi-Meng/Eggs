<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  defaultBackNavigationLayout,
  type BackNavigationLayout,
} from '@/config/backNavigationLayout'

const props = withDefaults(
  defineProps<{
    fallbackPath: string
    layout?: BackNavigationLayout
  }>(),
  {
    layout: () => defaultBackNavigationLayout,
  },
)

const router = useRouter()

function handleBack() {
  if (window.history.length > 1) {
    router.back()
    return
  }

  router.push(props.fallbackPath)
}
</script>

<template>
  <div class="back-overlay">
    <button
      class="back-hit"
      type="button"
      aria-label="返回上一层"
      :style="{
        top: `${props.layout.top}px`,
        left: `${props.layout.left}px`,
        width: `${props.layout.width}px`,
        height: `${props.layout.height}px`,
      }"
      @click.stop="handleBack"
      @touchend.stop.prevent="handleBack"
    />
  </div>
</template>

<style scoped>
.back-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.back-hit {
  position: absolute;
  pointer-events: auto;
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}
</style>
