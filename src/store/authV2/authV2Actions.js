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

export const registerCustomerV2 = payload => ({
  type: AUTH_V2.REGISTER_CUSTOMER_REQUEST,
  payload,
})

export const resetRegisterCustomerV2 = () => ({ type: 'RESET_AUTH_V2_REGISTER_CUSTOMER' })

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

export const getMarketerLinksV2 = () => ({ type: AUTH_V2.GET_MARKETER_LINKS_REQUEST })

export const confirmMarketerLinkV2 = linkId => ({
  type: AUTH_V2.CONFIRM_MARKETER_LINK_REQUEST,
  payload: { linkId },
})

export const rejectMarketerLinkV2 = linkId => ({
  type: AUTH_V2.REJECT_MARKETER_LINK_REQUEST,
  payload: { linkId },
})

export const getOrdersListV2 = status => ({
  type: AUTH_V2.GET_ORDERS_V2_REQUEST,
  payload: { status },
})

export const getOrderDetailV2 = orderId => ({
  type: AUTH_V2.GET_ORDER_DETAIL_V2_REQUEST,
  payload: { orderId },
})

export const resetOrderDetailV2 = () => ({ type: 'RESET_AUTH_V2_ORDER_DETAIL' })

export const cancelOrderV2 = (orderId, reason) => ({
  type: AUTH_V2.CANCEL_ORDER_V2_REQUEST,
  payload: { orderId, reason },
})

export const resetCancelOrderV2 = () => ({ type: 'RESET_AUTH_V2_CANCEL_ORDER' })

export const acknowledgeOrderV2 = orderId => ({
  type: AUTH_V2.ACKNOWLEDGE_ORDER_V2_REQUEST,
  payload: { orderId },
})

export const getNotificationsV2 = () => ({ type: AUTH_V2.GET_NOTIFICATIONS_V2_REQUEST })

export const markNotificationReadV2 = notificationId => ({
  type: AUTH_V2.MARK_NOTIFICATION_READ_V2_REQUEST,
  payload: { notificationId },
})

export const logoutV2 = () => ({ type: AUTH_V2.LOGOUT_REQUEST })
