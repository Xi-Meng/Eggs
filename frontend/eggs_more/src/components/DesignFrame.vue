<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ensureJsFrameRuntime } from '@/lib/jsFrame'

interface JsFrameElement extends HTMLElement {
  src: string
  readyState?: {
    label?: string
  }
  on?: (eventName: string, handler: (payload: { frameName?: string }) => void) => void
  off?: (eventName: string, handler: (payload: { frameName?: string }) => void) => void
}

const DESIGN_BUNDLE_SRC = '/jsdesign/js_fqQ5obGtL8b'

const props = defineProps<{
  frameId: string
}>()

const emit = defineEmits<{
  switch: [frameName: string]
}>()

const runtimeReady = ref(false)
const runtimeError = ref('')
const frameReady = ref(false)
const frameEl = ref<JsFrameElement | null>(null)

const frameSrc = computed(() => `${DESIGN_BUNDLE_SRC}#f=${encodeURIComponent(props.frameId)}`)

function updateFrameReady() {
  const label = frameEl.value?.readyState?.label
  if (label === 'loaded' || label === 'rendered') {
    frameReady.value = true
  }
}

function handleSwitch(payload: { frameName?: string }) {
  if (payload.frameName) {
    emit('switch', payload.frameName)
  }
}

function bindFrameEvents() {
  const currentFrame = frameEl.value
  if (!currentFrame) {
    return
  }

  currentFrame.addEventListener('jsFrameReadystatechange', updateFrameReady)
  currentFrame.on?.('__global__SWITCH_FRAME', handleSwitch)
  updateFrameReady()
}

function unbindFrameEvents() {
  const currentFrame = frameEl.value
  if (!currentFrame) {
    return
  }

  currentFrame.removeEventListener('jsFrameReadystatechange', updateFrameReady)
  currentFrame.off?.('__global__SWITCH_FRAME', handleSwitch)
}

onMounted(async () => {
  try {
    await ensureJsFrameRuntime()
    runtimeReady.value = true
    await nextTick()
    bindFrameEvents()
  } catch (error) {
    runtimeError.value = error instanceof Error ? error.message : '设计运行时加载失败'
  }
})

watch(
  () => props.frameId,
  async () => {
    frameReady.value = false
    await nextTick()
    unbindFrameEvents()
    bindFrameEvents()
  },
)

onBeforeUnmount(() => {
  unbindFrameEvents()
})
</script>

<template>
  <section class="design-stage">
    <div v-if="runtimeError" class="design-status is-error">
      <p>页面引擎加载失败</p>
      <span>{{ runtimeError }}</span>
    </div>

    <div v-else-if="!runtimeReady" class="design-status">
      <p>正在加载设计引擎…</p>
      <span>首次打开会先下载 js.design 运行时。</span>
    </div>

    <div v-else class="design-scroll">
      <div class="phone-shell">
        <div v-if="!frameReady" class="frame-loading">正在渲染页面…</div>
        <js-frame ref="frameEl" :src="frameSrc" />
        <div v-if="$slots.default" class="phone-overlay">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.design-stage {
  width: 100%;
}

.design-scroll {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 8px;
}

.design-scroll::-webkit-scrollbar {
  height: 8px;
}

.design-scroll::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(97, 67, 34, 0.18);
}

.phone-shell {
  position: relative;
  width: 375px;
  min-height: 812px;
  margin: 0 auto;
  border-radius: 36px;
  overflow: hidden;
  background: #ffffff;
  box-shadow:
    0 32px 90px rgba(112, 78, 40, 0.18),
    0 10px 24px rgba(112, 78, 40, 0.12);
}

.phone-shell :deep(js-frame) {
  display: block;
  width: 375px;
  min-height: 812px;
  background: #ffffff;
}

.phone-overlay {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.frame-loading,
.design-status {
  display: grid;
  place-items: center;
  min-height: 812px;
  padding: 32px;
  text-align: center;
  color: #6e5130;
}

.frame-loading {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgba(255, 250, 240, 0.94), rgba(255, 244, 218, 0.94));
  letter-spacing: 0.04em;
}

.design-status {
  border: 1px solid rgba(130, 89, 45, 0.12);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.7);
}

.design-status p,
.frame-loading {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.design-status span {
  display: block;
  margin-top: 8px;
  font-size: 0.92rem;
  color: rgba(89, 64, 37, 0.72);
}

.is-error {
  color: #8d392f;
  background: rgba(255, 241, 239, 0.92);
}
</style>
