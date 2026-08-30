import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

export default StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    paddingHorizontal: s(16),
  },

  amountInfoContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    paddingVertical: s(24),
    marginTop: s(12),
    ...brandShadow.soft,
  },

  amountContainer: {
    flexDirection: 'row',
    marginTop: s(12),
    alignItems: 'center',
    marginHorizontal: s(20),
  },

  money: {
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontSize: fs(24),
    lineHeight: fs(28),
    fontWeight: '800',
  },

  unit: {
    marginLeft: s(4),
    color: brandColors.tealDark,
    fontSize: fs(12),
    lineHeight: fs(20),
    fontWeight: '600',
  },

  max: {
    color: brandColors.muted,
    fontSize: fs(12),
    lineHeight: fs(19),
    fontFamily: Fonts.base,
  },

  maxAmount: {
    color: brandColors.textDark,
    fontSize: fs(12),
    lineHeight: fs(19),
    fontFamily: Fonts.bold,
    fontWeight: '600',
  },

  borrowAmount: {
    color: brandColors.muted,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '600',
  },

  titleInformationContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: s(14),
    paddingHorizontal: s(4),
    justifyContent: 'space-between',
  },

  informationContainer: {
    width: '100%',
    marginTop: s(4),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    paddingHorizontal: s(16),
    paddingVertical: s(6),
    ...brandShadow.soft,
  },

  titleInformation: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '700',
  },

  checkBoxContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: s(12),
    alignItems: 'flex-start',
  },

  checkBoxMessage: {
    marginLeft: s(10),
    color: brandColors.textDark,
    fontSize: fs(11.5),
    lineHeight: fs(18),
    fontWeight: '600',
  },

  termMessage: {
    marginHorizontal: s(4),
    color: brandColors.tealPrimary,
    fontSize: fs(11.5),
    lineHeight: fs(18),
    fontWeight: '700',
  },
})
