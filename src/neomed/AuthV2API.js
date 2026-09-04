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
}

export const AuthV2 = new AuthV2API()
