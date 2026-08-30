import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

import Header from '~/common/Header/index'
import { close } from '~/assets/constants'
import PressScale from '~/design-system/PressScale'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandGradients, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import BorrowInfo from './BorrowInfo/index'
import { NAVIGATION_CONFIRM, NAVIGATION_TO_MAIN_SCREEN } from '~/navigation/routes'
import BorrowStatus from './BorrowStatus/index'
import { useDispatch, useSelector } from 'react-redux'
import { getChargeFee, getLinkResourceError, getLinkResourceStatus, getLoanInfo, getLoanInfoError, getLoanInfoStatus } from '~/store/selector'
import { requestChargeFee, requestGetLoanInfo, requestLinkResource, resetLinkResource, resetLoan } from '~/store/actions'
import ErrorView from '~/common/ErrorView/index'
import Status from '~/common/Status/Status'

const LoanInfo = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const loanConfirmDetail = useSelector(state => getLoanInfo(state))
  const loanInfoStatus = useSelector(state => getLoanInfoStatus(state))
  const loanInfoError = useSelector(state => getLoanInfoError(state))
  const linkResourceError = useSelector(state => getLinkResourceError(state))
  const linkResourceStatus = useSelector(state => getLinkResourceStatus(state))
  const chargeFee = useSelector(state => getChargeFee(state))

  const type = route?.params?.type
  const title = route?.params?.title

  useEffect(() => {
    dispatch(requestGetLoanInfo())
    return () => {
      dispatch(resetLoan())
    }
  }, [])

  const goHomeScreen = () => {
    if (type === 'CREATE_LOAN_SUCCESS') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: NAVIGATION_TO_MAIN_SCREEN },
          ],
        }),
      )
    } else {
      navigation.pop()
    }
  }

  useEffect(() => {
    if (linkResourceError !== '') {
      setError(linkResourceError)
      setOpenErrorMessage(true)
    }
  }, [linkResourceError])

  useEffect(() => {
    if (loanInfoStatus === Status.ERROR) {
      setError(loanInfoError)
      setOpenErrorMessage(true)
    } else {
      dispatch(requestChargeFee(loanConfirmDetail?.Info?.limitAmount, 1))
    }
  }, [loanInfoStatus])

  useEffect(() => {
    if (linkResourceStatus === Status.SUCCESS) {
      dispatch(resetLinkResource())
      navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'LINK_RESOURCE',
        onGoBack: (linked) => {
          if (linked) {
            setMessage('Liên kết tài khoản thấu chi thành công')
            setOpenMessage(true)
          }
          dispatch(requestGetLoanInfo())
        },
      })
    }
  }, [linkResourceStatus])

  return(
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        showLeft={type !== 'CREATE_LOAN_SUCCESS'}
        title={title ? title : 'Giao dịch thành công'}
        leftAction={() => goHomeScreen()}
        iconLeft={close}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.inforContainer}>
          <BorrowStatus
            loanConfirmDetail={loanConfirmDetail}
          />
        </View>
        <View style={styles.inforContainer}>
          <BorrowInfo
            loanConfirmDetail={loanConfirmDetail}
            chargeFee={chargeFee}
          />
        </View>
      </ScrollView>

      {
        loanConfirmDetail?.Status === 'loan.none-link' && (
          <View style={styles.containerButton}>
            <PressScale style={styles.ctaButton} onPress={() => dispatch(requestLinkResource())}>
              <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
                <Text style={styles.ctaText}>Liên kết tài khoản thấu chi</Text>
              </LinearGradient>
            </PressScale>
          </View>
        )
      }
      <ErrorView
        error={error}
        isOpen={openErrorMessage}
        onClose={() => {
          setOpenErrorMessage(false)
          dispatch(resetLoan())
          dispatch(resetLinkResource())
        }}
      />
      <ErrorView
        error={message}
        isOpen={openMessage}
        onClose={() => {
          setOpenMessage(false)
        }}
      />
    </SafeAreaView>
  )
}
export default LoanInfo

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
    marginHorizontal: s(16),
    marginTop: s(12),
    padding: s(18),
    ...brandShadow.soft,
  },
  containerButton: {
    justifyContent: 'flex-end',
    paddingHorizontal: s(16),
    paddingVertical: s(16),
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