import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const styles = StyleSheet.create({
  mainContainer: { 
    flex:1,
    display: 'flex',
    justifyContent:'space-between',
    backgroundColor: 'transparent',
    marginBottom: s(12),
  },
  
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: s(6),
    paddingHorizontal: s(18),
    paddingTop: s(18),
    backgroundColor: liquidGlass.background,
    justifyContent: 'space-between',
  },
  title: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    lineHeight: 22,
    fontSize: fs(14),
  },

  amountItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(18),
    paddingVertical: s(9),
    backgroundColor: liquidGlass.background,
  },

  label: {
    color: Colors.textColor3,
    fontSize: 12,
    lineHeight: 20,
    fontFamily: Fonts.medium,
  },

  priceItem: {
    color: Colors.systemColor2,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '600',
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 12,
    marginHorizontal: 18,
  },

  pointContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 50,
    marginHorizontal: 18,
  },

  priceText: {
    fontSize: 18,
    color: Colors.priceColor,
  },

  pointText: {
    fontSize: 18,
    color: Colors.red,
  },

  totalText: {
    color: Colors.textColor2,
    fontSize: 14,
  },

  listProductContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    marginTop: 6,
  },

  addressContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginTop: 6,
    paddingBottom: 6,
  },

  addressTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 18,
    backgroundColor: liquidGlass.background,
    justifyContent: 'space-between',
  },

  addressInfoContainer: {
    display: 'flex',
    marginTop: 1,
    padding: 18,
    flexDirection: 'column',
    backgroundColor: liquidGlass.background,
  },

  addressName: {
    color: Colors.textColor1,
    fontWeight: 'normal',
    lineHeight: 22,
    fontSize: 14,
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },

  itemSeparator: {
    height: 6,
    backgroundColor: 'transparent',
  },

  mt6: {
    marginTop: 6,
  },

  iconGPS: {
    height: 21,
    width: 18,
    marginRight: 10,
  },

  addressText: {
    color: Colors.textColor2,
    fontWeight: 'normal',
    lineHeight: 22,
    fontSize: 14,
  },
  
  chooseAddressText: {
    color: Colors.systemColor2,
    textDecorationLine: 'underline',
    fontSize: 12,
    lineHeight: 22,
    fontWeight: 'normal',
  },

  listHeader: {
    display: 'flex',
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    borderRadius: s(22),
    marginHorizontal: s(16),
    marginBottom: s(10),
    padding: s(14),
    paddingHorizontal: s(16),
    shadowColor: liquidGlass.shadow.color,
    shadowOpacity: 0.04,
    shadowRadius: s(18),
    shadowOffset: { width: 0, height: s(8) },
    elevation: 3,
  },
  textOrderLimit: {
    marginTop: s(8),
    color: brandColors.danger,
    fontSize: fs(12),
    fontWeight: '600',
  },
  textListHeader: {
    flex: 1,
    marginLeft: s(6),
    color: brandColors.muted,
    fontSize: fs(13),
    fontWeight: '600',
  },

  textInfoListHeader: {
    fontFamily: Fonts.bold,
    color: brandColors.textDark,
    fontSize: fs(13),
  },
})

export default styles
