import runtimeGlobalConfigCsv from '../../csv/runtime-global-config.csv?raw'

const DEFAULT_API_BASE_URL = 'http://q7b68f9f.natappfree.cc'
const DEFAULT_DETECT_HISTORY_ID = '2040365833505034242'
const DEFAULT_DETECT_POLL_INTERVAL_MS = 1000

function parseCsvLine(line: string) {
  const cells: string[] = []
  let current = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index]

    if (char === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        current += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }

      continue
    }

    if (char === ',' && !insideQuotes) {
      cells.push(current.trim())
      current = ''
      continue
    }

    current += char
  }

  cells.push(current.trim())
  return cells
}

function parseRuntimeGlobalConfig(csvText: string) {
  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)

  const map: Record<string, string> = {}

  for (const line of lines.slice(1)) {
    const [key, value] = parseCsvLine(line)

    if (key && value) {
      map[key] = value
    }
  }

  return map
}

function getWindowOverride(value: string | number | undefined) {
  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value)
  }

  return ''
}

function getNumberValue(rawValue: string, fallbackValue: number) {
  const value = Number(rawValue)

  if (!Number.isFinite(value) || value <= 0) {
    return fallbackValue
  }

  return value
}

const runtimeGlobalConfig = parseRuntimeGlobalConfig(runtimeGlobalConfigCsv)

export function getApiBaseUrl() {
  const windowValue =
    typeof window === 'undefined' ? '' : getWindowOverride(window.__EGGS_API_BASE_URL__)

  return windowValue || runtimeGlobalConfig.API_BASE_URL || DEFAULT_API_BASE_URL
}

export function getDetectHistoryId() {
  const windowValue =
    typeof window === 'undefined' ? '' : getWindowOverride(window.__EGGS_DETECT_HISTORY_ID__)

  return windowValue || runtimeGlobalConfig.DETECT_HISTORY_ID || DEFAULT_DETECT_HISTORY_ID
}

export function getDetectPollIntervalMs() {
  const windowValue =
    typeof window === 'undefined'
      ? ''
      : getWindowOverride(window.__EGGS_DETECT_POLL_INTERVAL_MS__)

  if (windowValue) {
    return getNumberValue(windowValue, DEFAULT_DETECT_POLL_INTERVAL_MS)
  }

  return getNumberValue(
    runtimeGlobalConfig.DETECT_POLL_INTERVAL_MS,
    DEFAULT_DETECT_POLL_INTERVAL_MS,
  )
}
