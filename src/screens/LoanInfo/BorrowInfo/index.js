import React from 'react'
import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'
import { parseDateString } from '~/utils/date'
import { formatMoney } from '~/utils/format'

const BorrowInfo = ({ loanConfirmDetail, chargeFee }) => {
  return (
    <>
      <InfoDetailOrder
        label={'Mục đích vay'}
        value={'Vay thanh toán tiền hàng'}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Hạn mức được cấp'}
        value={formatMoney(loanConfirmDetail?.Info?.limitAmount || 0, { unit : 'VNĐ' })}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValueSpec}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Thời hạn cấp hạn mức'}
        value={`${loanConfirmDetail?.Info?.loanTerm || 12} tháng`}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Lãi suất'}
        value={`${loanConfirmDetail?.Info?.interestRate || 0}%/năm`}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Kỳ hạn trả nợ gốc'}
        value={'1 tháng/lần'}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Kỳ hạn trả nợ lãi'}
        value={'1 tháng/lần'}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Thời gian bắt đầu'}
        value={parseDateString(loanConfirmDetail?.Info?.startDate, 'yyyy-MM-DD')}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Thời gian kết thúc'}
        value={parseDateString(loanConfirmDetail?.Info?.endDate, 'yyyy-MM-DD')}
        styleLabel={styles.styleLabel}
        styleValue={styles.styleValue}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Phí giao dịch'}
        value={formatMoney(chargeFee?.fee || 0, { unit: 'VNĐ' })}
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

export default BorrowInfo