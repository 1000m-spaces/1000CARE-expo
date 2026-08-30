import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

// Dòng lịch sử giao dịch theo cùng ngôn ngữ card trắng/shadow soft dùng
// xuyên suốt bộ redesign — số tiền màu theo chiều tăng/giảm, thay hàng
// phẳng 3 cột + icon dropdown xám cũ.
const InfoPay = props => {
  const { code, money, textMethod, textInfo, textMoney } = props
  const numericMoney = parseInt(money, 10)
  const isPositive = numericMoney >= 0

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.textPay}>{textMethod}</Text>
        <Text style={styles.textCode}>{textInfo}: {code}</Text>
      </View>
      <View style={styles.moneyBlock}>
        <Text style={styles.textMoneyLabel}>{textMoney}</Text>
        <Text style={[styles.textMoney, { color: isPositive ? brandColors.tealDark : brandColors.danger }]}>
          {money}
        </Text>
      </View>
    </View>
  )
}
export default InfoPay

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(12),
    marginHorizontal: s(16),
    marginBottom: s(8),
    ...brandShadow.soft,
  },
  info: {
    flex: 1,
  },
  textPay: {
    color: brandColors.tealPrimary,
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  textCode: {
    marginTop: s(2),
    color: brandColors.mutedLight,
    fontSize: fs(11),
  },
  moneyBlock: {
    alignItems: 'flex-end',
  },
  textMoneyLabel: {
    fontSize: fs(10.5),
    color: brandColors.mutedLight,
  },
  textMoney: {
    marginTop: s(2),
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
  },
})
