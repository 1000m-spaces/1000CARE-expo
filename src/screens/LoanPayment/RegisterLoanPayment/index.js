import React from 'react'
import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { Text } from '~/common/index'
import InfoItem from '~/screens/LoanRepayment/InfoItem'
import { formatMoney } from '~/utils/format'

const RegisterLoanPayment = ({ infoAccount, loanConfirmDetail, chargeFee }) => {
  return (
    <>
      <Text style={styles.textTitle}>Đăng ký trả nợ</Text>
      <Text style={styles.textMessage}>Vui lòng điền đầy đủ thông tin đăng ký trả nợ để xác thực thông tin chính xác</Text>
          
      <InfoItem title='Thu nợ tài khoản vay'>
        <Text style={styles.styleValue}>{loanConfirmDetail?.Info?.loanId}</Text>
      </InfoItem>
      <InfoItem title='Số tiền vay đã được cấp'>
        <Text style={styles.styleValue}>{formatMoney(loanConfirmDetail?.Info?.limitAmount, { unit: 'VNĐ' })}</Text>
      </InfoItem>
      <InfoItem title='Số tiền vay đã sử dụng'>
        <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.loanAmount), { unit: 'VNĐ' })}</Text>
      </InfoItem>
      <InfoItem title='Số tiền gốc quá hạn'>
        <Text style={styles.styleValue}>{'0 VNĐ'}</Text>
      </InfoItem>
      <InfoItem title='Số tiền lãi trong hạn'>
        <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.interestAmount), { unit: 'VNĐ' })}</Text>
      </InfoItem>
      <InfoItem title='Số tiền lãi quá hạn'>
        <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0), { unit: 'VNĐ' })}</Text>
      </InfoItem>
      <InfoItem title='Tài khoản thu nợ'>
        <Text style={styles.styleValue}>{infoAccount?.accountNumber}</Text>
      </InfoItem>
      <InfoItem title='Tổng lãi phải trả'>
        <Text style={styles.priceText}>{formatMoney(-1 * (Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)), { unit: 'VNĐ' })}</Text>
      </InfoItem>
    </>
  )
}

const styles = StyleSheet.create({
  textTitle: {
    color: Colors.systemColor2,
    fontFamily: Fonts.bold,
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
    fontFamily: Fonts.medium,
    lineHeight: 22,
    fontWeight: 'normal',
  },
})

export default RegisterLoanPayment