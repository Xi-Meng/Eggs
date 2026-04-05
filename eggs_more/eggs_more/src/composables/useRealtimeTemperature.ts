import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getDetectCurve, type DetectCurvePoint } from '@/services/detectApi'

export interface UseRealtimeTemperatureOptions {
  historyId: string | number
  pollInterval?: number
}

function getLatestPoint(points: DetectCurvePoint[]) {
  return (
    [...points]
      .sort((a, b) => new Date(b.collectTime).getTime() - new Date(a.collectTime).getTime())[0] ??
    null
  )
}

export function useRealtimeTemperature(options: UseRealtimeTemperatureOptions) {
  const points = ref<DetectCurvePoint[]>([])
  const latestPoint = ref<DetectCurvePoint | null>(null)
  const isLoading = ref(true)
  const error = ref('')

  let timer: number | null = null

  const formattedTemperature = computed(() => {
    if (!latestPoint.value) {
      return '--°C'
    }

    return `${latestPoint.value.temp}°C`
  })

  async function refresh() {
    try {
      const result = await getDetectCurve(options.historyId)

      if (result.code !== 200) {
        throw new Error(result.msg || '温度数据获取失败')
      }

      points.value = Array.isArray(result.data) ? result.data : []
      latestPoint.value = points.value.length > 0 ? getLatestPoint(points.value) : null
      error.value = ''
    } catch (reason) {
      error.value = reason instanceof Error ? reason.message : '温度数据获取失败'
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    refresh()
    timer = window.setInterval(refresh, options.pollInterval ?? 3000)
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
    formattedTemperature,
    refresh,
  }
}
