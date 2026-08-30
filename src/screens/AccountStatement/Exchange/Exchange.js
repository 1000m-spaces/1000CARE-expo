import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

// Dữ liệu minh hoạ tĩnh (màn này chưa nối API thật) — thay bảng lưới
// react-native-table-component cũ bằng danh sách dòng giao dịch theo spec:
// icon tròn +/-, tiêu đề + ngày, số tiền màu theo chiều tăng/giảm.
const transactions = [
  { title: 'Nạp tiền ví · Đông Á', date: '10/01/2026 · 12:00', amount: 200000, positive: true },
  { title: 'Thanh toán đơn hàng · Đông Á', date: '10/01/2026 · 11:20', amount: -200000, positive: false },
  { title: 'Thanh toán đơn hàng · Đông Á', date: '09/01/2026 · 16:40', amount: -200000, positive: false },
  { title: 'Hoàn tiền đơn hàng · Đông Á', date: '08/01/2026 · 09:05', amount: 200000, positive: true },
  { title: 'Nạp tiền ví · Đông Á', date: '07/01/2026 · 14:30', amount: 200000, positive: true },
]

const Exchange = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {transactions.map((t, index) => (
        <View key={index} style={styles.row}>
          <View style={[styles.iconWrap, t.positive ? styles.iconWrapPositive : styles.iconWrapNegative]}>
            <Text style={[styles.iconSign, { color: t.positive ? brandColors.tealPrimary : brandColors.danger }]}>
              {t.positive ? '+' : '−'}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>{t.title}</Text>
            <Text style={styles.date}>{t.date}</Text>
          </View>
          <Text style={[styles.amount, { color: t.positive ? brandColors.tealDark : brandColors.danger }]}>
            {t.positive ? '+' : '-'}{Math.abs(t.amount).toLocaleString('vi-VN')}đ
          </Text>
        </View>
      ))}
    </ScrollView>
  )
}
export default Exchange

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  content: {
    padding: s(16),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(12),
    marginBottom: s(10),
    ...brandShadow.soft,
  },
  iconWrap: {
    width: s(36),
    height: s(36),
    borderRadius: s(18),
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconWrapPositive: {
    backgroundColor: brandColors.tealLight,
  },
  iconWrapNegative: {
    backgroundColor: 'rgba(255,59,48,0.1)',
  },
  iconSign: {
    fontSize: fs(16),
    fontWeight: '800',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: brandColors.textDark,
  },
  date: {
    marginTop: s(2),
    fontSize: fs(11),
    color: brandColors.mutedLight,
  },
  amount: {
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
  },
})
