<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cookPresetOverlayLayout } from '@/config/cookPresetOverlayLayout'
import { type CookPresetOption, useCookPresetCatalog } from '@/data/cookPresetCatalog'
import { useCookPresetSession } from '@/composables/useCookPresetSession'
import { startCookSession } from '@/services/cookApi'

const props = withDefaults(
  defineProps<{
    mode?: 'start' | 'end'
  }>(),
  {
    mode: 'start',
  },
)

const menuOpen = ref(false)
const elapsedSeconds = ref(0)
const isSubmitting = ref(false)
const router = useRouter()
const route = useRoute()
const { cookPresetOptions, loadCookPresetOptions } = useCookPresetCatalog()
const { activePreset, setPresetKey, startCooking, finishCooking, startedAt } = useCookPresetSession()

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

async function handleStartCooking() {
  if (isSubmitting.value) {
    return
  }

  const options =
    cookPresetOptions.value.length > 0 ? cookPresetOptions.value : await loadCookPresetOptions()
  const selectedPreset = activePreset.value ?? options[0] ?? null

  if (!selectedPreset || selectedPreset.foodId === null) {
    window.alert('当前食物没有可用的 foodId，暂时无法开始烹饪')
    return
  }

  isSubmitting.value = true

  try {
    const result = await startCookSession({
      foodId: selectedPreset.foodId,
      userId: 1,
      deviceSn: 'ESP32-001',
    })

    if (result.code !== 200 || result.data === null || result.data === undefined) {
      throw new Error(result.msg || '开始烹饪失败')
    }

    startCooking({
      presetKey: selectedPreset.key,
      historyId: result.data,
    })
    menuOpen.value = false
    router.push({
      path: '/design/4-t',
      query: route.query,
    })
  } catch (error) {
    window.alert(error instanceof Error ? error.message : '开始烹饪失败，请稍后再试')
  } finally {
    isSubmitting.value = false
  }
}

function handleFinishCooking() {
  finishCooking()
  menuOpen.value = false
  router.push({
    path: '/design/MTDir',
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
  loadCookPresetOptions()

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

      <p
        v-if="props.mode === 'end'"
        class="field-value elapsed-value"
        :style="{
          top: `${cookPresetOverlayLayout.elapsedTimeBox.top}px`,
          left: `${cookPresetOverlayLayout.elapsedTimeBox.left}px`,
          width: `${cookPresetOverlayLayout.elapsedTimeBox.width}px`,
          minHeight: `${cookPresetOverlayLayout.elapsedTimeBox.height}px`,
        }"
      >
        {{ formattedElapsedTime }}
      </p>
    </template>

    <button
      v-if="props.mode === 'start'"
      class="start-hit"
      type="button"
      :style="{
        top: `${cookPresetOverlayLayout.startButtonBox.top}px`,
        left: `${cookPresetOverlayLayout.startButtonBox.left}px`,
        width: `${cookPresetOverlayLayout.startButtonBox.width}px`,
        height: `${cookPresetOverlayLayout.startButtonBox.height}px`,
      }"
      aria-label="开始烹饪"
      @click="handleStartCooking"
    />

    <button
      v-if="props.mode === 'end'"
      class="start-hit"
      type="button"
      :style="{
        top: `${cookPresetOverlayLayout.finishButtonBox.top}px`,
        left: `${cookPresetOverlayLayout.finishButtonBox.left}px`,
        width: `${cookPresetOverlayLayout.finishButtonBox.width}px`,
        height: `${cookPresetOverlayLayout.finishButtonBox.height}px`,
      }"
      aria-label="结束烹饪"
      @click="handleFinishCooking"
    />
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
.preset-option,
.start-hit {
  pointer-events: auto;
}

.search-hit,
.menu-backdrop,
.preset-option,
.start-hit {
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.search-hit,
.start-hit,
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

.elapsed-value {
  text-align: left;
  color: #6f5b31;
}
</style>
