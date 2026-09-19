import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: liquidGlass.border,
    justifyContent: 'center',
    backgroundColor: liquidGlass.backgroundStrong,
    ...liquidGlass.shadow,
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
    color: brandColors.textDark,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    color: brandColors.muted,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
  bigCircle: {
    backgroundColor: 'rgba(76, 29, 149,0.14)',
    borderRadius: 100,
    height: 100,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCircle: {
    backgroundColor: brandColors.tealPrimary,
    borderRadius: 80,
    height: 80,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  errorViewMainContainer: {
    display: 'flex',
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 24,
    borderColor: 'rgba(255,255,255,0.38)',
    justifyContent: 'center',
    backgroundColor: 'rgba(10,47,56,0.76)',
  },
  image: {
    width: 42,
    height: 42,
  },
  errorMessage: {
    marginTop: 12,
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
})

export default styles
