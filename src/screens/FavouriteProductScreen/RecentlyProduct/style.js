import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  listProductsContainer: {
    display: 'flex',
    marginHorizontal: 9,
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.backgroundColor,
    marginTop: 1,
  },
  label: {
    color: Colors.textColor2,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    marginHorizontal: 18,
    marginVertical: 18,
  },
})