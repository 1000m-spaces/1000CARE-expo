import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  amountInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 24,
    marginTop: 6,
  },

  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
  },

  money: {
    color: Colors.priceColor,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '600',
  },

  unit: {
    color: Colors.priceColor,
    fontSize: 12,
    lineHeight: 26,
    fontWeight: 'normal',
  },

  max: {
    color: Colors.textColor3,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },

  interestRate: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 2,
    backgroundColor: Colors.white,
    padding: 18,
    justifyContent: 'space-between',
  },

  interestRateTitle: {
    color: Colors.textColor3,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },

  interestRateValue: {
    color: Colors.textColor1,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },

  termsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 2,
    padding: 18,
    backgroundColor: Colors.white,
  },

  termsTitle: {
    color: Colors.textColor2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginBottom: 18,
  },
  
  termsMessage: {
    color: Colors.textColor2,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
    marginBottom: 12,
  },

  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 24,
    alignItems: 'center',
  },

  checkBoxMessage: {
    marginLeft: 12,
    color: Colors.textColor2,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },

  termMessage: {
    marginLeft: 6,
    color: Colors.systemColor2,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },

  termItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  dot: {
    color: Colors.textColor2,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '600',
  },

  termItemValue: {
    marginStart: 6,
    color: Colors.textColor2,
    fontFamily: Fonts.medium,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },
})