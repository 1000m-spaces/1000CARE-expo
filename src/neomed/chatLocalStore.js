import AsyncStorage from '@react-native-async-storage/async-storage'

// Tin nhắn văn bản trong "chat marketer" — theo thống nhất với
// 1000care-seller-app-f1 (app Marketer) 2026-09-15: marketplace-core
// KHÔNG có module chat, nên phần gợi ý sản phẩm đi qua backend thật
// (GET/POST /customer/v1/product-messages...), còn tin nhắn văn bản
// thường CHỈ lưu cục bộ trên máy này — KHÔNG đồng bộ 2 chiều với máy
// marketer. Xem [[marketplace-core-business-model]] mục 'chat marketer'.
const KEY_PREFIX = 'chat_local_v1:'

export const getLocalMessages = async marketerId => {
  try {
    const raw = await AsyncStorage.getItem(KEY_PREFIX + marketerId)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (e) {
    return []
  }
}

// text: string — trả về message vừa tạo {id, text, createdAt}
export const addLocalMessage = async (marketerId, text) => {
  const message = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    createdAt: new Date().toISOString(),
  }
  try {
    const existing = await getLocalMessages(marketerId)
    const next = [...existing, message]
    await AsyncStorage.setItem(KEY_PREFIX + marketerId, JSON.stringify(next))
  } catch (e) {
    // lưu cục bộ thất bại (vd hết dung lượng) — không chặn UI, tin nhắn
    // vẫn hiện tạm trong phiên hiện tại qua state của màn hình
  }
  return message
}
