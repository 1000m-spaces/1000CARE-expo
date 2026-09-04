import axios from 'axios'
import { MARKETPLACE_CORE_BASE } from '~/constants/config'

// Map mã lỗi ổn định (`code`) của backend mới sang message tiếng Việt hiển
// thị được — theo bảng "Mã lỗi toàn hệ thống" trong auth/openapi.yaml.
const ERROR_MESSAGES = {
  invalid_body: 'Dữ liệu gửi lên không hợp lệ',
  ambiguous_context: 'Tài khoản thuộc nhiều nhà thuốc, vui lòng chọn nhà thuốc',
  unauthenticated: 'Vui lòng đăng nhập lại',
  invalid_token: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại',
  invalid_credentials: 'Số điện thoại hoặc mật khẩu không đúng',
  session_invalid: 'Phiên đăng nhập không hợp lệ, vui lòng đăng nhập lại',
  refresh_reuse: 'Phiên đăng nhập không an toàn, vui lòng đăng nhập lại',
  phone_not_verified: 'Số điện thoại chưa được xác thực',
  suspended: 'Tài khoản đã bị khoá',
  not_a_member: 'Tài khoản không thuộc nhà thuốc này',
  insufficient_role: 'Tài khoản không đủ quyền',
  not_found: 'Không tìm thấy',
  identity_not_found: 'Không tìm thấy tài khoản',
  phone_taken: 'Số điện thoại đã được đăng ký',
  invalid_phone: 'Số điện thoại không hợp lệ',
  weak_password: 'Mật khẩu phải từ 8 ký tự trở lên',
  invalid_role: 'Vai trò không hợp lệ',
  otp_mismatch: 'Mã OTP không đúng',
  otp_not_found: 'Mã OTP đã hết hạn hoặc chưa được gửi',
  validation_failed: 'Dữ liệu không hợp lệ',
  otp_resend_too_soon: 'Vui lòng chờ trước khi gửi lại mã',
  otp_too_many_retries: 'Nhập sai OTP quá số lần cho phép',
  locked_out: 'Tài khoản tạm khoá do đăng nhập sai nhiều lần',
  rate_limited: 'Thao tác quá nhanh, vui lòng thử lại sau',
}

// Chuẩn hoá lỗi RFC 9457 (application/problem+json) của backend mới thành
// { code, message } — khác hẳn shape lỗi (mã số) của backend cũ nên tách
// hàm riêng thay vì dùng chung `handleError` trong utils/error.js.
export const parseAuthV2Error = error => {
  const problem = error?.response?.data
  const code = problem?.code
  const message = ERROR_MESSAGES[code] || problem?.detail || problem?.title || 'Có lỗi xảy ra, vui lòng thử lại'
  return { code, message, status: error?.response?.status }
}

const authV2Client = axios.create({
  baseURL: `${MARKETPLACE_CORE_BASE}/auth/v1`,
  timeout: 30000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

let accessToken = null

export const setAuthV2Token = token => {
  accessToken = token
  if (token) {
    authV2Client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete authV2Client.defaults.headers.common['Authorization']
  }
}

export const getAuthV2Token = () => accessToken

authV2Client.interceptors.response.use(
  response => response.data,
  error => {
    if (__DEV__) {
      console.log('❌ AuthV2 API Error:', error?.response?.status, error?.response?.data)
    }
    return Promise.reject(parseAuthV2Error(error))
  },
)

export default authV2Client
