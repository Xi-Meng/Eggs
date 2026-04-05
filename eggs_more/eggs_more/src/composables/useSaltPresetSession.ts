import { computed, reactive } from 'vue'
import { cookPresetOptions } from '@/data/cookPresetCatalog'

interface SaltPresetSessionState {
  presetKey: string
  startedAt: number | null
  finishedAt: number | null
  rating: string
  feeling: string
}

const STORAGE_KEY = 'eggs-salt-preset-session'

function getDefaultPresetKey() {
  return cookPresetOptions[0]?.key ?? ''
}

function normalizePresetKey(rawPresetKey: string) {
  if (cookPresetOptions.some((option) => option.key === rawPresetKey)) {
    return rawPresetKey
  }

  return getDefaultPresetKey()
}

function readStoredSession(): SaltPresetSessionState {
  if (typeof window === 'undefined') {
    return {
      presetKey: getDefaultPresetKey(),
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
        presetKey: getDefaultPresetKey(),
        startedAt: null,
        finishedAt: null,
        rating: '',
        feeling: '',
      }
    }

    const parsed = JSON.parse(raw) as Partial<SaltPresetSessionState>

    return {
      presetKey: normalizePresetKey(parsed.presetKey ?? ''),
      startedAt: typeof parsed.startedAt === 'number' ? parsed.startedAt : null,
      finishedAt: typeof parsed.finishedAt === 'number' ? parsed.finishedAt : null,
      rating: typeof parsed.rating === 'string' ? parsed.rating : '',
      feeling: typeof parsed.feeling === 'string' ? parsed.feeling : '',
    }
  } catch {
    return {
      presetKey: getDefaultPresetKey(),
      startedAt: null,
      finishedAt: null,
      rating: '',
      feeling: '',
    }
  }
}

const sessionState = reactive<SaltPresetSessionState>(readStoredSession())

function persistSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      presetKey: sessionState.presetKey,
      startedAt: sessionState.startedAt,
      finishedAt: sessionState.finishedAt,
      rating: sessionState.rating,
      feeling: sessionState.feeling,
    }),
  )
}

function ensureValidSession() {
  const normalizedKey = normalizePresetKey(sessionState.presetKey)

  if (normalizedKey !== sessionState.presetKey) {
    sessionState.presetKey = normalizedKey
    persistSession()
  }
}

export function useSaltPresetSession() {
  ensureValidSession()

  const activePreset = computed(
    () =>
      cookPresetOptions.find((option) => option.key === sessionState.presetKey) ??
      cookPresetOptions[0] ??
      null,
  )

  function setPresetKey(presetKey: string) {
    sessionState.presetKey = normalizePresetKey(presetKey)
    persistSession()
  }

  function startCooking(presetKey?: string) {
    if (presetKey) {
      setPresetKey(presetKey)
    } else if (!sessionState.presetKey) {
      sessionState.presetKey = getDefaultPresetKey()
    }

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
