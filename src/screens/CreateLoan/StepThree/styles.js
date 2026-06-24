import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
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
    alignItems: 'center',
    marginHorizontal: 20,
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
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Fonts.medium,
    fontWeight: 'normal',
  },

  maxAmount: {
    color: Colors.textColor3,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Fonts.medium,
    fontWeight: 'normal',
  },

  borrowAmount: {
    color: Colors.textColor3,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },

  titleInformationContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 2,
    backgroundColor: Colors.white,
    padding: 18,
    justifyContent: 'space-between',
  },

  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingVertical: 9,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },

  titleInformation: {
    color: Colors.textColor2,
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
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
    marginBottom: 12,
  },

  checkBoxContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginTop: 12,
    alignItems: 'flex-start',
  },

  checkBoxMessage: {
    marginLeft: 12,
    color: Colors.textColor2,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  termMessage: {
    marginHorizontal: 6,
    color: Colors.systemColor2,
    fontSize: 12,
    lineHeight: 20,
    height: 20,
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  termItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
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
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },
})
