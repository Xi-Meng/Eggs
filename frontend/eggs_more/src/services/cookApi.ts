import { apiPost } from './apiClient'

export interface StartCookSessionRequest {
  foodId: number
  userId: number
  deviceSn: string
}

export function startCookSession(payload: StartCookSessionRequest) {
  return apiPost<number>('/api/cook/start', payload)
}
