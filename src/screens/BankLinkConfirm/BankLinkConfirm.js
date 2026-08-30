import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { TextInput } from '~/common/index'
import PressScale from '~/design-system/PressScale'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandGradients, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

import {
  confirmLinkPayment,
  resetConfirmPaymentStatus,
  getWallet,
} from '~/store/actions'
import { getConfirmLinkStatus, getLinkPaymentReqId, getConfirmLinkErr } from '~/store/selector'
import Header from '~/common/Header/index'
import Status from '~/common/Status/Status'
import strings from '~/i18n'
import DialogInfo from '~/common/DialogInfo/index'

const BankLinkConfirm = (props) => {
  const dispatch = useDispatch()
  const { onGoBack } = props.route.params

  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [isErrorMessage, setIsErrorMessage] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const confirmStatus = useSelector(state => getConfirmLinkStatus(state))
  const requestId = useSelector(state => getLinkPaymentReqId(state))
  const confirmLinkErr = useSelector(state => getConfirmLinkErr(state))

  const onConfirmPress = () => {
    dispatch(confirmLinkPayment(otp, requestId))
  }

  useEffect(() => {
    if (confirmStatus === Status.SUCCESS) {
      setMessage('Liên kết tài khoản MB thành công')
      setIsErrorMessage(true)
    } else if (confirmStatus === Status.LOADING) {
      setIsErrorMessage(false)
      setShowDialog(true)
    } else if (confirmStatus === Status.ERROR) {
      setMessage(confirmLinkErr)
      setIsErrorMessage(true)
    } else {
      setShowDialog(false)
    }
  }, [confirmStatus])

  const reset = () => {
    dispatch(resetConfirmPaymentStatus())
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackgroundWash />
      <View style={styles.mainContainer}>
        <Header
          title={strings.bankLinkConfirm.title}
          leftAction={() => props.navigation.goBack()}
        />
        <View style={styles.content}>
          <TextInput
            containerStyle={styles.inputContainerStyle}
            placeholderTextColor={brandColors.mutedLight}
            value={otp}
            onChangeText={(value) => {
              setOtp(value)
            }}
            placeholder={strings.bankLinkConfirm.otp}
          />

          <PressScale style={styles.ctaButton} onPress={onConfirmPress}>
            <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
              <Text style={styles.ctaText}>{strings.bankLinkConfirm.confirm}</Text>
            </LinearGradient>
          </PressScale>
        </View>

        <DialogInfo
          isOpen={showDialog}
          isError={isErrorMessage}
          isOrder={false}
          isLoading={true}
          message={message}
          closeModal={() => {
            setShowDialog(false)
            if (confirmStatus === Status.SUCCESS) {
              dispatch(resetConfirmPaymentStatus())
              dispatch(getWallet())
              if (onGoBack) {
                onGoBack()
              }
              props.navigation.pop()
            } else if (confirmStatus === Status.ERROR) {
              reset()
            }
          }}
        />

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  content: {
    padding: s(16),
  },
  inputContainerStyle: {
    marginBottom: s(16),
    height: s(52),
    borderRadius: s(radiusScale.xl),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    backgroundColor: brandColors.surface,
    paddingHorizontal: s(4),
    ...brandShadow.soft,
  },
  ctaButton: {
    borderRadius: s(16),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  ctaGradient: {
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
})

export default BankLinkConfirm
