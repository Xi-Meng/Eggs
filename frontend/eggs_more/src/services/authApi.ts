import { apiGet } from './apiClient'

export function registerByEmail(email: string, password: string) {
  return apiGet<string>('/user/register', {
    email,
    password,
  })
}

export function loginByEmail(email: string, password: string) {
  return apiGet<string>('/user/login', {
    email,
    password,
  })
}
