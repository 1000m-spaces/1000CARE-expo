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
    width: s(126),
  },
  trademarkLogoWrap: {
    width: '100%',
    height: s(126),
    borderRadius: s(radiusScale.xxl),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: brandColors.tealDark,
    shadowOffset: { width: 0, height: s(5) },
    shadowOpacity: 0.08,
    shadowRadius: s(10),
    elevation: 3,
  },
  trademarkLogo: {
    width: '78%',
    height: '78%',
  },
  trademarkName: {
    marginTop: s(7),
    color: brandColors.textDark,
    fontFamily: Fonts.semiBold,
    fontSize: fs(14),
    lineHeight: fs(19),
    fontWeight: 'normal',
  },
  trademarkVoucher: {
    alignSelf: 'flex-start',
    marginTop: s(5),
    borderRadius: s(radiusScale.md),
    backgroundColor: 'rgba(255,59,48,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,59,48,0.22)',
    paddingHorizontal: s(8),
    paddingVertical: s(4),
  },
  trademarkVoucherText: {
    color: brandColors.danger,
    fontFamily: Fonts.semiBold,
    fontSize: fs(11),
    lineHeight: fs(14),
    fontWeight: 'normal',
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
