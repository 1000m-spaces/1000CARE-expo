import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import dimension from '~/constants/dimens'
import { s } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  imagePaginationContainer: {
    height: 24,
    width: 50,
    borderRadius: 35,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: dimension.common.WINDOW_WIDTH / 2 - 12,
  },
  paginationNumber: {
    color: Colors.white,
    fontSize: 12,
  },
  swiperItemContainer: {
    backgroundColor: 'transparent',
    height: dimension.common.WINDOW_HEIGHT * 0.23,
    alignItems: 'center',
  },
  swiperItem: {
    width: dimension.common.WINDOW_WIDTH - s(32),
    height: (dimension.common.WINDOW_WIDTH - s(32)) * 2 / 3,
  },
  productInfoContainer: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.42)',
    justifyContent: 'space-around',
    padding: s(18),
  },
  productContainer: {
    marginBottom: 6,
    backgroundColor: Colors.white,
  },

  quantityContainer: {
    display: 'flex',
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  btnAddContainer: {
    margin: 0,
    flexDirection: 'row',
    paddingHorizontal: 0,
    marginHorizontal: 16,
    marginBottom: 18,
  },
  btnAdd: {
    borderRadius: 28,
    backgroundColor: Colors.systemColor2,
    flex: 1,
  },
  quantityBtnContainer: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  quantityBtn: {
    height: 36,
    width: 36,
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: 36,
    backgroundColor: '#FAFAFA',
  },
  productQuantityContainer: {
    borderRadius: 28,
    width: 84,
    marginHorizontal: 8,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textColor3,
  },
  inputContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 28,
    alignItems: 'center',
  },
  labelStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productQuantity: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textColor2,
  },
  title: {
    color: Colors.textColor1,
    fontWeight: '600',
    marginBottom: 6,
    marginRight: 18,
    fontSize: 16,
  },
  pack: {
    color: Colors.textColor2,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  sectiontitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#595959',
  },
  swiperConatainer: {
    backgroundColor: 'transparent',
    height: (dimension.common.WINDOW_WIDTH - s(32)) * 2 / 3,
    marginBottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceInfoContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  priceContainer: {
    borderRadius: 36,
    borderColor: Colors.priceColor,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  productPrice: {
    color: Colors.priceColor,
    fontSize: 16,
    fontWeight: '600',
  },
  actionCountContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  actionCountItemContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 18,
  },
  countValue: {
    marginLeft: 8,
  },
  rangePricesContainer: {
    flex: 1,
    padding: 18,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  promotionTitle: {
    color: Colors.textColor2,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoSectionTitle: {
    color: Colors.textColor2,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 18,
    marginHorizontal: 18,
  },
  tabTitle: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 42,
    paddingVertical: 6,
    paddingHorizontal: 16,
    padding: 4,
    alignSelf: 'center',
  },
  tabSelected: {
    backgroundColor: Colors.white,
    color: Colors.systemColor2,
    fontWeight: '600',
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
    borderRadius: 42,
    padding: 4,
    alignSelf: 'center',
    marginBottom: 18,
  },
  tabText: {
    color: Colors.textColor1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
  },
  iconWhitelist: {
    height: s(18),
    width: s(18),
  },
  // BUG đã sửa: có cả `flex: 1` lẫn width/height cố định — trong hàng flex
  // (cạnh Text flex:9) thì flex:1 thắng, kéo dãn nút thành hình bầu dục
  // thay vì hình tròn dù borderRadius = nửa width cố định. Bỏ flex, thêm
  // flexShrink:0 để text dài không bóp méo nút.
  iconWhitelistContainer: {
    height: s(34),
    width: s(34),
    flexShrink: 0,
    borderRadius: s(17),
    backgroundColor: brandColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: brandColors.border,
  },
  productNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    marginTop: 4,
  },

  sliderItem: {
    height: 136,
    width: '100%',
  },

  dot: {
    width: s(6),
    height: s(6),
  },

  dotContainer: {
    marginHorizontal: 3,
  },

  paginationBox: {
    paddingVertical: 8,
  },

  rightButtonContainer: {
    position: 'absolute',
    top: 16 / 2,
    right: 16 / 2,
    backgroundColor: '#FFFFFF66',
    padding: 6,
    borderRadius: 12,
  },
})
