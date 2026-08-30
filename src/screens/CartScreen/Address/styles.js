import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'

// Hàng địa chỉ theo spec redesign: card trắng viền #EEF5F6, icon + label +
// chevron, thay cho khối full-width nền xám cũ (Colors.backgroundColor).
const styles = StyleSheet.create({
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    marginHorizontal: s(16),
    marginTop: s(10),
    padding: s(14),
    ...brandShadow.soft,
  },
  addressTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addressInfoContainer: {
    flex: 1,
  },
  addressName: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(12.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mt6: {
    marginTop: s(2),
  },
  iconGPS: {
    height: s(18),
    width: s(18),
    marginRight: s(8),
    tintColor: brandColors.tealPrimary,
  },
  addressText: {
    color: brandColors.muted,
    fontFamily: Fonts.base,
    fontWeight: 'normal',
    fontSize: fs(11),
    lineHeight: fs(15),
  },
  chooseAddressText: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(12),
  },
  chevron: {
    marginLeft: s(6),
    color: brandColors.mutedLight,
    fontSize: fs(16),
  },
})

export default styles
