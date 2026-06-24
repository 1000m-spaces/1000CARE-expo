import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'

const LoanInfo = ({ loanId, accountId }) => {
  return (
    <>
      <InfoDetailOrder
        label={'Tài khoản khấu chi'}
        value={loanId}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Tài khoản thu nợ'}
        value={accountId}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValueSpec}
        styleWrap={styles.styleWrap}
      />
    </>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: Colors.systemColor2,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'normal',
  },
  textMessage: { 
    marginTop: 2,
    color: Colors.textColor2,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  priceText: { 
    color: Colors.priceColor,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
  },
  styleValue: {
    color: Colors.textColor2,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  styleValueSpec: {
    color: Colors.textColor2,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
  styleMoneyValue: {
    color: Colors.priceColor,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: 'normal',
  },
  styleLabel: {
    color: Colors.textColor3,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'normal',
  },
  styleWrap: {
    paddingHorizontal: 0,
  },
})

export default LoanInfo