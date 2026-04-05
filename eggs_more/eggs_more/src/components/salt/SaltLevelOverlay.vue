<script setup lang="ts">
import { computed } from 'vue'
import { saltLevelOverlayLayouts } from '@/config/saltLevelOverlayLayout'
import { useRealtimeDetectFeed } from '@/composables/useRealtimeDetectFeed'

const props = defineProps<{
  pageId: 'tAa' | 'ytA95' | 'AnX' | 'wXj'
}>()

const items = computed(() => saltLevelOverlayLayouts[props.pageId] ?? [])
const { latestPoint } = useRealtimeDetectFeed()

function formatSaltValue(value: number) {
  return `${value.toFixed(1)}%`
}

const overlayItems = computed(() =>
  items.value.map((item) => ({
    ...item,
    displayValue: item.isLive
      ? latestPoint.value
        ? formatSaltValue(latestPoint.value.salt)
        : '--%'
      : item.value ?? '--%',
  })),
)
</script>

<template>
  <div class="salt-level-overlay">
    <p
      v-for="item in overlayItems"
      :key="item.key"
      class="salt-value"
      :style="{
        top: `${item.top}px`,
        left: `${item.left}px`,
        width: `${item.width}px`,
        minHeight: `${item.height}px`,
        fontSize: `${item.fontSize}px`,
        fontWeight: item.fontWeight,
        background: item.backgroundColor,
        color: item.textColor,
        borderRadius: `${item.borderRadius}px`,
      }"
    >
      {{ item.displayValue }}
    </p>
  </div>
</template>

<style scoped>
.salt-level-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.salt-value {
  position: absolute;
  display: grid;
  place-items: center;
  margin: 0;
  line-height: 1;
  letter-spacing: 0.02em;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
  box-shadow: 0 8px 18px rgba(88, 84, 68, 0.12);
}
</style>
