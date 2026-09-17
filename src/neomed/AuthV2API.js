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
  // `contact_name` (người liên hệ, KHÁC `pharmacist_name`) BẮT BUỘC từ
  // quyết định Q-ORG-14 (2026-09-16) — trước đó tài liệu ghi tuỳ chọn.
  registerCustomer = ({ name, address, contactName, contactPhone, pharmacistName, email, docs = [] }) => {
    return customerV2Client.post('/registration', {
      name,
      address,
      contact_name: contactName,
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

  // POST /customer/v1/kyc/documents — thay hẳn luồng media/uploads cũ
  // (FR-KYC-MEDIA đã xong 2026-09-15). Trả {asset_id, put_url, method,
  // headers, expires_at, duplicate}. Gọi được cả khi CHƯA có hồ sơ nhà
  // thuốc (gắn theo identity). asset_id dùng lại trong docs[] của
  // POST /registration hoặc POST /kyc.
  createKycDocumentUpload = ({ mime, size, filename }) => {
    return customerV2Client.post('/kyc/documents', { mime, size, filename })
  }

  confirmKycDocumentUpload = assetId => {
    return customerV2Client.post(`/kyc/documents/${assetId}/confirm`)
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

  // GET /customer/v1/notifications → {items:[{id,kind,title,body,order_id?,read_at?,created_at}]}
  getNotifications = () => {
    return customerV2Client.get('/notifications')
  }

  markNotificationRead = notificationId => {
    return customerV2Client.post(`/notifications/${notificationId}/read`)
  }

  // GET /customer/v1/stores → {items:[store], total} — không cần hồ sơ nhà thuốc
  getStores = () => {
    return customerV2Client.get('/stores')
  }

  // Trang chủ mới (2026-09-17, marketplace-core-21) — layout: tìm kiếm →
  // banner carousel → NCC nổi bật (mỗi NCC 1 banner + dòng SP ngang) →
  // "Gợi ý hôm nay". Cùng guard hiện có (JWT bắt buộc, KHÔNG cần hồ sơ
  // nhà thuốc). Dữ liệu hiện là MOCK do backoffice nhập tay (ảnh
  // placeholder), shape KHÔNG đổi khi backend thay ảnh/dữ liệu thật.
  // CHƯA deploy lên dev-api-mkp.1000m.vn lúc code (đang ở PR #6, chờ
  // review+merge+deploy) — code theo đúng contract, chưa tự verify
  // bằng curl thật. Xem [[marketplace-core-business-model]].
  getHomeBanners = () => {
    return customerV2Client.get('/home-banners')
  }

  getFeaturedSuppliers = () => {
    return customerV2Client.get('/featured-suppliers')
  }

  // GET /customer/v1/suppliers/{id}/products?limit= — đã tự gộp SP từ
  // mọi store đang active của NCC đó, app không cần lo phần đó.
  getSupplierProducts = (supplierId, limit = 10) => {
    return customerV2Client.get(`/suppliers/${supplierId}/products`, { params: { limit } })
  }

  // "Gợi ý hôm nay" — {items:[{id,keyword,product_id?}]}. Có product_id
  // → mở thẳng SP; không có → prefill ô tìm kiếm bằng `keyword`.
  getSearchSuggestions = () => {
    return customerV2Client.get('/search-suggestions')
  }

  // Full-text search xuyên mọi NCC, có bỏ dấu, chỉ SP đang bán — để dành
  // cho batch sau (làm lại màn Search), stub sẵn API cho tiện.
  searchProductsV2 = (q, limit, offset) => {
    return customerV2Client.get('/search', { params: { q, limit, offset } })
  }

  // GET /customer/v1/stores/{id}/products → {items:[{product_id,name,brand,rx,media,price,currency}]}
  // Đổi shape 2026-09-14 (trước là {product_ids:[]}), xem
  // [[marketplace-core-business-model]].
  getStoreProducts = storeId => {
    return customerV2Client.get(`/stores/${storeId}/products`)
  }

  // GET /customer/v1/carts → mọi giỏ đang mở (theo store + theo member soạn)
  getCarts = () => {
    return customerV2Client.get('/carts')
  }

  // GET /customer/v1/stores/{id}/cart?member= — mỗi item kèm
  // name/brand/media/unit_price/line_total; cart có subtotal + min_order_value.
  getStoreCart = (storeId, memberMarketerId) => {
    return customerV2Client.get(`/stores/${storeId}/cart`, {
      params: memberMarketerId ? { member: memberMarketerId } : undefined,
    })
  }

  updateCartItem = (storeId, productId, qty, memberMarketerId) => {
    return customerV2Client.put(`/stores/${storeId}/cart/items/${productId}`, {
      qty,
      member: memberMarketerId,
    })
  }

  deleteCartItem = (storeId, productId, memberMarketerId) => {
    return customerV2Client.delete(`/stores/${storeId}/cart/items/${productId}`, {
      params: memberMarketerId ? { member: memberMarketerId } : undefined,
    })
  }

  // POST /customer/v1/orders {cart_id} → Order — đặt đơn THẬT. 1 giỏ
  // luôn ra đúng 1 đơn (1 store = 1 NCC, Q-STORE-M2, xác nhận
  // marketplace-core-21 2026-09-16). `delivery` bỏ trống được — server
  // tự lấy địa chỉ/tên/SĐT từ hồ sơ nhà thuốc đã đăng ký.
  checkoutCart = cartId => {
    return customerV2Client.post('/orders', { cart_id: cartId })
  }

  // GET /customer/v1/product-messages → {items:[ProductMessage]} — bộ SP marketer gửi
  getProductMessages = () => {
    return customerV2Client.get('/product-messages')
  }

  applyProductMessageToCart = messageId => {
    return customerV2Client.post(`/product-messages/${messageId}/apply-to-cart`)
  }
}

export const AuthV2 = new AuthV2API()
