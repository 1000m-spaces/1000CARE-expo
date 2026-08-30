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
    alignItems: 'flex-end',
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
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '600',
  },

  interestRate: {
    flexDirection: 'row',
    width: '100%',
    marginTop: s(10),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(16),
    justifyContent: 'space-between',
    ...brandShadow.soft,
  },

  interestRateTitle: {
    color: brandColors.muted,
    fontFamily: Fonts.base,
    fontSize: fs(13),
    lineHeight: fs(20),
  },

  interestRateValue: {
    color: brandColors.textDark,
    fontSize: fs(13),
    lineHeight: fs(20),
    fontWeight: '700',
  },

  termsContainer: {
    width: '100%',
    marginTop: s(10),
    padding: s(16),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    ...brandShadow.soft,
  },

  termsTitle: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontSize: fs(14.5),
    lineHeight: fs(20),
    fontWeight: '700',
    marginBottom: s(14),
  },

  termsMessage: {
    color: brandColors.muted,
    fontFamily: Fonts.base,
    fontSize: fs(12.5),
    lineHeight: fs(19),
    marginBottom: s(10),
  },

  checkBoxContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: s(18),
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  checkBoxMessage: {
    marginLeft: s(10),
    color: brandColors.textDark,
    fontSize: fs(11.5),
    lineHeight: fs(18),
    fontWeight: '600',
  },

  termMessage: {
    marginLeft: s(4),
    color: brandColors.tealPrimary,
    fontSize: fs(11.5),
    lineHeight: fs(18),
    fontWeight: '700',
  },

  termItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: s(4),
  },

  dot: {
    color: brandColors.tealPrimary,
    fontSize: fs(18),
    lineHeight: fs(19),
    fontWeight: '700',
  },

  termItemValue: {
    flex: 1,
    marginStart: s(6),
    color: brandColors.muted,
    fontFamily: Fonts.base,
    fontSize: fs(12.5),
    lineHeight: fs(19),
  },
})
