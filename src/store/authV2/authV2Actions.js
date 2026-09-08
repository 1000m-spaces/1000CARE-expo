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

export const membershipsV2 = () => ({ type: AUTH_V2.MEMBERSHIPS_REQUEST })

export const getKycV2 = () => ({ type: AUTH_V2.GET_KYC_REQUEST })

export const submitKycV2 = docs => ({
  type: AUTH_V2.SUBMIT_KYC_REQUEST,
  payload: { docs },
})

export const resetSubmitKycV2 = () => ({ type: 'RESET_AUTH_V2_SUBMIT_KYC' })

// asset: { uri, mime, sizeBytes, fileName, kind } — kind = loại giấy tờ
// (vd 'gpp') dùng để gắn vào docs[].kind lúc submit KYC.
export const uploadKycDocV2 = asset => ({
  type: AUTH_V2.UPLOAD_KYC_DOC_REQUEST,
  payload: { asset },
})

export const resetUploadKycDocV2 = () => ({ type: 'RESET_AUTH_V2_UPLOAD_KYC_DOC' })

export const logoutV2 = () => ({ type: AUTH_V2.LOGOUT_REQUEST })
