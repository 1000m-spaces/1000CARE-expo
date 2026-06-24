import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

export default StyleSheet.create({
  orderContainer: {
    backgroundColor: brandColors.surface,
    marginHorizontal: s(16),
    padding: s(16),
    borderRadius: s(22),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: s(14),
  },
  orderCodeBlock: {
    flex: 1,
    paddingRight: s(12),
  },
  metaLabel: {
    color: brandColors.mutedLight,
    fontSize: fs(10),
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: s(4),
  },
  logo: {
    width: s(52),
    height: s(44),
  },
  logoContainer: {
    width: s(58),
    height: s(58),
    borderRadius: s(18),
    backgroundColor: brandColors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: s(12),
  },
  distributorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: s(12),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: brandColors.borderSoft,
  },
  orderInfoContainer: {
    flex: 1,
  },
  distributorName: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '600',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(14),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: s(8),
  },
  price: {
    color: brandColors.goldAccent,
    fontSize: fs(17),
    fontWeight: '600',
  },
  salePrice: {
    color: brandColors.goldAccent,
    fontSize: fs(17),
    fontWeight: '600',
  },
  orderTransId:{
    color: brandColors.textDark,
    fontSize: fs(18),
    fontWeight: '600',
  },
  orderTime: {
    marginTop: s(4),
    color: brandColors.muted,
    fontSize: fs(12),
    fontWeight: 'normal',
  },
  reOrderBtnContainer: {
    flexDirection: 'row',
    margin: 0, 
    padding: 0,
    alignItems: 'center', 
    paddingHorizontal: 18,
  },
  reOrderBtn: {
    height: 36,
    padding: 0,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: Colors.systemColor2,
  },
  reOrderText: {
    fontSize: 14,
    lineHeight: 22,
  },
  cancelContainer: {
    // position: 'absolute',
    paddingHorizontal: s(10),
    // bottom: 10,
    // right: 8,
  },
  buyAgainContainer: {
    // position: 'absolute',
    // backgroundColor: 'red',
    paddingHorizontal: s(14),
    minHeight: s(32),
    // bottom: 10,
    borderWidth: 1,
    borderColor: brandColors.tealPrimary,
    borderStyle: 'solid',
    borderRadius: s(14),
    alignItems: 'center',
    justifyContent: 'center',
    // right: 80,
  },
  buyAgainText: {
    fontSize: fs(11),
    lineHeight: fs(18),
    color: brandColors.tealPrimary,
    fontWeight: '600',
  },
  cancelText: {
    fontSize: fs(11),
    lineHeight: fs(18),
    color: brandColors.danger,
    fontWeight: '600',
  },
  confirmText: {
    fontSize: fs(11),
    lineHeight: fs(18),
    color: brandColors.success,
    fontWeight: '600',
  },
})
