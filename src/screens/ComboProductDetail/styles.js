import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import dimens from '~/constants/dimens'

export default StyleSheet.create({
  listProductsContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    justifyContent: 'center',
  },
  wrap: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 9,
    backgroundColor: Colors.white,
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.white,
    padding: 9,
    width: dimens.common.WINDOW_WIDTH,
  },
  comboNameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: dimens.common.WINDOW_WIDTH,
    flex: 1,
  },
  name: {
    flex: 2,
    color: Colors.textColor1,
    fontWeight: '600',
    marginBottom: 6,
    marginRight: 18,
    fontSize: 16,
  },
  price: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: Colors.priceColor,
    // flex: 1,
  },
  discount: {
    fontSize: 16,
    color: '#CCCCCC',
    fontWeight: 'normal',
    // lineHeight: 20,
    textDecorationLine: 'line-through',
    // marginLeft: 18,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textColor3,
    marginTop: 8,
  },
  banner: {
    width: '100%',
    height: 200,
  },
})