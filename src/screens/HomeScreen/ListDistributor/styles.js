import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { DIMENS } from '~/constants/index'
import { s, fs } from '~/utils/responsive'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F8F9FB',
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
    color: '#1A202C',
    fontWeight: 'normal',
    letterSpacing: 0.5,
  },
  seeAll: {
    color: '#0B7B8A',
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    fontWeight: 'normal',
  },
  listDistributorContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(20),
    marginHorizontal: s(12),
    marginBottom: s(12),
    paddingVertical: s(16),
    shadowColor: '#000',
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
    borderRadius: s(17),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#263238',
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
    color: '#111827',
    fontFamily: Fonts.semiBold,
    fontSize: fs(14),
    lineHeight: fs(19),
    fontWeight: 'normal',
  },
  trademarkVoucher: {
    alignSelf: 'flex-start',
    marginTop: s(5),
    borderRadius: s(10),
    backgroundColor: 'rgba(255,106,69,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,106,69,0.24)',
    paddingHorizontal: s(8),
    paddingVertical: s(4),
  },
  trademarkVoucherText: {
    color: '#FF6B45',
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
