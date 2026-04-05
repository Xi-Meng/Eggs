import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue'
import { getDetectHistoryId, getDetectPollIntervalMs } from '@/config/runtimeConfig'
import { getDetectStatus, type DetectStatusPoint } from '@/services/detectApi'

export interface UseRealtimeDetectFeedOptions {
  historyId?: MaybeRefOrGetter<string | number | undefined | null>
  pollInterval?: MaybeRefOrGetter<number | undefined | null>
}

export function useRealtimeDetectFeed(options: UseRealtimeDetectFeedOptions = {}) {
  const points = ref<DetectStatusPoint[]>([])
  const latestPoint = ref<DetectStatusPoint | null>(null)
  const isLoading = ref(true)
  const error = ref('')
  const isRefreshing = ref(false)

  const resolvedHistoryId = computed(() => {
    const historyId = toValue(options.historyId)
    return historyId ?? getDetectHistoryId()
  })

  const resolvedPollInterval = computed(() => {
    const pollInterval = toValue(options.pollInterval)
    return typeof pollInterval === 'number' && pollInterval > 0
      ? pollInterval
      : getDetectPollIntervalMs()
  })

  let timer: number | null = null
  let hasMounted = false

  function stopTimer() {
    if (timer !== null) {
      window.clearInterval(timer)
      timer = null
    }
  }

  function startTimer() {
    stopTimer()
    timer = window.setInterval(refresh, resolvedPollInterval.value)
  }

  async function refresh() {
    if (isRefreshing.value) {
      return
    }

    isRefreshing.value = true

    try {
      console.info('[eggs][detect-status] polling historyId =', resolvedHistoryId.value)

      const result = await getDetectStatus(resolvedHistoryId.value)

      if (result.code !== 200) {
        throw new Error(result.msg || '实时数据获取失败')
      }

      latestPoint.value = result.data ?? null
      points.value = latestPoint.value ? [latestPoint.value] : []
      error.value = ''
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : '实时数据获取失败'
    } finally {
      isRefreshing.value = false
      isLoading.value = false
    }
  }

  onMounted(() => {
    hasMounted = true
    refresh()
    startTimer()
  })

  onBeforeUnmount(() => {
    stopTimer()
  })

  watch(resolvedHistoryId, (nextHistoryId, previousHistoryId) => {
    if (!hasMounted || nextHistoryId === previousHistoryId) {
      return
    }

    console.info('[eggs][detect-status] switched historyId =', nextHistoryId)
    isLoading.value = true
    refresh()
  })

  watch(resolvedPollInterval, (nextInterval, previousInterval) => {
    if (!hasMounted || nextInterval === previousInterval) {
      return
    }

    startTimer()
  })

  return {
    points,
    latestPoint,
    isLoading,
    error,
    refresh,
  }
}
