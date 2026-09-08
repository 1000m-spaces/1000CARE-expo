import axios from 'axios'
import { MARKETPLACE_CORE_BASE } from '~/constants/config'

// Nguồn sự thật DUY NHẤT cho access/refresh token của backend mới
// marketplace-core — authV2Client & customerV2Client đều đọc token từ
// đây (request interceptor) thay vì tự giữ biến riêng, để refresh xong
// phát huy hiệu lực ngay cho CẢ 2 client cùng lúc.
//
// Client riêng CHỈ để gọi /auth/v1/refresh — tách khỏi authV2Client để
// tránh vòng lặp import (2 client kia đều cần refreshAuthV2() lúc 401)
// và để chắc chắn request refresh không tự bị áp lại logic retry-401
// của chính nó.
const refreshClient = axios.create({
  baseURL: `${MARKETPLACE_CORE_BASE}/auth/v1`,
  timeout: 15000,
  headers: { accept: 'application/json', 'Content-Type': 'application/json' },
})

let accessToken = null
let refreshToken = null
let proactiveTimer = null
let refreshPromise = null
let listeners = { onRefreshed: null, onRefreshFailed: null }

// Saga đăng ký 2 callback: onRefreshed để persist token mới vào
// asyncStorage, onRefreshFailed để dọn state/điều hướng về login khi
// phiên thật sự chết (refresh token cũng hết hạn/bị thu hồi).
export const configureAuthV2TokenManager = ({ onRefreshed, onRefreshFailed }) => {
  listeners = { onRefreshed, onRefreshFailed }
}

export const setAuthV2Tokens = ({ accessToken: at, refreshToken: rt, expiresIn }) => {
  accessToken = at
  refreshToken = rt
  if (expiresIn) scheduleProactiveRefresh(expiresIn)
}

export const getAuthV2AccessToken = () => accessToken

function scheduleProactiveRefresh(expiresInSeconds) {
  if (proactiveTimer) clearTimeout(proactiveTimer)
  // Chủ động refresh sớm ~60s trước khi access token hết hạn thay vì đợi
  // 1 request thật bị 401 rồi mới refresh — đỡ giật/răng cưa UX (gợi ý
  // từ team backend marketplace-core).
  const delayMs = Math.max((expiresInSeconds - 60) * 1000, 5000)
  proactiveTimer = setTimeout(() => {
    refreshAuthV2().catch(() => {})
  }, delayMs)
}

// Single-flight: nhiều request 401 xảy ra song song TUYỆT ĐỐI không được
// cùng gọi /refresh — backend xoay vòng refresh token mỗi lần refresh,
// dùng lại token cũ (reuse) sẽ bị coi là bất thường và THU HỒI CẢ HỌ
// token của identity đó (đăng xuất mọi phiên/thiết bị).
export const refreshAuthV2 = () => {
  if (refreshPromise) return refreshPromise
  if (!refreshToken) return Promise.reject(new Error('no_refresh_token'))
  refreshPromise = refreshClient
    .post('/refresh', { refresh_token: refreshToken })
    .then(response => {
      const data = response.data
      accessToken = data.access_token
      refreshToken = data.refresh_token
      scheduleProactiveRefresh(data.expires_in)
      if (listeners.onRefreshed) listeners.onRefreshed(data)
      return data
    })
    .catch(error => {
      clearAuthV2TokenManager()
      if (listeners.onRefreshFailed) listeners.onRefreshFailed()
      throw error
    })
    .finally(() => {
      refreshPromise = null
    })
  return refreshPromise
}

export const clearAuthV2TokenManager = () => {
  if (proactiveTimer) clearTimeout(proactiveTimer)
  proactiveTimer = null
  accessToken = null
  refreshToken = null
  refreshPromise = null
}

// Dùng bởi interceptor response của authV2Client/customerV2Client: 401
// (không phải chính request /refresh) → refresh 1 lần (single-flight) →
// gắn lại header → cho gọi lại request gốc đúng 1 lần.
export const retryWithRefreshedToken = (client, error) => {
  const original = error?.config
  const isRefreshCall = original?.url && original.url.includes('/refresh')
  if (!original || original._retriedV2 || isRefreshCall || error?.response?.status !== 401) {
    return null
  }
  original._retriedV2 = true
  return refreshAuthV2().then(data => {
    original.headers = { ...original.headers, Authorization: `Bearer ${data.access_token}` }
    return client(original)
  })
}
