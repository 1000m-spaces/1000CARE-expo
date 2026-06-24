import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  hero: {
    marginHorizontal: s(16),
    marginTop: s(12),
    borderRadius: s(26),
    padding: s(18),
    backgroundColor: brandColors.tealDark,
    ...brandShadow.teal,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.5,
    color: brandColors.goldAccent,
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(24),
    lineHeight: fs(30),
    fontWeight: '600',
    color: brandColors.surface,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  moneyInputContainer: {
    backgroundColor: brandColors.surface,
    alignItems: 'center',
    marginTop: s(12),
    marginHorizontal: s(16),
    paddingTop: s(20),
    marginBottom: s(10),
    flexDirection: 'row',
    borderRadius: s(24),
    ...brandShadow.soft,
  },
  viewMoney: {
    backgroundColor: brandColors.background,
    alignItems: 'center',
    marginTop: s(10),
    flex: 1,
  },
  textMoney: {
    fontSize: fs(12),
    color: brandColors.muted,
  },
  distributors: {
    marginTop: 1,
    height: 66,
    backgroundColor: brandColors.surface,
  },
  loginBtnContainer: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    paddingHorizontal: s(18),
  },
  loginBtn: {
    height: s(56),
    width: '100%',
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: s(18),
    backgroundColor: brandColors.tealPrimary,
  },
  inputContainerStyle: {
    marginTop: 10,
    borderWidth: 0,
    borderColor: Colors.backgroundColor,
    borderBottomWidth: 2,
    minWidth: 150,
    textAlign: 'right',
    color: brandColors.goldAccent,
    fontSize: fs(24),
  },
  bottomContainer: {
    paddingVertical: 18,
    paddingTop: 20,
    paddingBottom: 18,
    backgroundColor: brandColors.surface,
    alignSelf: 'flex-end',
  },

  nextStepBtnContainer: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    alignItems: 'center',
    paddingHorizontal: s(18),
    marginTop: s(10),
  },

  nextStepBtn: {
    height: s(56),
    width: '100%',
    padding: 0,
    paddingHorizontal: 0,
    borderRadius: s(18),
    backgroundColor: brandColors.tealPrimary,
  },

  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: s(18),
    marginBottom: s(16),
    alignItems: 'center',
  },

  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalText: {
    color: brandColors.textDark,
    fontFamily: Fonts.medium,
    fontSize: fs(14),
  },

  amount: {
    color: brandColors.textDark,
    fontWeight: '600',
    fontSize: fs(16),
    lineHeight: fs(24),
  },
  amountUnit: {
    color: brandColors.muted,
    fontWeight: 'normal',
    fontSize: fs(12),
    lineHeight: fs(20),
  },
  pointTitle: {
    color: Colors.textColor4,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  point: {
    color: Colors.textColor4,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  bankInfoContainer: {
    backgroundColor: brandColors.surface,
    padding: s(18),
    marginHorizontal: s(16),
    borderRadius: s(24),
    ...brandShadow.soft,
  },
  bankTitle: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: Fonts.bold,
    color: brandColors.muted,
  },
  bankBalance: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    fontFamily: Fonts.bold,
    color: brandColors.goldAccent,
  },
  title: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    color: brandColors.textDark,
    padding: s(18),
  },
  dialogContainer: {
    backgroundColor: brandColors.surface,
    padding: s(16),
    paddingTop: s(24),
    borderRadius: s(24),
  },
  closeBtnContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  closeBtn: {
    height: 12,
    width: 12,
  },
  inputAmountContainer: {
    borderWidth: 0,
    borderColor: Colors.borderColor,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  inputAmountBtn: {
    height: 35,
    width: 70,
    padding: 0,
    paddingHorizontal: 0,
    backgroundColor: Colors.systemColor2,
  },
  buttonInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messageCampaign: {
    color: Colors.textColor1,
    fontFamily: Fonts.semiBold,
    lineHeight: 22,
    fontSize: 13,
    textAlignVertical: 'center',
  },
  moreDetail: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    padding: 0,
    position: 'absolute',
    bottom: -5,
  },
})
