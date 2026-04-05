import { computed } from 'vue'
import { useCookPresetSession } from '@/composables/useCookPresetSession'
import { useSaltPresetSession } from '@/composables/useSaltPresetSession'

export function useActiveCookingHistoryId() {
  const cookSession = useCookPresetSession()
  const saltSession = useSaltPresetSession()

  const activeHistoryId = computed(() => {
    const cookStartedAt = cookSession.startedAt.value ?? 0
    const saltStartedAt = saltSession.startedAt.value ?? 0
    const cookHistoryId = cookSession.historyId.value
    const saltHistoryId = saltSession.historyId.value

    if (cookHistoryId && saltHistoryId) {
      return cookStartedAt >= saltStartedAt ? cookHistoryId : saltHistoryId
    }

    return cookHistoryId ?? saltHistoryId ?? undefined
  })

  return {
    activeHistoryId,
  }
}
