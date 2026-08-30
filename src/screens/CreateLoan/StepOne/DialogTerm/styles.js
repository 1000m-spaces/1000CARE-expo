import { StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const styles = StyleSheet.create({
  mainContainer: {
    padding: s(18),
    borderRadius: s(radiusScale.xxl),
    justifyContent: 'center',
    backgroundColor: brandColors.surface,
    ...brandShadow.soft,
  },
  image: {
    width: s(12),
    height: s(12),
    tintColor: brandColors.mutedLight,
  },
  message: {
    marginTop: s(12),
    fontSize: fs(13),
    color: brandColors.muted,
    lineHeight: fs(20),
    textAlign: 'left',
  },

  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    textAlign: 'left',
    fontSize: fs(15),
    fontFamily: Fonts.bold,
    color: brandColors.textDark,
    fontWeight: '700',
  },

})

export default styles
