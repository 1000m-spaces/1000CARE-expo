import { takeLatest, call, put, select } from 'redux-saga/effects'
import { AUTH_V2 } from '../actionsTypes'
import { AuthV2 } from '~/neomed/AuthV2API'
import { asyncStorage, store } from '../index'
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
    // setSession lưu vào authV2TokenManager (nguồn sự thật duy nhất cho
    // token) + tự lên lịch refresh chủ động trước khi hết hạn ~60s.
    AuthV2.setSession({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: data.expires_in,
    })
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

function* getMarketerLinks() {
  try {
    yield put({ type: AUTH_V2.GET_MARKETER_LINKS_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getMarketerLinks })
    yield put({ type: AUTH_V2.GET_MARKETER_LINKS_SUCCESS, payload: { items: data?.items || [] } })
  } catch (error) {
    yield put({ type: AUTH_V2.GET_MARKETER_LINKS_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* confirmMarketerLink({ payload }) {
  try {
    yield put({ type: AUTH_V2.CONFIRM_MARKETER_LINK_LOADING, payload })
    yield call({ content: AuthV2, fn: AuthV2.confirmMarketerLink }, payload.linkId)
    yield put({ type: AUTH_V2.CONFIRM_MARKETER_LINK_SUCCESS, payload })
  } catch (error) {
    yield put({ type: AUTH_V2.CONFIRM_MARKETER_LINK_FAILURE, payload: { ...payload, errorMsg: error?.message } })
  }
}

function* rejectMarketerLink({ payload }) {
  try {
    yield put({ type: AUTH_V2.REJECT_MARKETER_LINK_LOADING, payload })
    yield call({ content: AuthV2, fn: AuthV2.rejectMarketerLink }, payload.linkId)
    yield put({ type: AUTH_V2.REJECT_MARKETER_LINK_SUCCESS, payload })
  } catch (error) {
    yield put({ type: AUTH_V2.REJECT_MARKETER_LINK_FAILURE, payload: { ...payload, errorMsg: error?.message } })
  }
}

function* getOrdersListSaga({ payload }) {
  try {
    yield put({ type: AUTH_V2.GET_ORDERS_V2_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getOrders }, payload?.status)
    yield put({ type: AUTH_V2.GET_ORDERS_V2_SUCCESS, payload: { items: data?.items || [] } })
  } catch (error) {
    yield put({ type: AUTH_V2.GET_ORDERS_V2_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* getOrderDetailSaga({ payload }) {
  try {
    yield put({ type: AUTH_V2.GET_ORDER_DETAIL_V2_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getOrderDetail }, payload.orderId)
    yield put({ type: AUTH_V2.GET_ORDER_DETAIL_V2_SUCCESS, payload: { order: data } })
  } catch (error) {
    yield put({ type: AUTH_V2.GET_ORDER_DETAIL_V2_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* cancelOrderSaga({ payload }) {
  try {
    yield put({ type: AUTH_V2.CANCEL_ORDER_V2_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.cancelOrder }, payload.orderId, payload.reason)
    yield put({ type: AUTH_V2.CANCEL_ORDER_V2_SUCCESS, payload: { order: data } })
  } catch (error) {
    yield put({ type: AUTH_V2.CANCEL_ORDER_V2_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* acknowledgeOrderSaga({ payload }) {
  try {
    yield call({ content: AuthV2, fn: AuthV2.acknowledgeOrder }, payload.orderId)
    yield put({ type: AUTH_V2.ACKNOWLEDGE_ORDER_V2_SUCCESS, payload: { orderId: payload.orderId } })
  } catch (error) {
    yield put({ type: AUTH_V2.ACKNOWLEDGE_ORDER_V2_FAILURE, payload: { errorMsg: error?.message } })
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
  AuthV2.clearSession()
  yield asyncStorage.clearAuthV2Session()
}

export default function* watcherSaga() {
  // Đăng ký 1 lần lúc saga khởi động: onRefreshed persist token mới vào
  // asyncStorage (401 giữa chừng có thể trigger refresh ở BẤT KỲ lúc
  // nào, không chỉ trong saga login), onRefreshFailed dọn sạch phiên +
  // reset redux khi refresh token cũng hết hạn/bị thu hồi (reuse detected).
  AuthV2.configureTokenManager({
    onRefreshed: data => {
      asyncStorage.setV2AccessToken(data.access_token)
      asyncStorage.setV2RefreshToken(data.refresh_token)
    },
    onRefreshFailed: () => {
      asyncStorage.clearAuthV2Session()
      store.dispatch({ type: 'AUTH_V2_RESET' })
    },
  })

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
  yield takeLatest(AUTH_V2.GET_MARKETER_LINKS_REQUEST, getMarketerLinks)
  yield takeLatest(AUTH_V2.CONFIRM_MARKETER_LINK_REQUEST, confirmMarketerLink)
  yield takeLatest(AUTH_V2.REJECT_MARKETER_LINK_REQUEST, rejectMarketerLink)
  yield takeLatest(AUTH_V2.GET_ORDERS_V2_REQUEST, getOrdersListSaga)
  yield takeLatest(AUTH_V2.GET_ORDER_DETAIL_V2_REQUEST, getOrderDetailSaga)
  yield takeLatest(AUTH_V2.CANCEL_ORDER_V2_REQUEST, cancelOrderSaga)
  yield takeLatest(AUTH_V2.ACKNOWLEDGE_ORDER_V2_REQUEST, acknowledgeOrderSaga)
  yield takeLatest(AUTH_V2.LOGOUT_REQUEST, logout)
}
