import { StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: brandColors.background,
  },
  listCheckoutContainer: {
    flex: 2,
    paddingBottom: s(16),
  },
  mt12: {
    marginTop: s(2),
  },
  itemSeparator: {
    height: s(8),
  },
  sourceTitle: {
    marginHorizontal: s(16),
    marginTop: s(4),
    marginBottom: s(8),
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.textDark,
  },
  sourceCard: {
    marginHorizontal: s(16),
    marginBottom: s(10),
    borderRadius: s(radiusScale.xxl),
    padding: s(16),
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.2,
    shadowRadius: s(20),
    elevation: 6,
  },
  sourceCardOutline: {
    marginHorizontal: s(16),
    marginBottom: s(10),
    borderRadius: s(radiusScale.xxl),
    padding: s(16),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  sourceLabelLight: {
    fontSize: fs(11.5),
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: s(6),
  },
  sourceValueLight: {
    fontSize: fs(18),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.surface,
  },
  sourceUnitLight: {
    fontSize: fs(12),
    fontWeight: '600',
  },
  sourceHintLight: {
    fontSize: fs(12.5),
    color: 'rgba(255,255,255,0.85)',
  },
  sourceLabel: {
    fontSize: fs(11.5),
    color: brandColors.muted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: s(6),
  },
  sourceValue: {
    fontSize: fs(18),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.tealDark,
  },
  sourceUnit: {
    fontSize: fs(12),
    fontWeight: '600',
    color: brandColors.mutedLight,
  },
  sourceHint: {
    fontSize: fs(12.5),
    color: brandColors.mutedLight,
  },
})

export default styles
