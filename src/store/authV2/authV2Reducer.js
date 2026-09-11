import Status from '../../common/Status/Status'
import { AUTH_V2 } from '../../store/actionsTypes'

const initialState = {
  registerStatus: Status.DEFAULT,
  registerErr: '',
  registeredPhone: '',

  verifyPhoneStatus: Status.DEFAULT,
  verifyPhoneErr: '',

  loginStatus: Status.DEFAULT,
  loginErr: '',

  accessToken: '',
  refreshToken: '',
  isLoggedInV2: false,

  meStatus: Status.DEFAULT,
  identity: null,
  activeCustomer: '',
  role: [],
  allMemberships: [],

  // Duyệt user: GET /auth/v1/memberships — customers rỗng = chưa được
  // backoffice gắn vào nhà thuốc nào (xem [[marketplace-core-business-model]]).
  membershipsStatus: Status.DEFAULT,
  memberships: null, // {suppliers[], customers[], marketer?, backoffice?}

  registerCustomerStatus: Status.DEFAULT,
  registerCustomerErr: '',

  kycStatus: Status.DEFAULT,
  kyc: null, // {kyc_status, kyc_note, docs[]}

  submitKycStatus: Status.DEFAULT,
  submitKycErr: '',

  uploadKycDocStatus: Status.DEFAULT,
  uploadKycDocErr: '',
  uploadedKycDocs: [], // [{assetId, kind, previewUri}] tích luỹ qua nhiều lần upload

  marketerLinksStatus: Status.DEFAULT,
  marketerLinks: [], // [{id, marketer_id, source, status, ...}]
  marketerLinkActionStatus: {}, // { [linkId]: Status } — trạng thái confirm/reject riêng từng dòng

  ordersV2Status: Status.DEFAULT,
  ordersV2: [], // list — Order[] (không có `lines`)
  orderDetailV2Status: Status.DEFAULT,
  orderDetailV2: null, // Order đầy đủ (có `lines`)
  cancelOrderV2Status: Status.DEFAULT,
  cancelOrderV2Err: '',

  notificationsV2Status: Status.DEFAULT,
  notificationsV2: [], // [{id, kind, title, body, order_id?, read_at?, created_at}]
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_V2.REGISTER_LOADING:
      return { ...state, registerStatus: Status.LOADING, registerErr: '' }
    case AUTH_V2.REGISTER_SUCCESS:
      return { ...state, registerStatus: Status.SUCCESS, registeredPhone: payload.phone }
    case AUTH_V2.REGISTER_FAILURE:
      return { ...state, registerStatus: Status.ERROR, registerErr: payload.errorMsg }
    case 'RESET_AUTH_V2_REGISTER':
      return { ...state, registerStatus: Status.DEFAULT, registerErr: '' }

    case AUTH_V2.VERIFY_PHONE_LOADING:
      return { ...state, verifyPhoneStatus: Status.LOADING, verifyPhoneErr: '' }
    case AUTH_V2.VERIFY_PHONE_SUCCESS:
      return { ...state, verifyPhoneStatus: Status.SUCCESS }
    case AUTH_V2.VERIFY_PHONE_FAILURE:
      return { ...state, verifyPhoneStatus: Status.ERROR, verifyPhoneErr: payload.errorMsg }
    case 'RESET_AUTH_V2_VERIFY_PHONE':
      return { ...state, verifyPhoneStatus: Status.DEFAULT, verifyPhoneErr: '' }

    case AUTH_V2.LOGIN_LOADING:
      return { ...state, loginStatus: Status.LOADING, loginErr: '', isLoggedInV2: false }
    case AUTH_V2.LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: Status.SUCCESS,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        isLoggedInV2: true,
      }
    case AUTH_V2.LOGIN_FAILURE:
      return { ...state, loginStatus: Status.ERROR, loginErr: payload.errorMsg, isLoggedInV2: false }
    case 'RESET_AUTH_V2_LOGIN':
      return { ...state, loginStatus: Status.DEFAULT, loginErr: '' }

    case AUTH_V2.ME_LOADING:
      return { ...state, meStatus: Status.LOADING }
    case AUTH_V2.ME_SUCCESS:
      return {
        ...state,
        meStatus: Status.SUCCESS,
        identity: payload.identity,
        activeCustomer: payload.activeCustomer,
        role: payload.role,
        allMemberships: payload.allMemberships,
      }
    case AUTH_V2.ME_FAILURE:
      return { ...state, meStatus: Status.ERROR }

    case AUTH_V2.MEMBERSHIPS_LOADING:
      return { ...state, membershipsStatus: Status.LOADING }
    case AUTH_V2.MEMBERSHIPS_SUCCESS:
      return { ...state, membershipsStatus: Status.SUCCESS, memberships: payload.memberships }
    case AUTH_V2.MEMBERSHIPS_FAILURE:
      return { ...state, membershipsStatus: Status.ERROR }

    case AUTH_V2.REGISTER_CUSTOMER_LOADING:
      return { ...state, registerCustomerStatus: Status.LOADING, registerCustomerErr: '' }
    case AUTH_V2.REGISTER_CUSTOMER_SUCCESS:
      return { ...state, registerCustomerStatus: Status.SUCCESS }
    case AUTH_V2.REGISTER_CUSTOMER_FAILURE:
      return { ...state, registerCustomerStatus: Status.ERROR, registerCustomerErr: payload.errorMsg }
    case 'RESET_AUTH_V2_REGISTER_CUSTOMER':
      return { ...state, registerCustomerStatus: Status.DEFAULT, registerCustomerErr: '' }

    case AUTH_V2.GET_KYC_LOADING:
      return { ...state, kycStatus: Status.LOADING }
    case AUTH_V2.GET_KYC_SUCCESS:
      return { ...state, kycStatus: Status.SUCCESS, kyc: payload.kyc }
    case AUTH_V2.GET_KYC_FAILURE:
      return { ...state, kycStatus: Status.ERROR }

    case AUTH_V2.SUBMIT_KYC_LOADING:
      return { ...state, submitKycStatus: Status.LOADING, submitKycErr: '' }
    case AUTH_V2.SUBMIT_KYC_SUCCESS:
      return { ...state, submitKycStatus: Status.SUCCESS }
    case AUTH_V2.SUBMIT_KYC_FAILURE:
      return { ...state, submitKycStatus: Status.ERROR, submitKycErr: payload.errorMsg }
    case 'RESET_AUTH_V2_SUBMIT_KYC':
      return { ...state, submitKycStatus: Status.DEFAULT, submitKycErr: '' }

    case AUTH_V2.UPLOAD_KYC_DOC_LOADING:
      return { ...state, uploadKycDocStatus: Status.LOADING, uploadKycDocErr: '' }
    case AUTH_V2.UPLOAD_KYC_DOC_SUCCESS:
      return {
        ...state,
        uploadKycDocStatus: Status.SUCCESS,
        uploadedKycDocs: [...state.uploadedKycDocs, payload.doc],
      }
    case AUTH_V2.UPLOAD_KYC_DOC_FAILURE:
      return { ...state, uploadKycDocStatus: Status.ERROR, uploadKycDocErr: payload.errorMsg }
    case 'RESET_AUTH_V2_UPLOAD_KYC_DOC':
      return { ...state, uploadKycDocStatus: Status.DEFAULT, uploadKycDocErr: '' }

    case AUTH_V2.GET_MARKETER_LINKS_LOADING:
      return { ...state, marketerLinksStatus: Status.LOADING }
    case AUTH_V2.GET_MARKETER_LINKS_SUCCESS:
      return { ...state, marketerLinksStatus: Status.SUCCESS, marketerLinks: payload.items }
    case AUTH_V2.GET_MARKETER_LINKS_FAILURE:
      return { ...state, marketerLinksStatus: Status.ERROR }

    case AUTH_V2.CONFIRM_MARKETER_LINK_LOADING:
    case AUTH_V2.REJECT_MARKETER_LINK_LOADING:
      return {
        ...state,
        marketerLinkActionStatus: { ...state.marketerLinkActionStatus, [payload.linkId]: Status.LOADING },
      }
    case AUTH_V2.CONFIRM_MARKETER_LINK_SUCCESS:
      return {
        ...state,
        marketerLinkActionStatus: { ...state.marketerLinkActionStatus, [payload.linkId]: Status.SUCCESS },
        marketerLinks: state.marketerLinks.map(item =>
          item.id === payload.linkId ? { ...item, status: 'confirmed' } : item,
        ),
      }
    case AUTH_V2.REJECT_MARKETER_LINK_SUCCESS:
      return {
        ...state,
        marketerLinkActionStatus: { ...state.marketerLinkActionStatus, [payload.linkId]: Status.SUCCESS },
        marketerLinks: state.marketerLinks.map(item =>
          item.id === payload.linkId ? { ...item, status: 'rejected' } : item,
        ),
      }
    case AUTH_V2.CONFIRM_MARKETER_LINK_FAILURE:
    case AUTH_V2.REJECT_MARKETER_LINK_FAILURE:
      return {
        ...state,
        marketerLinkActionStatus: { ...state.marketerLinkActionStatus, [payload.linkId]: Status.ERROR },
      }

    case AUTH_V2.GET_ORDERS_V2_LOADING:
      return { ...state, ordersV2Status: Status.LOADING }
    case AUTH_V2.GET_ORDERS_V2_SUCCESS:
      return { ...state, ordersV2Status: Status.SUCCESS, ordersV2: payload.items }
    case AUTH_V2.GET_ORDERS_V2_FAILURE:
      return { ...state, ordersV2Status: Status.ERROR }

    case AUTH_V2.GET_ORDER_DETAIL_V2_LOADING:
      return { ...state, orderDetailV2Status: Status.LOADING }
    case AUTH_V2.GET_ORDER_DETAIL_V2_SUCCESS:
      return { ...state, orderDetailV2Status: Status.SUCCESS, orderDetailV2: payload.order }
    case AUTH_V2.GET_ORDER_DETAIL_V2_FAILURE:
      return { ...state, orderDetailV2Status: Status.ERROR }
    case 'RESET_AUTH_V2_ORDER_DETAIL':
      return { ...state, orderDetailV2Status: Status.DEFAULT, orderDetailV2: null }

    case AUTH_V2.CANCEL_ORDER_V2_LOADING:
      return { ...state, cancelOrderV2Status: Status.LOADING, cancelOrderV2Err: '' }
    case AUTH_V2.CANCEL_ORDER_V2_SUCCESS:
      return { ...state, cancelOrderV2Status: Status.SUCCESS, orderDetailV2: payload.order }
    case AUTH_V2.CANCEL_ORDER_V2_FAILURE:
      return { ...state, cancelOrderV2Status: Status.ERROR, cancelOrderV2Err: payload.errorMsg }
    case 'RESET_AUTH_V2_CANCEL_ORDER':
      return { ...state, cancelOrderV2Status: Status.DEFAULT, cancelOrderV2Err: '' }

    case AUTH_V2.ACKNOWLEDGE_ORDER_V2_SUCCESS:
      return {
        ...state,
        orderDetailV2:
          state.orderDetailV2 && state.orderDetailV2.id === payload.orderId
            ? { ...state.orderDetailV2, customer_ack_at: new Date().toISOString() }
            : state.orderDetailV2,
      }

    case AUTH_V2.GET_NOTIFICATIONS_V2_LOADING:
      return { ...state, notificationsV2Status: Status.LOADING }
    case AUTH_V2.GET_NOTIFICATIONS_V2_SUCCESS:
      return { ...state, notificationsV2Status: Status.SUCCESS, notificationsV2: payload.items }
    case AUTH_V2.GET_NOTIFICATIONS_V2_FAILURE:
      return { ...state, notificationsV2Status: Status.ERROR }
    case AUTH_V2.MARK_NOTIFICATION_READ_V2_SUCCESS:
      return {
        ...state,
        notificationsV2: state.notificationsV2.map(item =>
          item.id === payload.notificationId ? { ...item, read_at: new Date().toISOString() } : item,
        ),
      }

    case AUTH_V2.LOGOUT_REQUEST:
    case 'AUTH_V2_RESET':
      return initialState

    default:
      return state
  }
}
