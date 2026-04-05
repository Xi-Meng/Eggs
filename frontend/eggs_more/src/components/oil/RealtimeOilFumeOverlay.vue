<script setup lang="ts">
import { computed } from 'vue'
import { useActiveCookingHistoryId } from '@/composables/useActiveCookingHistoryId'
import { oilFumeOverlayLayouts } from '@/config/oilFumeOverlayLayout'
import { useRealtimeDetectFeed } from '@/composables/useRealtimeDetectFeed'

const props = defineProps<{
  pageId: 'oJi' | 'a7b' | 'KKk' | 'W4y' | 'MYI' | 'Ynv'
}>()

const items = computed(() => oilFumeOverlayLayouts[props.pageId] ?? [])
const { activeHistoryId } = useActiveCookingHistoryId()
const { latestPoint } = useRealtimeDetectFeed({
  historyId: activeHistoryId,
})

const formattedValue = computed(() => {
  if (!latestPoint.value) {
    return '--.-'
  }

  return latestPoint.value.oilFume.toFixed(1)
})

const formattedInlineValue = computed(() => `${formattedValue.value}mg/m3`)
</script>

<template>
  <div class="oil-fume-overlay">
    <template v-for="item in items" :key="`${props.pageId}-${item.key}`">
      <div
        v-if="item.variant === 'stacked'"
        class="oil-fume-block oil-fume-block-stacked"
        :style="{
          top: `${item.top}px`,
          left: `${item.left}px`,
          width: `${item.width}px`,
          minHeight: `${item.height}px`,
          color: item.textColor,
          fontSize: `${item.fontSize}px`,
          fontWeight: item.fontWeight,
          background: item.backgroundColor ?? 'transparent',
          borderRadius: `${item.borderRadius ?? 0}px`,
          border: `${item.borderWidth ?? 0}px solid ${item.borderColor ?? 'transparent'}`,
          boxShadow: item.boxShadow ?? 'none',
          lineHeight: item.lineHeight ?? 1.08,
          textShadow: item.textShadow ?? 'none',
        }"
      >
        <span>油烟浓度</span>
        <span>{{ formattedValue }}</span>
        <span :style="{ fontSize: `${item.unitFontSize ?? item.fontSize}px` }">mg/m3</span>
      </div>

      <div
        v-else
        class="oil-fume-block oil-fume-block-inline"
        :style="{
          top: `${item.top}px`,
          left: `${item.left}px`,
          width: `${item.width}px`,
          minHeight: `${item.height}px`,
          color: item.textColor,
          fontSize: `${item.fontSize}px`,
          fontWeight: item.fontWeight,
          background: item.backgroundColor ?? 'transparent',
          borderRadius: `${item.borderRadius ?? 0}px`,
          border: `${item.borderWidth ?? 0}px solid ${item.borderColor ?? 'transparent'}`,
        }"
      >
        {{ formattedInlineValue }}
      </div>
    </template>
  </div>
</template>

<style scoped>
.oil-fume-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.oil-fume-block {
  position: absolute;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.oil-fume-block-stacked {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-line;
}

.oil-fume-block-inline {
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}
</style>
