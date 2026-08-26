import React from 'react'
import { useEffect } from 'react'
import { Linking, View } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { useDispatch, useSelector } from 'react-redux'
import Colors from '~/common/Colors/Colors'
import { CheckBox, Text } from '~/common/index'
import { requestGetCustomerInfo, requestGetPharmacyInfo } from '~/store/actions'
import { getCustomerInfo, getInfoAccount, getPharmacyInfo } from '~/store/selector'
import { getDateString } from '~/utils/date'
import { formatMoney } from '~/utils/format'
import InfoItem from './InfoItem'
import { Fonts } from '~/assets/config'

import styles from './styles'

const StepThree = ({ amountLoan, setAmountLoan, loanProposalsDetail, setAcceptedTerm1, setAcceptedTerm2, acceptedTerm1, acceptedTerm2 }) => {
  const dispatch = useDispatch()
  const pharmacyInfo = useSelector(state => getPharmacyInfo(state))
  const infoAccount = useSelector(state => getInfoAccount(state))
  const customerAccount = useSelector(state => getCustomerInfo(state))

  useEffect(() => {
    dispatch(requestGetPharmacyInfo())
    dispatch(requestGetCustomerInfo())
  }, [])

  console.log('pharmacyInfo', pharmacyInfo)
  console.log('customerAccount', customerAccount)

  return (
    <View style={styles.mainContainer}>
      <View style={styles.amountInfoContainer}>
        <Text style={styles.borrowAmount}>Hạn mức được cấp</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.money}>{formatMoney(amountLoan, { unit: '' })}</Text>
          {/* <TextInput
            style={styles.money}
            value={amountLoan.toString()}
            keyboardType = 'numeric'
            onChangeText={(value) => {
              if (Number(value) || value === '') {
                setAmountLoan(Number(value))
              }
            }}
            inputContainerStyle={{
              borderWidth: 0,
              borderRadius: 0,
            }}
          /> */}
          <Text style={styles.unit}>{'VNĐ'}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.max}>Hạn mức tối đa được cấp: </Text>
          <Text style={styles.maxAmount}>{formatMoney(loanProposalsDetail?.maxLimit || 0, { unit: 'VNĐ' })}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.max}><Text style={{ fontFamily: Fonts.bold }}>Lưu ý: </Text>Việc cấp hạn mức thấu chi sẽ chưa tính lãi cho KH. Hệ thống chỉ tính lãi Khi khách hàng sử dụng hạn mức thấu chi để thanh toán tiền hàng.</Text>
        </View>
      </View>
      <View style={styles.titleInformationContainer}>
        <Text style={styles.titleInformation}>Thông tin khách hàng</Text>
      </View>
      <View style={styles.informationContainer}>
        <InfoItem
          label={'Chủ cửa hàng'}
          value={customerAccount?.customerName || pharmacyInfo?.owner_full_name}
        />
        <InfoItem
          label={'Giấy tờ tùy thân'}
          value={customerAccount?.identityCardNumber || pharmacyInfo?.owner_id_card_number}
        />
        <InfoItem
          label={'Ngày sinh'}
          value={getDateString(customerAccount?.dateOfBirth || pharmacyInfo?.owner_birthday, 'DD-MM-yyyy')}
        />
        <InfoItem
          label={'Số điện thoại'}
          value={customerAccount?.phone || pharmacyInfo?.owner_phone}
        />
        <InfoItem
          label={'Email'}
          value={customerAccount?.email}
        />
      </View>

      <View style={styles.titleInformationContainer}>
        <Text style={styles.titleInformation}>Thông tin khoản vay</Text>
      </View>
      <View style={styles.informationContainer}>
        <InfoItem
          label={'Lãi suất'}
          value={`${Number(loanProposalsDetail?.interestRate)} %/năm`}
        />
        <InfoItem
          label={'Thời gian thấu chi'}
          value={`${loanProposalsDetail?.loanTerm} tháng`}
        />
        <InfoItem
          label={'Hình thức giải ngân'}
          value={'Cấp hạn mức thấu chi'}
        />
        <InfoItem
          label={'Hình thức trả nợ'}
          value={'Trả gốc, lãi hàng tháng'}
        />
        <InfoItem
          label={''}
          value={'Số tiền gốc hàng tháng = 30% x Dư nợ thực tế'}
          styleValue={{
            fontWeight: '600',
            color: Colors.textColor1,
          }}
        />
        <InfoItem
          label={'Tài khoản thu nợ'}
          value={infoAccount?.accountNumber}
        />
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <PressScale
          style={styles.checkBoxContainer}
          onPress={() => setAcceptedTerm1(!acceptedTerm1)}
        >
          <CheckBox
            checked={acceptedTerm1}
            onPress={() => setAcceptedTerm1(!acceptedTerm1)}
          />
          <Text style={styles.checkBoxMessage}>Tôi đã đọc hiểu và đồng ý giao kết</Text>
          <PressScale
            onPress={() => {
              Linking.openURL('https://storage.googleapis.com/neomed.vn/docs/contracts/mbbank/HOP_DONG_TIN_DUNG.pdf')
            }}
          ><Text style={styles.termMessage}>hợp đồng vay vốn</Text></PressScale>
        </PressScale>
        <PressScale
          style={styles.checkBoxContainer}
          onPress={() => setAcceptedTerm2(!acceptedTerm2)}
        >
          <CheckBox
            checked={acceptedTerm2}
            onPress={() => setAcceptedTerm2(!acceptedTerm2)}
          />
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={styles.checkBoxMessage}>Tôi đã đọc, hiểu và đồng ý các</Text>
              <PressScale><Text style={styles.termMessage}>quy định về sử dụng dịch vụ</Text></PressScale>
            </View>
            <Text style={styles.checkBoxMessage}>cấp tín dụng trực tuyến và cam kết bổ sung các hồ sơ liên quan khi được MB yêu cầu</Text>
          </View>
        </PressScale>
      </View>
    </View>
  )
}

export default StepThree