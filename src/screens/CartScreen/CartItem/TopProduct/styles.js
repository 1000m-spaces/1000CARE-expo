import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'

export default StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.backgroundColor,
    marginBottom: 8,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.backgroundColor,
    paddingHorizontal: 18,
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.textColor2,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  all: {
    color: Colors.systemColor2,
    fontFamily: Fonts.medium,
    textDecorationLine: 'underline',
    fontSize: 12,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  allContainer: {
    position: 'absolute',
    right: 18,
    top: 9,
  },
})
