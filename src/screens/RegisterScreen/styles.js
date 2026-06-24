import { StyleSheet } from 'react-native'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { fs, s } from '~/utils/responsive'

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(12),
  },
  logoCard: {
    alignSelf: 'center',
    width: s(138),
    height: s(72),
    borderRadius: s(24),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(18),
    ...liquidGlass.shadow,
  },
  logo: {
    width: s(112),
    height: s(42),
  },
  card: {
    borderRadius: s(28),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    paddingHorizontal: s(18),
    paddingTop: s(22),
    paddingBottom: s(18),
    ...liquidGlass.shadow,
  },
  fullNameContainer: {
    gap: s(2),
  },
  registerButton: {
    marginTop: s(18),
  },
  footer_views: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: s(18),
    marginBottom: s(24),
  },
  footerText: {
    color: brandColors.muted,
    fontSize: fs(14),
    fontWeight: '600',
  },
  text_register_now: {
    color: brandColors.tealPrimary,
    textDecorationLine: 'underline',
    marginLeft: s(6),
    fontSize: fs(14),
    fontWeight: '600',
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(24),
    lineHeight: fs(31),
    fontWeight: '600',
    marginBottom: s(12),
  },
})

export default styles
