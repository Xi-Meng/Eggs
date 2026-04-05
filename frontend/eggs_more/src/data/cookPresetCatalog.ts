import { computed, reactive } from 'vue'
import { apiGet } from '@/services/apiClient'

export interface CookPresetOption {
  key: string
  foodId: number | null
  label: string
  referenceTemperature: string
  referenceSaltLevel: string
  cookingTime: string
}

interface FoodListItem {
  id?: number
  name?: string
  bestTemp?: number
  lowerSalt?: number
  higherSalt?: number
  lower_salt?: number
  higher_salt?: number
  bestTime?: number
}

const fallbackCookPresetOptions: CookPresetOption[] = [
  {
    key: 'food-1',
    foodId: 1,
    label: '溏心蛋',
    referenceTemperature: '65°C',
    referenceSaltLevel: '0.3~0.6%',
    cookingTime: '6分钟',
  },
  {
    key: 'food-3',
    foodId: 3,
    label: '三分熟牛排',
    referenceTemperature: '52°C',
    referenceSaltLevel: '0.5~0.8%',
    cookingTime: '4分钟',
  },
  {
    key: 'food-7',
    foodId: 7,
    label: '滋补鲜汤',
    referenceTemperature: '92°C',
    referenceSaltLevel: '0.4~0.7%',
    cookingTime: '30分钟',
  },
]

const catalogState = reactive({
  options: fallbackCookPresetOptions as CookPresetOption[],
  isLoading: false,
  hasLoadedRemote: false,
  error: '',
})

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1)
}

function formatTemperature(value?: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '--°C'
  }

  return `${formatNumber(value)}°C`
}

function formatSaltRange(lower?: number, higher?: number) {
  if (typeof lower !== 'number' || typeof higher !== 'number') {
    return '--'
  }

  return `${formatNumber(lower)}~${formatNumber(higher)}%`
}

function formatCookingTime(value?: number) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return '--'
  }

  return `${formatNumber(value)}分钟`
}

function mapFoodListToOptions(items: FoodListItem[]) {
  const options = items
    .map((item, index) => {
      const label = typeof item.name === 'string' ? item.name.trim() : ''

      if (!label) {
        return null
      }

      const lowerSalt = typeof item.lowerSalt === 'number' ? item.lowerSalt : item.lower_salt
      const higherSalt = typeof item.higherSalt === 'number' ? item.higherSalt : item.higher_salt

      return {
        key: `food-${item.id ?? index + 1}`,
        foodId: typeof item.id === 'number' ? item.id : null,
        label,
        referenceTemperature: formatTemperature(item.bestTemp),
        referenceSaltLevel: formatSaltRange(lowerSalt, higherSalt),
        cookingTime: formatCookingTime(item.bestTime),
      } satisfies CookPresetOption
    })
    .filter((option): option is CookPresetOption => !!option)

  return options.length > 0 ? options : fallbackCookPresetOptions
}

export async function loadCookPresetOptions(force = false) {
  if (catalogState.isLoading) {
    return catalogState.options
  }

  if (catalogState.hasLoadedRemote && !force) {
    return catalogState.options
  }

  catalogState.isLoading = true

  try {
    const result = await apiGet<FoodListItem[]>('/api/food/list')

    if (result.code !== 200) {
      throw new Error(result.msg || '菜品列表获取失败')
    }

    catalogState.options = mapFoodListToOptions(Array.isArray(result.data) ? result.data : [])
    catalogState.hasLoadedRemote = true
    catalogState.error = ''
  } catch (error) {
    catalogState.error = error instanceof Error ? error.message : '菜品列表获取失败'
  } finally {
    catalogState.isLoading = false
  }

  return catalogState.options
}

export function getCookPresetOptions() {
  return catalogState.options
}

export function getDefaultCookPresetKey() {
  return catalogState.options[0]?.key ?? ''
}

export function normalizeCookPresetKey(rawPresetKey: string) {
  if (catalogState.options.some((option) => option.key === rawPresetKey)) {
    return rawPresetKey
  }

  return getDefaultCookPresetKey()
}

export function findCookPresetOptionByKey(presetKey: string) {
  return catalogState.options.find((option) => option.key === presetKey) ?? catalogState.options[0] ?? null
}

export function useCookPresetCatalog() {
  return {
    cookPresetOptions: computed(() => catalogState.options),
    isLoadingCookPresetOptions: computed(() => catalogState.isLoading),
    cookPresetCatalogError: computed(() => catalogState.error),
    loadCookPresetOptions,
  }
}
