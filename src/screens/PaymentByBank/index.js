import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

import { back } from '~/assets/constants'
import PaymentInformation from './PaymentInformation'
import SectionInformation from './SectionInformation'
import InformationItem from './InformationItem'
import Price from './Price'
import BottomButon from '~/common/BottomButon/index'
import strings from '~/i18n'
import Header from '~/common/Header/index'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { requestPaymentOrderBybank, resetPaymentOrderByBank } from '~/store/actions'
import { getOrderError, getStatusRequestPayment } from '~/store/selector'
import Status from '~/common/Status/Status'
import { NAVIGATION_CONFIRM } from '~/navigation/routes'
import DialogInfo from '~/common/DialogInfo/index'
import BackgroundWash from '~/design-system/BackgroundWash'

const PaymentByBank = ({ navigation, route }) => {
  const listOrders = route?.params?.listOrders || []
  const maxAmount = route?.params?.maxAmount || 0
  const paymentCode = route?.params?.paymentCode || 'MBW'
  const onGoBack = route?.params?.onGoBack
  const dispatch = useDispatch()
  const errMessage = useSelector(state => getOrderError(state))
  const statusRequestPayment = useSelector(state => getStatusRequestPayment(state))
  const [isDialogError, setIsDialogError] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const onPaid = () => {
    setShowDialog(true)
    dispatch(requestPaymentOrderBybank(listOrders.map(o => o.order_id), listOrders[0]?.distributor?.id, paymentCode))
  }

  useEffect(() => {
    dispatch(resetPaymentOrderByBank())
  }, [])

  const getTotal = () => {
    let total = 0
    listOrders.forEach(o => {
      total += o?.total
    })
    return total
  }

  useEffect(() => {
    if (statusRequestPayment === Status.SUCCESS) {
      setShowDialog(false)
      setIsDialogError(false)
      dispatch(resetPaymentOrderByBank())
      navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'PAYMENT_ORDER',
        onGoBack,
      })
    } else if (statusRequestPayment === Status.ERROR) {
      setIsDialogError(true)
    } else if (statusRequestPayment === Status.LOADING) {
      setIsDialogError(false)
      setShowDialog(true)
    } else {
      setShowDialog(false)
    }
  }, [statusRequestPayment])

  return (
    <SafeAreaView
      style={{ flex: 1 }}
    >
      <BackgroundWash />
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
            max={maxAmount}
          />

          <SectionInformation>
            <InformationItem
              label="Dịch vụ"
              value="Thanh toán"
            />
            <InformationItem
              label="Phí giao dịch"
              value="Miễn phí"
            />
          </SectionInformation>
          <FlatList
            data={listOrders}
            scrollEnabled={true}
            style={styles.mt12}
            renderItem={({ item: order }) => {
              return (
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
              )
            }}
            ItemSeparatorComponent={() => {
              return (
                <View style={styles.itemSeparator} />
              )
            }}
            keyExtractor={(_, idx) => {
              return idx.toString()
            }}
          />
        </View>
        <BottomButon
          label={strings.paymentByBank.paid}
          onPress={() => {
            onPaid()
          }}
        />
        <DialogInfo
          isOpen={showDialog}
          isError={isDialogError}
          isOrder={false}
          isLoading={true}
          message={errMessage}
          closeModal={() => {
            setShowDialog(false)
            dispatch(resetPaymentOrderByBank())
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default PaymentByBank
