<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { designPagesByTitle } from '@/data/designPages'
import DesignFrame from './DesignFrame.vue'

const props = defineProps<{
  frameId: string
  title: string
}>()

const router = useRouter()
const route = useRoute()

function syncTitle(currentTitle: string) {
  document.title = `${currentTitle} | Eggs`
}

function handleFrameSwitch(frameTitle: string) {
  const candidates = designPagesByTitle[frameTitle] ?? []

  if (candidates.length !== 1) {
    return
  }

  const target = candidates[0]

  if (!target || route.path === target.routePath) {
    return
  }

  router.push({
    path: target.routePath,
    query: route.query,
  })
}

onMounted(() => {
  syncTitle(props.title)
})

watch(
  () => props.title,
  (title) => {
    syncTitle(title)
  },
)
</script>

<template>
  <main class="page-shell">
    <header class="page-header">
      <RouterLink class="page-back" to="/">全部页面</RouterLink>
      <div class="page-copy">
        <p class="page-kicker">Eggs · js.design 复现</p>
        <h1>{{ title }}</h1>
      </div>
      <span class="page-tag">{{ frameId }}</span>
    </header>

    <DesignFrame :frame-id="frameId" @switch="handleFrameSwitch">
      <slot />
    </DesignFrame>
  </main>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  padding: 28px 20px 40px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-width: 1120px;
  margin: 0 auto 24px;
}

.page-back,
.page-tag {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(129, 89, 43, 0.14);
  color: #6f4a23;
  font-size: 0.92rem;
  font-weight: 700;
  backdrop-filter: blur(12px);
}

.page-copy {
  flex: 1;
  min-width: 0;
  text-align: center;
}

.page-kicker {
  margin: 0 0 6px;
  color: #93662f;
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.page-copy h1 {
  margin: 0;
  font-size: clamp(1.3rem, 2vw, 2rem);
  color: #2f1e10;
}

@media (max-width: 720px) {
  .page-shell {
    padding-inline: 12px;
  }

  .page-header {
    flex-wrap: wrap;
    justify-content: center;
  }

  .page-copy {
    order: -1;
    width: 100%;
  }
}
</style>
