import authV2Client, { setAuthV2Token } from './api/authV2Client'
import customerV2Client, { setCustomerV2Token, setActiveCustomerId } from './api/customerV2Client'

// Client cho backend mới marketplace-core (auth/v1 + customer/v1). Tách
// hẳn khỏi RegisterAPI/AuthAPI (backend cũ) — 2 hệ token không dùng
// chung được. Xem [[marketplace-core-backend-migration]] trong memory.
class AuthV2API {
  updateToken(accessToken) {
    setAuthV2Token(accessToken)
    setCustomerV2Token(accessToken)
  }

  setActiveCustomerId(customerId) {
    setActiveCustomerId(customerId)
  }

  register = (phone, password) => {
    return authV2Client.post('/register', { phone, password })
  }

  verifyPhone = (phone, code) => {
    return authV2Client.post('/phone/verify', { phone, code })
  }

  resendOtp = phone => {
    return authV2Client.post('/phone/resend', { phone })
  }

  login = (phone, password) => {
    return authV2Client.post('/login', { phone, password })
  }

  refresh = refreshToken => {
    return authV2Client.post('/refresh', { refresh_token: refreshToken })
  }

  logout = refreshToken => {
    return authV2Client.post('/logout', { refresh_token: refreshToken })
  }

  me = () => {
    return customerV2Client.get('/me')
  }

  // GET /auth/v1/memberships — app dùng để biết identity đã được backoffice
  // gắn vào 1 nhà thuốc chưa (customers rỗng = chưa duyệt, xem
  // [[marketplace-core-business-model]] mục "Duyệt user").
  memberships = () => {
    return authV2Client.get('/memberships')
  }

  getKyc = () => {
    return customerV2Client.get('/kyc')
  }

  submitKyc = docs => {
    return customerV2Client.post('/kyc', { docs })
  }

  // Upload 2 bước theo docs/media-module-design.md — LƯU Ý: tại
  // 2026-09-07 backend mới triển khai purpose='product_photo'/public,
  // 'legal_doc' (hồ sơ KYC, private) còn ghi "còn nợ" trong chính thiết
  // kế. Gọi thật theo đúng contract, nhưng có thể lỗi nếu backend chưa
  // xử lý purpose này — không mock, để lỗi thật hiện ra qua ErrorView.
  createMediaUpload = ({ ownerKind, ownerId, purpose, mime, sizeBytes, originalName }) => {
    return customerV2Client.post('/media/uploads', {
      owner_kind: ownerKind,
      owner_id: ownerId,
      purpose,
      mime,
      size_bytes: sizeBytes,
      checksum_sha256: '',
      original_name: originalName,
    })
  }

  confirmMediaUpload = uploadId => {
    return customerV2Client.post(`/media/uploads/${uploadId}/confirm`)
  }
}

export const AuthV2 = new AuthV2API()
