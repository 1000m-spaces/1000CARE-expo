import { StyleSheet } from 'react-native'
import { fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

export default StyleSheet.create({
  body: {
    fontFamily: Fonts.medium,
    fontSize: fs(14),
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: fs(21),
    color: brandColors.muted,
  },
  title1: {
    fontFamily: Fonts.bold,
    fontSize: fs(28),
    fontWeight: 'normal',
    lineHeight: fs(34),
    color: brandColors.textDark,
  },
  title2: {
    fontFamily: Fonts.bold,
    fontSize: fs(18),
    fontWeight: 'normal',
    lineHeight: fs(24),
    color: brandColors.textDark,
  },
  caption: {
    fontFamily: Fonts.bold,
    fontSize: fs(11),
    fontWeight: 'normal',
    lineHeight: fs(15),
    color: brandColors.mutedLight,
    textTransform: 'uppercase',
  },
})
