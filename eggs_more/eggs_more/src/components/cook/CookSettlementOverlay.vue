<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import { settlementOverlayLayout } from '@/config/settlementOverlayLayout'
import { useCookPresetSession } from '@/composables/useCookPresetSession'

const {
  activePreset,
  startedAt,
  finishedAt,
  rating,
  feeling,
  finishCooking,
  setRating,
  setFeeling,
} = useCookPresetSession()

if (startedAt.value && !finishedAt.value) {
  finishCooking()
}

const form = reactive({
  rating: rating.value,
  feeling: feeling.value,
})

watch(
  () => form.rating,
  (value) => {
    setRating(value)
  },
)

watch(
  () => form.feeling,
  (value) => {
    setFeeling(value)
  },
)

const elapsedSeconds = computed(() => {
  if (!startedAt.value || !finishedAt.value) {
    return 0
  }

  return Math.max(0, Math.floor((finishedAt.value - startedAt.value) / 1000))
})

const formattedDuration = computed(() => {
  const hours = Math.floor(elapsedSeconds.value / 3600)
  const minutes = Math.floor((elapsedSeconds.value % 3600) / 60)
  const seconds = elapsedSeconds.value % 60

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':')
})
</script>

<template>
  <div class="settlement-overlay">
    <p
      class="display-value"
      :style="{
        top: `${settlementOverlayLayout.foodValueBox.top}px`,
        left: `${settlementOverlayLayout.foodValueBox.left}px`,
        width: `${settlementOverlayLayout.foodValueBox.width}px`,
        minHeight: `${settlementOverlayLayout.foodValueBox.height}px`,
      }"
    >
      {{ activePreset?.label ?? '' }}
    </p>

    <label
      class="input-wrap"
      :style="{
        top: `${settlementOverlayLayout.ratingInputBox.top}px`,
        left: `${settlementOverlayLayout.ratingInputBox.left}px`,
        width: `${settlementOverlayLayout.ratingInputBox.width}px`,
        height: `${settlementOverlayLayout.ratingInputBox.height}px`,
      }"
    >
      <input
        v-model="form.rating"
        class="settlement-input"
        type="text"
        placeholder="请输入评分"
      />
    </label>

    <label
      class="input-wrap"
      :style="{
        top: `${settlementOverlayLayout.feelingInputBox.top}px`,
        left: `${settlementOverlayLayout.feelingInputBox.left}px`,
        width: `${settlementOverlayLayout.feelingInputBox.width}px`,
        height: `${settlementOverlayLayout.feelingInputBox.height}px`,
      }"
    >
      <textarea
        v-model="form.feeling"
        class="settlement-input settlement-textarea"
        placeholder="输入感受"
      />
    </label>

    <p
      class="display-value duration-value"
      :style="{
        top: `${settlementOverlayLayout.durationValueBox.top}px`,
        left: `${settlementOverlayLayout.durationValueBox.left}px`,
        width: `${settlementOverlayLayout.durationValueBox.width}px`,
        minHeight: `${settlementOverlayLayout.durationValueBox.height}px`,
      }"
    >
      {{ formattedDuration }}
    </p>
  </div>
</template>

<style scoped>
.settlement-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.display-value {
  position: absolute;
  margin: 0;
  color: #6a5833;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.2;
  text-align: right;
  pointer-events: none;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.duration-value {
  text-align: left;
}

.input-wrap {
  position: absolute;
  display: block;
}

.input-wrap,
.settlement-input {
  pointer-events: auto;
}

.settlement-input {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.001);
  color: #6b552d;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  outline: none;
  resize: none;
  padding: 8px 10px;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.settlement-input::placeholder {
  color: rgba(110, 84, 43, 0.5);
}

.settlement-textarea {
  padding-top: 10px;
}
</style>
