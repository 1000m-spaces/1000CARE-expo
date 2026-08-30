import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { DIMENS } from '~/constants/index'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

// Card khuyến mãi theo spec redesign: nền trắng viền #EEF5F6 + shadow
// "lifted", tile icon vàng (accent riêng cho khuyến mãi/quà tặng) — thay
// cho viền xám 6px + icon tròn teal cũ.
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    marginBottom: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxxl),
    padding: s(14),
    ...brandShadow.soft,
  },
  itemContainerChecked: {
    borderColor: brandColors.tealPrimary,
    borderWidth: 1.5,
    ...brandShadow.softSelected,
  },
  icon: {
    width: s(18),
    height: s(18),
  },
  iconContainer: {
    backgroundColor: brandColors.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: s(radiusScale.xxl),
    width: s(42),
    height: s(42),
  },
  promotionInfoContainer: {
    width: DIMENS.common.WINDOW_WIDTH - 28 - 50,
  },
  level: {
    fontSize: fs(13),
    fontFamily: Fonts.base,
    color: brandColors.textDark,
  },
  promotionName: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(13.5),
    marginBottom: s(4),
    marginLeft: s(12),
    lineHeight: fs(19),
    marginRight: s(24),
  },
  promotionInfo: {
    color: brandColors.muted,
    fontFamily: Fonts.base,
    marginTop: s(2),
    fontWeight: 'normal',
    fontSize: fs(12.5),
    lineHeight: fs(19),
    marginRight: s(24),
  },
  iconCheck: {
    position: 'absolute',
    top: s(12),
    right: s(12),
  },
  promotionLevelContainer: {
    marginTop: 1,
    flex: 1,
    paddingHorizontal: s(12),
    backgroundColor: 'transparent',
  },
})

export default styles
