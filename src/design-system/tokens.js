export const brandColors = {
  tealPrimary: '#0B7B8A',
  tealDark: '#075E6B',
  tealLight: '#EDFBFC',
  goldAccent: '#F5A623',
  textDark: '#1A1A2E',
  background: '#FEFFFE',
  surface: '#FFFFFF',
  surfaceAlt: '#FDFBFF',
  border: '#DDEBED',
  borderSoft: '#EEF5F6',
  muted: '#6D787E',
  mutedLight: '#9AA8AD',
  danger: '#FF3B30',
  success: '#10B981',
  warning: '#F5A623',
};

export const brandTypography = {
  title1: 28,
  title2: 18,
  body: 14,
  caption: 11,
};

// Thang chữ theo ngữ cảnh — mỗi vai trò UI có 1 size/weight cố định,
// dùng xuyên suốt app thay vì chọn size tự do theo từng màn hình.
export const typeScale = {
  pageTitle: { fontSize: 17, fontWeight: '800' },
  heroTitle: { fontSize: 28, fontWeight: '700', letterSpacing: -0.4 },
  sectionTitle: { fontSize: 16, fontWeight: '800' },
  itemName: { fontSize: 13, fontWeight: '700' },
  itemDescription: { fontSize: 11, fontWeight: '400' },
  price: { fontSize: 15, fontWeight: '700' },
  priceCompact: { fontSize: 13, fontWeight: '700' },
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
export const radiusScale = {
  xs: 8,   // nút +/-, banner cảnh báo nhỏ
  sm: 9,   // badge, thumb toggle
  md: 10,  // nút phụ, logo nhỏ trong header
  lg: 12,  // hàng lựa chọn (payment/voucher row), ảnh trong giỏ hàng
  xl: 14,  // ô lựa chọn (size/topping tương đương), input pin
  xxl: 16, // ảnh sản phẩm, khối section, thanh nổi dưới
  xxxl: 20, // card lớn, modal xác nhận
  pill: 999, // nút chính rộng, chip, segmented control
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

export const selectedTint = 'rgba(11,123,138,0.08)'; // brandColors.tealPrimary ở alpha 8%, dùng khi 1 lựa chọn/hàng đang active

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
};

export const liquidGlass = {
  background: 'rgba(255,255,255,0.9)',
  backgroundStrong: 'rgba(255,255,255,0.96)',
  backgroundTint: 'rgba(248,254,255,0.88)',
  border: 'rgba(255,255,255,0.95)',
  borderTint: 'rgba(11,123,138,0.14)',
  // Gradient chéo dùng cho chất liệu "kính lỏng" (search bar, cart button,
  // back button, sticky footer) — linear-gradient(135deg, ...) từ bản redesign.
  gradient: ['rgba(255,255,255,0.8)', 'rgba(237,251,252,0.35)', 'rgba(255,255,255,0.6)'],
  gradientLocations: [0, 0.55, 1],
  shadow: {
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 6,
  },
};

// Nền "wash" mới phía sau toàn bộ nội dung màn hình — 3 quầng màu radial
// mờ (teal + gold) thay cho nền phẳng, dùng với component BackgroundWash.
export const backgroundWash = {
  base: '#FAFCFC',
  blobs: [
    { cx: '15%', cy: '0%', r: '42%', color: 'rgba(13,150,168,0.22)' },
    { cx: '95%', cy: '12%', r: '38%', color: 'rgba(245,166,35,0.18)' },
    { cx: '30%', cy: '100%', r: '45%', color: 'rgba(13,150,168,0.14)' },
  ],
};

export const brandGradients = {
  primary: [brandColors.tealDark, brandColors.tealPrimary],
  light: ['#FFFFFF', brandColors.tealLight],
  gold: [brandColors.goldAccent, '#FFC04D'],
};
