import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import categoriesReducer from './categories/categoriesReducer'
import orderReducer from './orders/OrderReducer'
import distributeReducer from './distributors/distributeReducer'
import productsReducer from './products/productsReducer'
import supplierReducer from './suppliers/suppliersReducer'
import cartReducer from './cart/cartReducer'
import userReducer from './user/userReducer'
import walletReducer from './wallet/walletReducer'
import searchReducer from './search/searchReducer'
import addressBookReducer from './address/AddressReducer'
import registerReducer from './register/registerReducer'
import wishListReducer from './wishlist/WishListReducer'
import bannerReducer from './banner/bannerReducer'
import campaignReducer from './campaigns/campaignReducer'
import NotiReducer from './noti/NotiReducer'
import ReferralReducer from './referral/ReferralReducer'
import PharmaciesReducer from './pharmacies/pharmaciesReducer'
import voucherReducer from './voucher/voucherReducer'
import trademarksReducer from './trademarks/TrademarksReducer'
import adsReducer from './ads/adsReducer'
import versionReducer from './version/versionReducer'
import authV2Reducer from './authV2/authV2Reducer'
import catalogV2Reducer from './catalogV2/catalogV2Reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  order: orderReducer,
  dist: distributeReducer,
  products: productsReducer,
  suppliers: supplierReducer,
  cart: cartReducer,
  user: userReducer,
  wallet: walletReducer,
  search: searchReducer,
  addressBook: addressBookReducer,
  register: registerReducer,
  wishList: wishListReducer,
  banner: bannerReducer,
  campaign: campaignReducer,
  noti: NotiReducer,
  referral: ReferralReducer,
  pharmacies: PharmaciesReducer,
  voucher: voucherReducer,
  trademarks: trademarksReducer,
  ads: adsReducer,
  version: versionReducer,
  authV2: authV2Reducer,
  catalogV2: catalogV2Reducer,
})

export default (state, action) => rootReducer(state, action)