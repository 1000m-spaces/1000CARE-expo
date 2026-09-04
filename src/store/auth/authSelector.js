export const getStateStatus = state => state.auth.loginStatus
export const getErrMsg = state => state.auth.errorMsg
export const getAccessToken = state => state.auth.token
// Đăng nhập qua backend mới (marketplace-core, xem authV2Reducer) cũng
// phải được các màn hình gate theo `isLoggedIn` (Profile/Cart/Orders...)
// coi là đã đăng nhập — OR 2 cờ lại thay vì để mỗi nơi tự check riêng
// `authV2.isLoggedInV2`, tránh phải sửa lại 11 màn hình đang dùng
// `getAuthStore`/`isLoggedIn`. Chỉ tạo object mới khi cờ OR thực sự khác
// `state.auth.isLoggedIn` — giữ nguyên tham chiếu `state.auth` ở mọi
// trường hợp khác để không phá tính ổn định tham chiếu (useSelector so
// sánh bằng `===`, tạo object mới mỗi lần gọi sẽ làm re-render thừa).
export const getAuthStore = state => {
  const isLoggedIn = state.auth.isLoggedIn || state.authV2?.isLoggedInV2 || false
  if (isLoggedIn === state.auth.isLoggedIn) return state.auth
  return { ...state.auth, isLoggedIn }
}
export const getUserId = state => state.auth.userId
export const getRefreshTokenStatus = state => state.auth.refreshTokenStatus
export const getLoginPhoneStatus = state => state.auth.loginPhoneStatus
export const getConfirmLoginStatus = state => state.auth.confirmLoginStatus
export const getConfirmLoginErr = state => state.auth.confirmLoginErr
export const getLoginReqId = state => state.auth.requestId
export const getListByPassFirebase = state => state.auth.listPhoneByPass
export const getStatusGetPhoneByPass = state => state.auth.statusGetPhoneByPass
export const getOtpToken = state => state.auth.otpToken
export const getDeleteAcountStatus = state => state.auth.deleteAcountStatus
export const getDeleteOtpToken = state => state.auth.deleteOtpToken
export const getDeleteAcountId = state => state.auth.deleteAcountId
export const getConfirmDeleteOtpStatus = state => state.auth.confirmDeleteOtpStatus
export const getConfirmDeleteOtpErr =  state => state.auth.confirmDeleteOtpErr
export const getIsLoadNccFavorite = state => state.auth.isLoadNccFavorite