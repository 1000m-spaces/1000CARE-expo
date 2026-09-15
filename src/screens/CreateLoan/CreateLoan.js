import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { confirm, people, information, check } from '~/assets/constants'
import CreationProcess from '~/common/CreationProcess/CreationProcess'
import PressScale from '~/design-system/PressScale'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandGradients } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import StepOne from './StepOne/index'
import StepTwo from './StepTwo/index'
import StepThree from './StepThree/index'
import { showToast } from '~/utils/toast'
import { useDispatch, useSelector } from 'react-redux'
import { requestCheckLoan, requestCreateLoan, requestGetLoanInfo, requestGetLoanProposals, resetCreateLoan, resetLoan, resetLoanError } from '~/store/actions'
import ErrorView from '~/common/ErrorView/index'
import { getLoanCheckDetail, getLoanCheckError, getLoanCheckStatus, getLoanCreateError, getLoanCreateStatus, getLoanInfo, getLoanInfoStatus, getLoanProposalsDetail, getLoanProposalsError, getLoanProposalsStatus } from '~/store/selector'
import Status from '~/common/Status/Status'
import { NAVIGATION_CONFIRM, NAVIGATION_LOAN_INFO } from '~/navigation/routes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DialogInfo from '~/common/DialogInfo/index'

const CreateLoan = props => {
  const dispatch = useDispatch()
  const [currentStep, setCurrentStep] = useState(1)
  const [amountLoan, setAmountLoan] = useState(0)
  const [acceptedTerm, setAcceptedTerm] = useState(false)
  const [acceptedTerm1, setAcceptedTerm1] = useState(false)
  const [acceptedTerm2, setAcceptedTerm2] = useState(false)
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const [openErrorCheck, setOpenErrorCheck] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [errorCheck, setErrorCheck] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [listRelationShip, setListRelationShip] = useState(null)

  const loanCreateError = useSelector(state => getLoanCreateError(state))
  const loanCreateStatus = useSelector(state => getLoanCreateStatus(state))
  const loanProposalsDetail = useSelector(state => getLoanProposalsDetail(state))
  const loanProposalsStatus = useSelector(state => getLoanProposalsStatus(state))
  const loanProposalsError = useSelector(state => getLoanProposalsError(state))

  const loanCheckStatus = useSelector(state => getLoanCheckStatus(state))
  const loanCheckError = useSelector(state => getLoanCheckError(state))
  const loanCheckDetail = useSelector(state => getLoanCheckDetail(state))

  const loanInfoStatus = useSelector(state => getLoanInfoStatus(state))
  const loanInfo = useSelector(state => getLoanInfo(state))

  useEffect(() => {
    if (!loanInfo) {
      dispatch(requestGetLoanInfo())
    } else {
      if (!!loanInfo?.Status && loanInfo?.Status !== 'none-loan') {
        props.navigation.pop()
        dispatch(resetLoan())
        setOpenErrorCheck(false)
        setOpenErrorMessage(false)
        props.navigation.navigate(NAVIGATION_LOAN_INFO, {
          loanInfo: loanInfo,
          title: 'Thông tin vay',
        })
      } else {
        dispatch(requestGetLoanProposals())
      }
    }
  }, [])

  useEffect(() => {
    if (loanInfoStatus === Status.SUCCESS) {
      if (!!loanInfo?.Status && loanInfo?.Status !== 'none-loan') {
        props.navigation.pop()
        dispatch(resetLoan())
        setOpenErrorCheck(false)
        setOpenErrorMessage(false)
        props.navigation.navigate(NAVIGATION_LOAN_INFO, {
          loanInfo: loanInfo,
          title: 'Thông tin vay',
        })
      } else {
        dispatch(requestGetLoanProposals())
      }
    } else if (loanInfoStatus === Status.ERROR) {
      dispatch(requestGetLoanProposals())
    }
  }, [loanInfoStatus])

  useEffect(() => {
    if (loanProposalsStatus === Status.SUCCESS) {
      setShowDialog(false)
    } else if (loanProposalsStatus === Status.ERROR) {
      setShowDialog(false)
      setErrorCheck(loanProposalsError)
      setOpenErrorCheck(true)
    } else if (loanProposalsStatus === Status.LOADING) {
      setShowDialog(true)
    }
  }, [loanProposalsStatus])

  useEffect(() => {
    if (loanCheckStatus === Status.SUCCESS) {
      setShowDialog(false)
      console.log('loanCheckDetail', loanCheckDetail)
      setCurrentStep(2)
    } else if (loanCheckStatus === Status.ERROR) {
      setShowDialog(false)
      setErrorCheck(loanCheckError)
      setOpenErrorCheck(true)
    } else if (loanCheckStatus === Status.LOADING) {
      setShowDialog(true)
    }
  }, [loanCheckStatus])

  useEffect(() => {
    if (loanCreateError !== '') {
      setOpenErrorMessage(true)
      console.log('loanCreateError', loanCreateError)
    }
  }, [loanCreateError])

  useEffect(() => {
    if (loanCreateStatus === Status.SUCCESS) {
      setShowDialog(false)
      dispatch(resetCreateLoan())
      props.navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'LOAN',
      })
    } else if (loanCreateStatus === Status.ERROR) {
      setShowDialog(false)
    } else if (loanCreateStatus === Status.LOADING) {
      setShowDialog(true)
    }
  }, [loanCreateStatus])

  useEffect(() => {
    console.log('listRelationShip', listRelationShip)
  }, [listRelationShip])

  const getComponentByStep = () => {
    if (currentStep === 2) {
      return (
        <StepTwo
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          listRelationShip={listRelationShip}
          setListRelationShip={setListRelationShip}
        />
      )
    } else if (currentStep === 3) {
      return (
        <StepThree
          amountLoan={amountLoan}
          setAmountLoan={setAmountLoan}
          loanProposalsDetail={loanProposalsDetail}
          acceptedTerm1={acceptedTerm1}
          acceptedTerm2={acceptedTerm2}
          setAcceptedTerm1={setAcceptedTerm1}
          setAcceptedTerm2={setAcceptedTerm2}
        />
      )
    } else {
      return (
        <StepOne
          loanProposalsDetail={loanProposalsDetail}
          acceptedTerm={acceptedTerm}
          setAcceptedTerm={setAcceptedTerm}
        />
      )
    }
  }

  const checkStepOne = () => {
    return acceptedTerm
  }

  const validatePhone = (phone) => {
    if (!phone)
      return false
    if (phone.startsWith('+84')) {
      phone = phone.replace('+84', '0')
    }
    return phone.startsWith('0') && phone.length >= 10 && phone.length <= 11
  }

  const validateEmail = (email) => {
    if (!email)
      return false
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  const checkStepTwo = () => {
    console.log(listRelationShip, userInfo)
    if (userInfo && (!userInfo.name || !userInfo.identityCardNumber || !validatePhone(userInfo.phone) || !validateEmail(userInfo.email))) {
      return false
    }
    if (listRelationShip && listRelationShip.length > 0) {
      if (listRelationShip.find(lr => !lr.name || !lr.identityCardNumber || !lr.type)) {
        return false
      }
    }
    return true
  }

  const checkStepThree = () => {
    return amountLoan >= Number(loanProposalsDetail?.minLimit) && amountLoan <= Number(loanProposalsDetail?.maxLimit)
      && acceptedTerm1 && acceptedTerm2
  }

  const nextStep = () => {
    if (currentStep === 1) {
      if (checkStepOne()) {
        dispatch(requestCheckLoan())
      } else {
        showToast('Vui lòng chấp nhận điều khoản vay.')
      }
    } else if (currentStep === 2) {
      if (checkStepTwo()) {
        setAmountLoan(Number(loanProposalsDetail?.maxLimit || 0))
        setCurrentStep(3)
      } else {
        showToast('Vui lòng điền thông tin.')
      }
    } else if (currentStep === 3) {
      if (checkStepThree()) {
        const data = {
          loan_amount: amountLoan,
          loan_term: loanProposalsDetail?.loanTerm,
          relationship_infos: [],
        }
        if (userInfo && userInfo.name !== '') {
          data.relationship_infos.push(userInfo)
        }
        if (listRelationShip && listRelationShip.length > 0 && listRelationShip[0].name !== '') {
          data.relationship_infos.push(...listRelationShip)
        }
        dispatch(requestCreateLoan(data))
      } else {
        showToast('Vui lòng kiểm tra thông tin và chấp nhận điều khoản vay.')
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        title={strings.CreateLoan.title}
        leftAction={() => {
          if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
          } else {
            dispatch(resetLoan())
            setOpenErrorCheck(false)
            setOpenErrorMessage(false)
            props.navigation.pop()
          }
        }}
        iconLeft={back}
      />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.containerProcess}>
          <CreationProcess
            imageStep1={information}
            textStep1={'Thông tin khoản vay'}
            active1={currentStep === 1}
            success1={currentStep > 1}
            imageStep2={people}
            textStep2={'Bổ sung thông tin'}
            active2={currentStep === 2}
            success2={currentStep > 2}
            imageStep4={confirm}
            textStep4={'Đăng ký và Xác nhận thông tin'}
            active4={currentStep === 3}
            success4={currentStep > 3}
            imageSuccess={check}
          />
        </View>
        <View>
          {getComponentByStep()}
        </View>
      </KeyboardAwareScrollView>
      <View style={styles.containerButton}>
        <PressScale style={styles.ctaButton} onPress={() => nextStep()}>
          <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Tiếp tục</Text>
          </LinearGradient>
        </PressScale>
      </View>
      <DialogInfo
        isOpen={showDialog}
        isError={false}
        isOrder={false}
        isLoading={true}
        message={''}
        closeModal={() => setShowDialog(false)}
      />
      <ErrorView
        error={loanCreateError}
        isOpen={openErrorMessage}
        onClose={() => {
          setOpenErrorMessage(false)
          dispatch(resetLoanError())
        }}
      />
      <ErrorView
        error={errorCheck}
        isOpen={openErrorCheck}
        onClose={() => {
          setOpenErrorCheck(false)
        }}
      />
    </SafeAreaView>
  )
}
export default CreateLoan

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  containerProcess: {
    marginTop: s(6),
    height: s(100),
  },
  containerButton: {
    justifyContent: 'flex-end',
    paddingHorizontal: s(16),
    paddingBottom: s(16),
  },
  ctaButton: {
    borderRadius: s(16),
    overflow: 'hidden',
    ...brandShadow.button,
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