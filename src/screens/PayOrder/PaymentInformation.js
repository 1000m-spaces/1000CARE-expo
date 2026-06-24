import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Price from './Price'

const PaymentInformation = ({ total, max }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Số tiền thanh toán</Text>
      <Price
        price={total}
        size={20}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    height: 100,
    backgroundColor: '#FFF',
    padding: 18,

    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderBottomWidth: 1,
    borderColor: '#F5F5F5',
    borderStyle: 'solid',
  },
  title: {
    color: '#8C8C8C',
    fontSize: 16,
    fontWeight: 'normal',
  },
  wrapMaximum: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelMaximum: {
    color: '#8C8C8C',
    fontSize: 14,
    fontWeight: 'normal',
  },
  priceMaximum: {
    marginLeft: 2,
    color: '#595959',
    fontSize: 14,
    fontWeight: 'normal',
  },
})

export default PaymentInformation
