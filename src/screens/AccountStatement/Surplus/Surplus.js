import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

// Tab "Số dư" — hiển thị số dư hiện tại dạng card trắng theo cùng ngôn ngữ
// thiết kế với tab "Giao dịch", thay bảng lưới trống trước đó (chưa có dữ
// liệu số dư thật, giữ dạng minh hoạ).
const Surplus = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Số dư hiện tại</Text>
        <Text style={styles.value}>0đ</Text>
      </View>
    </View>
  )
}
export default Surplus

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
    padding: s(16),
  },
  card: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    padding: s(16),
    ...brandShadow.soft,
  },
  label: {
    fontSize: fs(12),
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: brandColors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: s(8),
  },
  value: {
    fontSize: fs(19),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.tealDark,
  },
})
