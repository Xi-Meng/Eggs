import axios from 'axios'
import { getApiBaseUrl } from '@/config/runtimeConfig'

export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

export async function apiGet<T>(path: string, params?: Record<string, unknown>) {
  const response = await axios.get<ApiResponse<T>>(`${getApiBaseUrl()}${path}`, {
    params,
  })

  return response.data
}

export async function apiPost<T>(path: string, body?: unknown) {
  const response = await axios.post<ApiResponse<T>>(`${getApiBaseUrl()}${path}`, body)

  return response.data
}
