import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import PressScale from '~/design-system/PressScale'
import LiquidGlassView from '~/design-system/LiquidGlassView'
import { LinearGradient } from 'expo-linear-gradient'
import strings from '~/i18n'
import { useDispatch, useSelector } from 'react-redux'
import ErrorView from '~/common/ErrorView/index'
import { Icon } from '~/common/index'
import { signUp, resetSignUp, resetConfirmSignUp } from '~/store/actions'
import { getSignUpStatus, getConfirmSignUpStatus, getSignUpError } from '~/store/selector'
import Status from '~/common/Status/Status'
import { NAVIGATION_CONFIRM } from '~/navigation/routes'
import AppBackground from '~/design-system/AppBackground'
import { brandColors, brandGradients } from '~/design-system/tokens'
import { fs, s } from '~/utils/responsive'

// Cùng bố cục tối giản với LoginPhone/RegisterScreen — back button nổi,
// input dạng pill, nút CTA gradient (thay Header bar + PremiumInput/Button cũ).
const PhoneVerify = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const signUpError = useSelector(state => getSignUpError(state))

  const { title, message } = route.params || {}
  const [phone, setPhone] = useState(route.params?.phone || '')
  const signupStatus = useSelector(state => getSignUpStatus(state))
  const confirmSignupStatus = useSelector(state => getConfirmSignUpStatus(state))
  const signup = () => {
    if (!phone) return
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
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <LiquidGlassView intensity="regular" style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </LiquidGlassView>
        </PressScale>

        <View style={styles.content}>
          <Text style={styles.title}>{title || strings.phoneVerify.title}</Text>
          <Text style={styles.message}>{message || strings.phoneVerify.message}</Text>

          <Text style={styles.inputLabel}>Số điện thoại</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="smartphone" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={phone}
              keyboardType="numeric"
              onChangeText={setPhone}
              placeholder={strings.phoneVerify.placeHolderNumberPhone}
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <PressScale
            onPress={signup}
            disabled={!phone}
            style={styles.confirmButton}
          >
            <LinearGradient
              colors={phone ? brandGradients.primary : [brandColors.border, brandColors.border]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>{strings.phoneVerify.confirm}</Text>
            </LinearGradient>
          </PressScale>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backButton: {
    marginTop: s(58),
    marginLeft: s(16),
  },
  backButtonGlass: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: s(24),
    paddingTop: s(24),
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(18),
    lineHeight: fs(24),
    fontWeight: '800',
  },
  message: {
    marginTop: s(8),
    marginBottom: s(24),
    color: brandColors.muted,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: fs(13),
    fontWeight: '700',
    color: brandColors.textDark,
    marginBottom: s(8),
  },
  inputOuter: {
    width: '100%',
    height: s(52),
    borderRadius: s(16),
    backgroundColor: '#F4F9F9',
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingHorizontal: s(16),
    marginBottom: s(24),
  },
  input: {
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '600',
    paddingVertical: 0,
  },
  confirmButton: {
    width: '100%',
    borderRadius: s(16),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  buttonGradient: {
    height: s(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: brandColors.surface,
    fontWeight: '700',
    fontSize: fs(15),
  },
})
