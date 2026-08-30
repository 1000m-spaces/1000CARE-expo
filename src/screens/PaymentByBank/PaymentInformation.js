import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { formatMoney } from '~/utils/format'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import Price from './Price'

const PaymentInformation = ({ total, max }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Số tiền thanh toán</Text>
      <Price
        price={total}
        size={fs(22)}
      />
      <View style={styles.wrapMaximum}>
        <Text style={styles.labelMaximum}>Hạn mức tối đa thanh toán:</Text>
        <Text style={styles.priceMaximum}>{formatMoney(max, { unit: 'đ' })}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: s(6),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    marginHorizontal: s(16),
    marginTop: s(16),
    marginBottom: s(12),
    padding: s(20),
    ...brandShadow.soft,
  },
  title: {
    color: brandColors.muted,
    fontSize: fs(13),
  },
  wrapMaximum: {
    marginTop: s(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelMaximum: {
    color: brandColors.muted,
    fontSize: fs(12),
  },
  priceMaximum: {
    marginLeft: s(4),
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: '600',
    fontSize: fs(12),
  },
})

export default PaymentInformation
