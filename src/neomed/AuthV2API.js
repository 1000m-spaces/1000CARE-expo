import authV2Client from './api/authV2Client'
import customerV2Client, { setActiveCustomerId as setActiveCustomerIdOnClient } from './api/customerV2Client'
import { setAuthV2Tokens, clearAuthV2TokenManager, configureAuthV2TokenManager } from './api/authV2TokenManager'

// Client cho backend mới marketplace-core (auth/v1 + customer/v1). Tách
// hẳn khỏi RegisterAPI/AuthAPI (backend cũ) — 2 hệ token không dùng
// chung được. Xem [[marketplace-core-backend-migration]] trong memory.
class AuthV2API {
  // saga gọi 1 lần lúc khởi tạo app để biết lưu token mới vào đâu
  // (asyncStorage) và làm gì khi refresh thất bại hẳn (dọn phiên).
  configureTokenManager(handlers) {
    configureAuthV2TokenManager(handlers)
  }

  // { accessToken, refreshToken, expiresIn } — gọi sau login/refresh
  // thành công. Đặt tại authV2TokenManager (nguồn sự thật duy nhất, cả
  // authV2Client lẫn customerV2Client đều đọc từ đây), tự lên lịch
  // refresh chủ động trước khi hết hạn ~60s.
  setSession({ accessToken, refreshToken, expiresIn }) {
    setAuthV2Tokens({ accessToken, refreshToken, expiresIn })
  }

  clearSession() {
    clearAuthV2TokenManager()
    setActiveCustomerIdOnClient(null)
  }

  setActiveCustomerId(customerId) {
    setActiveCustomerIdOnClient(customerId)
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

  // POST /customer/v1/registration — nhà thuốc TỰ đăng ký (đính chính
  // 2026-09-08: không cần backoffice tạo trước như tài liệu ban đầu nói).
  // Tạo customer + gắn identity hiện tại làm owner, kyc_status='submitted'.
  registerCustomer = ({ name, address, contactPhone, pharmacistName, email, docs = [] }) => {
    return customerV2Client.post('/registration', {
      name,
      address,
      contact_phone: contactPhone,
      pharmacist_name: pharmacistName,
      email,
      docs,
    })
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

  // GET /customer/v1/marketer-links — {items:[{id, marketer_id, source, status, ...}]}
  getMarketerLinks = () => {
    return customerV2Client.get('/marketer-links')
  }

  confirmMarketerLink = linkId => {
    return customerV2Client.post(`/marketer-links/${linkId}/confirm`)
  }

  rejectMarketerLink = linkId => {
    return customerV2Client.post(`/marketer-links/${linkId}/reject`)
  }

  // GET /customer/v1/orders?status= → {items:[Order]} (list, không có `lines`)
  getOrders = status => {
    return customerV2Client.get('/orders', { params: status ? { status } : undefined })
  }

  // GET /customer/v1/orders/{id} → Order (có `lines`)
  getOrderDetail = orderId => {
    return customerV2Client.get(`/orders/${orderId}`)
  }

  cancelOrder = (orderId, reason) => {
    return customerV2Client.post(`/orders/${orderId}/cancel`, { reason })
  }

  acknowledgeOrder = orderId => {
    return customerV2Client.post(`/orders/${orderId}/acknowledge`)
  }
}

export const AuthV2 = new AuthV2API()
