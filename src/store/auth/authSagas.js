import { takeLatest, call, put } from 'redux-saga/effects'
import { NEOMED } from '../../store/actionsTypes'
import * as APINeoMed from '../../neomed'
import { asyncStorage, store } from '../index'
import { getAuthStore } from './authSelector'

function* login({ payload }) {
  console.log('login saga')
  try {
    yield put({ type: NEOMED.LOGIN_LOADING })
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Authentication.login },
      payload.username, payload.password, payload.rememberMe)
    console.log('response Login', data)
    APINeoMed.updateToken(data.data.token)
    APINeoMed.Authentication.setToken(data.data.token)
    yield put({
      type: NEOMED.LOGIN_SUCCESS,
      payload: {
        token: data.data.token,
        refreshToken: data.data.refresh_token,
        userId: data.data.user_id,
      },
    })
    yield put({
      type: NEOMED.GET_PROFILE_REQUEST,
      payload: {
        id: data.data.user_id,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.LOGIN_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* loginPhone({ payload }) {
  console.log('loginPhoneloginPhoneloginPhoneloginPhoneloginPhonepassssssss:', payload)
  try {
    yield put({ type: NEOMED.LOGIN_PHONE_LOADING })
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Register.loginByPhone },
      payload.phone, payload.rememberMe)
    console.log('response', data)
    yield put({
      type: NEOMED.LOGIN_PHONE_SUCCESS,
      payload: {
        requestId: data.request_id,
      },
    })

  } catch (error) {
    yield put({
      type: NEOMED.LOGIN_PHONE_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* deleteAccountOtpPass({ payload }) {
  console.log('bienbuonbuuccccccccccccc:', payload)
  try {
    yield put({ type: NEOMED.DELETE_ACCOUNT_OTP_LOADING })
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Register.loginByPhone },
      payload.phone, payload.rememberMe)
    yield put({
      type: NEOMED.DELETE_ACCOUNT_OTP_SUCCESS,
      payload: {
        requestId: data.request_id,
      },
    })

  } catch (error) {
    yield put({
      type: NEOMED.DELETE_ACCOUNT_OTP_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* confirmLogin({ payload }) {
  try {
    yield put({ type: NEOMED.CONFIRM_LOGIN_LOADING })
    const data = yield call({ content: APINeoMed, fn: APINeoMed.Register.confirmLoginByPhone },
      payload.requestId, payload.otp)
    console.log('confirmLogin response', data)
    try {
      console.log('data.Token', APINeoMed.Authentication)
      APINeoMed.updateToken(data.Token)
      APINeoMed.Authentication.setToken(data.Token)
    } catch (error) {
      console.log('error', error)
    }
    asyncStorage.setRefreshToken(data.RefreshToken)
    asyncStorage.setToken(data.Token)
    asyncStorage.setUser({
      id: data.UserId,
    })
    yield put({
      type: NEOMED.CONFIRM_LOGIN_SUCCESS,
      payload: {
        token: data.Token,
        refreshToken: data.RefreshToken,
        userId: data.UserId,
      },
    })
    yield put({
      type: NEOMED.GET_PROFILE_REQUEST,
      payload: {
        id: data.UserId,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.CONFIRM_LOGIN_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* confirmFirebaseToken({ payload }) {
  try {
    yield put({ type: NEOMED.CONFIRM_LOGIN_LOADING })
    const data = yield call({ content: APINeoMed, fn: APINeoMed.Register.loginFirebaseToken },
      payload.token)
    console.log('confirmLogin response', data)
    APINeoMed.updateToken(data.Token)
    APINeoMed.Authentication.setToken(data.Token)
    asyncStorage.setRefreshToken(data.RefreshToken)
    asyncStorage.setToken(data.Token)
    asyncStorage.setUser({
      id: data.UserId,
    })
    yield put({
      type: NEOMED.CONFIRM_LOGIN_SUCCESS,
      payload: {
        token: data.Token,
        refreshToken: data.RefreshToken,
        userId: data.UserId,
      },
    })
    yield put({
      type: NEOMED.GET_PROFILE_REQUEST,
      payload: {
        id: data.UserId,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.CONFIRM_LOGIN_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* refreshTokenFunc({ payload }) {
  const now = Math.floor(new Date().getTime() / 1000)
  try {
    const state = store.getState()
    const { lastRefreshToken } = getAuthStore(state)
    console.log('now - lastRefreshToken', now - lastRefreshToken, state, getAuthStore(state))
    if ((!payload || !payload.force) && (now - lastRefreshToken < 5 * 60)) {
      return
    }
    const refreshToken = yield asyncStorage.getRefreshToken()
    const token = yield asyncStorage.getToken()
    console.log('BIENNNNNNNNNNNNNNN:', token)
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Authentication.refreshToken },
      {
        refreshToken,
        token,
      })
    APINeoMed.updateToken(data.data.token)
    APINeoMed.Authentication.setToken(data.data.token)
    asyncStorage.setToken(data.data.token)
    yield put({
      type: NEOMED.REFRESH_TOKEN_SUCCESS,
      payload: {
        data: data.data,
      },
    })
  } catch (error) {
    console.log(error)
    APINeoMed.updateToken('')
    APINeoMed.Authentication.setToken('')
    yield asyncStorage.clearAuthSession()
    yield put({
      type: NEOMED.REFRESH_TOKEN_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* logout() {
  const state = store.getState()
  yield put({
    type: NEOMED.UN_REGISTER_FCM_REQUEST,
    payload: {
      tokenFcm: state.noti.tokenFcm,
    },
  })
  yield put({
    type: NEOMED.LOGIN_RESET_REQUEST,
  })
  APINeoMed.updateToken('')
  APINeoMed.Authentication.setToken('')
  asyncStorage.clearAll()
  yield put({
    type: 'USER_RESET',
  })
  yield put({
    type: 'AUTH_RESET',
  })
  yield put({
    type: 'CART_RESET',
  })
}

function* getListPhoneByPasFirebase({ payload }) {
  yield put({
    type: NEOMED.GET_LIST_PHONE_BYPASS_FIREBASE_LOADING,
  })
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Register.getListPhoneByPasFirebase },
    )
    console.log('data', data)
    yield put({
      type: NEOMED.GET_LIST_PHONE_BYPASS_FIREBASE_SUCCESS,
      payload: {
        listPhoneByPass: data.phones,
      },
    })
  } catch (error) {
    console.log(error)
    yield put({
      type: NEOMED.GET_LIST_PHONE_BYPASS_FIREBASE_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* loginMobile({ payload }) {
  console.log('loginMobileloginMobileloginMobileloginMobile:', payload)
  try {
    yield put({ type: NEOMED.LOGIN_PHONE_LOADING })
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Register.loginMobile },
      payload.phone, payload.rememberMe)
    console.log('response', data)
    yield put({
      type: NEOMED.LOGIN_PHONE_SUCCESS,
      payload: {
        requestId: data.request_id,
        otpToken: data.otp_token,
      },
    })

  } catch (error) {
    yield put({
      type: NEOMED.LOGIN_PHONE_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* deleteAcountOtp({ payload }) {
  console.log('djaldjlajflasjflsjflskflskjflksjfslkfjslkjflsksdkfk:', payload)
  try {
    yield put({ type: NEOMED.DELETE_ACCOUNT_OTP_LOADING })
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Register.loginMobile },
      payload.phone, payload.rememberMe)
    yield put({
      type: NEOMED.DELETE_ACCOUNT_OTP_SUCCESS,
      payload: {
        requestId: data.request_id,
        otpToken: data.otp_token,
      },
    })

  } catch (error) {
    yield put({
      type: NEOMED.DELETE_ACCOUNT_OTP_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* confirmLoginMobile({ payload }) {
  try {
    yield put({ type: NEOMED.CONFIRM_LOGIN_LOADING })
    const state = store.getState()
    const data = yield call({ content: APINeoMed, fn: APINeoMed.Register.confirmLoginMobile },
      state.auth.otpToken, payload.requestId, payload.otp)
    console.log('confirmLogin response', data)
    APINeoMed.updateToken(data.Token)
    APINeoMed.Authentication.setToken(data.Token)
    asyncStorage.setRefreshToken(data.RefreshToken)
    asyncStorage.setToken(data.Token)
    asyncStorage.setUser({
      id: data.UserId,
    })
    yield put({
      type: NEOMED.CONFIRM_LOGIN_SUCCESS,
      payload: {
        token: data.Token,
        refreshToken: data.RefreshToken,
        userId: data.UserId,
      },
    })
    yield put({
      type: NEOMED.GET_PROFILE_REQUEST,
      payload: {
        id: data.UserId,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.CONFIRM_LOGIN_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* confirmDeleteAcountOtp({ payload }) {
  try {
    yield put({ type: NEOMED.CONFIRM_DELETE_ACOUNT_OTP_LOADING })
    const state = store.getState()
    yield call({ content: APINeoMed, fn: APINeoMed.Register.confirmLoginMobile },
      state.auth.deleteOtpToken, payload.requestId, payload.otp)
    yield put({
      type: NEOMED.CONFIRM_DELETE_ACOUNT_OTP_SUCCESS,
    })
  } catch (error) {
    yield put({
      type: NEOMED.CONFIRM_DELETE_ACOUNT_OTP_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherSaga() {
  yield takeLatest(NEOMED.LOGIN_REQUEST, login)
  yield takeLatest(NEOMED.LOGIN_PHONE_REQUEST, loginPhone)
  yield takeLatest(NEOMED.DELETE_ACCOUNT_OTP_PASS_REQUEST, deleteAccountOtpPass)
  yield takeLatest(NEOMED.CONFIRM_LOGIN_FIREBASE_REQUEST, confirmFirebaseToken)
  yield takeLatest(NEOMED.CONFIRM_LOGIN_REQUEST, confirmLogin)
  yield takeLatest(NEOMED.GET_LIST_PHONE_BYPASS_FIREBASE_REQUEST, getListPhoneByPasFirebase)
  yield takeLatest(NEOMED.REFRESH_TOKEN_REQUEST, refreshTokenFunc)
  yield takeLatest(NEOMED.LOGIN_MOBILE_REQUEST, loginMobile)
  yield takeLatest(NEOMED.DELETE_ACCOUNT_OTP_REQUEST, deleteAcountOtp)
  yield takeLatest(NEOMED.CONFIRM_LOGIN_MOBILE_REQUEST, confirmLoginMobile)
  yield takeLatest(NEOMED.CONFIRM_DELETE_ACOUNT_OTP_REQUEST, confirmDeleteAcountOtp)

  yield takeLatest(NEOMED.LOGOUT_REQUEST, logout)
}
