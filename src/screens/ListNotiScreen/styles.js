import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import dimen from '~/constants/dimens'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
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
  listContent: {
    paddingHorizontal: s(16),
    paddingTop: s(14),
    paddingBottom: s(36),
  },
  buttonItem: (read,isReadAll) => ({
    flexDirection: 'row',
    marginBottom: s(12),
    backgroundColor: liquidGlass.background,
    alignItems: 'flex-start',
    paddingVertical: s(14),
    paddingRight: s(14),
    paddingLeft: s(14),
    borderRadius: s(22),
    borderWidth: 1,
    borderColor: read || isReadAll ? liquidGlass.border : 'rgba(11,123,138,0.18)',
    ...liquidGlass.shadow,
  }),
  statusRail: (read, isReadAll) => ({
    position: 'absolute',
    left: 0,
    top: s(18),
    bottom: s(18),
    width: s(4),
    borderTopRightRadius: s(4),
    borderBottomRightRadius: s(4),
    backgroundColor: read || isReadAll ? brandColors.border : brandColors.goldAccent,
  }),
  title: {
    flex: 1,
    fontWeight:'600',
    lineHeight: fs(21),
    fontSize: fs(15),
    fontFamily: Fonts.bold,
    color: brandColors.textDark,
  },
  gift_fill: {
    height: s(22),
    width: s(22),
    tintColor: brandColors.tealPrimary,
  },
  viewBell: (read, isReadAll) => ({
    height: s(46),
    width: s(46),
    borderRadius: s(17),
    backgroundColor: read || isReadAll ? 'rgba(238,252,253,0.5)' : 'rgba(11,123,138,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginRight: s(12),
  }),
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadDot: {
    width: s(9),
    height: s(9),
    borderRadius: s(5),
    backgroundColor: brandColors.danger,
    marginTop: s(6),
    marginLeft: s(8),
  },
  textMessage: {
    marginTop: s(5),
    lineHeight: fs(20),
    fontSize: fs(13),
    fontFamily: Fonts.medium,
    color: brandColors.muted,
  },
  textTime: {
    marginTop: s(6),
    lineHeight: fs(17),
    fontSize: fs(11),
    fontFamily: Fonts.base,
    color: brandColors.tealPrimary,
    fontWeight: '600',
  },
})
export default styles
