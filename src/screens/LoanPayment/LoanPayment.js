import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import PressScale from '~/design-system/PressScale'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandGradients, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import ConfirmLoanPayment from './ConfirmLoanPayment/index'
import RegisterLoanPayment from './RegisterLoanPayment/index'
import { useDispatch, useSelector } from 'react-redux'
import { getChargeFee, getInfoAccount, getLoanInfo, getPreCloseError, getPreCloseStatus } from '~/store/selector'
import Status from '~/common/Status/Status'
import { NAVIGATION_CONFIRM } from '~/navigation/routes'
import { requestChargeFee, requestGetCustomerInfo, requestGetLoanInfo, requestPreClose, resetPreClose } from '~/store/actions'
import ErrorView from '~/common/ErrorView/index'

const LoanRepayment = props => {
  const title = props.route?.params?.title
  const onGoBack = props.route?.params?.onGoBack
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [showError, setShowError] = useState(false)
  const preCloseStatus = useSelector(state => getPreCloseStatus(state))
  const preCloseError = useSelector(state => getPreCloseError(state))
  const loanConfirmDetail = useSelector(state => getLoanInfo(state))
  const infoAccount = useSelector(state => getInfoAccount(state))
  const chargeFee = useSelector(state => getChargeFee(state))

  useEffect(() => {
    dispatch(requestGetLoanInfo())
    dispatch(requestGetCustomerInfo())
    return () => {
      dispatch(resetPreClose())
    }
  }, []) 

  useEffect(() => {
    if (preCloseStatus === Status.SUCCESS) {
      dispatch(resetPreClose())
      props.navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'PRE_CLOSE',
        paidAmount: -1 * (Number(loanConfirmDetail?.Info?.loanAmount) + Number(loanConfirmDetail?.Info?.totalOverdueAmount || 0) + Number(loanConfirmDetail?.Info?.interestAmount)),
        loanId: loanConfirmDetail?.Info?.loanId,
        accountId: infoAccount?.accountNumber,
        onGoBack,
      })
    } else if (preCloseStatus === Status.ERROR) {
      setShowError(true)
    }
  }, [preCloseStatus])

  useEffect(() => {
    if (loanConfirmDetail) {
      dispatch(requestChargeFee(loanConfirmDetail?.Info?.limitAmount, 3))
    }
  }, [loanConfirmDetail])

  const getComponentByStep = () => {
    if (currentStep === 1) {
      return (
        <RegisterLoanPayment
          infoAccount={infoAccount}
          loanConfirmDetail={loanConfirmDetail}
          chargeFee={chargeFee}
        />
      )
    } else {
      return (
        <ConfirmLoanPayment
          infoAccount={infoAccount}
          loanConfirmDetail={loanConfirmDetail}
          chargeFee={chargeFee}
        />
      )
    }
  }

  const onNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
    } else {
      dispatch(requestPreClose())
    }
  }

  return(
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        title={title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.inforContainer}>
          {getComponentByStep()}
        </View>
      </ScrollView>

      <View style={styles.containerButton}>
        <PressScale style={styles.ctaButton} onPress={() => onNext()}>
          <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Tiếp tục</Text>
          </LinearGradient>
        </PressScale>
      </View>
      <ErrorView
        error={preCloseError}
        isOpen={showError}
        onClose={() => setShowError(false)}
      />
    </SafeAreaView>
  )
}
export default LoanRepayment

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  inforContainer: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    margin: s(16),
    padding: s(16),
    ...brandShadow.soft,
  },
  containerButton: {
    justifyContent: 'flex-end',
    paddingHorizontal: s(16),
    paddingBottom: s(16),
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