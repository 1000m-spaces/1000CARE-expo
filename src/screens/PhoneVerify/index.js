import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles'
import ErrorView from '~/common/ErrorView/index'
import { signUp, resetSignUp, resetConfirmSignUp } from '~/store/actions'
import { getSignUpStatus, getConfirmSignUpStatus, getSignUpError } from '~/store/selector'
import Status from '~/common/Status/Status'
import { NAVIGATION_CONFIRM } from '~/navigation/routes'
import AppBackground from '~/design-system/AppBackground'
import PremiumInput from '~/design-system/PremiumInput'
import PremiumButton from '~/design-system/PremiumButton'

const PhoneVerify = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const signUpError = useSelector(state => getSignUpError(state))

  const { title, message } = route.params
  const [phone, setPhone] = useState('')
  const signupStatus = useSelector(state => getSignUpStatus(state))
  const confirmSignupStatus = useSelector(state => getConfirmSignUpStatus(state))
  const signup = () => {
    dispatch(signUp(phone))
  }

  useEffect(() => {
    if (signupStatus === Status.SUCCESS) {
      navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'SIGNUP',
      })
      dispatch(resetSignUp())
    } else if (signupStatus === Status.ERROR) {
      setOpenErrorMessage(true)
    }
  }, [signupStatus])

  useEffect(() => {
    if (confirmSignupStatus === Status.SUCCESS) {
      navigation.pop()
      dispatch(resetSignUp())
      dispatch(resetConfirmSignUp())
    }
  }, [confirmSignupStatus])

  return (
    <AppBackground>
      <View style={styles.screen}>
        <Header
          title={title ? title : strings.phoneVerify.title}
          leftAction={() => navigation.pop()}
          iconLeft={back}
        />
        <View style={styles.containerConfirm}>
          <View style={styles.card}>
            <Text style={styles.title}>{title ? title : strings.phoneVerify.title}</Text>
            <Text style={styles.message}>{message ? message : strings.phoneVerify.message}</Text>
            <PremiumInput
              label="Số điện thoại"
              keyboardType="numeric"
              placeholder={strings.phoneVerify.placeHolderNumberPhone}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
            <PremiumButton
              text={strings.phoneVerify.confirm}
              style={styles.confirmButton}
              onPress={signup}
            />
          </View>
        </View>
        <ErrorView
          error={signUpError}
          isOpen={openErrorMessage}
          onClose={() => {
            setOpenErrorMessage(false)
            dispatch(resetSignUp())
          }}
        />
      </View>
    </AppBackground>
  )
}
export default PhoneVerify
