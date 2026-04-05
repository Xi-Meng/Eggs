<script setup lang="ts">
import { computed } from 'vue'
import { temperatureOverlayLayouts } from '@/config/temperatureOverlayLayout'
import { useRealtimeTemperature } from '@/composables/useRealtimeTemperature'

const props = defineProps<{
  pageId: 'p3Y' | 'gAr' | '4-t'
}>()

const pageLayout = computed(() => temperatureOverlayLayouts[props.pageId]!)
const liveItem = computed(() => {
  const item = pageLayout.value.items.find((entry) => entry.staticValue === undefined) ?? pageLayout.value.items[0]

  if (!item) {
    throw new Error(`Missing temperature overlay layout for ${props.pageId}`)
  }

  return item
})

const { error, formattedTemperature, isLoading, latestPoint } = useRealtimeTemperature({})

function getDisplayParts(raw: string) {
  const match = raw.match(/^(.+?)(°C|℃)$/)

  if (!match) {
    return {
      value: raw,
      unit: '',
    }
  }

  return {
    value: match[1],
    unit: '°C',
  }
}

const overlayItems = computed(() =>
  pageLayout.value.items.map((item) => {
    const rawValue = item.staticValue === undefined ? formattedTemperature.value : item.staticValue

    return {
      ...item,
      ...getDisplayParts(rawValue),
    }
  }),
)

const helperText = computed(() => {
  if (error.value) {
    return '温度更新失败'
  }

  if (isLoading.value) {
    return '温度同步中...'
  }

  if (!latestPoint.value) {
    return '暂无温度数据'
  }

  return '实时温度'
})
</script>

<template>
  <div class="temperature-overlay">
    <div
      v-for="item in overlayItems"
      :key="item.key"
      class="temperature-value"
      :style="{
        top: `${item.temperatureTop}px`,
        left: `${item.temperatureLeft}px`,
        width: `${item.temperatureWidth}px`,
        minHeight: `${item.temperatureHeight}px`,
        fontSize: `${item.temperatureFontSize}px`,
        fontWeight: item.temperatureWeight,
        background: item.backgroundColor ?? 'transparent',
        borderRadius: `${item.borderRadius ?? 0}px`,
        color: item.textColor ?? '#6c6446',
      }"
    >
      <span>{{ item.value }}</span>
      <span
        v-if="item.unit"
        class="temperature-unit"
        :style="{ transform: `scale(${item.unitScale ?? 0.78})` }"
      >
        {{ item.unit }}
      </span>
    </div>

    <p
      v-if="
        liveItem.hintTop !== undefined &&
        liveItem.hintLeft !== undefined &&
        liveItem.hintWidth !== undefined
      "
      class="temperature-hint"
      :class="{ 'is-error': !!error }"
      :style="{
        top: `${liveItem.hintTop}px`,
        left: `${liveItem.hintLeft}px`,
        width: `${liveItem.hintWidth}px`,
      }"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<style scoped>
.temperature-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.temperature-value {
  position: absolute;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1px;
  font-family: "Orbitron", "Chakra Petch", "Avenir Next Condensed", "Arial Narrow", sans-serif;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.22);
  letter-spacing: 0.02em;
}

.temperature-unit {
  transform-origin: left bottom;
  margin-left: 2px;
}

.temperature-hint {
  position: absolute;
  margin: 0;
  color: rgba(112, 111, 69, 0.86);
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}

.temperature-hint.is-error {
  color: #d06c53;
}
</style>
