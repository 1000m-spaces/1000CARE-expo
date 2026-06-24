import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

const styles = StyleSheet.create({
  safeArea: {
    flex:1,
  },
  mainContainer: { 
    flex:1,
    display: 'flex',
    backgroundColor: Colors.backgroundColor,
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
})

export default styles