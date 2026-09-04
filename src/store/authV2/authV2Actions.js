import { AUTH_V2 } from '../actionsTypes'

export const registerV2 = (phone, password) => ({
  type: AUTH_V2.REGISTER_REQUEST,
  payload: { phone, password },
})

export const resetRegisterV2 = () => ({ type: 'RESET_AUTH_V2_REGISTER' })

export const verifyPhoneV2 = (phone, code) => ({
  type: AUTH_V2.VERIFY_PHONE_REQUEST,
  payload: { phone, code },
})

export const resetVerifyPhoneV2 = () => ({ type: 'RESET_AUTH_V2_VERIFY_PHONE' })

export const resendOtpV2 = phone => ({
  type: AUTH_V2.RESEND_OTP_REQUEST,
  payload: { phone },
})

export const loginV2 = (phone, password) => ({
  type: AUTH_V2.LOGIN_REQUEST,
  payload: { phone, password },
})

export const resetLoginV2 = () => ({ type: 'RESET_AUTH_V2_LOGIN' })

export const meV2 = () => ({ type: AUTH_V2.ME_REQUEST })

export const logoutV2 = () => ({ type: AUTH_V2.LOGOUT_REQUEST })
