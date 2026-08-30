import React from 'react'
import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import { brandColors } from '~/design-system/tokens'
import { Text } from '~/common/index'
import InfoItem from '~/screens/LoanRepayment/InfoItem'
import { formatMoney } from '~/utils/format'
import { s, fs } from '~/utils/responsive'

const RegisterLoanPayment = ({ infoAccount, loanConfirmDetail, chargeFee }) => {
  return (
    <>
      <Text style={styles.textTitle}>Đăng ký trả nợ</Text>
      <Text style={styles.textMessage}>Vui lòng điền đầy đủ thông tin đăng ký trả nợ để xác thực thông tin chính xác</Text>

      <InfoItem title='Thu nợ tài khoản vay'>
        <Text style={styles.styleValue}>{loanConfirmDetail?.Info?.loanId}</Text>
      </InfoItem>
      <InfoItem title='Số tiền vay đã được cấp'>
        <Text style={styles.styleValue}>{formatMoney(loanConfirmDetail?.Info?.limitAmount, { unit: 'đ' })}</Text>
      </InfoItem>
      <InfoItem title='Số tiền vay đã sử dụng'>
        <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.loanAmount), { unit: 'đ' })}</Text>
      </InfoItem>
      <InfoItem title='Số tiền gốc quá hạn'>
        <Text style={styles.styleValue}>{'0 đ'}</Text>
      </InfoItem>
      <InfoItem title='Số tiền lãi trong hạn'>
        <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.interestAmount), { unit: 'đ' })}</Text>
      </InfoItem>
      <InfoItem title='Số tiền lãi quá hạn'>
        <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0), { unit: 'đ' })}</Text>
      </InfoItem>
      <InfoItem title='Tài khoản thu nợ'>
        <Text style={styles.styleValue}>{infoAccount?.accountNumber}</Text>
      </InfoItem>
      <InfoItem title='Tổng lãi phải trả'>
        <Text style={styles.priceText}>{formatMoney(-1 * (Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)), { unit: 'đ' })}</Text>
      </InfoItem>
    </>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontSize: fs(15.5),
    lineHeight: fs(22),
    fontWeight: '700',
  },
  textMessage: {
    marginTop: s(2),
    color: brandColors.muted,
    fontSize: fs(12),
    lineHeight: fs(19),
  },
  priceText: {
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontSize: fs(17),
    lineHeight: fs(24),
    fontWeight: '800',
  },
  styleValue: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
  },
})

export default RegisterLoanPayment
