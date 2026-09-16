import { takeLatest, call, put } from 'redux-saga/effects'
import { CATALOG_V2 } from '../actionsTypes'
import { AuthV2 } from '~/neomed/AuthV2API'

function* getStores() {
  try {
    yield put({ type: CATALOG_V2.GET_STORES_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getStores })
    yield put({ type: CATALOG_V2.GET_STORES_SUCCESS, payload: { items: data?.items || [] } })
  } catch (error) {
    yield put({ type: CATALOG_V2.GET_STORES_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* getCarts() {
  try {
    yield put({ type: CATALOG_V2.GET_CARTS_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getCarts })
    yield put({ type: CATALOG_V2.GET_CARTS_SUCCESS, payload: { items: data?.items || [] } })
  } catch (error) {
    yield put({ type: CATALOG_V2.GET_CARTS_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* getStoreProducts({ payload }) {
  const { storeId } = payload
  try {
    yield put({ type: CATALOG_V2.GET_STORE_PRODUCTS_LOADING, payload: { storeId } })
    const data = yield call({ content: AuthV2, fn: AuthV2.getStoreProducts }, storeId)
    yield put({
      type: CATALOG_V2.GET_STORE_PRODUCTS_SUCCESS,
      payload: { storeId, items: data?.items || [] },
    })
  } catch (error) {
    yield put({
      type: CATALOG_V2.GET_STORE_PRODUCTS_FAILURE,
      payload: { storeId, errorMsg: error?.message },
    })
  }
}

function* getStoreCart({ payload }) {
  const { storeId, memberMarketerId } = payload
  try {
    yield put({ type: CATALOG_V2.GET_STORE_CART_LOADING, payload: { storeId } })
    const data = yield call({ content: AuthV2, fn: AuthV2.getStoreCart }, storeId, memberMarketerId)
    yield put({ type: CATALOG_V2.GET_STORE_CART_SUCCESS, payload: { storeId, cart: data } })
  } catch (error) {
    yield put({ type: CATALOG_V2.GET_STORE_CART_FAILURE, payload: { storeId, errorMsg: error?.message } })
  }
}

// PUT/DELETE cart item trả 204 KHÔNG có body (xác nhận bằng curl thật
// 2026-09-16 với dữ liệu test marketplace-core-21 cấp) — trước đó lỡ
// coi response của chính PUT/DELETE là Cart mới, thực chất là undefined,
// khiến giỏ hàng hiện rỗng ngay sau khi bấm +/-/xoá cho tới lần refetch
// kế tiếp. Phải tự GET lại cart sau khi mutation thành công.
function* updateCartItem({ payload }) {
  const { storeId, productId, qty, memberMarketerId } = payload
  try {
    yield put({ type: CATALOG_V2.UPDATE_CART_ITEM_LOADING, payload: { storeId, productId } })
    yield call(
      { content: AuthV2, fn: AuthV2.updateCartItem },
      storeId,
      productId,
      qty,
      memberMarketerId,
    )
    const cart = yield call({ content: AuthV2, fn: AuthV2.getStoreCart }, storeId, memberMarketerId)
    yield put({
      type: CATALOG_V2.UPDATE_CART_ITEM_SUCCESS,
      payload: { storeId, productId, cart },
    })
  } catch (error) {
    yield put({
      type: CATALOG_V2.UPDATE_CART_ITEM_FAILURE,
      payload: { storeId, productId, errorMsg: error?.message },
    })
  }
}

function* deleteCartItem({ payload }) {
  const { storeId, productId, memberMarketerId } = payload
  try {
    yield put({ type: CATALOG_V2.DELETE_CART_ITEM_LOADING, payload: { storeId, productId } })
    yield call(
      { content: AuthV2, fn: AuthV2.deleteCartItem },
      storeId,
      productId,
      memberMarketerId,
    )
    const cart = yield call({ content: AuthV2, fn: AuthV2.getStoreCart }, storeId, memberMarketerId)
    yield put({
      type: CATALOG_V2.DELETE_CART_ITEM_SUCCESS,
      payload: { storeId, productId, cart },
    })
  } catch (error) {
    yield put({
      type: CATALOG_V2.DELETE_CART_ITEM_FAILURE,
      payload: { storeId, productId, errorMsg: error?.message },
    })
  }
}

// Đặt đơn THẬT — POST /customer/v1/orders {cart_id}. 1 giỏ = 1 đơn (1
// store = 1 NCC, Q-STORE-M2). UI (StoreCartV2) đã chặn trước bằng
// min_order_value nên 422 hiếm khi xảy ra, chỉ là lưới an toàn.
function* checkoutCart({ payload }) {
  const { storeId, cartId } = payload
  try {
    yield put({ type: CATALOG_V2.CHECKOUT_CART_LOADING, payload: { storeId } })
    const order = yield call({ content: AuthV2, fn: AuthV2.checkoutCart }, cartId)
    yield put({ type: CATALOG_V2.CHECKOUT_CART_SUCCESS, payload: { storeId, order } })
  } catch (error) {
    yield put({
      type: CATALOG_V2.CHECKOUT_CART_FAILURE,
      payload: { storeId, errorMsg: error?.message || 'Đặt đơn thất bại' },
    })
  }
}

function* getProductMessages() {
  try {
    yield put({ type: CATALOG_V2.GET_PRODUCT_MESSAGES_LOADING })
    const data = yield call({ content: AuthV2, fn: AuthV2.getProductMessages })
    yield put({ type: CATALOG_V2.GET_PRODUCT_MESSAGES_SUCCESS, payload: { items: data?.items || [] } })
  } catch (error) {
    yield put({ type: CATALOG_V2.GET_PRODUCT_MESSAGES_FAILURE, payload: { errorMsg: error?.message } })
  }
}

function* applyProductMessage({ payload }) {
  const { messageId } = payload
  try {
    yield put({ type: CATALOG_V2.APPLY_PRODUCT_MESSAGE_LOADING, payload: { messageId } })
    yield call({ content: AuthV2, fn: AuthV2.applyProductMessageToCart }, messageId)
    // API trả Cart (theo marketplace-core-21), không phải ProductMessage
    // đã cập nhật — tự patch applied_at ngay để UI (badge/nút) cập nhật
    // tức thì, không phải đợi refetch getProductMessagesV2.
    yield put({
      type: CATALOG_V2.APPLY_PRODUCT_MESSAGE_SUCCESS,
      payload: { messageId, appliedAt: new Date().toISOString() },
    })
  } catch (error) {
    yield put({
      type: CATALOG_V2.APPLY_PRODUCT_MESSAGE_FAILURE,
      payload: { messageId, errorMsg: error?.message },
    })
  }
}

export default function* watcherSaga() {
  yield takeLatest(CATALOG_V2.GET_STORES_REQUEST, getStores)
  yield takeLatest(CATALOG_V2.GET_CARTS_REQUEST, getCarts)
  yield takeLatest(CATALOG_V2.GET_STORE_PRODUCTS_REQUEST, getStoreProducts)
  yield takeLatest(CATALOG_V2.GET_STORE_CART_REQUEST, getStoreCart)
  yield takeLatest(CATALOG_V2.UPDATE_CART_ITEM_REQUEST, updateCartItem)
  yield takeLatest(CATALOG_V2.DELETE_CART_ITEM_REQUEST, deleteCartItem)
  yield takeLatest(CATALOG_V2.GET_PRODUCT_MESSAGES_REQUEST, getProductMessages)
  yield takeLatest(CATALOG_V2.APPLY_PRODUCT_MESSAGE_REQUEST, applyProductMessage)
  yield takeLatest(CATALOG_V2.CHECKOUT_CART_REQUEST, checkoutCart)
}
