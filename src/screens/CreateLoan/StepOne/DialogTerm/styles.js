import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    padding: 15,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.white,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  image: {
    width: 12,
    height: 12,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    textAlign: 'left',
  },

  dialogHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    textAlign: 'left',
    fontSize: 16,
    color: Colors.textColor2,
    fontWeight: '600',
  },

})

export default styles