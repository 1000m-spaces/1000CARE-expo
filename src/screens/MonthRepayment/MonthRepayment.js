import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import CreationProcess from '~/common/CreationProcess/CreationProcess'
import iconSignUp from '~/assets/configNeoMed/CreateLoan/registerActive.png'
import iconConfirm from '~/assets/configNeoMed/CreateLoan/confirm.png'
import Colors from '~/common/Colors/Colors'

const MonthRepayment = props => {
  const [money, setMoney] = useState('0')
  return (
    <View style={styles.container}>
      <Header
        title={strings.MonthRepayment.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <ScrollView style={styles.scroll}>
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
              // value={money}
              placeholder={'0'}
              placeholderTextColor={Colors.priceColor}
              keyboardType={'numeric'}
              style={styles.styleInput}
              onChangeText={(text) => setMoney(text)}
            />
            <Text style={styles.textUnit}>VND</Text>
          </View>
          <Text style={styles.textMaxMoney}>Số tiền tối đa có thể thanh toán:<Text style={styles.maxMoney}> 20.000.000VND</Text></Text>
        </View>
        <View style={styles.viewContent} />
      </ScrollView>
    </View>
  )
}
export default MonthRepayment

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  containerProcess: {
    backgroundColor: 'white',
    marginTop: 10,
    height: 100,
    paddingHorizontal: 30,
  },
  viewLoan: {
    backgroundColor: 'white',
    marginTop: 1,
    padding: 10,
  },
  textLoan: {
    fontSize: 18,
    color: '#4276FE',
  },
  textPlease: {
    color: '#595959',
    marginTop: 3,
  },
  containerMoney: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 1,
    paddingHorizontal: 18,
  },
  textTitleMoney: {
    color: '#8C8C8C',
    fontSize: 18,
    marginTop: 10,
  },
  styleInput: {
    color: Colors.priceColor,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#DFDFDF',
    textAlign: 'right',
    fontWeight: '600',
    minWidth: 100,
    paddingBottom: 0,
  },
  viewInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textUnit: {
    color: Colors.priceColor,
    fontSize: 12,
  },
  textMaxMoney: {
    color: '#8C8C8C',
    marginTop: 20,
    textAlign: 'center',
  },
  maxMoney: {
    color: '#595959',
  },
  viewContent: {
    backgroundColor: 'white',
    marginTop: 1,
  },
})