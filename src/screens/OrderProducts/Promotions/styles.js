import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 6,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.textColor2,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    lineHeight: 22,
    fontSize: 14,
  },
  seeAll: {
    color: Colors.systemColor2,
    fontFamily: Fonts.medium,
    textDecorationLine: 'underline',
    fontSize: 12,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  listContainer: {
    backgroundColor: 'white',
  },
})

export default styles