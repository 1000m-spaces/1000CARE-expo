import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from '~/common/index'
import { log_mb_bank_landscape } from '~/assets/constants'
import PressScale from '~/design-system/PressScale'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

// Card ngân hàng đã liên kết theo cùng ngôn ngữ card trắng + shadow soft
// dùng xuyên suốt bộ redesign — thay hàng phẳng chia 3 cột cứng theo % cũ.
const ItemBank = ({ data }) => {
  const numberAccount = account => {
    if (typeof account === 'string' && account.length > 0) {
      const length = account.length
      const number = account.slice(Math.max(0, length - 3), length)
      const format = '*'.repeat(Math.max(0, length - 3)) + number
      return format.toString().replace(/(\*)(?=(.{4})+(?!.))/g, '$1 ')
    }
    return ''
  }
  return (
    <PressScale style={styles.container}>
      <View style={styles.logoWrap}>
        <Image resizeMode={'contain'} style={styles.logoBank} source={log_mb_bank_landscape} />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>Ngân hàng Quân Đội {data.bank_code}</Text>
        <Text style={styles.fullName}>Stk: {numberAccount(data?.account_number)}</Text>
      </View>
    </PressScale>
  )
}
export default ItemBank

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
  logoBank: {
    width: '80%',
    height: '60%',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: brandColors.textDark,
  },
  fullName: {
    marginTop: s(2),
    fontSize: fs(11.5),
    color: brandColors.muted,
  },
})
