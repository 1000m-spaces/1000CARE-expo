import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

export default StyleSheet.create({
  hero: {
    marginHorizontal: s(16),
    marginTop: s(12),
    borderRadius: s(26),
    padding: s(18),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.5,
    color: brandColors.tealPrimary,
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(24),
    lineHeight: fs(30),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: '600',
    color: brandColors.muted,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: s(10),
    marginHorizontal: s(16),
    borderRadius: s(22),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
    padding: s(4),
    columnGap: s(8),
  },
  tabHeader: {
    flex:1,
    minWidth: 0,
    minHeight: s(42),
    borderRadius: s(18),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(8),
  },
  tabHeaderSelected: {
    backgroundColor: brandColors.tealPrimary,
    ...liquidGlass.shadow,
  },
  tabHeaderText: {
    color: brandColors.muted,
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: '600',
    textAlign: 'center',
  },
  tabHeaderTextSelected: {
    color: brandColors.surface,
    fontWeight: '600',
  },
  voucherContainer: {
    backgroundColor: 'transparent',
    marginTop: s(10),
  },
})
