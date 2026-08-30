import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'

// Card voucher dạng vé theo spec redesign — cuống trái gradient teal +
// nội dung phải, thay cho hàng ảnh banner cũ.
export default StyleSheet.create({
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    marginBottom: s(12),
    ...brandShadow.soft,
  },
  stub: {
    width: s(78),
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(6),
  },
  stubValue: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(16),
  },
  stubLabel: {
    marginTop: s(2),
    color: 'rgba(255,255,255,0.8)',
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(9),
  },
  infoVoucher: {
    flex: 1,
    padding: s(12),
  },
  titleVoucher: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(13),
    color: brandColors.textDark,
    lineHeight: fs(18),
  },
  distributorName: {
    marginTop: s(2),
    fontSize: fs(11),
    color: brandColors.muted,
    lineHeight: fs(15),
  },
  timeVoucher: {
    marginTop: s(4),
    fontSize: fs(10.5),
    color: brandColors.mutedLight,
  },
  conditionText: {
    marginTop: s(4),
    fontSize: fs(11),
    color: brandColors.danger,
    fontWeight: '600',
  },
  codeOrder: {
    color: brandColors.tealPrimary,
    fontWeight: '600',
  },
  expired: {
    color: brandColors.danger,
    fontWeight: '600',
  },
  useButton: {
    minWidth: s(86),
    height: s(28),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.tealPrimary,
    alignSelf: 'flex-start',
    marginTop: s(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(14),
  },
  disableButton: {
    minWidth: s(86),
    height: s(28),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.mutedLight,
    alignSelf: 'flex-start',
    marginTop: s(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(14),
  },
  deleteButton: {
    minWidth: s(86),
    height: s(28),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.danger,
    alignSelf: 'flex-start',
    marginTop: s(8),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(14),
  },
  textButton: {
    color: brandColors.surface,
    fontSize: fs(11.5),
    fontWeight: '600',
  },
  methodTag: {
    borderWidth: 1,
    borderColor: brandColors.danger,
    marginTop: s(6),
    marginRight: s(5),
    paddingHorizontal: s(6),
    paddingVertical: s(2),
    borderRadius: s(radiusScale.xs),
  },
  methodTagText: {
    fontSize: fs(10),
    color: brandColors.danger,
  },
})
