<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { saltPresetOverlayLayouts } from '@/config/saltPresetOverlayLayout'
import { cookPresetOptions, type CookPresetOption } from '@/data/cookPresetCatalog'
import { useSaltPresetSession } from '@/composables/useSaltPresetSession'

const props = defineProps<{
  pageId: 'AnX' | 'wXj'
  mode: 'start' | 'end'
}>()

const layout = computed(() => saltPresetOverlayLayouts[props.pageId])
const menuOpen = ref(false)
const elapsedSeconds = ref(0)
const router = useRouter()
const route = useRoute()
const { activePreset, presetKey, setPresetKey, startCooking, finishCooking, startedAt } =
  useSaltPresetSession()

let timerId: number | null = null

const formattedElapsedTime = computed(() => {
  const hours = Math.floor(elapsedSeconds.value / 3600)
  const minutes = Math.floor((elapsedSeconds.value % 3600) / 60)
  const seconds = elapsedSeconds.value % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
})

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function selectPreset(option: CookPresetOption) {
  setPresetKey(option.key)
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function handleStartCooking() {
  startCooking(presetKey.value || cookPresetOptions[0]?.key)
  menuOpen.value = false
  router.push({
    path: '/design/wXj',
    query: route.query,
  })
}

function handleFinishCooking() {
  finishCooking()
  menuOpen.value = false
  router.push({
    path: '/design/4Ej',
    query: route.query,
  })
}

function stopTimer() {
  if (timerId !== null) {
    window.clearInterval(timerId)
    timerId = null
  }
}

function updateElapsedSeconds() {
  if (!startedAt.value) {
    elapsedSeconds.value = 0
    return
  }

  elapsedSeconds.value = Math.max(0, Math.floor((Date.now() - startedAt.value) / 1000))
}

function startTimer() {
  stopTimer()
  updateElapsedSeconds()
  timerId = window.setInterval(updateElapsedSeconds, 1000)
}

onMounted(() => {
  if (props.mode === 'end') {
    startTimer()
  }
})

watch(
  startedAt,
  () => {
    if (props.mode === 'end') {
      startTimer()
    }
  },
  { immediate: props.mode === 'end' },
)

onBeforeUnmount(() => {
  stopTimer()
})
</script>

<template>
  <div class="salt-preset-overlay">
    <button
      class="search-hit"
      type="button"
      :style="{
        top: `${layout.searchBox.top}px`,
        left: `${layout.searchBox.left}px`,
        width: `${layout.searchBox.width}px`,
        height: `${layout.searchBox.height}px`,
      }"
      aria-label="打开食物选择"
      @click="toggleMenu"
    />

    <div
      v-if="activePreset"
      class="search-value"
      :style="{
        top: `${layout.searchValueBox.top}px`,
        left: `${layout.searchValueBox.left}px`,
        width: `${layout.searchValueBox.width}px`,
        minHeight: `${layout.searchValueBox.height}px`,
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
        top: `${layout.dropdownBox.top}px`,
        left: `${layout.dropdownBox.left}px`,
        width: `${layout.dropdownBox.width}px`,
        maxHeight: `${layout.dropdownBox.height}px`,
      }"
    >
      <button
        v-for="option in cookPresetOptions"
        :key="option.key"
        class="preset-option"
        type="button"
        :style="{ minHeight: `${layout.dropdownItemHeight}px` }"
        @click="selectPreset(option)"
      >
        {{ option.label }}
      </button>
    </div>

    <template v-if="activePreset">
      <p
        class="field-value food-value"
        :style="{
          top: `${layout.foodValueBox.top}px`,
          left: `${layout.foodValueBox.left}px`,
          width: `${layout.foodValueBox.width}px`,
          minHeight: `${layout.foodValueBox.height}px`,
        }"
      >
        {{ activePreset.label }}
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
        {{ activePreset.referenceTemperature }}
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
        {{ activePreset.cookingTime }}
      </p>

      <p
        v-if="props.mode === 'end'"
        class="field-value elapsed-value"
        :style="{
          top: `${layout.elapsedTimeBox.top}px`,
          left: `${layout.elapsedTimeBox.left}px`,
          width: `${layout.elapsedTimeBox.width}px`,
          minHeight: `${layout.elapsedTimeBox.height}px`,
        }"
      >
        {{ formattedElapsedTime }}
      </p>
    </template>

    <button
      class="action-hit"
      type="button"
      :style="{
        top: `${layout.actionButtonBox.top}px`,
        left: `${layout.actionButtonBox.left}px`,
        width: `${layout.actionButtonBox.width}px`,
        height: `${layout.actionButtonBox.height}px`,
      }"
      :aria-label="props.mode === 'start' ? '开始烹饪' : '结束烹饪'"
      @click="props.mode === 'start' ? handleStartCooking() : handleFinishCooking()"
    />
  </div>
</template>

<style scoped>
.salt-preset-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.search-hit,
.menu-backdrop,
.preset-menu,
.preset-option,
.action-hit {
  pointer-events: auto;
}

.search-hit,
.menu-backdrop,
.preset-option,
.action-hit {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.search-hit,
.action-hit,
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
  background: rgba(215, 239, 214, 0.95);
  color: #4d6a3b;
  font-size: 16px;
  font-weight: 700;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.field-value {
  z-index: 6;
  margin: 0;
  color: #56633d;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.elapsed-value {
  text-align: left;
}
</style>
