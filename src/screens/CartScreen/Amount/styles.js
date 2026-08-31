import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: brandColors.background,
  },

  listItem: {
    marginVertical: s(12),
    backgroundColor: brandColors.surface,
  },

  bottomContainer: {
    paddingVertical: s(18),
    paddingTop: s(20),
    paddingBottom: s(18),
    backgroundColor: liquidGlass.backgroundStrong,
    alignSelf: 'flex-end',
  },

  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    paddingHorizontal: s(18),
  },

  checkAllContainer: {
    marginLeft: 0,
    paddingLeft: 0,
  },

  nextStepBtn: {
    flex: 1,
    height: s(52),
    borderRadius: s(16),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(8) },
    shadowOpacity: 0.22,
    shadowRadius: s(16),
    elevation: 5,
  },

  nextStepBtnGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  nextStepBtnText: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontSize: fs(15),
    fontWeight: '700',
  },

  buyBtnContainer: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    paddingHorizontal: s(18),
  },

  buyBtn: {
    height: s(56),
    width: '100%',
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: s(20),
    backgroundColor: liquidGlass.background,
    borderColor: liquidGlass.borderTint,
    borderWidth: 1,
  },

  buyBtnText: {
    color: brandColors.tealPrimary,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(12),
    marginHorizontal: s(18),
  },

  pointContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: s(50),
    marginHorizontal: s(18),
  },

  priceText: {
    fontSize: fs(20),
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    textDecorationLine: 'none',
  },

  originPrice: {
    marginLeft: s(2),
    fontSize: fs(12),
    color: brandColors.mutedLight,
    lineHeight: fs(20),
    textDecorationLine: 'line-through',
  },

  pointText: {
    fontSize: fs(18),
    color: brandColors.danger,
    fontFamily: Fonts.bold,
    textDecorationLine: 'none',
  },

  totalText: {
    color: brandColors.muted,
    fontFamily: Fonts.medium,
    fontSize: fs(14),
  },

  listProductContainer: {
    flex: 2,
    backgroundColor: brandColors.surface,
    marginTop: s(6),
  },

  addressContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: brandColors.background,
    marginTop: s(6),
    paddingBottom: s(6),
  },

  addressTitleContainer: {
    flexDirection: 'row',
    padding: s(18),
    backgroundColor: brandColors.surface,
    justifyContent: 'space-between',
  },

  addressInfoContainer: {
    marginTop: 1,
    padding: s(18),
    backgroundColor: brandColors.surface,
  },

  addressName: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    lineHeight: fs(22),
    fontSize: fs(14),
  },

  row: {
    flexDirection: 'row',
  },

  itemSeparator: {
    height: s(6),
    backgroundColor: brandColors.background,
  },

  mt6: {
    marginTop: s(6),
  },

  iconGPS: {
    height: s(21),
    width: s(18),
    marginRight: s(10),
  },

  addressText: {
    color: brandColors.muted,
    fontFamily: Fonts.medium,
    fontWeight: 'normal',
    lineHeight: fs(22),
    fontSize: fs(14),
  },

  chooseAddressText: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.medium,
    textDecorationLine: 'underline',
    fontSize: fs(12),
    lineHeight: fs(22),
    fontWeight: 'normal',
  },

  listHeader: {
    flexDirection: 'row',
    padding: s(18),
  },

  textListHeader: {
    marginLeft: s(6),
    color: brandColors.muted,
    fontSize: fs(14),
  },

  textInfoListHeader: {
    color: brandColors.muted,
    fontSize: fs(14),
  },
})

export default styles
