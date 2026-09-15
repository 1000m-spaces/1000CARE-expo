import Status from '../../common/Status/Status'
import { CATALOG_V2 } from '../../store/actionsTypes'

const initialState = {
  storesStatus: Status.DEFAULT,
  stores: [], // [{id, name, ...}]

  // theo storeId — nhiều store có thể xem catalog song song
  storeProductsStatus: {}, // { [storeId]: Status }
  storeProducts: {}, // { [storeId]: [{product_id,name,brand,rx,media,price,currency}] }

  storeCartStatus: {}, // { [storeId]: Status }
  storeCart: {}, // { [storeId]: {items[], subtotal, min_order_value} }
  cartItemActionStatus: {}, // { [storeId_productId]: Status } — trạng thái riêng từng dòng khi +/-/xoá

  productMessagesStatus: Status.DEFAULT,
  productMessages: [], // [ProductMessage]
  applyProductMessageStatus: {}, // { [messageId]: Status }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CATALOG_V2.GET_STORES_LOADING:
      return { ...state, storesStatus: Status.LOADING }
    case CATALOG_V2.GET_STORES_SUCCESS:
      return { ...state, storesStatus: Status.SUCCESS, stores: payload.items }
    case CATALOG_V2.GET_STORES_FAILURE:
      return { ...state, storesStatus: Status.ERROR }

    case CATALOG_V2.GET_STORE_PRODUCTS_LOADING:
      return {
        ...state,
        storeProductsStatus: { ...state.storeProductsStatus, [payload.storeId]: Status.LOADING },
      }
    case CATALOG_V2.GET_STORE_PRODUCTS_SUCCESS:
      return {
        ...state,
        storeProductsStatus: { ...state.storeProductsStatus, [payload.storeId]: Status.SUCCESS },
        storeProducts: { ...state.storeProducts, [payload.storeId]: payload.items },
      }
    case CATALOG_V2.GET_STORE_PRODUCTS_FAILURE:
      return {
        ...state,
        storeProductsStatus: { ...state.storeProductsStatus, [payload.storeId]: Status.ERROR },
      }

    case CATALOG_V2.GET_STORE_CART_LOADING:
      return {
        ...state,
        storeCartStatus: { ...state.storeCartStatus, [payload.storeId]: Status.LOADING },
      }
    case CATALOG_V2.GET_STORE_CART_SUCCESS:
      return {
        ...state,
        storeCartStatus: { ...state.storeCartStatus, [payload.storeId]: Status.SUCCESS },
        storeCart: { ...state.storeCart, [payload.storeId]: payload.cart },
      }
    case CATALOG_V2.GET_STORE_CART_FAILURE:
      return {
        ...state,
        storeCartStatus: { ...state.storeCartStatus, [payload.storeId]: Status.ERROR },
      }

    case CATALOG_V2.UPDATE_CART_ITEM_LOADING:
    case CATALOG_V2.DELETE_CART_ITEM_LOADING:
      return {
        ...state,
        cartItemActionStatus: {
          ...state.cartItemActionStatus,
          [`${payload.storeId}_${payload.productId}`]: Status.LOADING,
        },
      }
    case CATALOG_V2.UPDATE_CART_ITEM_SUCCESS:
    case CATALOG_V2.DELETE_CART_ITEM_SUCCESS:
      return {
        ...state,
        cartItemActionStatus: {
          ...state.cartItemActionStatus,
          [`${payload.storeId}_${payload.productId}`]: Status.SUCCESS,
        },
        storeCart: { ...state.storeCart, [payload.storeId]: payload.cart },
      }
    case CATALOG_V2.UPDATE_CART_ITEM_FAILURE:
    case CATALOG_V2.DELETE_CART_ITEM_FAILURE:
      return {
        ...state,
        cartItemActionStatus: {
          ...state.cartItemActionStatus,
          [`${payload.storeId}_${payload.productId}`]: Status.ERROR,
        },
      }

    case CATALOG_V2.GET_PRODUCT_MESSAGES_LOADING:
      return { ...state, productMessagesStatus: Status.LOADING }
    case CATALOG_V2.GET_PRODUCT_MESSAGES_SUCCESS:
      return { ...state, productMessagesStatus: Status.SUCCESS, productMessages: payload.items }
    case CATALOG_V2.GET_PRODUCT_MESSAGES_FAILURE:
      return { ...state, productMessagesStatus: Status.ERROR }

    case CATALOG_V2.APPLY_PRODUCT_MESSAGE_LOADING:
      return {
        ...state,
        applyProductMessageStatus: { ...state.applyProductMessageStatus, [payload.messageId]: Status.LOADING },
      }
    case CATALOG_V2.APPLY_PRODUCT_MESSAGE_SUCCESS:
      return {
        ...state,
        applyProductMessageStatus: { ...state.applyProductMessageStatus, [payload.messageId]: Status.SUCCESS },
      }
    case CATALOG_V2.APPLY_PRODUCT_MESSAGE_FAILURE:
      return {
        ...state,
        applyProductMessageStatus: { ...state.applyProductMessageStatus, [payload.messageId]: Status.ERROR },
      }

    case 'CATALOG_V2_RESET':
      return initialState

    default:
      return state
  }
}
