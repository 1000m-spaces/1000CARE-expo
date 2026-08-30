import React from 'react'
import { StyleSheet } from 'react-native'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'
import { parseDateString } from '~/utils/date'
import { formatMoney } from '~/utils/format'
import { brandColors } from '~/design-system/tokens'
import { fs } from '~/utils/responsive'

const BorrowInfo = ({ loanConfirmDetail, chargeFee }) => {
  return (
    <>
      <InfoDetailOrder
        label={'Mục đích vay'}
        value={'Vay thanh toán tiền hàng'}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Hạn mức được cấp'}
        value={formatMoney(loanConfirmDetail?.Info?.limitAmount || 0, { unit: 'đ' })}
        styleValue={styles.styleValueSpec}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Thời hạn cấp hạn mức'}
        value={`${loanConfirmDetail?.Info?.loanTerm || 12} tháng`}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Lãi suất'}
        value={`${loanConfirmDetail?.Info?.interestRate || 0}%/năm`}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Kỳ hạn trả nợ gốc'}
        value={'1 tháng/lần'}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Kỳ hạn trả nợ lãi'}
        value={'1 tháng/lần'}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Thời gian bắt đầu'}
        value={parseDateString(loanConfirmDetail?.Info?.startDate, 'yyyy-MM-DD')}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Thời gian kết thúc'}
        value={parseDateString(loanConfirmDetail?.Info?.endDate, 'yyyy-MM-DD')}
        styleWrap={styles.styleWrap}
      />
      <InfoDetailOrder
        label={'Phí giao dịch'}
        value={formatMoney(chargeFee?.fee || 0, { unit: 'đ' })}
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

export default BorrowInfo
