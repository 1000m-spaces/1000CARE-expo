export const getStoresV2Status = state => state.catalogV2.storesStatus
export const getStoresV2 = state => state.catalogV2.stores

export const getCartsV2Status = state => state.catalogV2.cartsStatus
export const getCartsV2 = state => state.catalogV2.carts

// min_order_value THUỘC STORE (backoffice đặt), KHÔNG nằm trong response
// cart (xác nhận bằng curl thật 2026-09-16: GET .../cart không có field
// này) — trước đó lỡ đọc nhầm từ cart, luôn ra undefined nên thanh tiến
// độ ở StoreCartV2 không hoạt động. Đọc đúng từ danh sách store đã có.
export const getStoreMinOrderValueV2 = (state, storeId) =>
  (state.catalogV2.stores || []).find(s => s.id === storeId)?.min_order_value || 0

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

// "Hội thoại" = nhóm ProductMessage theo member_marketer_id — API không
// có khái niệm conversation/thread thật, đây là nhóm phía client (xem
// [[marketplace-core-business-model]] mục 'chat marketer'). Mỗi nhóm
// sắp theo created_at mới nhất lên đầu (cho màn danh sách), item trong
// nhóm sắp cũ→mới (cho màn thread hiển thị theo dòng thời gian).
export const getProductMessageThreadsV2 = state => {
  const messages = state.catalogV2.productMessages || []
  const byMarketer = {}
  messages.forEach(msg => {
    const key = msg.member_marketer_id || 'unknown'
    if (!byMarketer[key]) byMarketer[key] = []
    byMarketer[key].push(msg)
  })
  return Object.entries(byMarketer)
    .map(([marketerId, items]) => {
      const sorted = [...items].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
      const last = sorted[sorted.length - 1]
      const unappliedCount = sorted.filter(m => !m.applied_at).length
      return { marketerId, messages: sorted, lastMessage: last, unappliedCount }
    })
    .sort((a, b) => new Date(b.lastMessage?.created_at || 0) - new Date(a.lastMessage?.created_at || 0))
}

export const getProductMessageThreadV2 = (state, marketerId) =>
  getProductMessageThreadsV2(state).find(t => t.marketerId === marketerId) || null

// Dùng cho màn xem trước riêng (ProductMessagePreviewV2) — mở từ bong
// bóng chat, tra thẳng theo id thay vì phải truyền cả object qua route
// params (giữ UI luôn đọc dữ liệu mới nhất từ redux).
export const getProductMessageByIdV2 = (state, messageId) =>
  (state.catalogV2.productMessages || []).find(m => m.id === messageId) || null

export const getCheckoutCartV2Status = (state, storeId) => state.catalogV2.checkoutStatus[storeId]
export const getCheckoutCartV2Order = (state, storeId) => state.catalogV2.checkoutOrder[storeId]
export const getCheckoutCartV2Err = (state, storeId) => state.catalogV2.checkoutErr[storeId]

// Trang chủ — kiến trúc Campaign (2026-09-18) — xem
// [[marketplace-core-business-model]]. `campaignType`: 'banner' | 'featured_supplier' | 'flash_sale'.
export const getCampaignsV2Status = (state, campaignType) => state.catalogV2.campaignsStatus[campaignType]
export const getCampaignsV2 = (state, campaignType) => state.catalogV2.campaigns[campaignType] || []

export const getProductDetailV2Status = (state, productId) => state.catalogV2.productDetailStatus[productId]
export const getProductDetailV2 = (state, productId) => state.catalogV2.productDetail[productId]

export const getStoreCategoriesV2Status = (state, storeId) => state.catalogV2.storeCategoriesStatus[storeId]
export const getStoreCategoriesV2 = (state, storeId) => state.catalogV2.storeCategories[storeId] || []

export const getSearchSuggestionsV2Status = state => state.catalogV2.searchSuggestionsStatus
export const getSearchSuggestionsV2 = state => state.catalogV2.searchSuggestions

export const getSearchProductsV2Status = state => state.catalogV2.searchProductsStatus
export const getSearchProductsV2 = state => state.catalogV2.searchProducts
export const getSearchProductsV2Total = state => state.catalogV2.searchProductsTotal
