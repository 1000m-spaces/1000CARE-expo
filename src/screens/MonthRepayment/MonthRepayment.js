import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import CreationProcess from '~/common/CreationProcess/CreationProcess'
import iconSignUp from '~/assets/configNeoMed/CreateLoan/registerActive.png'
import iconConfirm from '~/assets/configNeoMed/CreateLoan/confirm.png'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const MonthRepayment = props => {
  const [money, setMoney] = useState('0')
  return (
    <View style={styles.container}>
      <BackgroundWash />
      <Header
        title={strings.MonthRepayment.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <View style={styles.containerProcess}>
          <CreationProcess
            imageStep1={iconSignUp}
            textStep1={'Đăng kí trả nợ khoản vay'}
            active1={true}
            imageStep2={iconConfirm}
            textStep2={'xác nhận thông tin'}
          />
        </View>
        <View style={styles.viewLoan}>
          <Text style={styles.textLoan}>Đăng kí trả nợ</Text>
          <Text style={styles.textPlease}>Vui lòng điền đẩy đủ thông tin đăng ký vay thêm để xác thực thông tin chính xác</Text>
        </View>
        <View style={styles.containerMoney}>
          <Text style={styles.textTitleMoney}>Số tiền đề nghị thu</Text>
          <View style={styles.viewInput}>
            <TextInput
              placeholder={'0'}
              placeholderTextColor={brandColors.mutedLight}
              keyboardType={'numeric'}
              style={styles.styleInput}
              onChangeText={(text) => setMoney(text)}
            />
            <Text style={styles.textUnit}> đ</Text>
          </View>
          <Text style={styles.textMaxMoney}>Số tiền tối đa có thể thanh toán:<Text style={styles.maxMoney}> 20.000.000đ</Text></Text>
        </View>
      </ScrollView>
    </View>
  )
}
export default MonthRepayment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: s(16),
    paddingBottom: s(24),
  },
  containerProcess: {
    marginTop: s(6),
    height: s(100),
  },
  viewLoan: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    marginTop: s(10),
    padding: s(16),
    ...brandShadow.soft,
  },
  textLoan: {
    fontSize: fs(15.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: brandColors.tealDark,
  },
  textPlease: {
    color: brandColors.muted,
    fontSize: fs(12),
    marginTop: s(4),
  },
  containerMoney: {
    alignItems: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    marginTop: s(10),
    padding: s(18),
    ...brandShadow.soft,
  },
  textTitleMoney: {
    color: brandColors.muted,
    fontSize: fs(13.5),
  },
  styleInput: {
    color: brandColors.tealDark,
    fontSize: fs(20),
    borderBottomWidth: 1.5,
    borderBottomColor: brandColors.borderSoft,
    textAlign: 'right',
    fontWeight: '700',
    minWidth: s(100),
    paddingVertical: s(6),
    marginTop: s(10),
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUnit: {
    color: brandColors.tealDark,
    fontSize: fs(12),
    fontWeight: '600',
  },
  textMaxMoney: {
    color: brandColors.muted,
    fontSize: fs(12),
    marginTop: s(16),
    textAlign: 'center',
  },
  maxMoney: {
    color: brandColors.textDark,
    fontWeight: '700',
  },
})
