import { takeLatest, call, put, takeEvery } from 'redux-saga/effects'
import { NEOMED } from '../actionsTypes'
import * as APINeoMed from '../../neomed'

function* getProductByCategory({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsByCategory },
      payload.categoryId,
      payload.page,
      payload.size,
    )

    console.log('response', data)
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_CATE_SUCCESS,
      payload: {
        data,
        distributorId: payload.distributorId,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_CATE_FAILURE,
      payload: { 
        errorMsg: error, 
        distributorId: payload.distributorId,
      },
    })
  }
}

function* getProductByDistributor({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsByDistributor },
      payload.distributorId,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_SUCCESS,
      payload: {
        data,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductBySupplier({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductBySupplier },
      payload.supplierId,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_SUPPLIER_SUCCESS,
      payload: {
        data,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_SUPPLIER_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductsPropose({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductPropose },
      payload.distributorId,
      payload.productId,
      payload.productType,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PROPOSE_PRODUCT_SUCCESS,
      payload: {
        distributorId: payload.distributorId,
        listProducts: data.propose,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PROPOSE_PRODUCT_FAILURE,
      payload: { 
        distributorId: payload.distributorId,
        errorMsg: error,
      },
    })
  }
}

function* getProductExclusiveByDistributor({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsExclusiveByDistributor },
      payload.distributorId,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_SUCCESS,
      payload: {
        listProductsExclusive: data.products,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductsRecentlyViewed({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsRecentlyViewed },
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_SUCCESS,
      payload: {
        listProductsRecentlyViewed: data.products,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductById({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductById },
      payload.productId,
    )
    yield put({
      type: NEOMED.GET_PRODUCT_DETAILS_SUCCESS,
      payload: {
        data,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCT_DETAILS_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductByPaymentType({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductByPaymentType },
      payload.distributorId,
      payload.paymentType,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_PAYMENT_SUCCESS,
      payload: {
        data,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_PAYMENT_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductsByTrademarkId({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsByTrademarkId },
      payload.trademarkId,
      payload.page,
      payload.size,
    )
    console.log('GET PRODUCT BY TRADEMARK ID::', data)
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_TRADEMARK_SUCCESS,
      payload: {
        listProducts: data.products,
        loadMore: payload.loadMore,
        scope: payload.scope,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_BY_TRADEMARK_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductBestSeller({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsAdvertisement },
      payload.distributorId,
      payload.type,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_BEST_SELLER_SUCCESS,
      payload: {
        listProducts: data.products,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_BEST_SELLER_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductsHotDeal({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.Products.getProductsAdvertisement },
      payload.distributorId,
      payload.type,
      payload.page,
      payload.size,
    )
    yield put({
      type: NEOMED.GET_PRODUCTS_HOT_DEAL_SUCCESS,
      payload: {
        listProducts: data.products,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCTS_HOT_DEAL_FAILURE,
      payload: { errorMsg: error },
    })
  }
}

function* getProductPriceSock({ payload }) {
  try {
    const data = yield call(
      { content: APINeoMed, fn: APINeoMed.ProductAPICustom.getProductPriceSock },
      payload.distributorId,
      1, //productStatus
      1, //reserve
      payload.size,
      payload.page,
    )
    console.log('PRODUCT SOCKKKKKKKKKKKKKKKKKK:', data)
    yield put({
      type: NEOMED.GET_PRODUCT_PRICE_SOCK_SUCCESS,
      payload: {
        listProducts: data.products,
        loadMore: payload.loadMore,
      },
    })
  } catch (error) {
    yield put({
      type: NEOMED.GET_PRODUCT_PRICE_SOCK_FAILURE,
      payload: { errorMsg: error, scope: payload.scope },
    })
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* watcherGetProducts() {
  yield takeLatest(NEOMED.GET_PRODUCTS_BY_CATE_REQUEST, getProductByCategory)
  yield takeLatest(NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_REQUEST, getProductByDistributor)
  yield takeLatest(NEOMED.GET_PRODUCTS_BY_SUPPLIER_REQUEST, getProductBySupplier)
  yield takeLatest(NEOMED.GET_PRODUCTS_BY_PAYMENT_REQUEST, getProductByPaymentType)
  yield takeLatest(NEOMED.GET_PRODUCT_DETAILS_REQUEST, getProductById)
  yield takeLatest(NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_REQUEST, getProductExclusiveByDistributor)
  yield takeLatest(NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_REQUEST, getProductsRecentlyViewed)
  yield takeLatest(NEOMED.GET_PRODUCTS_BY_TRADEMARK_REQUEST, getProductsByTrademarkId)
  yield takeLatest(NEOMED.GET_PRODUCTS_BEST_SELLER_REQUEST, getProductBestSeller)
  yield takeLatest(NEOMED.GET_PRODUCTS_HOT_DEAL_REQUEST, getProductsHotDeal)
  yield takeLatest(NEOMED.GET_PRODUCT_PRICE_SOCK_REQUEST, getProductPriceSock)
  yield takeEvery(NEOMED.GET_PROPOSE_PRODUCT_REQUEST, getProductsPropose)
}
