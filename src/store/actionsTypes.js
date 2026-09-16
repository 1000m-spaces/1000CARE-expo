const REQUEST = 'REQUEST'
const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

const suffixTypes = [REQUEST, LOADING, SUCCESS, FAILURE]

function createRequestTypes(prefix = '', bases, suffixes = suffixTypes) {
  const req = {}
  bases.forEach(base => {
    suffixes.forEach(suffix => {
      req[`${base}_${suffix}`] = `${prefix}_${base}_${suffix}`
    })
  })
  return req
}

// Events related to Neomed REST API
export const NEOMED = createRequestTypes(
  'NEOMED',
  [
    'INIT_APP', // init config setting
    'LOGIN', // Login with username/password
    'LOGIN_PHONE', // Login with username/password
    'LOGIN_MOBILE',
    'DELETE_ACCOUNT_OTP_PASS',
    'DELETE_ACCOUNT_OTP',
    'CONFIRM_LOGIN_MOBILE',
    'CONFIRM_DELETE_ACOUNT_OTP',
    'REFRESH_TOKEN',
    'LOGOUT',
    'SET_TOKEN',
    'LOGIN_RESET',
    'USER_RESET',
    'CURRENT_USER', // Get current user
    'CONFIRM_LOGIN',
    'CONFIRM_LOGIN_FIREBASE',
    'UPDATE_PROFILE',
    'UPDATE_IDENTITY',

    // register
    'SIGNUP',
    'CONFIRM_SIGNUP',
    'GET_LIST_PHONE_BYPASS_FIREBASE',

    // user
    'GET_PROFILE',
    'UPDATE_IDENTITY', // Update user identity
    'GET_PHARMACY_INFO',
    'DELETE_ACCOUNT',

    // categories
    'GET_CATEGORIES_FULL', // Get list of categories full
    'GET_CATE_BY_SUP', // Get list of subcategory by supplier

    // products
    'GET_PRODUCTS', // Get list of products
    'GET_PRODUCTS_BY_CATE', // Get list of products
    'GET_PRODUCT_DETAILS',
    'GET_PRODUCTS_BY_PAYMENT',
    'GET_PRODUCTS_BY_DISTRIBUTOR',
    'GET_PRODUCTS_BY_SUPPLIER',
    'GET_PRODUCTS_EXCLUSIVE_BY_DISTRIBUTOR',
    'GET_PRODUCTS_RECENTLY_VIEWED',
    'GET_PRODUCTS_RECENTLY_VIEWED',
    'GET_PRODUCTS_BY_TRADEMARK',
    'GET_PRODUCTS_BEST_SELLER',
    'GET_PRODUCTS_HOT_DEAL',
    'GET_PRODUCT_PRICE_SOCK',
    'GET_PROPOSE_PRODUCT',

    // distributors
    'GET_ALL_DISTRIBUTORS', //Get all list distributes 
    'GET_DISTRIBUTORS_ACTIVE',
    'GET_DISTRIBUTORS_ACTIVE_HOTDEALS',
    'GET_SEARCH_DISTRIBUTOR',

    // supplier
    'GET_SUPPLIERS', //Get list Suppliers
    'GET_SUPPLIER_DETAILS', // Get supplier details
    'GET_SUPPLIER_BY_DISTRIBUTOR',

    // cart 
    'CART_INFO',
    'CART_OPTION_INFO',
    'ADD_TO_CART',
    'UPDATE_CART',
    'VIEW_CART',
    'CHECK_OUT',
    'UPDATE_PAYMENT_STATUS',
    'GET_PAYMENT_METHOD',
    'ADD_MULTI_PRODUCT_TO_CART',
    'ADD_PRODUCT_PROMOTION_TO_CART',

    // order
    'GET_ORDERS',
    'ORDER_DETAILS',
    'ORDER_PAYMENT',
    'LIST_ORDER_PAYMENT',
    'LIST_ORDER_CONFIRM_PAYMENT',
    'BUY_AGAIN',
    'USER_CONFIRM',
    'GET_ITEM_HISTORY',
    'CHANGE_ORDER_STATUS',

    // accounting
    'BALANCE',
    'GET_WALLET',
    'LINK_PAYMENT',
    'CONFIRM_LINK',
    'REQ_TOPUP',
    'CONFIRM_TOPUP',
    'GET_TRANSACTION_HISTORY',

    // search
    'SEARCH',

    // address
    'GET_ADDRESS_BOOKS',
    'GET_PROVINCES',
    'GET_DISTRICTS',
    'GET_WARDS',
    'ADD_ADDRESS',
    'DELETE_ADDRESS',
    'UPDATE_ADDRESS',

    // wishlist
    'GET_WISHLIST',
    'ADD_PRODUCT_WISHLIST',
    'DELETE_PRODUCT_WISHLIST',

    //wallet
    'GET_INFO_WALLET',
    'CHECK_LOAN',
    'GET_LOAN_INFO',
    'CREATE_LOAN',
    'CREATE_LOAN_CONFIRM',
    'PRE_CLOSE',
    'PRE_CLOSE_CONFIRM',
    'GET_LOAN_PROPOSALS',
    'LINK_RESOURCE',
    'LINK_RESOURCE_CONFIRM',
    'GET_CUSTOMER_INFO',
    'CHARGE_FEE',

    //Banners
    'GET_BANNERS',
    'GET_ALL_BANNERS',

    //CAMPAIGNS
    'GET_COMPAIGN_DETAIL',
    'GET_COMPAIGN_BY_DISTRIBUTOR',
    'GET_TRADEMARKS_BY_DISTRIBUTOR',
    'GET_TRADEMARKS_ADVERTISEMENT',
    'GET_COMPAIGN_BY_DISTRIBUTOR_BY_PRODUCT',
    'GET_COMPAIGN_TOPUP_BY_DISTRIBUTOR',
    'GET_COMPAIGN_OF_DISTRIBUTOR_BY_PRODUCT',

    //NOTI
    'REGISTER_FCM',
    'UN_REGISTER_FCM',
    'GET_LIST_NOTI',
    'GET_CHECK_READ_NOTI',

    //REFERRAL
    'CHECK_REFERRAL',
    'APPLY_REFERRAL',

    //CDN
    'PUSH_IMAGE',

    //VOUCHER
    'GET_LIST_VOUCHER_BY_CUSTOMER',
    'GET_LIST_VOUCHER_VALID_BY_CUSTOMER',

    //PHARMACIES
    'GET_UPDATE_PHARMACY',
    'GET_PHARMACY_BY_ID',
    'GET_ADD_FAVOURITE_SUPPLIER',
    'GET_CHECK_ONLINE_PHARMACY',
    'ADD_AUTHORIZED_PHARMACY',

    // ADS
    'GET_ADS_BANNER_BY_DISTRIBUTOR',
    'GET_ADS_BANNER_HOME_NEOMED_BY_DISTRIBUTOR',

    //VERSION
    'GET_VERSION',
  ],
  suffixTypes,
)

// Events cho backend mới marketplace-core (auth/v1 + customer/v1) — tách
// hẳn namespace AUTH_V2 khỏi NEOMED để không đụng state/luồng auth cũ,
// vì 2 backend khác model (phone+password JWT vs Firebase phone-OTP) và
// đang chạy song song trong lúc backend mới chưa đủ module thay hẳn.
export const AUTH_V2 = createRequestTypes(
  'AUTH_V2',
  [
    'REGISTER', // POST /auth/v1/register — tạo identity + gửi OTP
    'VERIFY_PHONE', // POST /auth/v1/phone/verify
    'RESEND_OTP', // POST /auth/v1/phone/resend
    'LOGIN', // POST /auth/v1/login — trả access+refresh token
    'REFRESH', // POST /auth/v1/refresh
    'ME', // GET /customer/v1/me
    'MEMBERSHIPS', // GET /auth/v1/memberships — check đã được duyệt vào nhà thuốc chưa
    'REGISTER_CUSTOMER', // POST /customer/v1/registration — nhà thuốc tự đăng ký
    'GET_KYC', // GET /customer/v1/kyc
    'SUBMIT_KYC', // POST /customer/v1/kyc
    'UPLOAD_KYC_DOC', // upload 1 ảnh giấy phép (2 bước: create + confirm)
    'GET_MARKETER_LINKS', // GET /customer/v1/marketer-links
    'CONFIRM_MARKETER_LINK', // POST /customer/v1/marketer-links/{id}/confirm
    'REJECT_MARKETER_LINK', // POST /customer/v1/marketer-links/{id}/reject
    'GET_ORDERS_V2', // GET /customer/v1/orders?status=
    'GET_ORDER_DETAIL_V2', // GET /customer/v1/orders/{id}
    'CANCEL_ORDER_V2', // POST /customer/v1/orders/{id}/cancel
    'ACKNOWLEDGE_ORDER_V2', // POST /customer/v1/orders/{id}/acknowledge
    'GET_NOTIFICATIONS_V2', // GET /customer/v1/notifications
    'MARK_NOTIFICATION_READ_V2', // POST /customer/v1/notifications/{id}/read
    'LOGOUT',
  ],
  suffixTypes,
)

// Catalog/giỏ hàng THẬT (backend mới) — màn RIÊNG, chưa đụng tab "Giỏ quà"
// hay checkout thật. Xem [[marketplace-core-business-model]] mục shape
// catalog/cart đổi 2026-09-14/15.
export const CATALOG_V2 = createRequestTypes(
  'CATALOG_V2',
  [
    'GET_STORES', // GET /customer/v1/stores
    'GET_CARTS', // GET /customer/v1/carts — mọi giỏ đang mở (theo store)
    'GET_STORE_PRODUCTS', // GET /customer/v1/stores/{id}/products
    'GET_STORE_CART', // GET /customer/v1/stores/{id}/cart?member=
    'UPDATE_CART_ITEM', // PUT /customer/v1/stores/{id}/cart/items/{productId}
    'DELETE_CART_ITEM', // DELETE /customer/v1/stores/{id}/cart/items/{productId}
    'GET_PRODUCT_MESSAGES', // GET /customer/v1/product-messages
    'APPLY_PRODUCT_MESSAGE', // POST /customer/v1/product-messages/{id}/apply-to-cart
    'CHECKOUT_CART', // POST /customer/v1/orders {cart_id} — đặt đơn thật, 1 giỏ → 1 đơn
  ],
  suffixTypes,
)
