import { takeLatest, call, put, select } from 'redux-saga/effects'
import { AUTH_V2 } from '../actionsTypes'
import { AuthV2 } from '~/neomed/AuthV2API'
import { asyncStorage } from '../index'
import { getMeV2 } from './authV2Selector'

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
    // Không gọi thẳng /customer/v1/me ở đây nữa — identity vừa login có
    // thể CHƯA được backoffice gắn vào nhà thuốc nào, gọi /me lúc đó
    // trả 403 not_a_member. Phải check /auth/v1/memberships trước (luôn
    // 200 dù chưa có membership), rồi mới quyết định gọi /me hay không.
    yield put({ type: AUTH_V2.MEMBERSHIPS_REQUEST })
  } catch (error) {
    yield put({ type: AUTH_V2.LOGIN_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* memberships() {
  try {
    yield put({ type: AUTH_V2.MEMBERSHIPS_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.memberships })
    yield put({ type: AUTH_V2.MEMBERSHIPS_SUCCESS, payload: { memberships: data } })
    // Có ít nhất 1 nhà thuốc đã duyệt thì mới gọi /me — gọi sớm hơn sẽ
    // ăn 403 not_a_member (xem [[marketplace-core-business-model]]).
    if (Array.isArray(data?.customers) && data.customers.length > 0) {
      yield put({ type: AUTH_V2.ME_REQUEST })
    }
  } catch (error) {
    yield put({ type: AUTH_V2.MEMBERSHIPS_FAILURE, payload: { errorMsg: error?.message } })
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

function* registerCustomer({ payload }) {
  try {
    yield put({ type: AUTH_V2.REGISTER_CUSTOMER_LOADING })
    yield call({ content: AuthV2, fn: AuthV2.registerCustomer }, payload)
    yield put({ type: AUTH_V2.REGISTER_CUSTOMER_SUCCESS })
    // Đăng ký xong nhiều khả năng membership có ngay (owner) — check lại
    // để tự chuyển màn nếu AccountPendingApproval đang lắng nghe.
    yield put({ type: AUTH_V2.MEMBERSHIPS_REQUEST })
  } catch (error) {
    yield put({ type: AUTH_V2.REGISTER_CUSTOMER_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* getKyc() {
  try {
    yield put({ type: AUTH_V2.GET_KYC_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getKyc })
    yield put({ type: AUTH_V2.GET_KYC_SUCCESS, payload: { kyc: data } })
  } catch (error) {
    yield put({ type: AUTH_V2.GET_KYC_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* submitKyc({ payload }) {
  try {
    yield put({ type: AUTH_V2.SUBMIT_KYC_LOADING })
    yield call({ content: AuthV2, fn: AuthV2.submitKyc }, payload.docs)
    yield put({ type: AUTH_V2.SUBMIT_KYC_SUCCESS })
    yield put({ type: AUTH_V2.GET_KYC_REQUEST })
  } catch (error) {
    yield put({ type: AUTH_V2.SUBMIT_KYC_FAILURE, payload: { errorMsg: error?.message } })
  }
}

// Upload 1 ảnh giấy tờ KYC theo đúng luồng 2 bước của module media (xem
// docs/media-module-design.md — LƯU Ý purpose='legal_doc' còn ghi "còn
// nợ" ở backend tại 2026-09-07, có thể lỗi thật, không mock ở đây).
function* uploadKycDoc({ payload }) {
  const { asset } = payload
  try {
    yield put({ type: AUTH_V2.UPLOAD_KYC_DOC_LOADING })
    const me = yield select(getMeV2)
    const upload = yield call(
      { content: AuthV2, fn: AuthV2.createMediaUpload },
      {
        ownerKind: 'customer',
        ownerId: me.activeCustomer,
        purpose: 'legal_doc',
        mime: asset.mime || 'image/jpeg',
        sizeBytes: asset.sizeBytes || 0,
        originalName: asset.fileName || 'gpp.jpg',
      },
    )
    // PUT thẳng file lên presigned URL (object storage), không qua BFF.
    const fileResponse = yield call(fetch, asset.uri)
    const blob = yield call([fileResponse, fileResponse.blob])
    yield call(fetch, upload.upload_url, {
      method: 'PUT',
      headers: { 'Content-Type': asset.mime || 'image/jpeg', ...(upload.headers || {}) },
      body: blob,
    })
    yield call({ content: AuthV2, fn: AuthV2.confirmMediaUpload }, upload.asset_id)
    yield put({
      type: AUTH_V2.UPLOAD_KYC_DOC_SUCCESS,
      payload: { doc: { assetId: upload.asset_id, kind: asset.kind, previewUri: asset.uri } },
    })
  } catch (error) {
    yield put({ type: AUTH_V2.UPLOAD_KYC_DOC_FAILURE, payload: { errorMsg: error?.message || 'Tải ảnh lên thất bại' } })
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
  yield takeLatest(AUTH_V2.MEMBERSHIPS_REQUEST, memberships)
  yield takeLatest(AUTH_V2.REGISTER_CUSTOMER_REQUEST, registerCustomer)
  yield takeLatest(AUTH_V2.GET_KYC_REQUEST, getKyc)
  yield takeLatest(AUTH_V2.SUBMIT_KYC_REQUEST, submitKyc)
  yield takeLatest(AUTH_V2.UPLOAD_KYC_DOC_REQUEST, uploadKycDoc)
  yield takeLatest(AUTH_V2.LOGOUT_REQUEST, logout)
}
