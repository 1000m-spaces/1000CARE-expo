import Config from 'react-native-config'
//dev
// const BASEPATH = 'https://dev-api.neomed.vn//v1'
// const BASE_ACCOUNT_PATH = 'https://dev-api.neomed.vn/'
// const BASE_REGISTER_PATH = 'http://123.31.29.218:9000/api/v1'
// const BASE_AUTH_PATH = 'https://dev-api.neomed.vn//api/v1'

const BASEPATH = Config.BASEPATH
const BASE_ACCOUNT_PATH = Config.BASE_ACCOUNT_PATH
const BASE_REGISTER_PATH = Config.BASE_REGISTER_PATH
const BASE_AUTH_PATH = Config.BASE_AUTH_PATH

// Backend mới marketplace-core (dev server team backend), theo
// docs/environments.md (nguồn sự thật cho domain, cập nhật 2026-09-07):
// dev qua nginx-proxy-manager, có HTTPS thật — dùng domain này thay vì
// IP:port thô (http://123.31.29.208:13000) để KHÔNG bị iOS ATS / Android
// cleartext-block chặn (đã từng phải vá native exception cho bản HTTP
// thô, giờ không cần nữa vì có HTTPS). Hardcode dev URL (chưa có biến
// .env riêng cho backend này), theo đúng kiểu BASE_REGISTER_PATH đã
// hardcode dev trước khi có Config ở trên.
const MARKETPLACE_CORE_BASE = 'https://dev-api-mkp.1000m.vn'
const CODE_PUSH_KEY = {
  ios: Config.IOS_CODEPUSH_KEY,
  android: Config.ANDROID_CODEPUSH_KEY,
}

export {
  BASEPATH,
  BASE_ACCOUNT_PATH,
  BASE_REGISTER_PATH,
  BASE_AUTH_PATH,
  MARKETPLACE_CORE_BASE,
  CODE_PUSH_KEY,
}