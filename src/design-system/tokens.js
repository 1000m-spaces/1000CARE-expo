// Đồng bộ theo design system app Marketer (bản handoff chính thức chủ dự
// án gửi riêng, 2026-09-15) — giữ nguyên TÊN token để không phải sửa lại
// hàng trăm chỗ dùng `brandColors.tealPrimary`/`tealDark`, chỉ đổi giá
// trị hex sang "ink"/"gold" của bộ nhận diện mới. `tealPrimary`/`tealDark`
// giờ mang đúng giá trị --ink/--ink-2 của design system đó.
export const brandColors = {
  tealPrimary: '#029E9D', // --ink
  tealDark: '#017472', // --ink-2
  tealLight: '#EDFBFC', // --surface-2 (không đổi, đã khớp sẵn)
  goldAccent: '#F5A623', // --gold (không đổi, đã khớp sẵn)
  goldDark: '#9D6A16', // --gold-dark
  goldTint: '#FFDD9E', // --gold-tint
  textDark: '#1A1A2E', // --text
  background: '#F5F6F7', // --bg
  surface: '#FFFFFF',
  surfaceAlt: '#FDFBFF',
  border: '#DDEBED',
  borderSoft: '#EEF5F6',
  muted: '#6D787E', // --text-2
  mutedLight: '#9AA8AD',
  mutedFaint: '#6D777B', // --text-3
  danger: '#FF3B30',
  dangerTint: '#FFF1F0',
  dangerText: '#D13027',
  success: '#10B981',
  successTint: '#ECFDF5',
  successText: '#0B825A',
  warning: '#F5A623',
  warningTint: '#FFF7E6',
};

export const brandTypography = {
  title1: 28,
  title2: 18,
  body: 14,
  caption: 11,
};

// Thang chữ theo ngữ cảnh — mỗi vai trò UI có 1 size/weight cố định,
// dùng xuyên suốt app thay vì chọn size tự do theo từng màn hình.
// Đồng bộ theo design system "1000M Order App" (--text-*-size/weight):
// section-title 18/700, product-title 13/600, price 14/700,
// price-old 12/400, body 11.5/400, tab 13 (400 thường/600 active).
export const typeScale = {
  pageTitle: { fontSize: 17, fontWeight: '800' },
  heroTitle: { fontSize: 28, fontWeight: '700', letterSpacing: -0.4 },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  itemName: { fontSize: 13, fontWeight: '600' },
  itemDescription: { fontSize: 11.5, fontWeight: '400' },
  price: { fontSize: 14, fontWeight: '700' },
  priceOld: { fontSize: 12, fontWeight: '400', textDecorationLine: 'line-through' },
  priceCompact: { fontSize: 13, fontWeight: '700' },
  tab: { fontSize: 13, fontWeight: '400' },
  tabActive: { fontSize: 13, fontWeight: '600' },
  eyebrow: { fontSize: 11, fontWeight: '700', letterSpacing: 1.4, textTransform: 'uppercase' },
  counter: { fontSize: 22, fontWeight: '700', fontVariant: ['tabular-nums'] },
};

export const brandRadius = {
  card: 24,
  control: 16,
  pill: 999,
  badge: 11,
};

// Thang bo góc cố định — chọn theo loại component, không tự do.
// xxxl nâng 20->24 theo --r-lg của design system app Marketer (card lớn/
// modal bo tròn hơn hẳn — bản trước "goc-nhon" hơn thang mới).
export const radiusScale = {
  xs: 8,   // nút +/-, banner cảnh báo nhỏ
  sm: 9,   // badge, thumb toggle
  md: 10,  // nút phụ, logo nhỏ trong header
  lg: 12,  // hàng lựa chọn (payment/voucher row), ảnh trong giỏ hàng — = --r-sm
  xl: 14,  // ô lựa chọn (size/topping tương đương), input pin
  xxl: 16, // ảnh sản phẩm, khối section, thanh nổi dưới — = --r-md
  xxxl: 24, // card lớn, modal xác nhận — = --r-lg
  pill: 999, // nút chính rộng, chip, segmented control — = --r-pill
};

// Thời lượng & easing cho các chuyển động lặp lại.
export const motion = {
  pageIn: { duration: 320, easing: 'ease' },
  pressScale: { duration: 120, toScale: 0.96 }, // phản hồi khi bấm: co nhẹ, KHÔNG đổi màu
  numberPop: { duration: 180 },
  badgePop: { duration: 500 }, // spring bezier(.34,1.56,.64,1)
  bumpIcon: { duration: 600 }, // spring bezier(.34,1.56,.64,1)
  markPop: { duration: 400 }, // spring bezier(.34,1.56,.64,1)
  amountCount: { duration: 750 }, // đếm số tiền chạy bằng Animated, easeOutCubic
  spinner: { duration: 700, easing: 'linear' },
};

// Quy tắc trạng thái tương tác — áp dụng đồng nhất cho mọi component
// bấm được, thay vì định nghĩa riêng lẻ từng nơi.
export const stateRules = {
  pressed: 'scale(0.96), không đổi màu nền/chữ',
  selected: 'bật nền tint mờ theo brand (xem `selectedTint` bên dưới), không dùng viền màu',
  disabled: 'opacity 0.5 + không bắt sự kiện chạm',
  empty: 'icon mờ (mutedLight) + tiêu đề (textDark) + mô tả (muted) + 1 CTA quay lại',
};

export const selectedTint = 'rgba(2,158,157,0.08)'; // brandColors.tealPrimary (--ink) ở alpha 8%, dùng khi 1 lựa chọn/hàng đang active

export const brandShadow = {
  teal: {
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
  // "Deeper, more premium, lifted" card shadow theo bản redesign
  // (0 8-10px 20-24px rgba(10,47,56,0.06-0.09)) — RN chỉ hỗ trợ 1 lớp
  // shadow/View nên lấy giá trị giữa của khoảng trên.
  soft: {
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.075,
    shadowRadius: 22,
    elevation: 5,
  },
  // Card đang được chọn/nổi bật (địa chỉ mặc định...) dùng shadow tint teal.
  softSelected: {
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  // --shadow-sheet của design system app Marketer — modal/bottom sheet nổi
  // hẳn lên (đậm hơn `soft` nhiều), RN 1 lớp nên lấy lớp ngoài (20px/.16).
  sheet: {
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 12,
  },
};

// ĐỔI 2026-09-15: bản thiết kế mới bỏ hẳn chất liệu kính mờ/blur (xem
// [[marketplace-core-business-model]] không liên quan — đây là style
// thuần theo bản handoff app Marketer). Giữ nguyên TÊN các token này
// (background/backgroundStrong/border/shadow...) vì ~40 file khắp app
// đang tham chiếu qua tên — chỉ đổi giá trị từ rgba trong suốt sang màu
// đặc phẳng (--surface/--border thật), để không phải sửa từng file mà
// cascade tự động. `gradient`/`gradientLocations` không còn nơi nào
// dùng (LiquidGlassView.js không còn được gọi ở đâu trong app) — giữ
// lại phòng khi cần, không xoá component.
export const liquidGlass = {
  background: '#FFFFFF',
  backgroundStrong: '#FFFFFF',
  backgroundTint: '#FFFFFF',
  border: '#DDEBED', // brandColors.border thật — trước là viền trắng mờ ăn theo blur, giờ phải là viền xám thấy được
  borderTint: 'rgba(2,158,157,0.14)', // brandColors.tealPrimary (--ink)
  // Gradient chéo dùng cho chất liệu "kính lỏng" (search bar, cart button,
  // back button, sticky footer) — linear-gradient(135deg, ...) từ bản redesign.
  gradient: ['rgba(255,255,255,0.8)', 'rgba(237,251,252,0.35)', 'rgba(255,255,255,0.6)'],
  gradientLocations: [0, 0.55, 1],
  // = --shadow của design system mới (0 2px 4px rgba(...,.05), 0 9px 22px
  // rgba(...,.075)) — cùng công thức đã dùng cho brandShadow.soft.
  shadow: {
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: 9 },
    shadowOpacity: 0.075,
    shadowRadius: 22,
    elevation: 5,
  },
};

// Nền "wash" mới phía sau toàn bộ nội dung màn hình — 3 quầng màu radial
// mờ (teal + gold) thay cho nền phẳng, dùng với component BackgroundWash.
export const backgroundWash = {
  base: '#F5F6F7',
  blobs: [],
};

export const brandGradients = {
  primary: [brandColors.tealDark, brandColors.tealPrimary],
  light: ['#FFFFFF', brandColors.tealLight],
  gold: [brandColors.goldAccent, '#FFC04D'],
};
