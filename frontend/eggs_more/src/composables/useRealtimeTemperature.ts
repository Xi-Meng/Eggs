import { computed, type MaybeRefOrGetter } from 'vue'
import { useRealtimeDetectFeed } from './useRealtimeDetectFeed'

export interface UseRealtimeTemperatureOptions {
  historyId?: MaybeRefOrGetter<string | number | undefined | null>
  pollInterval?: MaybeRefOrGetter<number | undefined | null>
}

function formatTemperature(value: number) {
  return `${value.toFixed(1)}°C`
}

export function useRealtimeTemperature(options: UseRealtimeTemperatureOptions) {
  const { points, latestPoint, isLoading, error, refresh } = useRealtimeDetectFeed(options)

  const formattedTemperature = computed(() => {
    if (!latestPoint.value) {
      return '--°C'
    }

    return formatTemperature(latestPoint.value.temp)
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
