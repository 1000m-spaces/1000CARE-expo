import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.white,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  closeBtnContainer: {
    alignSelf: 'flex-end',
  },
  closeBtn: {
    height: 12,
    width: 12,
  },
  contentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentTitle: {
    marginTop: 18,
    color: Colors.textColor2,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    color: Colors.textColor3,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
  bigCircle: {
    backgroundColor: 'rgba(0, 149, 217, 0.25)',
    borderRadius: 100,
    height: 100,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCircle: {
    backgroundColor: Colors.systemColor2,
    borderRadius: 80,
    height: 80,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default styles