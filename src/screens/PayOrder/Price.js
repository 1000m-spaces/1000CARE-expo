import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { formatMoney } from '~/utils/format'

const Price = ({ price, unit = 'VNĐ', size = 16 }) => {
  return (
    <View style={styles.wrap}>
      <Text style={[styles.textPrice, { fontSize: size }]}>
        {formatMoney(price,{ unit: '' })}
      </Text>
      <Text style={[styles.textUnit, { fontSize: size - 4 }]}>{unit}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textPrice: {
    color: Colors.priceColor,
    fontWeight: '600',
  },
  textUnit: {
    marginLeft: 2,
    marginBottom: 1,

    color: Colors.priceColor,
    fontWeight: 'normal',
    textTransform: 'uppercase',
  },
})

export default Price
