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

export const brandRadius = {
  card: 24,
  control: 16,
  pill: 999,
  badge: 11,
};

export const brandShadow = {
  teal: {
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 6,
  },
  soft: {
    shadowColor: '#112B33',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 4,
  },
};

export const liquidGlass = {
  background: 'rgba(255,255,255,0.9)',
  backgroundStrong: 'rgba(255,255,255,0.96)',
  backgroundTint: 'rgba(248,254,255,0.88)',
  border: 'rgba(255,255,255,0.96)',
  borderTint: 'rgba(11,123,138,0.14)',
  shadow: {
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.06,
    shadowRadius: 28,
    elevation: 6,
  },
};

export const brandGradients = {
  primary: [brandColors.tealDark, brandColors.tealPrimary],
  light: ['#FFFFFF', brandColors.tealLight],
  gold: [brandColors.goldAccent, '#FFC04D'],
};
