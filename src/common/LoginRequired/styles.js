import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'

export default StyleSheet.create({
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: s(28),
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
    width: s(210),
    height: s(164),
  },
})
