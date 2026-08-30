import { StyleSheet } from 'react-native'
import { brandColors, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  scrollContent: {
    paddingHorizontal: s(16),
  },
  walletCard: {
    borderRadius: s(radiusScale.xxxl),
    padding: s(20),
    marginTop: s(4),
    marginBottom: s(16),
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(14) },
    shadowOpacity: 0.24,
    shadowRadius: s(28),
    elevation: 8,
  },
  walletTitle: {
    fontSize: fs(13),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: s(10),
  },
  walletLabel: {
    fontSize: fs(11.5),
    color: 'rgba(255,255,255,0.75)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  walletBalance: {
    marginTop: s(6),
    fontSize: fs(22),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.surface,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: s(20),
  },
  actionItem: {
    alignItems: 'center',
    width: s(80),
  },
  actionIconWrap: {
    width: s(48),
    height: s(48),
    borderRadius: s(radiusScale.xl),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(6),
  },
  actionIcon: {
    width: s(20),
    height: s(20),
  },
  actionLabel: {
    fontSize: fs(11),
    color: brandColors.textDark,
    fontWeight: '600',
    textAlign: 'center',
  },
  textHistory: {
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.textDark,
    marginBottom: s(10),
  },
})
export default styles
