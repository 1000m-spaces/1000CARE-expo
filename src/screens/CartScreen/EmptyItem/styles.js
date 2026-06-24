import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'

export default StyleSheet.create({
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: s(32),
  },
  message:{
    marginTop: s(10),
    color: brandColors.muted,
    fontSize: fs(14),
    lineHeight: fs(20),
    fontWeight: '600',
    textAlign: 'center',
  },
  image: {
    width: s(220),
    height: s(165),
  },
})
