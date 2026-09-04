import { takeLatest, call, put } from 'redux-saga/effects'
import { AUTH_V2 } from '../actionsTypes'
import { AuthV2 } from '~/neomed/AuthV2API'
import { asyncStorage } from '../index'

function* register({ payload }) {
  try {
    yield put({ type: AUTH_V2.REGISTER_LOADING })
    yield call({ content: AuthV2, fn: AuthV2.register }, payload.phone, payload.password)
    yield put({ type: AUTH_V2.REGISTER_SUCCESS, payload: { phone: payload.phone } })
  } catch (error) {
    yield put({ type: AUTH_V2.REGISTER_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* verifyPhone({ payload }) {
  try {
    yield put({ type: AUTH_V2.VERIFY_PHONE_LOADING })
    yield call({ content: AuthV2, fn: AuthV2.verifyPhone }, payload.phone, payload.code)
    yield put({ type: AUTH_V2.VERIFY_PHONE_SUCCESS })
  } catch (error) {
    yield put({ type: AUTH_V2.VERIFY_PHONE_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* resendOtp({ payload }) {
  try {
    yield call({ content: AuthV2, fn: AuthV2.resendOtp }, payload.phone)
    yield put({ type: AUTH_V2.RESEND_OTP_SUCCESS })
  } catch (error) {
    yield put({ type: AUTH_V2.RESEND_OTP_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* login({ payload }) {
  try {
    yield put({ type: AUTH_V2.LOGIN_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.login }, payload.phone, payload.password)
    AuthV2.updateToken(data.access_token)
    yield asyncStorage.setV2AccessToken(data.access_token)
    yield asyncStorage.setV2RefreshToken(data.refresh_token)
    yield put({
      type: AUTH_V2.LOGIN_SUCCESS,
      payload: { accessToken: data.access_token, refreshToken: data.refresh_token },
    })
    yield put({ type: AUTH_V2.ME_REQUEST })
  } catch (error) {
    yield put({ type: AUTH_V2.LOGIN_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* me() {
  try {
    yield put({ type: AUTH_V2.ME_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.me })
    // Chỉ 1 nhà thuốc thì API không bắt buộc header X-Customer-Id, nhưng
    // cứ set sẵn active_customer để lỡ sau này thuộc nhiều nhà thuốc thì
    // các request tiếp theo vẫn đúng ngữ cảnh.
    if (data.active_customer) {
      AuthV2.setActiveCustomerId(data.active_customer)
      yield asyncStorage.setV2ActiveCustomerId(data.active_customer)
    }
    yield put({
      type: AUTH_V2.ME_SUCCESS,
      payload: {
        identity: data.identity,
        activeCustomer: data.active_customer,
        role: data.role,
        allMemberships: data.all_memberships,
      },
    })
  } catch (error) {
    yield put({ type: AUTH_V2.ME_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* logout() {
  try {
    const refreshToken = yield asyncStorage.getV2RefreshToken()
    if (refreshToken) {
      yield call({ content: AuthV2, fn: AuthV2.logout }, refreshToken)
    }
  } catch (error) {
    // logout là idempotent phía server, bỏ qua lỗi mạng
  }
  AuthV2.updateToken('')
  yield asyncStorage.clearAuthV2Session()
}

export default function* watcherSaga() {
  yield takeLatest(AUTH_V2.REGISTER_REQUEST, register)
  yield takeLatest(AUTH_V2.VERIFY_PHONE_REQUEST, verifyPhone)
  yield takeLatest(AUTH_V2.RESEND_OTP_REQUEST, resendOtp)
  yield takeLatest(AUTH_V2.LOGIN_REQUEST, login)
  yield takeLatest(AUTH_V2.ME_REQUEST, me)
  yield takeLatest(AUTH_V2.LOGOUT_REQUEST, logout)
}
