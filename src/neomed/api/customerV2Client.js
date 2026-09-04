import axios from 'axios'
import { MARKETPLACE_CORE_BASE } from '~/constants/config'
import { parseAuthV2Error } from './authV2Client'

// BFF `customer/v1` của backend mới — hiện chỉ có GET /me ổn định (xem
// [[marketplace-core-backend-migration]]). Dùng chung access token với
// authV2Client (cùng 1 identity, cùng JWT).
const customerV2Client = axios.create({
  baseURL: `${MARKETPLACE_CORE_BASE}/customer/v1`,
  timeout: 30000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const setCustomerV2Token = token => {
  if (token) {
    customerV2Client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete customerV2Client.defaults.headers.common['Authorization']
  }
}

// Ngữ cảnh nhà thuốc đang chọn khi 1 identity thuộc nhiều nhà thuốc —
// thiếu header này mà thuộc >1 nhà thuốc thì API trả 400 ambiguous_context.
export const setActiveCustomerId = customerId => {
  if (customerId) {
    customerV2Client.defaults.headers.common['X-Customer-Id'] = customerId
  } else {
    delete customerV2Client.defaults.headers.common['X-Customer-Id']
  }
}

customerV2Client.interceptors.response.use(
  response => response.data,
  error => {
    if (__DEV__) {
      console.log('❌ CustomerV2 API Error:', error?.response?.status, error?.response?.data)
    }
    return Promise.reject(parseAuthV2Error(error))
  },
)

export default customerV2Client
