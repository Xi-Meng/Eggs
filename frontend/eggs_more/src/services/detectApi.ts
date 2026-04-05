import { apiGet } from './apiClient'

export interface DetectStatusPoint {
  id: number
  historyId: number
  temp: number
  salt: number
  oilFume: number
  collectTime: string
  tempDone: boolean
  smokeHigh: boolean
  saltLevel: number
}

export function getDetectStatus(historyId: string | number) {
  return apiGet<DetectStatusPoint>('/detect/status', {
    historyId,
  })
}
