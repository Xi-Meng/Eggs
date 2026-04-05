export {}

declare global {
  interface Window {
    __EGGS_API_BASE_URL__?: string
    __EGGS_DETECT_HISTORY_ID__?: string
    __EGGS_DETECT_POLL_INTERVAL_MS__?: number | string
  }
}
