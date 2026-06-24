import { Platform } from 'react-native'
export const platform = Platform.OS
export const isRelease = true //TODO: change site test/release
export const isDistribute = true //TODO: check is distribute
export const host = isRelease
  ? 'https://test.mycafe.co'
  : 'http://develope.mycafe.co'
export const proxyURL = `${host}/api1.0.php`

export const bgr_button_vip = ['#F1E07B', '#E2CB67', '#D2B455']
export const IMAGE_URL = 'https://helio.assets.ciaolink.net'
export const PARTNER_ID = 95 //Neo Med

export const provider = 'Neo Med'
export const AppName = 'Neo Med'

export const AppFullName = 'Neo Med'

export const APP_ID = 1082101102

export const APP_NAME_UPDATE = 'Neo Med'

export const PACKAGE_NAME = 'com.m1000.healthcare'

// --------------------------------------- style NeoMed ---------------------------------------
export const topLogo = 20 // style Login screen
export const widthLogo = 160
export const heightLogo = 160
export const height_logo_textinput = 10

export const heightTab = 27 // style item BottomBar
export const widthTab = 27
export const heightTabHome = 63
export const widthTabHome = 65
export const topTab = 15
export const topTabHome = 0
export const topTabHome1 = 3
export const heightBottomBar = 68
export const heightBottomBarBG = 45
export const bottomBottomBar = 20

export const listLanguage = [
  {
    title: 'Tiếng Việt',
    code: 'vi',
    img: require('../assets/configNeoMed/vn.png'),
  },
  {
    title: 'English',
    code: 'en',
    img: require('../assets/configNeoMed/en.png'),
  },
]
export const ORDER_TYPE = {
  NORMAL: 0,
  GIFT: 1,
}

// // --------------------------------------- List Image NeoMed ---------------------------------------

export const BG_login = require('../assets/configNeoMed/bg_login.png') // background trang login
export const logo_login = require('../assets/configNeoMed/logo2.png')
export const eye = require('../assets/configNeoMed/eye.png')
export const icon_f = require('../assets/configNeoMed/icon_f.png')
export const ic_check_box_checked = require('../assets/configNeoMed/ic_check_box_checked.png')
export const ic_check_box_unchecked = require('../assets/configNeoMed/ic_check_box_unchecked.png')
export const tk_account = require('../assets/configNeoMed/tk_acount.png')
export const icon_account_active = require('../assets/configNeoMed/icon_account_active.png')
export const mk_account = require('../assets/configNeoMed/pass_acount.png')
export const Rectangle_title = require('../assets/configNeoMed/BG_TabBar.png')
export const diamond = require('../assets/configNeoMed/diamond.png')
export const icon_close = require('../assets/configNeoMed/icon_close.png')
export const space = require('../assets/configNeoMed/space.png')
export const BG_btn = require('../assets/configNeoMed/BG_btn.png')
export const BG_TabBar = require('../assets/configNeoMed/BG_TabBar.png')
export const lock_success = require('../assets/configNeoMed/lock_success.jpg')
export const BG_LANGUAGE = require('../assets/configNeoMed/BG_language.jpg')
export const Rectangle = require('../assets/configNeoMed/Rectangle.png')
export const Bg_menu_left = require('../assets/configNeoMed/bg_menu_left.png')
export const avt_dafault = require('../assets/configNeoMed/avt_dafault.png')
export const chart = require('../assets/configNeoMed/chart.png')
export const Voucher = require('../assets/configNeoMed/Voucher.png')
export const Messge = require('../assets/configNeoMed/Messge.png')
export const Point = require('../assets/configNeoMed/Point.png')
export const instruction = require('../assets/configNeoMed/instruction.png')
export const Language = require('../assets/configNeoMed/Language.png')
export const Logout = require('../assets/configNeoMed/logout.png')
export const hotDeal = require('../assets/configNeoMed/HotDeal.png')
export const bacgrounDistri = require('../assets/configNeoMed/logoDistri/bacgrounDistri.png')
export const logoChoThuoc = require('../assets/configNeoMed/logoDistri/logoChoThuoc.png')
export const logoDap = require('../assets/configNeoMed/logoDistri/logoDap.png')
export const subAgency = require('../assets/configNeoMed/logoDistri/subAgency.png')
export const logiDistri = require('../assets/configNeoMed/logoDistri/logiDistri.png')
export const logoMedicine = require('../assets/configNeoMed/logoDistri/logoMedicine.png')
export const trackOrder = require('../assets/configNeoMed/logoDistri/trackOrder.png')
export const image1 = require('../assets/configNeoMed/LogoHotDeal/image1.png')
export const image2 = require('../assets/configNeoMed/LogoHotDeal/image2.png')
export const image3 = require('../assets/configNeoMed/LogoHotDeal/image3.png')
export const image4 = require('../assets/configNeoMed/LogoHotDeal/image4.png')
export const Rectangle1 = require('../assets/configNeoMed/logoGift/Rectangle1.png')
export const Rectangle2 = require('../assets/configNeoMed/logoGift/Rectangle2.png')
export const Rectangle3 = require('../assets/configNeoMed/logoGift/Rectangle3.png')
export const Rectangle4 = require('../assets/configNeoMed/logoGift/Rectangle4.png')
export const Rectangle5 = require('../assets/configNeoMed/logoGift/Rectangle5.png')
export const Rectangle6 = require('../assets/configNeoMed/logoGift/Rectangle6.png')
export const logoNeoMed = require('../assets/configNeoMed/logo1000M.png')
export const MBbank = require('../assets/configNeoMed/MBbank2.png')
export const cart = require('../assets/configNeoMed/cart.png')
export const dapLogo = require('../assets/configNeoMed/dapLogo.png')
export const cart2 = require('../assets/configNeoMed/cart2.png')
export const back = require('../assets/configNeoMed/back.png')
export const Star = require('../assets/configNeoMed/Star.png')
export const StarAction = require('../assets/configNeoMed/StarAction.png')
export const logoGiftPoint = require('../assets/configNeoMed/logoGift/logoGiftPoint.png')
export const pencil = require('../assets/configNeoMed/pencil.png')
export const Vector = require('../assets/configNeoMed/Vector.png')
export const shopping_cart = require('../assets/images/shopping_cart.svg')
export const eye2 = require('../assets/configNeoMed/eye_2.png')

export const safety_certificate = require('../assets/configNeoMed/safety-certificate.png')
export const poweroff = require('../assets/configNeoMed/poweroff.png')
export const mail = require('../assets/configNeoMed/mail.png')
export const global = require('../assets/configNeoMed/global.png')
export const icon_voucher = require('../assets/configNeoMed/icon_voucher.png')
export const file_search = require('../assets/configNeoMed/file-search.png')
export const dollar = require('../assets/configNeoMed/dollar.png')
export const credit_card = require('../assets/configNeoMed/credit-card.png')
export const shopping = require('../assets/configNeoMed/shopping.png')
export const close = require('../assets/configNeoMed/close.png')
export const empty_cart = require('../assets/configNeoMed/empty_cart_bag.png')
export const checked = require('../assets/configNeoMed/checked.png')
export const check = require('../assets/configNeoMed/check.png')
export const copyright = require('../assets/configNeoMed/copyright.png')
export const chevron_right = require('../assets/configNeoMed/chevron_right.png')
export const close_white = require('../assets/configNeoMed/close_white.png')
export const shopping_cart_white = require('../assets/configNeoMed/shopping_cart_white.png')
export const image_error = require('../assets/configNeoMed/image_error.jpg')
export const successPay = require('../assets/configNeoMed/successPay.png')
export const loadingPay = require('../assets/configNeoMed/loadingPay.png')
export const iconErrorOTP = require('../assets/configNeoMed/iconErrorOTP.png')
export const confirm = require('../assets/configNeoMed/CreateLoan/confirm.png')
export const people = require('../assets/configNeoMed/CreateLoan/people.png')
export const register = require('../assets/configNeoMed/CreateLoan/register.png')
export const success = require('../assets/configNeoMed/CreateLoan/success.png')
export const pharmaciesActive = require('../assets/configNeoMed/CreateLoan/pharmaciesActive.png')
export const confirmActive = require('../assets/configNeoMed/CreateLoan/confirmActive.png')
export const peopleActive = require('../assets/configNeoMed/CreateLoan/peopleActive.png')
export const registerActive = require('../assets/configNeoMed/CreateLoan/registerActive.png')
export const camera = require('../assets/configNeoMed/CreateLoan/camera.png')
export const information = require('../assets/configNeoMed/CreateLoan/information.png')

export const logo_text = require('../assets/configNeoMed/logo_text.png')
export const apple_logo = require('../assets/configNeoMed/apple_logo.png')
export const facebook_logo = require('../assets/configNeoMed/facebook_logo.png')
export const google_logo = require('../assets/configNeoMed/google_logo.png')
export const info = require('../assets/configNeoMed/info.png')
export const icon_info = require('../assets/configNeoMed/icon_info.png')
export const log_mb_bank_landscape = require('../assets/configNeoMed/log_mb_bank_landscape.png')
export const exception = require('../assets/configNeoMed/exception.png')
export const shopping_cart_black = require('../assets/configNeoMed/shopping_cart_black.png')
export const solution = require('../assets/configNeoMed/solution.png')
export const plus = require('../assets/configNeoMed/plus.png')
export const right_arrow = require('../assets/configNeoMed/right-arrow.png')
export const box_empty = require('../assets/configNeoMed/empty_box_teal.png')
export const heart_red = require('../assets/configNeoMed/heart_red.png')
export const plus_2 = require('../assets/configNeoMed/plus_2.png')
export const user = require('../assets/configNeoMed/user.png')
export const address_point = require('../assets/configNeoMed/address_point.png')
export const group_people = require('../assets/configNeoMed/group_people.png')

export const appstore = require('../assets/configNeoMed/navigation/appstore.png')
export const fire = require('../assets/configNeoMed/navigation/fire.png')
export const gift = require('../assets/configNeoMed/navigation/gift.png')
export const heart = require('../assets/configNeoMed/navigation/heart.png')
export const delivered = require('../assets/configNeoMed/navigation/delivered.png')

export const banner_1 = require('../assets/banner/banner_1.jpg')
export const banner_2 = require('../assets/banner/banner_1.jpg')
export const banner_3 = require('../assets/banner/banner_2.jpg')
export const banner_4 = require('../assets/banner/banner_3.jpg')
export const banner_dksh = require('../assets/banner/DKSH.jpg')

export const voucher_icon = require('../assets/configNeoMed/voucher_icon.png')
export const arrow_right = require('../assets/configNeoMed/arrow_right.png')
export const shopping_bag = require('../assets/configNeoMed/shopping_bag.png')
export const discount_icon = require('../assets/configNeoMed/discount_icon.png')
export const home = require('../assets/configNeoMed/home.png')
export const gift_fill = require('../assets/configNeoMed/gift_fill.png')
export const pill = require('../assets/configNeoMed/pill.png')
export const account = require('../assets/configNeoMed/account.png')
export const check_info = require('../assets/configNeoMed/check_info.png')
