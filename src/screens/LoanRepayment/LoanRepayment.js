import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
// import RadioButtonGroup from '~/common/RadioButtonGroup/RadioButtonGroup'
import { useState } from 'react'
import { Button, Text } from '~/common/index'
import InfoItem from './InfoItem'
import Colors from '~/common/Colors/Colors'
import { NAVIGATION_LOAN_PAYMENT } from '~/navigation/routes'
import { useDispatch, useSelector } from 'react-redux'
import { getLoanInfo } from '~/store/selector'
import { requestGetLoanInfo } from '~/store/actions'
import { formatMoney } from '~/utils/format'
import { parseDateString } from '~/utils/date'
import { Fonts } from '~/assets/config'

const LoanRepayment = props => {
  const onGoBack = props.route?.params?.onGoBack

  const dispatch = useDispatch()
  const loanConfirmDetail = useSelector(state => getLoanInfo(state))
  const [paymentType] = useState(1)

  useEffect(() => {
    dispatch(requestGetLoanInfo())
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={strings.loanRepayment.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <View style={styles.divider} />
      <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={styles.inforContainer}>
          {/* <Text>Hình thức trả nợ</Text>
          <View style={{ paddingVertical: 18 }}>
            <RadioButtonGroup 
              value={paymentType}
              data={[
                {
                  value: 1,
                  title: 'Trả nợ 1 phần',
                },
                {
                  value: 2,
                  title: 'Trả nợ toàn phần',
                },
              ]}
              onDataChange={(item) => {
                setPaymentType(item.value)
              }}
            />
          </View> */}
          <InfoItem title='Ngày truy vấn'>
            <Text style={styles.styleValue}>{parseDateString(loanConfirmDetail?.Info?.startDate, 'yyyy-MM-DD')}</Text>
          </InfoItem>
          <InfoItem title='Tài khoản thấu chi'>
            <Text style={styles.styleValue}>{loanConfirmDetail?.Info?.loanId}</Text>
          </InfoItem>
          <InfoItem title='Số tiền vay đã được cấp'>
            <Text style={styles.styleValue}>{formatMoney(loanConfirmDetail?.Info?.limitAmount, { unit: 'VNĐ' })}</Text>
          </InfoItem>
          <InfoItem title='Số tiền vay đã sử dụng'>
            <Text style={styles.styleValue}>{formatMoney(-1 * Number(loanConfirmDetail?.Info?.loanAmount), { unit: 'VNĐ' })}</Text>
          </InfoItem>
          <InfoItem title='Ngày đáo hạn'>
            <Text style={styles.styleValue}>{parseDateString(loanConfirmDetail?.Info?.endDate, 'yyyy-MM-DD')}</Text>
          </InfoItem>
          <InfoItem title='Lãi suất'>
            <Text style={styles.styleValue}>{`${loanConfirmDetail?.Info?.interestRate}%`}</Text>
          </InfoItem>
          <InfoItem title='Tình trạng khoản vay'>
            <Text style={styles.styleValue}>{!loanConfirmDetail?.Info?.totalOverdueAmount || loanConfirmDetail?.Info?.totalOverdueAmount === 0 ? 'Trong hạn' : 'Quá hạn'}</Text>
          </InfoItem>
        </View>
      </ScrollView>

      <View style={styles.containerButton}>
        <Button
          text={'Tiếp tục'}
          styleButton={styles.styleButton}
          onPressEvent={() => {
            props.navigation.navigate(NAVIGATION_LOAN_PAYMENT, {
              title: 'Trả nợ toàn phần',
              paymentType,
              onGoBack,
            })
          }}
          styleView={styles.styleView}
        />
      </View>
    </SafeAreaView>
  )
}
export default LoanRepayment

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inforContainer: {
    backgroundColor: 'white',
    padding: 18,
  },
  containerButton: {
    justifyContent: 'flex-end',
    backgroundColor: Colors.white,
  },
  styleButton: {
    borderRadius: 50,
  },
  styleView: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  divider: {
    height: 6,
  },
  styleValue: {
    color: Colors.textColor2,
    fontSize: 14,
    fontFamily: Fonts.medium,
    lineHeight: 22,
    fontWeight: 'normal',
  },
})