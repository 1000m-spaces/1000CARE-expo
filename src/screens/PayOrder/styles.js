import { Dimensions, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { Fonts } from '~/assets/config'

const fullWith = Dimensions.get('window').width

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundColor,
  },

  listCheckoutContainer: {
    flex: 2,
    backgroundColor: Colors.white,
  },

  containerProfile: {
    backgroundColor: Colors.white,
    width: fullWith - 40,
    marginTop: 12,
    marginHorizontal: 21,
    borderRadius: 5,
    display: 'flex',
  },
  titleSection: {
    color: Colors.textColor1,
    fontFamily: Fonts.semiBold,
    fontSize: 15,
  },
  numberAccount: {
    color: Colors.textColor2,
    fontFamily: Fonts.medium,
    fontSize: 14,
  },
  number: {
    fontSize: 18,
    textAlign: 'center',
    fontFamily: Fonts.bold,
    color: 'white',
    marginTop: 10,
  },
  numberMoney: {
    color: Colors.priceColor,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    marginTop: 6,
    fontSize: 14,
  },
  buttonSelectAccount: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 4,
    backgroundColor: Colors.backgroundColor,
    marginTop: 6,
  },
  textUnit: {
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily: Fonts.medium,
  },
})

export default styles