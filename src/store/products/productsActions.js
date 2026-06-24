import { NEOMED } from '../actionsTypes'

export const requestGetProductDetails = (productId) => ({
  type: NEOMED.GET_PRODUCT_DETAILS_REQUEST,
  payload: {
    productId,
  },
})

export const getProductByCate = (categoryId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BY_CATE_REQUEST,
  payload: {
    categoryId,
    page,
    size,
    loadMore,
  },
})

export const getProductByCateByDistributorId = (distributorId, categoryId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BY_CATE_REQUEST,
  payload: {
    distributorId,
    categoryId,
    page,
    size,
    loadMore,
  },
})

export const getProductsByDistributor = (distributorId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_REQUEST,
  payload: {
    distributorId,
    page,
    size,
    loadMore,
  },
})

export const getProductsBySupplier = (supplierId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BY_SUPPLIER_REQUEST,
  payload: {
    supplierId,
    page,
    size,
    loadMore,
  },
})

export const getProductByPayment = (distributorId, paymentType, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BY_PAYMENT_REQUEST,
  payload: {
    distributorId,
    paymentType,
    page,
    size,
    loadMore,
  },
})

export const getProductsExclusiveByDistributor = (distributorId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_REQUEST,
  payload: {
    distributorId,
    page,
    size,
    loadMore,
  },
})

export const getProductsRecentlyViewed = (page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_REQUEST,
  payload: {
    page,
    size,
    loadMore,
  },
})

export const requestGetProductsByTrademarkId = (trademarkId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BY_TRADEMARK_REQUEST,
  payload: {
    trademarkId,
    page,
    size,
    loadMore,
  },
})

export const requestGetProductBestSeller = (distributorId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_BEST_SELLER_REQUEST,
  payload: {
    distributorId: distributorId || 0,
    type: 1,
    page,
    size,
    loadMore,
  },
})

export const requestGetProductsHotDeal = (distributorId, page, size, loadMore) => ({
  type: NEOMED.GET_PRODUCTS_HOT_DEAL_REQUEST,
  payload: {
    distributorId: distributorId || 0,
    type: 2,
    page,
    size,
    loadMore,
  },
})

export const requestGetProductPriceSock = (distributorId, size, page, loadMore, scope = 'list') => ({
  type: NEOMED.GET_PRODUCT_PRICE_SOCK_REQUEST,
  payload: {
    distributorId,
    size,
    page,
    loadMore,
    scope,
  },
})

export const requestGetProductPropose = ( distributorId, productId, productType, size, page, loadMore) => ({
  type: NEOMED.GET_PROPOSE_PRODUCT_REQUEST,
  payload: {
    distributorId,
    productId,
    productType,
    size,
    page,
    loadMore,
  },
})
