// Token màu/khoảng cách/bo góc của Design System "1000CARE" (Bio Violet /
// Acid Lime) trên Claude Design — https://claude.ai/artifact/6Ph1QEjWPJjG5LWgSeYkfo
// Tách riêng khỏi `~/design-system/tokens` (bộ token toàn app, dùng tên
// `brandColors.tealPrimary`...) vì các component trong thư mục này chỉ
// dùng nội bộ cho bản chuyển đổi 1:1 từ design system, cần đủ thang màu
// violet/lime/neutral thay vì chỉ vài màu semantic đã rút gọn.
// Repo chỉ có light theme (xem `~/theme/lightTheme`) nên mọi giá trị dưới
// đây lấy nhánh "light" của design system; nhánh "dark" bỏ qua.

export const violet = {
  50: '#F6F3FC',
  100: '#EDE6FA',
  200: '#D9CBF5',
  300: '#BFA7EC',
  400: '#9F7BE0',
  500: '#7F4FD1',
  600: '#632FB8',
  700: '#4C1D95',
  800: '#3B1478',
  900: '#2E1065',
};

export const lime = {
  50: '#F7FCE7',
  100: '#EEF9C6',
  200: '#E0F495',
  300: '#CDEC5E',
  400: '#B8E62E', // gốc — CHỈ dùng làm nền, không dùng làm chữ
  500: '#A0CC1E',
  600: '#7FA414',
  700: '#607C12', // sắc chanh duy nhất đủ tương phản để dùng làm chữ/icon trên nền sáng
  800: '#4A5F14',
  900: '#3D4E15',
};

export const neutral = {
  0: '#FFFFFF',
  50: '#FAF9FC',
  100: '#F2F0F7',
  200: '#E5E2EE',
  300: '#CFCBDC',
  400: '#A9A3BC',
  500: '#837C98',
  600: '#635C78',
  700: '#4A445C',
  800: '#363044',
  900: '#262135',
  950: '#17131F',
};

// Token semantic — tương ứng đúng tên trong tokens.json của design system
// (brand, cta-bg, bg-page...), viết camelCase cho JS.
export const semantic = {
  brand: violet[700],
  brandHover: violet[800],
  brandSubtle: violet[100],

  ctaBg: lime[400], // không đổi theo theme
  ctaBgHover: lime[500],
  ctaText: violet[900], // luôn tối, không đổi theo theme

  bgPage: neutral[50],
  bgSurface: neutral[0],
  bgSubtle: violet[50],

  border: neutral[200],
  borderStrong: neutral[300],

  textPrimary: neutral[900],
  textMuted: neutral[600],

  focusRing: violet[500],

  success: '#1B9E5A',
  successBg: '#E7F6EE',
  warning: '#D97706',
  warningBg: '#FDF3E3',
  danger: '#DC2626',
  dangerBg: '#FDEBEB',
  info: violet[600],
  infoBg: violet[100],
};

export const careSpacing = {
  space1: 4,
  space2: 8,
  space3: 12,
  space4: 16,
  space5: 20,
  space6: 24,
  space8: 32,
};

export const careRadius = {
  sm: 4,
  md: 6,
  lg: 10,
  xl: 16,
  full: 999,
};

// Design system gốc dùng "Be Vietnam Pro" nhưng repo chưa đóng gói font
// này (xem `~/assets/config` Fonts — toàn bộ đang `undefined` để dùng
// font hệ thống OS). Để `undefined` cho tới khi có file font thật.
export const careFontFamily = undefined;
