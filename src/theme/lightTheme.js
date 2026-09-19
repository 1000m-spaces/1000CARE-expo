/**
 * Colors containing for light theme
 */
import { brandColors, brandGradients } from '~/design-system/tokens'

const WHITE = '#fff'
const GRAY_100 = '#f9f9f9'
const GRAY_200 = '#e0e0e0'
const GRAY_300 = '#ced2d9'
const GRAY_400 = '#979da0'
const GRAY_500 = '#6d787e'
const GRAY_600 = '#354052'
const BLACK = '#000'
const PRIMARY_COLOR = brandColors.tealPrimary
export default {
  // grey scale
  white: WHITE,
  gray100: GRAY_100,
  gray200: GRAY_200,
  gray300: GRAY_300,
  gray400: GRAY_400,
  gray500: GRAY_500,
  gray600: GRAY_600,
  black: BLACK,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'transparent',
  /**
   * The background color appears behind scrollable content
   */
  backgroundColor: brandColors.background,
  /**
   * Surface colors affect surfaces(background) of components, such as cards, sheets, and menus
   */
  surfaceColor: brandColors.surface,
  /**
   * Use it for card border, InputText border etc.
   */
  borderColor: brandColors.border,
  /**
   * Default icon color
   */
  iconColor: GRAY_500,
  /**
   * ========================= Primary color : (Brand color) =========================
   * primaryLightColor: Lighter shade of primary color, (can be used for hover effects)
   * primaryColor: To be used as background color for components which denotes primary action
   * primaryDarkColor: Darker shade of primary color, (can be used for border color or text color of components)
   */
  primaryLightColor: brandColors.tealLight,
  primaryColor: PRIMARY_COLOR,
  primaryDarkColor: brandColors.tealDark,
  /**
   * Color which will replace primary color,
   * when component is in disabled state
   *
   * disabledDarkColor: to be used for border color & text color of disabled component
   */
  disabledColor: '#E3E6E8',
  disabledDarkColor: '#99A1A8',
  /**
   * To be used for heading text
   */
  headingTextColor: BLACK,
  /**
   * To be used for sub-heading text
   */
  subHeadingTextColor: brandColors.textDark,
  /**
   * The default color of text in many components.
   * To be used for normal text like paragraph
   */
  bodyTextColor: brandColors.muted,
  /**
   * To be used for hint/label text component
   */
  labelTextColor: brandColors.mutedLight,
  /**
   * Green shade for success messages and icons.
   */
  successColor: brandColors.success,
  /**
   * Red shade for error messages and icons
   */
  errorColor: '#ff190c',
  // ===========================================================
  // ================ Component Specific Style =================
  // ===========================================================
  /**
   * ========================= Appbar =========================
   * appbar.statusBarColor: color for the status bar
   * appbar.barStyle: Sets the color of the status bar text.
   * appbar.backgroundColor: background color for appbar(toolbar)
   * appbar.tintColor: to be used for appbar title text, appbar icons color and for back button
   *
   * Note: If appbarColor color is dark, make appbarTintColor light
   * Note: If statusBarColor is light, set barStyle to `dark-content` else `light-content`
   */
  appbar: {
    // ĐỔI 2026-09-19: statusBarColor trước dùng `surface` (trắng tinh
    // #FFFFFF) trong khi nền thật của app (BackgroundWash/màn Home) là
    // `background` (#FAF9FC, hơi ngả tím rất nhẹ) — 2 màu gần giống
    // nhau nhưng đủ khác để lộ 1 dải màu khác ngay sau status bar (sếp
    // báo "header lệch màu so với background"). Khớp lại đúng `background`
    // để liền mạch, không còn seam.
    statusBarColor: brandColors.background,
    barStyle: 'dark-content',
    backgroundColor: brandColors.surface,
    tintColor: brandColors.tealPrimary,
  },
  mainColor: {
    primary: '#1976D2',
    red: '#e53935',
    white: '#ffff',
    gray: '#CFD8DC',
    black: '#000000',
    guide_dot: '#48654b',
    black_less: '#191919',
    input_register_text_color: '#A1A1A1',
    gradient_red: ['#ED000C', '#D80011', '#C30014'],
    gradient_header: ['#dcdcdc', '#fff', '#dcdcdc', '#fff'],
    gradient_bg_active_header_btn: ['#CDCDCD', '#CDCDCD', '#CDCDCD'],
    gradient_header_tab_inactive: ['#fff', '#fff', '#fff'],
    gray_tint_eye: '#B5B5B5',
    border_input_new_pass: '#ccc',
    transparent: 'transparent',
    // txt_hello: "#E20019",
    bg_side_menu: '#fdfef9',
    line_red: '#DD0000',
    line_gray: '#CAD1C7',
    bg_side_bar: '#fdfef9',
    side_menu_wrapper: '#2a3541',
    header_tab_active_viettel_pay: '#1184B5',
    gradient_header_tab_viettel_pay: brandGradients.primary,
    news_dot: 'rgba(0,0,0,1)',
    border_input_update: '#ddd',
    dim: 'rgba(0, 0, 0, 0.4)',
    diamond_label: '#f8fb7a',
    txt_desc: 'rgb(94, 94, 94)',
    txt_head: 'rgb(82,81,80)',
    history_bg: '#E4E5E7',
    green: 'green',
    separator_line: '#333',
    container_pending_cancel: 'rgba(0, 0, 0, 0.5)',
    icon_radio_language: 'rgba(0,0,0,0.8)',
    bg_loading_container: 'rgba(0, 0, 0, 0.25)',
    separated_or: 'rgb(137,148,113)',
    separated_line: 'rgb(65,93,72)',
    container_shop_list: 'rgba(0,0,0,0.5)',
    view_more_desc: 'rgb(60,116,243)',
    border_checkbox_cart: '#E8EAEB',
    active_checkbox_cart: '#E30021',
    text_checkbox_cart: '#44474A',
    border_opt_detail: '#EAEAEA',
    gradient_item_buy: ['#E0E1E6', '#F1F2F4', '#F2F4F5'],
    btn_ok_vip_cart: '#000',
    add_cart_more_opt: '#ECECEC',
    opt_length_add_cart: '#F2F4F5',
    shadow_wrapper_order: '#d3d3d3',
    current_shop: '#ADAEAF',
    btn_radio_default: '#2196f3',
    bring_time_inner: '#FDFFFF',
    input_table_container: '#E4E3E6',
    product_container: '#E6E7EA',
    history_complete: '#00CC00',
    history_cancel: '#AA0000',
    history_check: '#3300FF',
    history_wait: '#1769ff',
  },
  appColor: {
    colorMain: brandColors.tealPrimary,
    title: '#fff',//màu chữ Tài khoản trong Account
    tabBarActiveTextColor: '#fff',//màu chữ tabTop
    tabBarBackgroundColor: 'black',
    tabBarUnderline: brandColors.tealPrimary,//thanh kẻ dưới của tabTop
    bg_container: '#fff',
    input_login_text_color: 'rgb(137,143,113)',
    btn_login: brandColors.tealPrimary,//nút đăng nhập
    text_btn_login: '#fff',
    text_btn_login_other: '#fff',
    btn_login_facebook: '#30377D',//màu button login face
    btn_order_now: '#B20005',// màu button order now
    gradient_header_tab_active: ['#fff', '#fff', '#fff'],//background logo đầu tiên trên cùng
    tab_view: '#F1E1D2',
    gradient_home: ['#F1E1D2', '#F1E1D2', '#F1E1D2', '#F1E1D2'],
    btn_login_phone: '#737270',//màu button login phone
    text_footer: '#062480',//màu chữ cuối trang login FFF700
    header_tab_active: brandColors.tealPrimary,//màu vạch kẻ trên cùng tab
    txt_user_name: brandColors.tealPrimary,// màu name use
    gradient_error_btn: [brandColors.tealPrimary, brandColors.tealPrimary, brandColors.tealPrimary],//màu button Trải nghiệm ngay lần đầu đăng nhập
    line_profile: brandColors.tealPrimary,//màu boder ảnh profile,đường kẻ nhỏ ở dưới ảnh
    priceDisplay: '#D88F33',//màu giá bán
    prodprice: '#AFA69D',// màu giá cũ
    btn_order: [brandColors.tealPrimary, brandColors.tealPrimary, brandColors.tealPrimary],//button order
    btn_update_pass: brandColors.tealPrimary,//background số lượng thông báo hôp thư
    btn_language: '#fff', //color chữ ok language
    bg_lang_modal: '#E6E6E6',//background cả modal thay đổi ngôn ngữ
    txt_option_side_menu: '#383A3A',//màu chữ các mục trong drawer
    txt_user_id: '#1E1F21',// màu chữ id và Point trong drawar
    btn_gradient: [brandColors.tealPrimary, brandColors.tealPrimary, brandColors.tealPrimary],//color button bật GPS
    gradient_select_shop: ['#BDD647', '#BDD647', '#BDD647'],//nút ok chọn shop
    btn_option_side_menu_focus: '#EEEAEA',//background mục được chọn drawer
    textName_Profile: '#470704',
    textOther_Profile: '#000',//màu chữ id và Point trong thông tin account
    button_language: brandColors.tealPrimary,//background button Ok language
    button_add: brandColors.tealPrimary,
    number_in_order: brandColors.tealPrimary,
    backgroundColor: brandColors.tealPrimary,
  },
}
