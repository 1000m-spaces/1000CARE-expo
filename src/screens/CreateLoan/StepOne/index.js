import React, { useState } from 'react'
import { FlatList, Linking, View } from 'react-native'
import { CheckBox, Text } from '~/common/index'
import { formatMoney } from '~/utils/format'
import DialogTerm from './DialogTerm/index'
import PressScale from '~/design-system/PressScale'

import styles from './styles'

const termData = [
  'Khoản vay này phục vụ cho hoạt động thanh toán hàng hóa trên App 1000M',
  'Sử dụng hạn mức thấu chi đúng mục đích',
  'Thanh toán gốc và lãi khoản vay đúng hạn',
  'Tuân thủ mọi điều khoản, điều kiện và các điều kiện khác liên quan đến khoản vay',
  'Nguồn thu đó trả nợ cho khoản vay',
]

const StepOne = ({ loanProposalsDetail, acceptedTerm, setAcceptedTerm }) => {
  const [openDialogTerm, setOpenDialogTerm] = useState(false)

  const renderRow = (data) => {
    return (
      <View style={styles.termItemContainer}>
        <Text style={styles.dot}>{'\u2022'}</Text>
        <Text style={styles.termItemValue}>{data}</Text>
      </View>
    )
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.amountInfoContainer}>
        <Text style={styles.max}>Hạn mức thấu chi tối đa</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.money}>{formatMoney(loanProposalsDetail?.maxLimit || 0, { unit: '' })}</Text>
          <Text style={styles.unit}>{'VNĐ'}</Text>
        </View>
      </View>
      <View style={styles.interestRate}>
        <Text style={styles.interestRateTitle}>Lãi suất:</Text>
        <Text style={styles.interestRateValue}>{Number(loanProposalsDetail?.interestRate || 0)}%/năm</Text>
      </View>
      <View style={styles.termsContainer}>
        <Text style={styles.termsTitle}>Điều kiện, Điều khoản</Text>
        <Text style={styles.termsMessage}>Tôi xác nhận</Text>
        <FlatList 
          keyExtractor={(_, idx) =>idx.toString()}
          data={termData}
          renderItem={({ item }) => renderRow(item)}
        />
        <PressScale
          style={styles.checkBoxContainer}
          onPress={() => setAcceptedTerm(!acceptedTerm)}
        >
          <CheckBox
            checked={acceptedTerm}
            onPress={() => setAcceptedTerm(!acceptedTerm)}
          />
          <Text style={styles.checkBoxMessage}>Tôi đã đọc, hiểu và đồng ý với</Text>
          <PressScale
            onPress={() => {
              Linking.openURL('https://storage.googleapis.com/neomed.vn/docs/contracts/mbbank/THE_LE_SAN_PHAM_VAY_SAN_XUAT_KINH_DOANH.pdf')
            }}
          ><Text style={styles.termMessage}>thể lệ sản phẩm</Text></PressScale>
        </PressScale>
      </View>
      <DialogTerm
        isOpen={openDialogTerm}
        onClose={() => {
          setOpenDialogTerm(false)
        }}
      />
    </View>
  )
}

export default StepOne