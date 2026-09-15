import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { DIMENS } from '~/constants/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  container: { 
    flex:1,
    display: 'flex',
    justifyContent:'space-between',
    backgroundColor: liquidGlass.background,
    borderRadius: s(24),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    marginHorizontal: s(16),
    marginVertical: s(8),
    overflow: 'hidden',
    ...liquidGlass.shadow,
  },

  productItemContainer: {
    paddingHorizontal: s(18),
    paddingVertical: s(9),
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  styleTextInputNote: {
    color: Colors.blackColor,
    fontSize: fs(14),
    borderWidth: 1,
    // marginHorizontal: 10,
    borderColor: liquidGlass.border,
    borderRadius: s(18),
    paddingHorizontal: s(12),
    height:s(44),
    backgroundColor: liquidGlass.backgroundStrong,
  },

  price: {
    color: Colors.priceColor,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },

  priceItem: {
    color: Colors.systemColor2,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },

  discount: {
    marginLeft: 2,
    fontSize: 12,
    color: '#CCCCCC',
    lineHeight: 20,    
    textDecorationLine: 'line-through',
  },

  salePrice: {
    color: Colors.red,
    fontSize: 14,
    fontWeight: '600',
  },
  
  productName: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '600',
    lineHeight: 20,
    flex: 2,
  },
  
  icon: {
    marginRight: 12, 
  },
  headerText: {
    color: brandColors.textDark,
    fontSize: fs(14),
  },
  itemIcon: {
    width: 24,
    height: 24,
  },
  headerIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 42,
    display: 'flex',
    justifyContent: 'center',
    marginRight: s(12), 
    alignItems: 'center',
    backgroundColor: 'rgba(2, 158, 157,0.1)',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: s(18),
    paddingVertical: s(12),
    alignItems: 'center',
    borderBottomWidth: 3,
    borderColor: liquidGlass.border,
  },

  bottomContainer: {
    paddingHorizontal: s(18),
    paddingVertical: s(8),
    display: 'flex',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: liquidGlass.border,
  },

  bottomInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: s(18),
  },

  label: {
    color: Colors.textColor3,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Fonts.medium,
  },

  distributorName: {
    color: Colors.textColor2,
    fontSize: 12,
    lineHeight: 20,
    marginLeft: s(6),
  },

  listProduct: {
    paddingVertical: s(9),
  },

  checkoutBtnContainer: {
    height: 40,
    width: DIMENS.common.WINDOW_WIDTH * 0.75,
    alignSelf: 'center',
  },
  checkoutBtn: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.systemColor2,
    backgroundColor: Colors.white,
  },
  checkoutBtnText: {
    color: brandColors.tealPrimary,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 22,
  },

  deactive: {
    borderColor: Colors.textColor2,
    color: Colors.textColor2,
  },

  choosePaymentMethob: {
    color: Colors.systemColor2,
    textDecorationLine: 'underline',
    fontSize: 12,
    lineHeight: 22,
    fontWeight: 'normal',
  },

  noData: {
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  text: {
    color: Colors.textColor3,
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },

  promotionTitle: {
    paddingTop: 14,
    paddingBottom: 7,
    paddingLeft: 14,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    backgroundColor: 'rgba(2, 158, 157,0.06)',
    color: brandColors.textDark,
  },

  paymentTitle: {
    paddingTop: 14,
    paddingBottom: 7,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    color: brandColors.textDark,
  },

  paymentMethobTitle: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 22,
    fontWeight: '600',
    color: brandColors.textDark,
  },
})

export default styles
