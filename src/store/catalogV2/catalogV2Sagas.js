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

function* updateCartItem({ payload }) {
  const { storeId, productId, qty, memberMarketerId } = payload
  try {
    yield put({ type: CATALOG_V2.UPDATE_CART_ITEM_LOADING, payload: { storeId, productId } })
    const data = yield call(
      { content: AuthV2, fn: AuthV2.updateCartItem },
      storeId,
      productId,
      qty,
      memberMarketerId,
    )
    yield put({
      type: CATALOG_V2.UPDATE_CART_ITEM_SUCCESS,
      payload: { storeId, productId, cart: data },
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
    const data = yield call(
      { content: AuthV2, fn: AuthV2.deleteCartItem },
      storeId,
      productId,
      memberMarketerId,
    )
    yield put({
      type: CATALOG_V2.DELETE_CART_ITEM_SUCCESS,
      payload: { storeId, productId, cart: data },
    })
  } catch (error) {
    yield put({
      type: CATALOG_V2.DELETE_CART_ITEM_FAILURE,
      payload: { storeId, productId, errorMsg: error?.message },
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
    yield put({ type: CATALOG_V2.APPLY_PRODUCT_MESSAGE_SUCCESS, payload: { messageId } })
  } catch (error) {
    yield put({
      type: CATALOG_V2.APPLY_PRODUCT_MESSAGE_FAILURE,
      payload: { messageId, errorMsg: error?.message },
    })
  }
}

export default function* watcherSaga() {
  yield takeLatest(CATALOG_V2.GET_STORES_REQUEST, getStores)
  yield takeLatest(CATALOG_V2.GET_STORE_PRODUCTS_REQUEST, getStoreProducts)
  yield takeLatest(CATALOG_V2.GET_STORE_CART_REQUEST, getStoreCart)
  yield takeLatest(CATALOG_V2.UPDATE_CART_ITEM_REQUEST, updateCartItem)
  yield takeLatest(CATALOG_V2.DELETE_CART_ITEM_REQUEST, deleteCartItem)
  yield takeLatest(CATALOG_V2.GET_PRODUCT_MESSAGES_REQUEST, getProductMessages)
  yield takeLatest(CATALOG_V2.APPLY_PRODUCT_MESSAGE_REQUEST, applyProductMessage)
}
