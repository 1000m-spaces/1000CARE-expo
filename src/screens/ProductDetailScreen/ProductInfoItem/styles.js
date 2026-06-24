import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 24,
    backgroundColor: Colors.white,
    paddingVertical: 9,
  },
  title: {
    flex: 2,
    color: Colors.textColor1,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  value: {
    flex: 3,
    color: Colors.textColor1,
    fontSize: 14,
    lineHeight: 22,
    borderLeftWidth: 2,
    paddingLeft: 18,
    borderLeftColor: '#CCCCCC',
    fontWeight: 'normal',
  },
  component: {
    flex: 2,
    alignSelf: 'flex-start',
  },
  focus: {
    backgroundColor: Colors.backgroundColor,
  },
})
