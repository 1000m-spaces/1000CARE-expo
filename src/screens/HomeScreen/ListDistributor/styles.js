import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { DIMENS } from '~/constants/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, radiusScale } from '~/design-system/tokens'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  swiperItem: {
    width: DIMENS.common.WINDOW_WIDTH,
    height: DIMENS.common.WINDOW_WIDTH * 2 / 5,
  },
  swiper: {
    height: DIMENS.common.WINDOW_WIDTH * 2 / 5,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(16),
    marginVertical: s(14),
  },
  labelDistributor: {
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    color: brandColors.textDark,
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  seeAll: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    fontWeight: 'normal',
  },
  listDistributorContainer: {
    backgroundColor: brandColors.surface,
    borderRadius: s(radiusScale.xxxl),
    marginHorizontal: s(12),
    marginBottom: s(12),
    paddingVertical: s(16),
    shadowColor: brandColors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  brandRailContainer: {
    position: 'relative',
    marginBottom: s(8),
  },
  brandHorizontalRail: {
    paddingHorizontal: s(16),
    paddingRight: s(68),
    gap: s(12),
  },
  trademarkCard: {
    width: s(128),
    height: s(168),
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    backgroundColor: brandColors.surface,
    shadowColor: brandColors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  trademarkLogoWrap: {
    flex: 2,
    width: '100%',
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
    padding: s(8),
  },
  trademarkLogo: {
    width: s(48),
    height: s(48),
  },
  trademarkName: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    fontSize: fs(11),
    lineHeight: fs(14),
    textAlign: 'center',
    height: s(28),
  },
  trademarkVoucher: {
    flex: 1,
    width: '100%',
    backgroundColor: brandColors.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(6),
  },
  trademarkVoucherText: {
    color: brandColors.goldAccent,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    fontSize: fs(11),
    lineHeight: fs(14),
    textAlign: 'center',
  },
  dot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
  },
  dotContainer: {
    marginHorizontal: s(3),
  },
  paginationBox: {
    paddingVertical: s(8),
  },
})
