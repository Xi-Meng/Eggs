<script setup lang="ts">
import { computed } from 'vue'
import { topBrandImageLayouts } from '@/config/topBrandImageLayout'
import topBrandImage from '@/assets/文字1.png'
import topBrandImageOtl from '@/assets/文字2.png'

const props = defineProps<{
  pageId: 'otl' | 'Mln' | 'bQv'
}>()

const layout = computed(() => topBrandImageLayouts[props.pageId])
const imageSrc = computed(() => (props.pageId === 'otl' ? topBrandImageOtl : topBrandImage))
</script>

<template>
  <div class="top-brand-overlay">
    <div
      class="top-brand-frame"
      :class="{ 'is-faded': layout.fadeEdges }"
      :style="{
        top: `${layout.top}px`,
        left: `${layout.left}px`,
        width: `${layout.width}px`,
        height: layout.height ? `${layout.height}px` : 'auto',
        borderRadius: `${layout.borderRadius ?? 0}px`,
      }"
    >
      <img
        class="top-brand-image"
        :src="imageSrc"
        alt=""
        :style="{
          transform: `scale(${layout.scale ?? 1})`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.top-brand-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.top-brand-frame {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.top-brand-frame.is-faded {
  -webkit-mask-image: radial-gradient(
    ellipse 82% 78% at 50% 50%,
    rgba(0, 0, 0, 1) 58%,
    rgba(0, 0, 0, 0.96) 72%,
    rgba(0, 0, 0, 0.72) 82%,
    rgba(0, 0, 0, 0.18) 92%,
    transparent 100%
  );
  mask-image: radial-gradient(
    ellipse 82% 78% at 50% 50%,
    rgba(0, 0, 0, 1) 58%,
    rgba(0, 0, 0, 0.96) 72%,
    rgba(0, 0, 0, 0.72) 82%,
    rgba(0, 0, 0, 0.18) 92%,
    transparent 100%
  );
}

.top-brand-image {
  display: block;
  width: 100%;
  height: auto;
  transform-origin: center center;
}
</style>
