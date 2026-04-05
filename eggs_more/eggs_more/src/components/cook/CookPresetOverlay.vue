<script setup lang="ts">
import { computed, ref } from 'vue'
import { cookPresetOverlayLayout } from '@/config/cookPresetOverlayLayout'
import { cookPresetOptions, type CookPresetOption } from '@/data/cookPresetCatalog'

const activePresetKey = ref('')
const menuOpen = ref(false)

const activePreset = computed(() =>
  cookPresetOptions.find((option) => option.key === activePresetKey.value),
)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function selectPreset(option: CookPresetOption) {
  activePresetKey.value = option.key
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <div class="cook-preset-overlay">
    <button
      class="search-hit"
      type="button"
      :style="{
        top: `${cookPresetOverlayLayout.searchBox.top}px`,
        left: `${cookPresetOverlayLayout.searchBox.left}px`,
        width: `${cookPresetOverlayLayout.searchBox.width}px`,
        height: `${cookPresetOverlayLayout.searchBox.height}px`,
      }"
      aria-label="打开食物选择"
      @click="toggleMenu"
    />

    <div
      v-if="activePreset"
      class="search-value"
      :style="{
        top: `${cookPresetOverlayLayout.searchValueBox.top}px`,
        left: `${cookPresetOverlayLayout.searchValueBox.left}px`,
        width: `${cookPresetOverlayLayout.searchValueBox.width}px`,
        minHeight: `${cookPresetOverlayLayout.searchValueBox.height}px`,
      }"
    >
      {{ activePreset.label }}
    </div>

    <button
      v-if="menuOpen"
      class="menu-backdrop"
      type="button"
      aria-label="关闭食物选择"
      @click="closeMenu"
    />

    <div
      v-if="menuOpen"
      class="preset-menu"
      :style="{
        top: `${cookPresetOverlayLayout.dropdownBox.top}px`,
        left: `${cookPresetOverlayLayout.dropdownBox.left}px`,
        width: `${cookPresetOverlayLayout.dropdownBox.width}px`,
        maxHeight: `${cookPresetOverlayLayout.dropdownBox.height}px`,
      }"
    >
      <button
        v-for="option in cookPresetOptions"
        :key="option.key"
        class="preset-option"
        type="button"
        :style="{ minHeight: `${cookPresetOverlayLayout.dropdownItemHeight}px` }"
        @click="selectPreset(option)"
      >
        {{ option.label }}
      </button>
    </div>

    <template v-if="activePreset">
      <p
        class="field-value food-value"
        :style="{
          top: `${cookPresetOverlayLayout.foodValueBox.top}px`,
          left: `${cookPresetOverlayLayout.foodValueBox.left}px`,
          width: `${cookPresetOverlayLayout.foodValueBox.width}px`,
          minHeight: `${cookPresetOverlayLayout.foodValueBox.height}px`,
        }"
      >
        {{ activePreset.label }}
      </p>

      <p
        class="field-value"
        :style="{
          top: `${cookPresetOverlayLayout.referenceTemperatureBox.top}px`,
          left: `${cookPresetOverlayLayout.referenceTemperatureBox.left}px`,
          width: `${cookPresetOverlayLayout.referenceTemperatureBox.width}px`,
          minHeight: `${cookPresetOverlayLayout.referenceTemperatureBox.height}px`,
        }"
      >
        {{ activePreset.referenceTemperature }}
      </p>

      <p
        class="field-value"
        :style="{
          top: `${cookPresetOverlayLayout.cookingTimeBox.top}px`,
          left: `${cookPresetOverlayLayout.cookingTimeBox.left}px`,
          width: `${cookPresetOverlayLayout.cookingTimeBox.width}px`,
          minHeight: `${cookPresetOverlayLayout.cookingTimeBox.height}px`,
        }"
      >
        {{ activePreset.cookingTime }}
      </p>
    </template>
  </div>
</template>

<style scoped>
.cook-preset-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.search-hit,
.menu-backdrop,
.preset-menu,
.preset-option {
  pointer-events: auto;
}

.search-hit,
.menu-backdrop,
.preset-option {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.search-hit,
.search-value,
.preset-menu,
.field-value {
  position: absolute;
}

.search-value,
.field-value {
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

.menu-backdrop {
  position: absolute;
  inset: 0;
}

.preset-menu {
  display: grid;
  gap: 8px;
  z-index: 7;
  padding: 10px;
  overflow-y: auto;
  border-radius: 18px;
  background: rgba(255, 250, 232, 0.98);
  box-shadow: 0 12px 28px rgba(122, 93, 38, 0.18);
}

.preset-option {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 14px;
  border-radius: 12px;
  background: rgba(244, 227, 127, 0.62);
  color: #6b5723;
  font-size: 16px;
  font-weight: 700;
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
