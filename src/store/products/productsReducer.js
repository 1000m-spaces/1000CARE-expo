import Status from '../../common/Status/Status'
import { NEOMED } from '../actionsTypes'
const initialState = {
  statusProduct: Status.DEFAULT,
  statusProductDetail: Status.DEFAULT,
  statusProductExclusive: Status.DEFAULT,
  statusProductRecentlyViewed: Status.DEFAULT,
  page: 1,
  total: 0,
  categoryId: -1,
  listProducts: [],
  listProductsExclusive: [],
  listProductsRecentlyViewed: [],
  listProductsOfTrademark: [],
  listProductsHotDeal: [],
  listProductPriceSock: [],
  listProductPriceSockHome: [],
  listProductsBestSeller: [],
  listProductsProposeByDistributor: {},
  listProductsByDistributor: {},
  listProductBySupplier: [],
  productDetails: {},
  errorMsg: '',
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NEOMED.GET_PRODUCTS_BY_CATE_LOADING:
    case NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_LOADING:
    case NEOMED.GET_PRODUCTS_BY_SUPPLIER_LOADING:
      return {
        ...state,
        statusProduct:Status.LOADING,
      }
    case NEOMED.GET_PRODUCTS_BY_PAYMENT_LOADING:
      return {
        ...state,
        statusProduct:Status.LOADING,
        products: [],
      }
    case NEOMED.GET_PRODUCTS_BY_CATE_SUCCESS:
    case NEOMED.GET_PRODUCTS_BY_PAYMENT_SUCCESS:
      let products = payload.data.products ? payload.data.products : []
      if (payload.loadMore) {
        if (payload.distributorId) {
          products = [...state.listProductsByDistributor[payload.distributorId], ...products] 
        } else {
          products = [...state.listProducts, ...products]
        }
      }
      if (payload.distributorId) {
        const { listProductsByDistributor } = state
        listProductsByDistributor[payload.distributorId]= products
        return {
          ...state,
          statusProduct: Status.SUCCESS,
          listProductsByDistributor: listProductsByDistributor,
          total: payload.data.pagination.total,
          page: payload.data.pagination.page,
        }      
      } 
      else 
      {
        return {
          ...state,
          statusProduct: Status.SUCCESS,
          listProducts: products,
          total: payload.data.pagination.total,
          page: payload.data.pagination.page,
        }
      }
    case NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_SUCCESS:
      products = payload.data.products ? payload.data.products : []
      if (payload.loadMore) {
        products = [...state.listProducts, ...products]
      }
      return {
        ...state,
        statusProduct: Status.SUCCESS,
        listProducts: products,
        total: payload.data.pagination.total,
        page: payload.data.pagination.page,
      }
    case NEOMED.GET_PRODUCTS_BY_SUPPLIER_SUCCESS:
      products = payload.data.products ? payload.data.products : []
      if (payload.loadMore) {
        products = [...state.listProductBySupplier, ...products]
      }
      return {
        ...state,
        statusProduct: Status.SUCCESS,
        listProductBySupplier: products,
        total: payload.data.pagination.total,
        page: payload.data.pagination.page,
      }
    case NEOMED.GET_PRODUCTS_BY_CATE_FAILURE:
    case NEOMED.GET_PRODUCTS_BY_PAYMENT_FAILURE:
    case NEOMED.GET_PRODUCTS_BY_DISTRIBUTOR_FAILURE:
    case NEOMED.GET_PRODUCTS_BY_SUPPLIER_FAILURE:
      return {
        ...state,
        statusProduct: Status.ERROR,
        errorMsg: payload.errorMsg,
        products: payload.loadMore ? state.products : [],
      }
    case NEOMED.GET_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        statusProductDetail:Status.LOADING,
        errorMsg: '',
      }
    case NEOMED.GET_PRODUCT_DETAILS_SUCCESS:
      console.log(type, payload)
      return {
        ...state,
        statusProductDetail: Status.SUCCESS,
        productDetails: payload.data,
        errorMsg: '',
      }
    case NEOMED.GET_PRODUCT_DETAILS_FAILURE:
      return {
        ...state,
        statusProductDetail: Status.ERROR,
        errorMsg: payload.errorMsg,
        productDetails: [],
      }
    case NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_LOADING:
      return {
        ...state,
        statusProductExclusive: Status.LOADING,
      }
    case NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_SUCCESS:
      let listProductsExclusive = payload.listProductsExclusive ? payload.listProductsExclusive : []
      if (payload.loadMore) {
        listProductsExclusive = [...state.listProductsExclusive, ...listProductsExclusive]
      }
      return {
        ...state,
        statusProductExclusive: Status.SUCCESS,
        listProductsExclusive,
      }
    case NEOMED.GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR_FAILURE:
      return {
        ...state,
        statusProductExclusive: Status.ERROR,
        errorMsg: payload.errorMsg,
      }
    case NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_LOADING:
      return {
        ...state,
        statusProductRecentlyViewed: Status.LOADING,
      }
    case NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_SUCCESS:
      let listProductsRecentlyViewed = payload.listProductsRecentlyViewed ? payload.listProductsRecentlyViewed : []
      if (payload.loadMore) {
        listProductsRecentlyViewed = [...state.listProductsRecentlyViewed, ...listProductsRecentlyViewed]
      }
      return {
        ...state,
        statusProductRecentlyViewed: Status.SUCCESS,
        listProductsRecentlyViewed,
      }
    case NEOMED.GET_PRODUCTS_RECENTLY_VIEWED_FAILURE:
      return {
        ...state,
        statusProductRecentlyViewed: Status.ERROR,
        errorMsg: payload.errorMsg,
      }
    case NEOMED.GET_PRODUCTS_BY_TRADEMARK_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      }
    case NEOMED.GET_PRODUCTS_BY_TRADEMARK_SUCCESS:
      let listProductsOfTrademark = payload.listProducts ? payload.listProducts : []
      if (payload.loadMore) {
        listProductsOfTrademark = [...state.listProductsOfTrademark, ...listProductsOfTrademark]
      }
      return {
        ...state,
        status: Status.SUCCESS,
        listProductsOfTrademark,
      }
    case NEOMED.GET_PRODUCTS_BY_TRADEMARK_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMsg: payload.errorMsg,
      }
    case NEOMED.GET_PRODUCTS_HOT_DEAL_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      }
    case NEOMED.GET_PRODUCTS_HOT_DEAL_SUCCESS:
      let listProductsHotDeal = payload.listProducts ? payload.listProducts : []
      if (payload.loadMore) {
        listProductsHotDeal = [...state.listProductsHotDeal, ...listProductsHotDeal]
      }
      return {
        ...state,
        status: Status.SUCCESS,
        listProductsHotDeal,
      }
    case NEOMED.GET_PRODUCTS_HOT_DEAL_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMsg: payload.errorMsg,
      }
    case NEOMED.GET_PRODUCTS_BEST_SELLER_LOADING:
      return {
        ...state,
        status: Status.LOADING,
      }
    case NEOMED.GET_PRODUCTS_BEST_SELLER_SUCCESS:
      let listProductsBestSeller = payload.listProducts ? payload.listProducts : []
      if (payload.loadMore) {
        listProductsBestSeller = [...state.listProductsBestSeller, ...listProductsBestSeller]
      }
      return {
        ...state,
        status: Status.SUCCESS,
        listProductsBestSeller,
      }
    case NEOMED.GET_PRODUCTS_BEST_SELLER_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMsg: payload.errorMsg,
      }
    case NEOMED.GET_PRODUCT_PRICE_SOCK_SUCCESS:
      let listProductPriceSock = payload.listProducts ? payload.listProducts : []
      if (payload.loadMore) {
        listProductPriceSock = [...state.listProductPriceSock, ...listProductPriceSock]
      }
      const currentPriceSockHome = state.listProductPriceSockHome?.length > 0
        ? state.listProductPriceSockHome
        : state.listProductPriceSock
      const nextPriceSockHome = listProductPriceSock.length > 0 ? listProductPriceSock : currentPriceSockHome
      if (payload.scope === 'home') {
        return {
          ...state,
          status: Status.SUCCESS,
          listProductPriceSock,
          listProductPriceSockHome: nextPriceSockHome,
        }
      }
      return {
        ...state,
        status: Status.SUCCESS,
        listProductPriceSock,
        listProductPriceSockHome: nextPriceSockHome,
      }
    case NEOMED.GET_PRODUCT_PRICE_SOCK_FAILURE:
      return {
        ...state,
        status: Status.ERROR,
        errorMsg: payload.errorMsg,
        listProductPriceSock: payload?.scope === 'home' ? state.listProductPriceSock : [],
        listProductPriceSockHome: state.listProductPriceSockHome?.length > 0
          ? state.listProductPriceSockHome
          : state.listProductPriceSock,
      }
    case NEOMED.GET_PROPOSE_PRODUCT_SUCCESS:
      let { listProductsProposeByDistributor } = state
      let listProductsPropose = payload.listProducts ? payload.listProducts : []
      if (payload.loadMore) {
        listProductsPropose = [...state.listProductsPropose, ...listProductsPropose]
      }
      listProductsProposeByDistributor[payload.distributorId] = listProductsPropose
      return {
        ...state,
        status: Status.SUCCESS,
        listProductsProposeByDistributor,
      }
    case NEOMED.GET_PROPOSE_PRODUCT_FAILURE:
      listProductsProposeByDistributor = state.listProductsProposeByDistributor
      listProductsProposeByDistributor[payload.distributorId] = []
      return {
        ...state,
        status: Status.ERROR,
        errorMsg: payload.errorMsg,
        listProductsProposeByDistributor,
      }
    default:
      return state
  }
}
