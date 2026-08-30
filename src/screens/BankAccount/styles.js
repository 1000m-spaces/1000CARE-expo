import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  scrollContent: {
    padding: s(16),
    paddingBottom: s(90),
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: brandColors.goldAccent,
  },
  walletCard: {
    borderRadius: s(radiusScale.xxxl),
    marginBottom: s(12),
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(14) },
    shadowOpacity: 0.24,
    shadowRadius: s(28),
    elevation: 8,
  },
  walletCardInner: {
    padding: s(20),
  },
  walletEyebrow: {
    fontSize: fs(11),
    color: 'rgba(255,255,255,0.75)',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: s(6),
  },
  walletBalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  walletBalance: {
    fontSize: fs(22),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.surface,
  },
  walletUnit: {
    fontSize: fs(14),
    fontWeight: '600',
  },
  eyeButton: {
    padding: s(4),
  },
  eyeText: {
    fontSize: fs(16),
  },
  walletAccount: {
    marginTop: s(6),
    fontSize: fs(11.5),
    color: 'rgba(255,255,255,0.75)',
  },
  overdraftCard: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    padding: s(16),
    marginBottom: s(18),
    ...brandShadow.soft,
  },
  overdraftLabel: {
    fontSize: fs(12),
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: brandColors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: s(8),
  },
  overdraftValue: {
    fontSize: fs(19),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.tealDark,
  },
  overdraftUnit: {
    fontSize: fs(13),
    fontWeight: '600',
    color: brandColors.mutedLight,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: s(20),
    rowGap: s(14),
  },
  actionItem: {
    width: '20%',
    alignItems: 'center',
  },
  actionIconWrap: {
    width: s(44),
    height: s(44),
    borderRadius: s(radiusScale.xl),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(6),
  },
  actionIcon: {
    width: s(18),
    height: s(18),
  },
  actionLabel: {
    fontSize: fs(10),
    color: brandColors.textDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(10),
  },
  listTitle: {
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.textDark,
  },
  selectAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  checkbox: {
    width: s(16),
    height: s(16),
    borderRadius: s(4),
    borderWidth: 1.5,
    borderColor: brandColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  checkboxMark: {
    color: brandColors.surface,
    fontSize: fs(10),
    fontWeight: '700',
  },
  selectAllText: {
    fontSize: fs(12),
    color: brandColors.muted,
    fontWeight: '600',
  },
  ctaWrap: {
    padding: s(16),
    paddingBottom: s(20),
    backgroundColor: brandColors.background,
    borderTopWidth: 1,
    borderTopColor: brandColors.borderSoft,
  },
  ctaButton: {
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  ctaGradient: {
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
})
export default styles
