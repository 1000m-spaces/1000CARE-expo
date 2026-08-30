import React from 'react'
import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { brandColors } from '~/design-system/tokens'
import { Text } from '~/common/index'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'
import { formatMoney } from '~/utils/format'
import { s, fs } from '~/utils/responsive'

const ConfirmLoanPayment = ({ infoAccount, loanConfirmDetail, chargeFee }) => {
  return (
    <>
      <Text style={styles.textTitle}>Xác nhận thông tin</Text>
      <Text style={styles.textMessage}>Vui lòng điền đầy đủ thông tin đăng ký trả nợ để xác thực thông tin chính xác</Text>
      <InfoDetailOrder
        label={'Thu nợ tài khoản vay'}
        value={loanConfirmDetail?.Info?.loanId}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền vay đã sử dụng'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.loanAmount), { unit: 'đ' })}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền gốc trong hạn'}
        value={formatMoney(loanConfirmDetail?.Info?.limitAmount, { unit: 'đ' })}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền gốc quá hạn'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.PrOverdue || 0), { unit: 'đ' })}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền lãi trong hạn'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.interestAmount), { unit: 'đ' })}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền lãi quá hạn'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0), { unit: 'đ' })}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Tổng lãi phải trả'}
        value={formatMoney(-1 * (Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)), { unit: 'đ' })}
        styleValue={styles.styleMoneyValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Nợ phí'}
        value={formatMoney(chargeFee?.fee || 0, { unit: 'đ' })}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền thanh toán'}
        value={formatMoney(-1 * (Number(loanConfirmDetail?.Info?.loanAmount) + Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)), { unit: 'đ' })}
        styleValue={styles.styleMoneyValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Tài khoản thu nợ'}
        value={infoAccount?.accountNumber}
        styleWrap={styles.styleWrap}
      />
    </>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: brandColors.tealDark,
    fontSize: fs(15.5),
    lineHeight: fs(22),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
  textMessage: {
    marginTop: s(2),
    color: brandColors.muted,
    fontSize: fs(12),
    lineHeight: fs(19),
  },
  styleMoneyValue: {
    color: brandColors.tealDark,
    fontSize: fs(15),
    fontWeight: '800',
  },
  styleWrap: {
    paddingHorizontal: 0,
  },
})

export default ConfirmLoanPayment
