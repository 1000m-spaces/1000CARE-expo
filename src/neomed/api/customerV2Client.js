import axios from 'axios'
import { MARKETPLACE_CORE_BASE } from '~/constants/config'
import { parseAuthV2Error } from './authV2Client'
import { getAuthV2AccessToken, retryWithRefreshedToken } from './authV2TokenManager'

// BFF `customer/v1` của backend mới — dùng chung access token với
// authV2Client (cùng 1 identity, cùng JWT) qua authV2TokenManager.
const customerV2Client = axios.create({
  baseURL: `${MARKETPLACE_CORE_BASE}/customer/v1`,
  timeout: 30000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

// Token đọc trực tiếp từ authV2TokenManager (nguồn sự thật duy nhất) ở
// mỗi request — refresh xong (từ bất kỳ client nào) có hiệu lực ngay.
customerV2Client.interceptors.request.use(config => {
  const token = getAuthV2AccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let activeCustomerId = null

// Ngữ cảnh nhà thuốc đang chọn khi 1 identity thuộc nhiều nhà thuốc —
// thiếu header này mà thuộc >1 nhà thuốc thì API trả 400 ambiguous_context.
export const setActiveCustomerId = customerId => {
  activeCustomerId = customerId
  if (customerId) {
    customerV2Client.defaults.headers.common['X-Customer-Id'] = customerId
  } else {
    delete customerV2Client.defaults.headers.common['X-Customer-Id']
  }
}

export const getActiveCustomerId = () => activeCustomerId

customerV2Client.interceptors.response.use(
  response => response.data,
  error => {
    const retry = retryWithRefreshedToken(customerV2Client, error)
    if (retry) return retry.catch(() => Promise.reject(parseAuthV2Error(error)))

    if (__DEV__) {
      console.log('❌ CustomerV2 API Error:', error?.response?.status, error?.response?.data)
    }
    return Promise.reject(parseAuthV2Error(error))
  },
)

export default customerV2Client
