import { CATALOG_V2 } from '../actionsTypes'

export const getStoresV2 = () => ({ type: CATALOG_V2.GET_STORES_REQUEST })

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

export const resetCatalogV2 = () => ({ type: 'CATALOG_V2_RESET' })
