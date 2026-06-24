import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  wrap: {
    width: '45%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderRadius: 6,
    padding: 9,
    paddingVertical: 28,
    marginHorizontal: 9,
    marginVertical: 9,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: Colors.systemColor2,
  },
  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    color: Colors.textColor2,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
  },
  amountUnit: {
    color: Colors.textColor3,
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 20,
  },
  pointTitle: {
    color: Colors.textColor4,
    fontSize: 12,
    lineHeight:20,
    fontWeight: 'normal',
  },
  point: {
    marginLeft: 8, 
    color: Colors.textColor4,
    fontSize: 14,
    lineHeight:22,
    fontWeight: '600',
  },
})