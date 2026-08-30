import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import Price from './Price'

const PaymentInformation = ({ total }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Số tiền thanh toán</Text>
      <Price
        price={total}
        size={fs(22)}
      />
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
    padding: s(18),
    ...brandShadow.soft,
  },
  title: {
    color: brandColors.muted,
    fontSize: fs(13),
  },
})

export default PaymentInformation
