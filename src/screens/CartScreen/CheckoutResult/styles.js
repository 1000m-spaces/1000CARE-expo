import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { DIMENS } from '~/constants/index'

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
    backgroundColor: Colors.backgroundColor,
  },
  mainContainer: { 
    flex:1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
  },
  checkIcon: {
    position: 'absolute',
    top: 41,
    left: DIMENS.common.WINDOW_WIDTH/2 - 32,
  },
  thanksMessage: {
    position: 'absolute',
    top: 47 + 64,
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 24,
  },
  orderMessage: {
    position: 'absolute',
    top: 70 + 64,
    width: '100%',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  amount: {
    color: Colors.priceColor,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: '600',
  },
  titleItem:{
    color: Colors.textColor3,
    fontSize: 12,
    lineHeight: 20,
  },
  logoItemContainer:{
    width: 140,
    height: 77,
    paddingHorizontal: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoItem: {
    width: '100%',
    height: 36,
  },
  itemContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  paymentAccountTitle: {
    paddingVertical: 18,
    paddingLeft: 18,
    color: Colors.textColor2,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  paymentAccountContainer: {
    backgroundColor: Colors.white,
  },
  mt1: {
    marginTop: 1,
  },

  checkoutInfoContainer: {
    marginVertical: 12,
    padding: 18,
    backgroundColor: Colors.white,
  },
  titleInfo: {
    color: Colors.textColor2,
    lineHeight: 22,
    fontSize: 14,
    fontWeight: 'normal',
  },
  totalPrice: {
    color: Colors.priceColor,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  orderItemContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  distributorNameContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingHorizontal: 18,
    borderBottomColor: '#F1F1F1',
  },
  distributorName: {
    width: 200,
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '600',
  },
  errorMessage: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    lineHeight: 20,
    fontWeight: 'normal',
    color: Colors.textColor3,
  },
  checkoutStatus: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'normal',
  },
  checkoutStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  containerButton: {
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: Colors.white,
  },
  styleButton: {
    borderRadius: 50,
    height: 40,
    backgroundColor: Colors.red,
  },
  styleView: {
    flex: 1,
    paddingHorizontal: 20,
    height: 40,
    marginBottom: 5,
  },
})

export default styles