import React from 'react'
import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { Text } from '~/common/index'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'
import { formatMoney } from '~/utils/format'

const ConfirmLoanPayment = ({ infoAccount, loanConfirmDetail, chargeFee }) => {
  return (
    <>
      <Text style={styles.textTitle}>Xác nhận thông tin</Text>
      <Text style={styles.textMessage}>Vui lòng điền đầy đủ thông tin đăng ký trả nợ để xác thực thông tin chính xác</Text>
      <InfoDetailOrder
        label={'Thu nợ tài khoản vay'}
        value={loanConfirmDetail?.Info?.loanId}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền vay đã sử dụng'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.loanAmount), { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền gốc trong hạn'}
        value={formatMoney(loanConfirmDetail?.Info?.limitAmount, { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền gốc quá hạn'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.PrOverdue || 0), { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền lãi trong hạn'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.interestAmount), { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền lãi quá hạn'}
        value={formatMoney(-1 * Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0), { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Tổng lãi phải trả'}
        value={formatMoney(-1 * (Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)), { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleMoneyValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Nợ phí'}
        value={formatMoney(chargeFee?.fee || 0, { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Số tiền thanh toán'}
        value={formatMoney(-1 * (Number(loanConfirmDetail?.Info?.loanAmount) + Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)), { unit: 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleMoneyValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Tài khoản thu nợ'}
        value={infoAccount?.accountNumber}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
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
    fontFamily: Fonts.bold,
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

export default ConfirmLoanPayment