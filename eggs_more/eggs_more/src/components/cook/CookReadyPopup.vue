<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useCookPresetSession } from '@/composables/useCookPresetSession'
import { useRealtimeDetectFeed } from '@/composables/useRealtimeDetectFeed'

const { activePreset, historyId } = useCookPresetSession()
const dismissedHistoryId = ref<string | number | null>(null)
const visible = ref(false)
const resolvedHistoryId = computed(() => historyId.value ?? undefined)
const { latestPoint } = useRealtimeDetectFeed({
  historyId: resolvedHistoryId,
})

const popupTitle = computed(() => {
  if (activePreset.value?.label) {
    return `${activePreset.value.label}熟了`
  }

  return '食物熟了'
})

function closePopup() {
  dismissedHistoryId.value = historyId.value ?? null
  visible.value = false
}

watch(historyId, (nextHistoryId, previousHistoryId) => {
  if (nextHistoryId !== previousHistoryId) {
    visible.value = false
  }
})

watch(
  () => latestPoint.value?.tempDone,
  (tempDone) => {
    if (!tempDone) {
      return
    }

    if (!historyId.value || dismissedHistoryId.value === historyId.value) {
      return
    }

    visible.value = true
  },
)
</script>

<template>
  <div v-if="visible" class="cook-ready-popup">
    <button class="popup-backdrop" type="button" aria-label="关闭提示" @click="closePopup" />

    <section class="popup-card" role="dialog" aria-modal="true" aria-label="食物熟了提示">
      <p class="popup-kicker">烹饪提醒</p>
      <h2>{{ popupTitle }}</h2>
      <p class="popup-copy">当前温度已经达到设定状态，可以结束烹饪了。</p>
      <button class="popup-action" type="button" @click="closePopup">我知道了</button>
    </section>
  </div>
</template>

<style scoped>
.cook-ready-popup {
  position: absolute;
  inset: 0;
  z-index: 12;
  pointer-events: none;
}

.popup-backdrop,
.popup-card,
.popup-action {
  pointer-events: auto;
}

.popup-backdrop {
  position: absolute;
  inset: 0;
  appearance: none;
  border: 0;
  background: rgba(49, 37, 19, 0.34);
  cursor: pointer;
}

.popup-card {
  position: absolute;
  left: 34px;
  right: 34px;
  top: 248px;
  display: grid;
  gap: 12px;
  padding: 24px 22px 22px;
  border-radius: 28px;
  background: linear-gradient(180deg, #fff9dc 0%, #fff3c1 100%);
  box-shadow:
    0 20px 42px rgba(117, 89, 33, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  text-align: center;
}

.popup-kicker {
  margin: 0;
  color: #9b7a2d;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.popup-card h2 {
  margin: 0;
  color: #5b451c;
  font-size: 28px;
  font-weight: 800;
  line-height: 1.15;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}

.popup-copy {
  margin: 0;
  color: rgba(91, 69, 28, 0.82);
  font-size: 15px;
  line-height: 1.5;
}

.popup-action {
  appearance: none;
  border: 0;
  border-radius: 999px;
  min-height: 46px;
  background: #efcd62;
  color: #5c4517;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  font-family: 'HuXiaoBoNanShen-Regular', 'PingFang SC', sans-serif;
}
</style>
