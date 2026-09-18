import Status from '../../common/Status/Status'
import { CATALOG_V2 } from '../../store/actionsTypes'

const initialState = {
  storesStatus: Status.DEFAULT,
  stores: [], // [{id, name, ...}]

  cartsStatus: Status.DEFAULT,
  carts: [], // [{id, store_id, status, items[], updated_at}] — GET /customer/v1/carts, cho tab "Giỏ hàng"

  // theo storeId — nhiều store có thể xem catalog song song
  storeProductsStatus: {}, // { [storeId]: Status }
  storeProducts: {}, // { [storeId]: [{product_id,name,brand,rx,media,price,currency}] }

  storeCartStatus: {}, // { [storeId]: Status }
  storeCart: {}, // { [storeId]: {items[], subtotal, min_order_value} }
  cartItemActionStatus: {}, // { [storeId_productId]: Status } — trạng thái riêng từng dòng khi +/-/xoá

  productMessagesStatus: Status.DEFAULT,
  productMessages: [], // [ProductMessage]
  applyProductMessageStatus: {}, // { [messageId]: Status }

  checkoutStatus: {}, // { [storeId]: Status } — đặt đơn thật, POST /customer/v1/orders
  checkoutOrder: {}, // { [storeId]: Order } — đơn vừa tạo, dùng điều hướng sang OrderDetailV2
  checkoutErr: {}, // { [storeId]: string }

  // Trang chủ — kiến trúc Campaign (2026-09-18, thay hẳn home-banners/
  // featured-suppliers/suppliers/{id}/products). Xem
  // [[marketplace-core-business-model]].
  campaignsStatus: {}, // { [campaignType]: Status } — banner | featured_supplier | flash_sale
  campaigns: {}, // { [campaignType]: [{id, campaign_type, banner_url, metadata?, position, products?}] }

  productDetailStatus: {}, // { [productId]: Status }
  productDetail: {}, // { [productId]: Product } — GET /customer/v1/products/{id}

  storeCategoriesStatus: {}, // { [storeId]: Status }
  storeCategories: {}, // { [storeId]: [{category_id, category_name}] }

  searchSuggestionsStatus: Status.DEFAULT,
  searchSuggestions: [], // [{id, keyword, product_id?}]

  searchProductsStatus: Status.DEFAULT,
  searchProducts: [], // [{product_id,name,rx,price,currency}]
  searchProductsTotal: 0,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CATALOG_V2.GET_STORES_LOADING:
      return { ...state, storesStatus: Status.LOADING }
    case CATALOG_V2.GET_STORES_SUCCESS:
      return { ...state, storesStatus: Status.SUCCESS, stores: payload.items }
    case CATALOG_V2.GET_STORES_FAILURE:
      return { ...state, storesStatus: Status.ERROR }

    case CATALOG_V2.GET_CARTS_LOADING:
      return { ...state, cartsStatus: Status.LOADING }
    case CATALOG_V2.GET_CARTS_SUCCESS:
      return { ...state, cartsStatus: Status.SUCCESS, carts: payload.items }
    case CATALOG_V2.GET_CARTS_FAILURE:
      return { ...state, cartsStatus: Status.ERROR }

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
        // Patch applied_at ngay tại chỗ — API apply-to-cart trả Cart chứ
        // không trả ProductMessage đã cập nhật, nên phải tự đánh dấu để
        // UI (nút Áp dụng ẩn, badge giảm) cập nhật tức thì.
        productMessages: state.productMessages.map(m =>
          m.id === payload.messageId ? { ...m, applied_at: payload.appliedAt } : m,
        ),
      }
    case CATALOG_V2.APPLY_PRODUCT_MESSAGE_FAILURE:
      return {
        ...state,
        applyProductMessageStatus: { ...state.applyProductMessageStatus, [payload.messageId]: Status.ERROR },
      }

    case CATALOG_V2.CHECKOUT_CART_LOADING:
      return {
        ...state,
        checkoutStatus: { ...state.checkoutStatus, [payload.storeId]: Status.LOADING },
        checkoutErr: { ...state.checkoutErr, [payload.storeId]: '' },
      }
    case CATALOG_V2.CHECKOUT_CART_SUCCESS:
      return {
        ...state,
        checkoutStatus: { ...state.checkoutStatus, [payload.storeId]: Status.SUCCESS },
        checkoutOrder: { ...state.checkoutOrder, [payload.storeId]: payload.order },
        // Đặt đơn xong giỏ coi như đã dùng — xoá cache cart cũ, màn nào
        // quay lại StoreCatalogV2 sẽ tự getStoreCartV2 lại giỏ mới (rỗng).
        storeCart: { ...state.storeCart, [payload.storeId]: undefined },
      }
    case CATALOG_V2.CHECKOUT_CART_FAILURE:
      return {
        ...state,
        checkoutStatus: { ...state.checkoutStatus, [payload.storeId]: Status.ERROR },
        checkoutErr: { ...state.checkoutErr, [payload.storeId]: payload.errorMsg },
      }
    case 'RESET_CATALOG_V2_CHECKOUT':
      return {
        ...state,
        checkoutStatus: { ...state.checkoutStatus, [payload.storeId]: Status.DEFAULT },
        checkoutErr: { ...state.checkoutErr, [payload.storeId]: '' },
      }

    // Campaign — 1 route duy nhất theo `type` (banner/featured_supplier/
    // flash_sale), thay hẳn home-banners/featured-suppliers/
    // suppliers/{id}/products (backend xoá 2026-09-18). Key theo `type`
    // vì HomeScreen gọi cả 3 song song, không được đè lẫn nhau.
    case CATALOG_V2.GET_CAMPAIGNS_LOADING:
      return {
        ...state,
        campaignsStatus: { ...state.campaignsStatus, [payload.type]: Status.LOADING },
      }
    case CATALOG_V2.GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaignsStatus: { ...state.campaignsStatus, [payload.type]: Status.SUCCESS },
        campaigns: {
          ...state.campaigns,
          [payload.type]: [...payload.items].sort((a, b) => (a.position || 0) - (b.position || 0)),
        },
      }
    case CATALOG_V2.GET_CAMPAIGNS_FAILURE:
      return {
        ...state,
        campaignsStatus: { ...state.campaignsStatus, [payload.type]: Status.ERROR },
      }

    case CATALOG_V2.GET_PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        productDetailStatus: { ...state.productDetailStatus, [payload.productId]: Status.LOADING },
      }
    case CATALOG_V2.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetailStatus: { ...state.productDetailStatus, [payload.productId]: Status.SUCCESS },
        productDetail: { ...state.productDetail, [payload.productId]: payload.product },
      }
    case CATALOG_V2.GET_PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        productDetailStatus: { ...state.productDetailStatus, [payload.productId]: Status.ERROR },
      }

    case CATALOG_V2.GET_STORE_CATEGORIES_LOADING:
      return {
        ...state,
        storeCategoriesStatus: { ...state.storeCategoriesStatus, [payload.storeId]: Status.LOADING },
      }
    case CATALOG_V2.GET_STORE_CATEGORIES_SUCCESS:
      return {
        ...state,
        storeCategoriesStatus: { ...state.storeCategoriesStatus, [payload.storeId]: Status.SUCCESS },
        storeCategories: { ...state.storeCategories, [payload.storeId]: payload.items },
      }
    case CATALOG_V2.GET_STORE_CATEGORIES_FAILURE:
      return {
        ...state,
        storeCategoriesStatus: { ...state.storeCategoriesStatus, [payload.storeId]: Status.ERROR },
      }

    case CATALOG_V2.GET_SEARCH_SUGGESTIONS_LOADING:
      return { ...state, searchSuggestionsStatus: Status.LOADING }
    case CATALOG_V2.GET_SEARCH_SUGGESTIONS_SUCCESS:
      return { ...state, searchSuggestionsStatus: Status.SUCCESS, searchSuggestions: payload.items }
    case CATALOG_V2.GET_SEARCH_SUGGESTIONS_FAILURE:
      return { ...state, searchSuggestionsStatus: Status.ERROR }

    case CATALOG_V2.SEARCH_PRODUCTS_LOADING:
      return { ...state, searchProductsStatus: Status.LOADING }
    case CATALOG_V2.SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        searchProductsStatus: Status.SUCCESS,
        searchProducts: payload.items,
        searchProductsTotal: payload.total,
      }
    case CATALOG_V2.SEARCH_PRODUCTS_FAILURE:
      return { ...state, searchProductsStatus: Status.ERROR }
    case 'RESET_CATALOG_V2_SEARCH':
      return { ...state, searchProductsStatus: Status.DEFAULT, searchProducts: [], searchProductsTotal: 0 }

    case 'CATALOG_V2_RESET':
      return initialState

    default:
      return state
  }
}
