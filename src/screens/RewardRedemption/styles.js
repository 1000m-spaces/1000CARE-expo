import { StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  amount: {
    color: brandColors.goldAccent,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    lineHeight: fs(20),
    fontSize: fs(14.5),
    marginTop: s(2),
  },
  titleItem: {
    color: brandColors.muted,
    fontSize: fs(12),
    lineHeight: fs(17),
  },
  logoItemContainer: {
    width: s(56),
    height: s(56),
    borderRadius: s(radiusScale.xl),
    backgroundColor: brandColors.tealLight,
    marginRight: s(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoItem: {
    width: '70%',
    height: '70%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(12),
    marginBottom: s(10),
    ...brandShadow.soft,
  },
  paymentAccountContainer: {
    padding: s(16),
  },
  mt1: {
    marginTop: 0,
  },
  iconChoose: {
    alignSelf: 'center',
    height: s(12),
    width: s(6),
    tintColor: brandColors.mutedLight,
  },
})

export default styles
