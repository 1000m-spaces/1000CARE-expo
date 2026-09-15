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
