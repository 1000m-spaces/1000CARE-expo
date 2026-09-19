import { Dimensions, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { brandColors } from '~/design-system/tokens'

export default StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#FFF',

    padding: 12,

    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderStyle: 'solid',

    display: 'flex',
    flexDirection: 'row', 

    position: 'relative',

  },
  imageVoucher: {
    width: 120,
    height: '100%',

  },
  overlay: {
    width: 120,
    height: '100%',
    backgroundColor: 'rgba(114, 114, 114, 0.8)',
    position: 'absolute',
    top: 12,
    left: 12,
  },
  infoVoucher: {
    width: Dimensions.get('window').width - 144,

    paddingLeft: 12,
  },
  titleVoucher: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Colors.textColor1,
    fontWeight:'600',
    lineHeight: 24,

  },
  distributorName: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#8C8C8C',
    lineHeight: 18,
  },
  timeVoucher: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#7B7B7B',
  },
  codeOrder: {
    fontFamily: 'Roboto',
    color: '#4276FE',
  },
  expired: {
    fontFamily: 'Roboto',
    color: '#F5222D',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  useButton: {
    width: 86,
    height: 24,
    borderRadius: 12,
    backgroundColor: brandColors.tealPrimary,

    marginTop: 6,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  disableButton: {
    width: 86,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#CCCCCC',

    marginTop: 6,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 86,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F5222D',

    marginTop: 6,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Roboto',
  },
  saleOff: {
    width: 86,
    height: 24,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',

    borderColor: '#F5222D',
    borderWidth: 1,
    borderStyle: 'solid',

    marginTop: 6,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSaleOff: {
    color: Colors.textColor1,
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },
})