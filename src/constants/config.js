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

// Backend mới marketplace-core (dev server của team backend) — chỉ auth +
// GET /customer/v1/me ổn định để ráp thử, catalog/cart/order chưa có nên
// KHÔNG dùng base này cho gì khác. Hardcode dev URL (chưa có biến .env
// riêng cho backend này), theo đúng kiểu BASE_REGISTER_PATH đã hardcode
// dev trước khi có Config ở trên.
const MARKETPLACE_CORE_BASE = 'http://123.31.29.208:13000'
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