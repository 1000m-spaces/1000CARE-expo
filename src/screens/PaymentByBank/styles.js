import { StyleSheet } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: brandColors.background,
  },
  listCheckoutContainer: {
    flex: 2,
  },
  mt12: {
    marginTop: s(2),
  },
  itemSeparator: {
    height: s(8),
  },
})

export default styles
