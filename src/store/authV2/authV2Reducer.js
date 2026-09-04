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

    case AUTH_V2.LOGOUT_REQUEST:
    case 'AUTH_V2_RESET':
      return initialState

    default:
      return state
  }
}
