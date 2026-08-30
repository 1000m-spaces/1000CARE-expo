import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(16),
    ...brandShadow.soft,
  },

  textTitle: {
    fontFamily: Fonts.bold,
    fontWeight: '700',
    fontSize: fs(13.5),
    color: brandColors.textDark,
  },

  inputContainerStyle: {
    minHeight: s(48),
    borderRadius: s(radiusScale.lg),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    backgroundColor: '#F4F9F9',
    marginBottom: s(14),
  },

  labelStyle: {
    color: brandColors.muted,
    fontFamily: Fonts.base,
    fontWeight: 'normal',
    fontSize: fs(12),
    lineHeight: fs(18),
  },
})
