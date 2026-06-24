import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { CommonActions } from '@react-navigation/native'

import DetailOrderBox from './DetailOrderBox'
import TitleDetailOrderBox from './TitleDetailOrderBox'
import ContentDetailOrderBox from './ContentDetailOrderBox'
import InfoDetailOrder from '~/common/InfoDetailOrder/index'
import InfoDeliveryDetailOrder from './InfoDeliveryDetailOrder'
import Header from '~/common/Header/index'
import { exception, shopping_cart_black, solution, dollar } from '~/assets/constants'
import { NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN, NAVIGATION_ORDER_DETAIL_DELIVERY, NAVIGATION_ORDER_PRODUCTS, NAVIGATION_PAYMENT_BY_NEOMED_SCREEN, NAVIGATION_PAY_ORDER, NAVIGATION_TO_CART_SCREEN, NAVIGATION_TO_MAIN_SCREEN } from '~/navigation/routes'
import { formatMoney } from '~/utils/format'
import { addOptionInfo, requestBuyAgain, requestGetOrderDetails, resetBuyAgain, resetStatusAddCart, resetStatusCartInfo, addMultiProductToCart } from '~/store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { getListProductBuyAgian, getOrderDetails } from '~/store/orders/OrderSelectors'
import BottomButon from '~/common/BottomButon/index'
import Colors from '~/common/Colors/Colors'
import { getAddCartInfoStatus, getAddItemStatus } from '~/store/selector'
import Status from '~/common/Status/Status'
import DialogInfo from '~/common/DialogInfo/index'
import { brandColors } from '~/design-system/tokens'

const orderStatuses = [
  'Không xác định',
  'Chờ xử lý',
  'Đã xác minh',
  'Đã nhận',
  'Hoàn thành',
  'Hoàn tiền',
  'Quá hạn',
  'Đã thanh toán',
  'Chờ xác nhận',
  'Chờ xác minh',
  'Đang giao hàng',
  'Đã giao hàng',
  'Đã hủy',
  'Đang xử lý',
  'Thất bại',
  'Đang đóng gói',
  'Đã trả hàng',
  'Nhận hàng lần đầu',
  'Nhận hàng lần 2',
  'Nhận hàng lần 3',
  'Gưi hàng lần đầu',
  'Gưi hàng lần 2',
  'Gưi hàng lần 3',
  'Đang trả hàng',
]

const orderPaymentMethod = {
  NEOW: 'Điểm mua hàng',
  COD: 'COD',
  MBW: 'Ngân hàng MB',
  NEOWP: 'Điểm',
  Point: 'Điểm tích lũy',
}

const OrderDetailScreen = ({ navigation, route }) => {
  const { order: orgOrder, goBack, isBuyAgain } = route.params
  const order = useSelector((state) => getOrderDetails(state))
  const listProductBuyAgian = useSelector((state) => getListProductBuyAgian(state))
  const addItemStatus = useSelector((state) => getAddItemStatus(state))
  const dispatch = useDispatch()
  const [showDialog, setShowDialog] = useState(false)
  const addCartInfoStatus = useSelector(state => getAddCartInfoStatus(state))

  useEffect(() => {
    if (orgOrder) {
      dispatch(requestGetOrderDetails(orgOrder.order_id))
      if (isBuyAgain === true) {
        dispatch(requestBuyAgain(orgOrder?.order_id))
      }
    }
  }, [orgOrder])

  useEffect(() => {
    if (listProductBuyAgian && listProductBuyAgian.length > 0) {
      setShowDialog(true)
      let disId = 0
      const body = listProductBuyAgian.map(product => {
        disId = product?.item.distributor_id
        return {
          product_id: product?.item.product_id,
          qty: product?.item.stock_quantity,
        }
      })

      dispatch(addMultiProductToCart(body, disId))
    }
  }, [listProductBuyAgian])

  const goHomeScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 2,
        routes: [
          { name: NAVIGATION_TO_MAIN_SCREEN },
          { name: NAVIGATION_TO_CART_SCREEN },
        ],
      }),
    )
  }
  useEffect(() => {
    switch (addCartInfoStatus) {
      case Status.LOADING:
        break
      case Status.SUCCESS:
        dispatch(resetStatusCartInfo())
        dispatch(resetBuyAgain())
        dispatch(resetStatusAddCart())
        goHomeScreen()
        break
      case Status.ERROR:
        break
    }
  }, [addCartInfoStatus])

  useEffect(() => {
    if (addItemStatus === Status.SUCCESS && listProductBuyAgian.length > 0) {
      dispatch(addOptionInfo(order.address.id || '', 1, order.distributor.id))
      setShowDialog(false)
    }
  }, [addItemStatus])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: brandColors.background,
      }}
    >
      <Header
        title={'Chi tiết đơn hàng'}
        leftAction={() => {
          if (goBack) {
            goBack()
          }
          navigation.goBack()
        }}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <DetailOrderBox>
          <TitleDetailOrderBox
            urlIcon={exception}
            title="Thông tin cơ bản"
            route={NAVIGATION_ORDER_PRODUCTS}
            navigation={navigation}
            params={{
              order: order,
            }}
          />
          <ContentDetailOrderBox>
            <InfoDetailOrder
              label="Mã đơn hàng:"
              value={order?.order_id}
            />
            <InfoDetailOrder
              label="Ngày mua:"
              value={order?.created_time}
            />
            <InfoDetailOrder
              label="Trạng thái:"
              value={orderStatuses[order?.order_status]}
              styleValue={{ color: '#FF9900' }}
            />
            <InfoDetailOrder
              label="Nhà phân phối:"
              value={order?.distributor?.name}
            />
          </ContentDetailOrderBox>
        </DetailOrderBox>

        <DetailOrderBox>
          <TitleDetailOrderBox
            urlIcon={shopping_cart_black}
            title="Theo dõi đơn hàng"
            route={NAVIGATION_ORDER_DETAIL_DELIVERY}
            navigation={navigation}
            params={{
              orderId: order?.order_id,
              state_histories: order?.state_histories,
            }}
          />
          <ContentDetailOrderBox>
            <InfoDeliveryDetailOrder
              title={order?.tracking_info?.status_text}
              time={`(${order?.tracking_info?.time})`}
              status={1}
            />
          </ContentDetailOrderBox>
        </DetailOrderBox>
        <DetailOrderBox>
          <TitleDetailOrderBox
            urlIcon={solution}
            title="Thông tin người nhận"
          />
          <ContentDetailOrderBox>
            <InfoDetailOrder
              label="Họ và tên:"
              value={order?.address?.full_name}
            />
            <InfoDetailOrder
              label="Số điện thoại:"
              value={order?.address?.telephone}
            />
            <InfoDetailOrder
              label="Tỉnh thành:"
              value={order?.address?.province?.name}
            />
            <InfoDetailOrder
              label="Quận/Huyện:"
              value={order?.address?.district?.name}
            />
            <InfoDetailOrder
              label="Xã/Phường:"
              value={order?.address?.ward?.name}
            />
            <InfoDetailOrder
              label="Địa chỉ:"
              value={order?.address?.street}
            />
          </ContentDetailOrderBox>
        </DetailOrderBox>

        <DetailOrderBox>
          <TitleDetailOrderBox
            urlIcon={dollar}
            title="Thanh toán"
          />
          <ContentDetailOrderBox>
            <InfoDetailOrder
              label="Số lượng:"
              value={`${order?.items?.length} Sản phẩm`}
            />
            {
              order?.payment_type ? (
                <InfoDetailOrder
                  label="Phương thức:"
                  styleValue={{
                    color: '#4DDD8A',
                  }}
                  value={orderPaymentMethod[order?.payment_type]}
                />
              ) : (
                <InfoDetailOrder
                  label="Phương thức:"
                  styleValue={{
                    color: '#FF9900',
                  }}
                  value={'Không xác định'}
                />
              )
            }
            <InfoDetailOrder
              label="Trạng thái:"
              value={order?.payment_status === 7 ? 'Đã thanh toán' : 'Chưa thanh toán'}
              styleValue={{
                color: order?.payment_status === 7 ? Colors.successColor : Colors.redColor,
              }}
            />
            {
              order?.payment_type !== 'NEOWP' && (
                <InfoDetailOrder
                  label="Tổng tiền:"
                  value={formatMoney(order?.total_sale, { unit: 'đ' })}
                  styleValue={{
                    color: Colors.priceColor,
                    fontSize: 14,
                  }}
                />
              )
            }
            {
              order?.payment_type === 'NEOWP' && (
                <InfoDetailOrder
                  label="Tổng điểm:"
                  value={formatMoney(order?.total_sale, { unit: 'điểm' })}
                  styleValue={{
                    color: Colors.red,
                    fontSize: 14,
                  }}
                />
              )
            }
          </ContentDetailOrderBox>
        </DetailOrderBox>
        {
          order?.is_paymentable && (
            <BottomButon
              label={'Thanh toán'}
              onPress={() => {
                if (order?.payment_type === 'COD') {
                  navigation.navigate(NAVIGATION_PAY_ORDER, {
                    order,
                  })
                } else {
                  navigation.navigate(NAVIGATION_PAYMENT_BY_NEOMED_SCREEN, {
                    order,
                    onReload: () => {
                      dispatch(requestGetOrderDetails(orgOrder.order_id))
                    },
                  })
                }
              }}
            />
          )
        }
        {
          order?.order_status === 28 && (
            <BottomButon
              label={'Xác nhận'}
              onPress={() => {
                navigation.navigate(NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN, {
                  orderId: order.order_id,
                  onReload: () => {
                    dispatch(requestGetOrderDetails(orgOrder.order_id))
                  },
                })
              }}
            />
          )
        }
        <BottomButon
          label={'Đặt lại'}
          onPress={() => {
            dispatch(requestBuyAgain(orgOrder.order_id))
          }}
        />
        <DialogInfo
          isOpen={showDialog}
          isError={false}
          isOrder={false}
          isLoading={true}
          message={''}
          closeModal={() => setShowDialog(false)}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrderDetailScreen
