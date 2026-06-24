import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { Button, TextInput } from '~/common/index'
import { useDispatch, useSelector } from 'react-redux'

import styles from './styles'
import ErrorView from '~/common/ErrorView/index'
import { requestCheckReferral, requestApplyReferral, requestResetApplyReferral } from '~/store/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getApplyReferralError, getApplyReferralStatus, getCheckReferralData, getCheckReferralStatus } from '~/store/selector'
import Status from '~/common/Status/Status'
import Colors from '~/common/Colors/Colors'

const ReferralScreen = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const [existReferral, setExistReferral] = useState(true)
  const [message, setMessage] = useState('Vui lòng nhập thông tin người giới thiệu vào hệ thống')
  const checkReferralStatus = useSelector(state => getCheckReferralStatus(state))
  const checkReferralDetail = useSelector(state => getCheckReferralData(state))
  const applyReferralStatus = useSelector(state => getApplyReferralStatus(state))
  const applyReferralError = useSelector(state => getApplyReferralError(state))

  const [phone, setPhone] = useState('')

  useEffect(() => {
    dispatch(requestCheckReferral())
  }, [])

  const submit = () => {
    dispatch(requestApplyReferral(phone))
  }

  useEffect(() => {
    if (checkReferralStatus === Status.SUCCESS) {
      if (checkReferralDetail?.ref_code) {
        setExistReferral(true)
        setMessage('Thông tin người giới thiệu vào hệ thống có số điện thoại')
      } else {
        setExistReferral(false)
        setMessage('Vui lòng nhập thông tin người giới thiệu vào hệ thống')
      }
    } else if (checkReferralStatus === Status.ERROR) {
      setExistReferral(false)
      setMessage('Vui lòng nhập thông tin người giới thiệu vào hệ thống')
    }
  }, [checkReferralStatus])

  useEffect(() => {
    if (applyReferralStatus === Status.SUCCESS) {
      setOpenErrorMessage(false)
      dispatch(requestCheckReferral())
    } else if (applyReferralStatus === Status.ERROR) {
      setOpenErrorMessage(true)
    }
  }, [applyReferralStatus])

  return (
    <SafeAreaView
      style={styles.container}
    >
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
      >
        <Header
          title={'Người giới thiệu'}
          leftAction={() => navigation.pop()}
          iconLeft={back}
        />
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>REFERRAL</Text>
          <Text style={styles.heroTitle}>Người giới thiệu</Text>
          <Text style={styles.heroSubtitle}>Liên kết tài khoản với người giới thiệu để hoàn tất hồ sơ cửa hàng.</Text>
        </View>
        <View style={styles.containerConfirm}>
          <Text style={styles.cardEyebrow}>{existReferral ? 'ĐÃ LIÊN KẾT' : 'CHƯA CÓ THÔNG TIN'}</Text>
          <Text style={styles.cardTitle}>{existReferral ? 'Mã giới thiệu hiện tại' : 'Nhập số điện thoại người giới thiệu'}</Text>
          <Text style={styles.message}>{message}</Text>
          {
            !existReferral ? (<>
              <View
                style={styles.phoneContainer}
              >
                <View
                  style={[styles.formItem]}
                >
                  <TextInput
                    inputContainerStyle={styles.inputContainerStyle}
                    labelStyle={styles.labelStyle}
                    keyboardType='numeric'
                    label={strings.phoneVerify.placeHolderNumberPhone}
                    value={phone}
                    onChangeText={text => setPhone(text)}
                  />
                </View>
              </View>
              <Button
                text={'Xác nhận'}
                styleButton={styles.confirmButton}
                styleText={styles.confirmButtonText}
                styleView={styles.buttonConfirm}
                onPressEvent={submit}
              />
            </>)
              :
              (
                <Text style={styles.phoneNumber}>{checkReferralDetail?.ref_code}</Text>
              )
          }

        </View>
        <ErrorView
          error={applyReferralError}
          isOpen={openErrorMessage}
          onClose={() => {
            setOpenErrorMessage(false)
            dispatch(requestResetApplyReferral())
          }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
export default ReferralScreen
