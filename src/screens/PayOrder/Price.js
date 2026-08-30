import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { formatMoney } from '~/utils/format'
import { Fonts } from '~/assets/config'

const Price = ({ price, unit = 'VNĐ', size = 16 }) => {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.textPrice, { fontSize: size }]}>
        {formatMoney(price, { unit: '' })}
      </Text>
      <Text style={[styles.textUnit, { fontSize: size - 4 }]}>{unit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textPrice: {
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontWeight: '800',
  },
  textUnit: {
    marginLeft: 2,
    marginBottom: 1,
    color: brandColors.tealDark,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
})

export default Price
