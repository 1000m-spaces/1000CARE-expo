import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

export default StyleSheet.create({
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: s(30),
  },
  message:{
    marginTop: s(10),
    color: brandColors.muted,
    fontFamily: Fonts.base,
    fontSize: fs(14),
    lineHeight: fs(20),
    fontWeight: 'normal',
    textAlign: 'center',
  },
  image: {
    width: s(220),
    height: s(165),
  },
})
