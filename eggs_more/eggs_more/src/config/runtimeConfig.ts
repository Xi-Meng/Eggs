const DEFAULT_API_BASE_URL = 'http://q7b68f9f.natappfree.cc'

export function getApiBaseUrl() {
  return window.__EGGS_API_BASE_URL__ || DEFAULT_API_BASE_URL
}
