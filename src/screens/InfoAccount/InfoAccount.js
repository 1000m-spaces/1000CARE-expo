import React, { useState } from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, View, SafeAreaView } from 'react-native'
import { Image } from '~/common/index'
import Header from '~/common/Header/index'
import styles from './styles'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { Button } from '~/common'
import TextInput from '~/common/Input/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import card from '~/assets/configNeoMed/bank/cardBank.png'
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 6, 8, 6, 8, 6, 8, 8]
const data2 = [1, 2]

const InfoAccount = props => {
  const [accountNumber, setAccountNumber] = useState('')
  const [nameAccount, setNameAccount] = useState('')
  const [date, setDate] = useState('')

  const renderCircle = data.map((item, index) => {
    return (
      <View style={[styles.viewCircle, { marginLeft: index % 4 == 0 ? 10 : 3 }]} />
    )
  })
  const renderCircle2 = data2.map((item, index) => {
    return (
      <View style={styles.viewCircle2} />
    )
  })
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={{ backgroundColor: 'white' }}>
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <View style={{ flex: 1 }}>
            <Header
              title={strings.InfoAccount.title}
              leftAction={() => props.navigation.pop()}
              iconLeft={back}
            />
            {(accountNumber && nameAccount && date) == ''
              ? <View style={styles.containerBank}>
                <View style={styles.bank}>
                  <View style={styles.containerCircle}>
                    {renderCircle}
                  </View>
                  <View style={styles.viewName}>
                    <Text style={styles.textName}>TEN CHU THE</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.textDate}>Hiệu lực đến</Text>
                      <View style={styles.viewDate}>
                        {renderCircle2}
                        <Text style={{ color: 'white', marginRight: 3 }}>/</Text>
                        {renderCircle2}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              : <View style={styles.containerBank}>
                <View style={styles.bank}>
                  <Text style={styles.textNumberBank}>{accountNumber}</Text>
                  <View style={styles.viewName}>
                    <Text style={styles.textName}>{nameAccount}</Text>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={styles.textDate}>Hiệu lực đến</Text>
                      <Text style={styles.textDate}>20/05</Text>
                    </View>
                  </View>
                </View>
              </View>}
            <View style={styles.containerInput}>
              <TextInput
                placeholder={'Tên chủ thẻ'}
                onChangeText={(text) => setNameAccount(text)}
              />
              <TextInput
                placeholder={'Số thẻ'}
                onChangeText={(text) => setAccountNumber(text)}
                keyboardType={'phone-pad'}
              />
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <TextInput
                    placeholder={'Ngày hết hạn'}
                    style={styles.styleTextInput}
                    onChangeText={(text) => setDate(text)}
                    keyboardType={'phone-pad'}
                  />
                  <TextInput
                    placeholder={'CCV'}
                    style={styles.styleTextInput}
                  />
                </View>
                <View style={styles.imageBank}>
                  <Image source={card} />
                </View>
              </View>
              <Button
                text={'Thanh toán'}
                styleView={styles.styleView}
                styleButton={[styles.styleButton, { backgroundColor: (accountNumber && nameAccount && date != '') ? '#029E9D' : '#F5F5F5' }]}
                styleText={{ color: (accountNumber && nameAccount && date != '') ? 'white' : '#8C8C8C' }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default InfoAccount