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
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(20),
    marginHorizontal: s(16),
    marginBottom: s(10),
    padding: s(14),
    shadowColor: '#0A2F38',
    shadowOpacity: 0.05,
    shadowRadius: s(16),
    shadowOffset: { width: 0, height: s(6) },
    elevation: 3,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listHeaderCheckbox: {
    marginLeft: 0,
    paddingLeft: 0,
    marginRight: s(2),
  },
  distributorIconWrap: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: s(10),
  },
  distributorIconText: {
    fontSize: fs(16),
  },
  distributorNameWrap: {
    flex: 1,
  },
  textOrderLimit: {
    flex: 1,
    color: brandColors.danger,
    fontSize: fs(11.5),
    fontWeight: '600',
    lineHeight: fs(16),
  },
  orderLimitBanner: {
    marginTop: s(10),
    backgroundColor: 'rgba(255,59,48,0.08)',
    borderRadius: s(12),
    padding: s(9),
  },
  orderLimitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: s(6),
  },
  orderLimitIcon: {
    fontSize: fs(13),
  },
  // Thanh tiến độ đạt giá trị đơn tối thiểu — theo mô hình "min_order_value
  // theo từng nhóm mua hàng" của backend mới (marketplace-core, xem
  // [[marketplace-core-business-model]]: sau này mỗi nhóm sẽ là 1 "store"
  // thay vì 1 NCC, còn hiện tại NCC = 1 nhóm tạm). Dùng luôn dữ liệu
  // order_limit đang có (mock) — không đợi API mới.
  orderLimitProgressTrack: {
    marginTop: s(8),
    height: s(5),
    borderRadius: s(999),
    backgroundColor: 'rgba(255,59,48,0.16)',
    overflow: 'hidden',
  },
  orderLimitProgressFill: {
    height: '100%',
    borderRadius: s(999),
    backgroundColor: brandColors.danger,
  },
  textListHeader: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: '700',
    fontSize: fs(13.5),
  },

  textInfoListHeader: {
    color: brandColors.muted,
    fontSize: fs(10.5),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: s(1),
  },
})

export default styles
