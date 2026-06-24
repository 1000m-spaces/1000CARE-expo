import { StyleSheet } from 'react-native'
import { liquidGlass } from '~/design-system/tokens'

export default StyleSheet.create({
  shadowContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 1,
  },

  headerContainer: {
    backgroundColor: liquidGlass.backgroundStrong,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    marginTop: 8,
    marginBottom: -1, // to remove the divider between header and content
    paddingVertical: 8,
  },

  dragContainer: {
    marginVertical: 8,
  },

  titleContainer: {
    marginHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})
