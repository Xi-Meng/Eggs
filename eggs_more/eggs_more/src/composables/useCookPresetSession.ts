import { computed, reactive } from 'vue'
import {
  findCookPresetOptionByKey,
  getDefaultCookPresetKey,
  normalizeCookPresetKey,
} from '@/data/cookPresetCatalog'

interface CookPresetSessionState {
  presetKey: string
  historyId: string | number | null
  startedAt: number | null
  finishedAt: number | null
  rating: string
  feeling: string
}

const STORAGE_KEY = 'eggs-cook-preset-session'

function readStoredSession(): CookPresetSessionState {
  if (typeof window === 'undefined') {
    return {
      presetKey: getDefaultCookPresetKey(),
      historyId: null,
      startedAt: null,
      finishedAt: null,
      rating: '',
      feeling: '',
    }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return {
        presetKey: getDefaultCookPresetKey(),
        historyId: null,
        startedAt: null,
        finishedAt: null,
        rating: '',
        feeling: '',
      }
    }

    const parsed = JSON.parse(raw) as Partial<CookPresetSessionState>

    return {
      presetKey: normalizeCookPresetKey(parsed.presetKey ?? ''),
      historyId:
        typeof parsed.historyId === 'string' || typeof parsed.historyId === 'number'
          ? parsed.historyId
          : null,
      startedAt: typeof parsed.startedAt === 'number' ? parsed.startedAt : null,
      finishedAt: typeof parsed.finishedAt === 'number' ? parsed.finishedAt : null,
      rating: typeof parsed.rating === 'string' ? parsed.rating : '',
      feeling: typeof parsed.feeling === 'string' ? parsed.feeling : '',
    }
  } catch {
    return {
      presetKey: getDefaultCookPresetKey(),
      historyId: null,
      startedAt: null,
      finishedAt: null,
      rating: '',
      feeling: '',
    }
  }
}

const sessionState = reactive<CookPresetSessionState>(readStoredSession())

function persistSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      presetKey: sessionState.presetKey,
      historyId: sessionState.historyId,
      startedAt: sessionState.startedAt,
      finishedAt: sessionState.finishedAt,
      rating: sessionState.rating,
      feeling: sessionState.feeling,
    }),
  )
}

function ensureValidSession() {
  const normalizedKey = normalizeCookPresetKey(sessionState.presetKey)

  if (normalizedKey !== sessionState.presetKey) {
    sessionState.presetKey = normalizedKey
    persistSession()
  }
}

export function useCookPresetSession() {
  ensureValidSession()

  const activePreset = computed(() => findCookPresetOptionByKey(sessionState.presetKey))

  function setPresetKey(presetKey: string) {
    sessionState.presetKey = normalizeCookPresetKey(presetKey)
    persistSession()
  }

  function startCooking(options: { presetKey?: string; historyId?: string | number | null } = {}) {
    if (options.presetKey) {
      sessionState.presetKey = normalizeCookPresetKey(options.presetKey)
    } else if (!sessionState.presetKey) {
      sessionState.presetKey = getDefaultCookPresetKey()
    }

    sessionState.historyId = options.historyId ?? null
    sessionState.startedAt = Date.now()
    sessionState.finishedAt = null
    sessionState.rating = ''
    sessionState.feeling = ''
    persistSession()
  }

  function finishCooking() {
    if (!sessionState.startedAt) {
      return
    }

    sessionState.finishedAt = Date.now()
    persistSession()
  }

  function setRating(rating: string) {
    sessionState.rating = rating
    persistSession()
  }

  function setFeeling(feeling: string) {
    sessionState.feeling = feeling
    persistSession()
  }

  return {
    activePreset,
    presetKey: computed(() => sessionState.presetKey),
    historyId: computed(() => sessionState.historyId),
    startedAt: computed(() => sessionState.startedAt),
    finishedAt: computed(() => sessionState.finishedAt),
    rating: computed(() => sessionState.rating),
    feeling: computed(() => sessionState.feeling),
    setPresetKey,
    startCooking,
    finishCooking,
    setRating,
    setFeeling,
  }
}
