import { CATALOG_V2 } from '../actionsTypes'

export const getStoresV2 = () => ({ type: CATALOG_V2.GET_STORES_REQUEST })

// GET /customer/v1/carts — dùng cho tab "Giỏ hàng" chính (thay tab
// "Giỏ quà" cũ) — liệt kê mọi giỏ đang mở của nhà thuốc theo TẤT CẢ
// store, không chỉ 1 store như getStoreCartV2.
export const getCartsV2 = () => ({ type: CATALOG_V2.GET_CARTS_REQUEST })

export const getStoreProductsV2 = storeId => ({
  type: CATALOG_V2.GET_STORE_PRODUCTS_REQUEST,
  payload: { storeId },
})

export const getStoreCartV2 = (storeId, memberMarketerId) => ({
  type: CATALOG_V2.GET_STORE_CART_REQUEST,
  payload: { storeId, memberMarketerId },
})

// qty=0 nghĩa là xoá khỏi giỏ (backend PUT chấp nhận), UI có thể gọi thẳng
// hàm này thay vì deleteCartItemV2 khi bấm nút trừ về 0.
export const updateCartItemV2 = (storeId, productId, qty, memberMarketerId) => ({
  type: CATALOG_V2.UPDATE_CART_ITEM_REQUEST,
  payload: { storeId, productId, qty, memberMarketerId },
})

export const deleteCartItemV2 = (storeId, productId, memberMarketerId) => ({
  type: CATALOG_V2.DELETE_CART_ITEM_REQUEST,
  payload: { storeId, productId, memberMarketerId },
})

export const getProductMessagesV2 = () => ({ type: CATALOG_V2.GET_PRODUCT_MESSAGES_REQUEST })

export const applyProductMessageV2 = messageId => ({
  type: CATALOG_V2.APPLY_PRODUCT_MESSAGE_REQUEST,
  payload: { messageId },
})

// Đặt đơn THẬT — 1 giỏ (storeId) → 1 đơn. Chặn phía UI trước khi gọi
// (đủ min_order_value mới bật nút), 422 min_order_not_met chỉ là lưới
// an toàn dự phòng phía server.
export const checkoutCartV2 = (storeId, cartId) => ({
  type: CATALOG_V2.CHECKOUT_CART_REQUEST,
  payload: { storeId, cartId },
})

export const resetCheckoutCartV2 = storeId => ({
  type: 'RESET_CATALOG_V2_CHECKOUT',
  payload: { storeId },
})

// Trang chủ mới (2026-09-17) — xem [[marketplace-core-business-model]].
export const getHomeBannersV2 = () => ({ type: CATALOG_V2.GET_HOME_BANNERS_REQUEST })

export const getFeaturedSuppliersV2 = () => ({ type: CATALOG_V2.GET_FEATURED_SUPPLIERS_REQUEST })

export const getSupplierProductsV2 = (supplierId, limit) => ({
  type: CATALOG_V2.GET_SUPPLIER_PRODUCTS_REQUEST,
  payload: { supplierId, limit },
})

export const getSearchSuggestionsV2 = () => ({ type: CATALOG_V2.GET_SEARCH_SUGGESTIONS_REQUEST })

// GET /customer/v1/search?q=&limit=&offset= — full-text xuyên mọi NCC,
// bỏ dấu, chỉ SP đang bán. Màn SearchV2.
export const searchProductsV2 = (q, limit, offset) => ({
  type: CATALOG_V2.SEARCH_PRODUCTS_REQUEST,
  payload: { q, limit, offset },
})

export const resetSearchProductsV2 = () => ({ type: 'RESET_CATALOG_V2_SEARCH' })

export const resetCatalogV2 = () => ({ type: 'CATALOG_V2_RESET' })
