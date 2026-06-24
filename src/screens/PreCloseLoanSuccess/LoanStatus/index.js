import React from 'react'
import { StyleSheet, View } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { Image, Text } from '~/common/index'
import strings from '~/i18n'
import { formatMoney } from '~/utils/format'
import { successPay } from '~/assets/constants'

const LoanStatus = ({ paidAmount }) => {
  return (
    <View style={styles.container}>
      <View
        style={[styles.bigCircle]}
      >
        <View
          style={[styles.smallCircle]}
        >
          <Image
            resizeMode={'contain'}
            source={successPay}
          />
        </View>
      </View>
      <Text style={styles.loadTitle}>Số tiền trả nợ thành công</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.money}>{formatMoney(paidAmount || 0, { unit: strings.currency.unit, withCurrencyUnit: false })}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  amountContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 12,
  },

  money: {
    color: Colors.priceColor,
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '600',
  },

  unit: {
    color: Colors.priceColor,
    fontSize: 12,
    lineHeight: 26,
    fontWeight: 'normal',
  },

  bigCircle: {
    backgroundColor: 'rgba(77, 221, 138, 0.5)',
    borderRadius: 100,
    height: 100,
    width: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallCircle: {
    backgroundColor: Colors.successColor,
    borderRadius: 80,
    height: 80,
    width: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: 'normal',
  },
})

export default LoanStatus