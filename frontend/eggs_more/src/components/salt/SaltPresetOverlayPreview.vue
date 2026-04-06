<script setup lang="ts">
import { computed } from 'vue'
import { saltPresetOverlayLayouts } from '@/config/saltPresetOverlayLayout'

const props = withDefaults(
  defineProps<{
    pageId?: 'AnX' | 'wXj'
    label?: string
    referenceSaltLevel?: string
    cookingTime?: string
  }>(),
  {
    pageId: 'AnX',
    label: '滋补鲜汤',
    referenceSaltLevel: '0.4~0.7%',
    cookingTime: '30分钟',
  },
)

const layout = computed(() => saltPresetOverlayLayouts[props.pageId])
</script>

<template>
  <div class="salt-preset-overlay-preview">
    <div
      class="search-value"
      :style="{
        top: `${layout.searchValueBox.top}px`,
        left: `${layout.searchValueBox.left}px`,
        width: `${layout.searchValueBox.width}px`,
        minHeight: `${layout.searchValueBox.height}px`,
      }"
    >
      {{ label }}
    </div>

    <p
      class="field-value food-value"
      :style="{
        top: `${layout.foodValueBox.top}px`,
        left: `${layout.foodValueBox.left}px`,
        width: `${layout.foodValueBox.width}px`,
        minHeight: `${layout.foodValueBox.height}px`,
      }"
    >
      {{ label }}
    </p>

    <p
      class="field-value"
      :style="{
        top: `${layout.referenceValueBox.top}px`,
        left: `${layout.referenceValueBox.left}px`,
        width: `${layout.referenceValueBox.width}px`,
        minHeight: `${layout.referenceValueBox.height}px`,
      }"
    >
      {{ referenceSaltLevel }}
    </p>

    <p
      class="field-value"
      :style="{
        top: `${layout.cookingTimeBox.top}px`,
        left: `${layout.cookingTimeBox.left}px`,
        width: `${layout.cookingTimeBox.width}px`,
        minHeight: `${layout.cookingTimeBox.height}px`,
      }"
    >
      {{ cookingTime }}
    </p>
  </div>
</template>

<style scoped>
.salt-preset-overlay-preview {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.search-value,
.field-value {
  position: absolute;
  pointer-events: none;
}

.search-value {
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 12px;
  background: rgba(247, 238, 180, 0.95);
  color: #6a5730;
  font-size: 15px;
  font-weight: 600;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.field-value {
  z-index: 6;
  margin: 0;
  color: #6b5d32;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.food-value {
  letter-spacing: 0.03em;
}
</style>
