import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  mainContainer: { 
    flex:1,
    display: 'flex',
    justifyContent:'space-between',
    backgroundColor: 'transparent',
  },
  
  listItem: {
    marginVertical: s(12),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    borderRadius: s(22),
    ...liquidGlass.shadow,
  },
  checkoutHero: {
    marginHorizontal: s(16),
    marginTop: s(10),
    marginBottom: s(10),
    borderRadius: s(28),
    paddingHorizontal: s(18),
    paddingVertical: s(18),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    minHeight: s(142),
    justifyContent: 'center',
    position: 'relative',
    ...liquidGlass.shadow,
  },
  backButton: {
    position: 'absolute',
    left: s(18),
    top: s(18),
    width: s(42),
    height: s(42),
    borderRadius: s(15),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.borderTint,
    shadowColor: liquidGlass.shadow.color,
    shadowOpacity: 0.06,
    shadowRadius: s(14),
    shadowOffset: { width: 0, height: s(8) },
    elevation: 3,
  },
  checkoutCopy: {
    alignItems: 'center',
    paddingHorizontal: s(56),
  },
  checkoutEyebrow: {
    fontFamily: Fonts.bold,
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: 'normal',
    letterSpacing: 1.6,
    color: brandColors.tealPrimary,
    textAlign: 'center',
  },
  checkoutTitle: {
    marginTop: s(5),
    fontFamily: Fonts.bold,
    fontSize: fs(24),
    lineHeight: fs(30),
    fontWeight: 'normal',
    color: brandColors.textDark,
    textAlign: 'center',
  },
  checkoutSubtitle: {
    marginTop: s(7),
    fontFamily: Fonts.base,
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: 'normal',
    color: brandColors.muted,
    textAlign: 'center',
  },

  bottomContainer: {
    width: '100%',
    paddingVertical: s(18),
    paddingTop: s(20),
    paddingBottom: s(16),
    backgroundColor: liquidGlass.backgroundStrong,
    borderTopWidth: 1,
    borderTopColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },

  nextStepBtnContainer: {
    flexDirection: 'row',
    margin: 0, 
    padding: 0,
    alignItems: 'center', 
    paddingHorizontal: s(18),
  },

  nextStepBtn: {
    height: s(56),
    width: '100%',
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: s(20),
    backgroundColor: brandColors.tealPrimary,
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
    borderColor: liquidGlass.border,
    borderWidth: 1,
  },

  buyBtnText: {
    color: brandColors.tealPrimary,
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: s(10),
    marginHorizontal: s(18),
  },

  pointContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: s(50),
    marginHorizontal: s(18),
  },

  priceText: {
    fontFamily: Fonts.bold,
    fontSize: fs(18),
    color: brandColors.goldAccent,
  },

  pointText: {
    fontFamily: Fonts.bold,
    fontSize: fs(18),
    color: Colors.red,
  },

  totalText: {
    fontFamily: Fonts.base,
    color: brandColors.textDark,
    fontSize: fs(14),
  },

  listProductContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    marginTop: s(2),
  },

  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginTop: s(6),
    paddingBottom: s(6),
  },

  addressTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: s(18),
    backgroundColor: liquidGlass.background,
    borderTopLeftRadius: s(22),
    borderTopRightRadius: s(22),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    justifyContent: 'space-between',
  },

  addressInfoContainer: {
    display: 'flex',
    marginTop: 1,
    padding: s(18),
    flexDirection: 'column',
    backgroundColor: liquidGlass.background,
    borderBottomLeftRadius: s(22),
    borderBottomRightRadius: s(22),
    borderWidth: 1,
    borderColor: liquidGlass.border,
  },

  addressName: {
    color: brandColors.textDark,
    fontWeight: 'normal',
    lineHeight: 22,
    fontSize: fs(14),
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  itemSeparator: {
    height: s(8),
    backgroundColor: 'transparent',
  },

  mt6: {
    marginTop: s(6),
  },

  iconGPS: {
    height: 21,
    width: 18,
    marginRight: s(10),
  },

  addressText: {
    color: brandColors.muted,
    fontWeight: 'normal',
    lineHeight: 22,
    fontSize: fs(14),
  },
  
  chooseAddressText: {
    color: brandColors.tealPrimary,
    textDecorationLine: 'underline',
    fontSize: fs(12),
    lineHeight: 22,
    fontWeight: 'normal',
  },

  listHeader: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: liquidGlass.background,
    marginBottom: s(2),
    padding: s(18),
  },

  textListHeader: {
    marginLeft: s(6),
    color: brandColors.textDark,
    fontSize: fs(14),
  },

  textInfoListHeader: {
    fontFamily: Fonts.bold,
    color: brandColors.mutedLight,
    fontSize: fs(14),
  },

  dialogDeleteContainer: { backgroundColor: liquidGlass.backgroundStrong, padding: s(16), borderRadius: s(24), borderWidth: 1, borderColor: liquidGlass.border, ...liquidGlass.shadow },
  messageDeleteProduct: {
    textAlign: 'center',
    fontSize: fs(14),
    color: brandColors.textDark,
  },
  dialogButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: s(12),
  },
})

export default styles
