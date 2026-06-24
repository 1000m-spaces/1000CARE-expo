import { Dimensions, StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const fullWidth = Dimensions.get('window').width

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: s(36),
  },
  hero: {
    marginHorizontal: s(16),
    marginTop: s(14),
    borderRadius: s(28),
    padding: s(20),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.6,
    color: brandColors.tealPrimary,
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(26),
    lineHeight: fs(32),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(13),
    lineHeight: fs(20),
    fontWeight: '600',
    color: brandColors.muted,
  },
  containerConfirm: {
    marginHorizontal: s(16),
    marginTop: s(14),
    padding: s(18),
    backgroundColor: liquidGlass.background,
    borderRadius: s(24),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  cardEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.5,
    color: brandColors.tealPrimary,
  },
  cardTitle: {
    marginTop: s(5),
    fontSize: fs(20),
    lineHeight: fs(26),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  phoneContainer: {
    marginTop: s(14),
  },
  inputContainerStyle: {
    minHeight: s(52),
    borderRadius: s(16),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    backgroundColor: liquidGlass.backgroundStrong,
  },
  labelStyle: {
    color: brandColors.textDark,
    fontWeight: '600',
    fontSize: fs(12),
    lineHeight: fs(16),
  },
  buttonConfirm: {
    marginTop: s(8),
    width: '100%',
    paddingHorizontal: 0,
  },
  confirmButton: {
    height: s(54),
    borderRadius: s(18),
    backgroundColor: brandColors.tealPrimary,
  },
  confirmButtonText: {
    fontWeight: '600',
    color: brandColors.surface,
  },
  formItem:{
    width: '100%',
  },
  message: {
    marginTop: s(8),
    color: brandColors.muted,
    lineHeight: fs(20),
    fontSize: fs(13),
    fontWeight: '600',
  },
  phoneNumber: {
    marginTop: s(18),
    color: brandColors.tealPrimary,
    lineHeight: fs(28),
    fontSize: fs(22),
    fontWeight: '600',
  },
})
