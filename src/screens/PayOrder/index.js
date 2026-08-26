import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import PressScale from '~/design-system/PressScale'

import { back } from '~/assets/constants'
import PaymentInformation from './PaymentInformation'
import SectionInformation from './SectionInformation'
import InformationItem from './InformationItem'
import Price from './Price'
import strings from '~/i18n'
import Header from '~/common/Header/index'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoAccount, getInfoAccountStatus, getLoanInfo, getPaymentAccount, getWalletStatus } from '~/store/selector'
import Status from '~/common/Status/Status'
import DialogInfo from '~/common/DialogInfo/index'
import { NAVIGATION_PAYMENT_BY_BANK_SCREEN } from '~/navigation/routes'
import { getInfoWallet, getWallet, requestGetLoanInfo } from '~/store/actions'
import { Text } from '~/common/index'
import { formatMoney } from '~/utils/format'

const PayOrder = ({ navigation, route }) => {
  const order = route?.params?.order || []
  const onGoBack = route?.params?.onGoBack
  const dispatch = useDispatch()
  const [isDialogError, setIsDialogError] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const infoAccount = useSelector(state => getInfoAccount(state))
  const infoAccountStatus = useSelector(state => getInfoAccountStatus(state))
  const paymentAccount = useSelector(state => getPaymentAccount(state))
  const walletStatus = useSelector(state => getWalletStatus(state))

  const loanInfo = useSelector(state => getLoanInfo(state))

  const onPaid = (paymentCode, maxAmount = 0) => {
    console.log('onPaid', maxAmount, order?.total)
    if (maxAmount < order?.total) {
      setErrorMessage('Không đủ số dư để thanh toán')
      setIsDialogError(true)
      setShowDialog(true)
      return
    }

    navigation.navigate(NAVIGATION_PAYMENT_BY_BANK_SCREEN, {
      listOrders: [order],
      paymentCode,
      maxAmount,
      onGoBack,
    })
  }

  const getTotal = () => {
    return order?.total
  }

  useEffect(() => {
    dispatch(getWallet(1, 500))
    dispatch(requestGetLoanInfo())
  }, [])

  useEffect(() => {
    if (infoAccountStatus === Status.LOADING) {
      setIsDialogError(false)
      setShowDialog(true)
    } else {
      setShowDialog(false)
    }
  }, [infoAccountStatus])

  useEffect(() => {
    if (walletStatus === Status.LOADING) {
      setErrorMessage('')
      setIsDialogError(false)
      setShowDialog(true)
    } else if (walletStatus === Status.ERROR) {
      setShowDialog(false)
    } else if (walletStatus === Status.SUCCESS) {
      if (paymentAccount && paymentAccount.length > 0) {
        dispatch(getInfoWallet())
      } else {
        setShowDialog(false)
      }
    }
  }, [walletStatus])

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <View
        style={styles.mainContainer}
      >
        <Header
          title={strings.paymentByBank.title}
          leftAction={() => {
            if (onGoBack) {
              onGoBack()
            }
            navigation.pop()
          }}
          iconLeft={back}
        />
        <View style={styles.listCheckoutContainer}>
          <PaymentInformation
            total={getTotal()}
          />
          <SectionInformation>
            <InformationItem
              label="Mã đơn hàng"
              value={order?.order_id}
            />
            <InformationItem
              label="Số tiền thanh toán"
              value={
                <Price
                  price={order?.total}
                  size={14}
                />
              }
            />
          </SectionInformation>
          <View style={styles.containerProfile}>
            <Text style={[styles.titleSection]}>{'Nguồn tiền thanh toán'}</Text>
            <PressScale
              onPress={() => {
                onPaid('MBW', infoAccount.balanceWallet)
              }}
              style={[styles.buttonSelectAccount]}
            >
              <View>
                <Text style={[styles.numberAccount]}>{strings.bankAccount.ewalletTitle}</Text>
                {
                  infoAccount?.mobile ? (
                    <Text style={[styles.numberMoney]}>{formatMoney(infoAccount.balanceWallet ? infoAccount.balanceWallet : 0, { unit: '' })}<Text style={styles.textUnit}> {'VNĐ'}</Text></Text>
                  ) : (
                    <Text style={[styles.textUnit]}>{'Bạn chưa liên kết tài khoản MB'}</Text>
                  )
                }
              </View>
            </PressScale>
            <PressScale
              onPress={() => {
                if (loanInfo?.Status === 'loan.link') {
                  onPaid('MBL', loanInfo?.Info?.limitAmount)
                }
              }}
              style={styles.buttonSelectAccount}
            >
              <View>
                <Text style={[styles.numberAccount]}>Hạn mức thấu chi còn lại</Text>
                {
                  loanInfo?.Status === 'loan.link' ? (
                    <Text style={[styles.numberMoney]}>{formatMoney((Number(loanInfo?.Info?.limitAmount) || 0) + (Number(loanInfo?.Info?.loanAmount) || 0), { unit: '' })}<Text style={styles.textUnit}>{'VNĐ'}</Text></Text>
                  ) : (
                    <Text style={[styles.textUnit]}>{'Bạn chưa liên kết tài khoản thấu chi'}</Text>
                  )
                }
              </View>
            </PressScale>
          </View>
        </View>
        <DialogInfo
          isOpen={showDialog}
          isError={isDialogError}
          isOrder={false}
          isLoading={true}
          message={errorMessage}
          closeModal={() => {
            setShowDialog(false)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default PayOrder
