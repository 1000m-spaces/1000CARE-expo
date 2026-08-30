import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Image, Text } from '~/common/index'
import { formatMoney } from '~/utils/format'
import { successPay } from '~/assets/constants'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const BorrowStatus = ({ loanConfirmDetail }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bigCircle}>
        <View style={styles.smallCircle}>
          <Image
            resizeMode={'contain'}
            source={successPay}
          />
        </View>
      </View>
      <Text style={styles.loadTitle}>Hạn mức thấu chi được cấp</Text>
      <View style={styles.amountContainer}>
        <Text style={styles.money}>{formatMoney(loanConfirmDetail?.Info?.limitAmount || 0, { unit: '' })}</Text>
        <Text style={styles.unit}> đ</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: s(12),
  },

  money: {
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontSize: fs(24),
    lineHeight: fs(28),
    fontWeight: '800',
  },

  unit: {
    color: brandColors.tealDark,
    fontSize: fs(13),
    lineHeight: fs(22),
    fontWeight: '600',
  },

  bigCircle: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderRadius: s(50),
    height: s(100),
    width: s(100),
    justifyContent: 'center',
    alignItems: 'center',
  },

  smallCircle: {
    backgroundColor: brandColors.success,
    borderRadius: s(40),
    height: s(80),
    width: s(80),
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadTitle: {
    marginTop: s(12),
    fontSize: fs(14.5),
    fontWeight: '600',
    color: brandColors.textDark,
  },
})

export default BorrowStatus
