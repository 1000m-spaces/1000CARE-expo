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

  addButtonContainer: {
    backgroundColor: brandColors.tealPrimary,
    alignSelf: 'flex-end',
    marginBottom: s(8),
    width: s(36),
    height: s(36),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(18),
  },

  addButton: {
    width: s(18),
    height: s(18),
    tintColor: brandColors.surface,
  },
})
