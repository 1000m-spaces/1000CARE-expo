import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: '#F2FEFF',

    padding: 18,
    paddingRight: 23, 

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#F1F1F1',
    borderBottomWidth: 1,
  },
  wrapTitle: {
    flex: 2,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCOD: {
    width: 18,
    height: 10,
  },
  title: {
    marginLeft: 6,
    color: '#595959',
    fontSize: 12,
  },
  iconChoose: {
    width: 12,
    height: 12,
    flexShrink: 0,
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