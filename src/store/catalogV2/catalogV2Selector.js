export const getStoresV2Status = state => state.catalogV2.storesStatus
export const getStoresV2 = state => state.catalogV2.stores

export const getStoreProductsV2Status = (state, storeId) => state.catalogV2.storeProductsStatus[storeId]
export const getStoreProductsV2 = (state, storeId) => state.catalogV2.storeProducts[storeId] || []

export const getStoreCartV2Status = (state, storeId) => state.catalogV2.storeCartStatus[storeId]
export const getStoreCartV2 = (state, storeId) => state.catalogV2.storeCart[storeId]

export const getCartItemV2ActionStatus = (state, storeId, productId) =>
  state.catalogV2.cartItemActionStatus[`${storeId}_${productId}`]

export const getProductMessagesV2Status = state => state.catalogV2.productMessagesStatus
export const getProductMessagesV2 = state => state.catalogV2.productMessages
export const getApplyProductMessageV2Status = (state, messageId) =>
  state.catalogV2.applyProductMessageStatus[messageId]
