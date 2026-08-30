import { StyleSheet } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

export default StyleSheet.create({
  mainContainer: {
    marginTop: s(6),
    paddingHorizontal: s(16),
  },

  divider: {
    width: '100%',
    height: s(12),
    backgroundColor: 'transparent',
  },
})
