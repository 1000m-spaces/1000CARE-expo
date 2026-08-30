import React from 'react'
import { StyleSheet } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { fs } from '~/utils/responsive'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'

const LoanInfo = ({ loanId, accountId }) => {
  return (
    <>
      <InfoDetailOrder
        label={'Tài khoản khấu chi'}
        value={loanId}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Tài khoản thu nợ'}
        value={accountId}
        styleValue={styles.styleValueSpec}
        styleWrap={styles.styleWrap}
      />
    </>
  )
}

const styles = StyleSheet.create({
  styleValueSpec: {
    color: brandColors.tealDark,
    fontSize: fs(13),
    fontWeight: '800',
  },
  styleWrap: {
    paddingHorizontal: 0,
  },
})

export default LoanInfo
