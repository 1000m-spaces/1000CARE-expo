import React, { useCallback } from 'react'
import { CommonActions } from '@react-navigation/native'
import { SafeAreaView, ScrollView, View } from 'react-native'
import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getCheckoutData } from '~/store/selector'
import { Button, SVG, Text } from '~/common/index'
import { DIMENS } from '~/constants/index'
import Colors from '~/common/Colors/Colors'
import { NAVIGATION_TO_HOME_SCREEN, NAVIGATION_TO_MAIN_SCREEN, NAVIGATION_WALLET } from '~/navigation/routes'
import { getInfo } from '~/store/actions'

const OrderItem = ({ isError, distributor, order, error }) => {
  return (
    <View
      style={styles.orderItemContainer}
    >
      <View
        style={styles.distributorNameContainer}
      >
        <Text
          color={Colors.textColor2}
          style={styles.distributorName}
        >
          {`Nhà cung cấp: ${distributor?.name}`}
        </Text>
        <View
          style={styles.checkoutStatusContainer}
        >
          <SVG
            width={24}
            height={24}
            name={isError ? 'order_failed' : 'order_success'}
            style={{ marginRight: 6 }}
          />
          <Text
            style={styles.checkoutStatus}
            color={isError ? Colors.priceColor : '#28B446'}
          >
            {isError ? 'Thất bại' : 'Thành công'}
          </Text>
        </View>
      </View>
      <View
        style={styles.messageContainer}
      >
        {isError ? (
          <Text
            color={Colors.textColor3}
            style={styles.errorMessage}
          >
            {error?.msg}
          </Text>
        ) : (
          <Text
            color={Colors.textColor3}
            style={styles.errorMessage}
          >
            {'Mã đơn hàng: '}
            <Text
              color={Colors.textColor3}
              style={[styles.errorMessage, { fontWeight: '600' }]}
            >
              {order.order_id}
            </Text>
          </Text>
        )
        }
      </View>
    </View>
  )
}

const CheckoutResult = (props) => {
  const checkoutData = useSelector(state => getCheckoutData(state))
  const dispatch = useDispatch()

  const goHomeScreen = () => {
    dispatch(getInfo())
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: NAVIGATION_TO_MAIN_SCREEN },
        ],
      }),
    )
  }

  const goTopupScreen = () => {
    dispatch(getInfo())
    props.navigation.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [
          { name: NAVIGATION_TO_MAIN_SCREEN },
          {
            name: NAVIGATION_WALLET,
            params: { type: 'topup' },
          },
        ],
      }),
    )
  }

  const isPaymentPointError = useCallback(() => {
    const errors = Array.isArray(checkoutData?.errors) ? checkoutData.errors : []
    if (errors.length === 0) {
      return false
    }
    const error = errors.find(e => {
      return e?.payment_method?.code === 'NEOW'
    })

    return !error
  }, [checkoutData])

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <View style={styles.mainContainer}>
        <View>
          <SVG
            width={DIMENS.common.WINDOW_WIDTH}
            height={DIMENS.common.WINDOW_WIDTH * 200 / 375}
            name={'background_gradient'}
          />
          <SVG
            width={64}
            height={64}
            name={'check'}
            style={styles.checkIcon}
          />
          <Text
            style={styles.thanksMessage}
            color={Colors.white}
          >Cảm ơn bạn</Text>
          <Text
            color={Colors.white}
            style={styles.orderMessage}
          >Đã đặt hàng</Text>
        </View>
        <ScrollView>
          {
            (Array.isArray(checkoutData?.errors) ? checkoutData.errors : []).map((error, idx) => {
              return (
                <OrderItem
                  key={idx}
                  isError={true}
                  error={error}
                  distributor={error?.distributor}
                />
              )
            })
          }
          {
            (Array.isArray(checkoutData?.orders) ? checkoutData.orders : []).map((order, idx) => {
              return (
                <OrderItem
                  key={idx}
                  isError={false}
                  order={order}
                  distributor={order?.distributor}
                />
              )
            })
          }
        </ScrollView>
      </View>
      <View style={styles.containerButton}>
        {
          isPaymentPointError() && (
            <Button
              text={'Về giỏ hàng'}
              styleButton={[
                styles.styleButton,
                {
                  backgroundColor: Colors.systemColor2,
                },
              ]}
              styleView={styles.styleView}
              onPressEvent={() => {
                dispatch(getInfo())
                props.navigation.pop(2)
              }}
            />
          )
        }
        <Button
          text={'Đóng'}
          styleButton={styles.styleButton}
          styleView={styles.styleView}
          onPressEvent={() => {
            if (checkoutData.errors && checkoutData.errors.length > 0 && !isPaymentPointError()) {
              goTopupScreen()
            } else if (isPaymentPointError()) {
              dispatch(getInfo())
              props.navigation.navigate(
                NAVIGATION_TO_MAIN_SCREEN,
                {
                  screen: NAVIGATION_TO_MAIN_SCREEN,
                  params: { screen: NAVIGATION_TO_HOME_SCREEN },
                },
              )
            } else {
              goHomeScreen()
            }
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default CheckoutResult