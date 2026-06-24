import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 6,
    backgroundColor: Colors.white,
    marginBottom: 8,
  },
  title: {
    color: Colors.textColor2,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 6,
    marginBottom: 12,
  },
  chevronIcon: {
    position: 'absolute',
    right: 0,
    top: 6,
  },
  bottomSheetContainer: {
    height: '100%',
    backgroundColor: Colors.white,
  },
  saleOff: {
    width: 86,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',

    borderColor: '#F5222D',
    borderWidth: 1,
    borderStyle: 'solid',

    marginEnd: 6,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSaleOff: {
    color: '#F5222D',
    fontSize: 10,
    fontWeight: '600',
    fontFamily: 'Roboto',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})
