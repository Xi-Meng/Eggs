import { apiGet } from './apiClient'

export interface DetectCurvePoint {
  id: number
  historyId: number
  temp: number
  salt: number
  oilFume: number
  collectTime: string
}

export function getDetectCurve(historyId: string | number) {
  return apiGet<DetectCurvePoint[]>('/detect/curve', {
    historyId,
  })
}
