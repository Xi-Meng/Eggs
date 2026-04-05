import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getDetectHistoryId, getDetectPollIntervalMs } from '@/config/runtimeConfig'
import { getDetectCurve, type DetectCurvePoint } from '@/services/detectApi'

export interface UseRealtimeDetectFeedOptions {
  historyId?: string | number
  pollInterval?: number
}

function getLatestPoint(points: DetectCurvePoint[]) {
  return (
    [...points]
      .sort((a, b) => new Date(b.collectTime).getTime() - new Date(a.collectTime).getTime())[0] ??
    null
  )
}

export function useRealtimeDetectFeed(options: UseRealtimeDetectFeedOptions = {}) {
  const points = ref<DetectCurvePoint[]>([])
  const latestPoint = ref<DetectCurvePoint | null>(null)
  const isLoading = ref(true)
  const error = ref('')
  const isRefreshing = ref(false)

  const resolvedHistoryId = computed(() => options.historyId ?? getDetectHistoryId())
  const resolvedPollInterval = computed(() => options.pollInterval ?? getDetectPollIntervalMs())

  let timer: number | null = null

  async function refresh() {
    if (isRefreshing.value) {
      return
    }

    isRefreshing.value = true

    try {
      const result = await getDetectCurve(resolvedHistoryId.value)

      if (result.code !== 200) {
        throw new Error(result.msg || '实时数据获取失败')
      }

      points.value = Array.isArray(result.data) ? result.data : []
      latestPoint.value = points.value.length > 0 ? getLatestPoint(points.value) : null
      error.value = ''
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : '实时数据获取失败'
    } finally {
      isRefreshing.value = false
      isLoading.value = false
    }
  }

  onMounted(() => {
    refresh()
    timer = window.setInterval(refresh, resolvedPollInterval.value)
  })

  onBeforeUnmount(() => {
    if (timer !== null) {
      window.clearInterval(timer)
    }
  })

  return {
    points,
    latestPoint,
    isLoading,
    error,
    refresh,
  }
}
