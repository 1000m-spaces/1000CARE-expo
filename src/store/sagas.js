import { fork } from 'redux-saga/effects'

import authSaga from './auth/authSagas'
import categorySagas from './categories/categoriesSagas'
import productSagas from './products/productsSagas'
import distributeSaga from './distributors/distributeSaga'
import supplierSaga from './suppliers/suppliersSagas'
import userSaga from './user/userSagas'
import cartSaga from './cart/cartSagas'
import walletSaga from './wallet/walletSagas'
import orderSaga from './orders/OrderSaga'
import searchSaga from './search/searchSagas'
import addressSaga from './address/AddressSaga'
import registerSaga from './register/registerSagas'
import wishlistSaga from './wishlist/WishListSaga'
import bannerSaga from './banner/bannerSagas'
import campaignSaga from './campaigns/campaignSagas'
import noti from './noti/NotiSaga'
import referral from './referral/ReferralSaga'
import cdn from './cdn/cdnSagas'
import voucher from './voucher/voucherSagas'
import pharmacies from './pharmacies/pharmaciesSagas'
import trademarks from './trademarks/TrademarksSaga'
import ads from './ads/adsSagas'
import versionSaga from './version/versionSagas'
import authV2Saga from './authV2/authV2Sagas'
/**
 * rootSaga
 */
export default function* root() {
  yield fork(authSaga)
  yield fork(categorySagas)
  yield fork(productSagas)
  yield fork(distributeSaga)
  yield fork(supplierSaga)
  yield fork(cartSaga)
  yield fork(orderSaga)
  yield fork(userSaga)
  yield fork(walletSaga)
  yield fork(searchSaga)
  yield fork(addressSaga)
  yield fork(registerSaga)
  yield fork(wishlistSaga)
  yield fork(bannerSaga)
  yield fork(campaignSaga)
  yield fork(noti)
  yield fork(referral)
  yield fork(cdn)
  yield fork(voucher)
  yield fork(pharmacies)
  yield fork(trademarks)
  yield fork(ads)
  yield fork(versionSaga)
  yield fork(authV2Saga)
}
