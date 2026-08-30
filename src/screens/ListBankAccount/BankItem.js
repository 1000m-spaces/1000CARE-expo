import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Image } from '~/common/index'
import { formatMoney } from '~/utils/format'
import PressScale from '~/design-system/PressScale'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

// Dòng tài khoản nạp theo cùng ngôn ngữ card trắng + shadow soft dùng
// xuyên suốt bộ redesign — thay hàng phẳng nền trắng + icon mũi tên xám cũ.
const BankItem = ({ data, onItemPress }) => {
  return (
    <PressScale
      style={styles.container}
      onPress={() => {
        if (onItemPress) {
          onItemPress(data)
        }
      }}
    >
      <View style={styles.logoWrap}>
        <Image style={styles.image} source={data.logo} resizeMode="contain" />
      </View>
      <View style={styles.balanceContainer}>
        <Text style={styles.name}>{data.title}</Text>
        <Text style={styles.balance}>{formatMoney(data.balance, { unit: 'đ' })}</Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </PressScale>
  )
}

export default BankItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(12),
    marginHorizontal: s(16),
    marginBottom: s(10),
    ...brandShadow.soft,
  },
  logoWrap: {
    width: s(64),
    height: s(40),
    borderRadius: s(radiusScale.md),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '60%',
  },
  balanceContainer: {
    flex: 1,
  },
  name: {
    color: brandColors.muted,
    fontSize: fs(11.5),
  },
  balance: {
    marginTop: s(2),
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.tealDark,
  },
  chevron: {
    fontSize: fs(18),
    color: brandColors.mutedLight,
  },
})
