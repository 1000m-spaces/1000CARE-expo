import React from 'react'
import { View, Text } from 'react-native'
import strings from '~/i18n'
import { formatMoney } from '~/utils/index'
import { Image } from '~/common/index'

import styles from './styles'
import { NAVIGATION_ORDER_DETAIL_SCREEN } from '~/navigation/routes'
import StatusBadge from '~/design-system/StatusBadge'
import PressScale from '~/design-system/PressScale'

// Ngoài danh sách chỉ hiện 3 số cuối của mã đơn — mã đầy đủ chỉ lộ ở trang chi tiết.
const shortOrderId = orderId => `···${String(orderId ?? '').slice(-3)}`

const orderStatuses = [
  'Không xác định', // 0
  'Chờ xử lý', // 1
  'Đã xác minh', // 2
  'Đang giao hàng', //3
  'Hoàn thành',//4
  'Hoàn tiền',//5
  'Quá hạn',//6
  'Đã thanh toán',//7
  'Chờ xác nhận',// 8
  'Chờ xác minh', //9
  'Đang giao hàng',//10
  'Đã giao hàng', // 11
  'Đã hủy', // 12
  'Đang xử lý', // 13
  'Thất bại', // 14
  'Đang đóng gói', //15
  'Đã trả hàng', // 16
  'Nhận hàng lần đầu', //17
  'Nhận hàng lần 2', //18
  'Nhận hàng lần 3', //19
  'Gưi hàng lần đầu', //20
  'Gưi hàng lần 2', // 21
  'Gưi hàng lần 3', //22
  'Đang trả hàng',//23
  '',
  '',
  '',
  '',
  'Chờ người dùng xác nhận',
]

const OrderItem = ({ order, onPayment, navigation, goBack, onCancelOrder, buyAgain, confirmOrder }) => {
  // console.log('order?.order_status::::', order?.order_status)
  const statusText = orderStatuses[order?.order_status] || orderStatuses[0]
  const statusVariant = order?.order_status === 4 || order?.order_status === 7 ? 'success'
    : order?.order_status === 12 || order?.order_status === 14 ? 'danger'
      : order?.order_status === 1 || order?.order_status === 28 ? 'warning'
        : 'info'

  return (
    <PressScale
      onPress={() => navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN, {
        goBack,
        order: {
          ...order,
          address: JSON.parse(order.address),
          items: JSON.parse(order.items),
        },
      })}
      style={styles.orderContainer}
    >
      <View style={styles.orderHeader}>
        <View style={styles.orderCodeBlock}>
          <Text style={styles.metaLabel}>Mã đơn hàng</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.orderTransId}>
            {shortOrderId(order.order_id)}
          </Text>
        </View>
        <StatusBadge text={statusText} variant={statusVariant} />
      </View>

      <View style={styles.distributorRow}>
        <View style={styles.logoContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={{
              uri: order?.distributor?.logo,
            }}
          />
        </View>
        <View style={styles.orderInfoContainer}>
          <Text numberOfLines={1} style={styles.distributorName}>
            {order?.distributor?.name || order?.distributor?.nick_name || 'Nhà cung cấp'}
          </Text>
          <Text style={styles.orderTime}>{order.created_time}</Text>
        </View>
      </View>

      <View style={styles.footerRow}>
        <View>
          <Text style={styles.metaLabel}>Tổng thanh toán</Text>
          {
            order.payment_type !== 2 && (
              <Text style={styles.price}>{formatMoney(order.total_sale)}</Text>
            )
          }
          {
            order.payment_type === 2 && (
              <Text style={styles.salePrice}>
                {formatMoney(order.total_sale, { unit: 'điểm' })}
              </Text>
            )
          }
        </View>
        <View style={styles.actionRow}>
          <PressScale
            style={styles.buyAgainContainer}
            onPress={buyAgain}
          >
            <Text style={styles.buyAgainText}>{'ĐẶT LẠI'}</Text>
          </PressScale>
          {
            order?.order_status === 1 && (
              <PressScale
                style={styles.cancelContainer}
                onPress={() => onCancelOrder(order.order_id)}
              >
                <Text style={styles.cancelText}>{'HUỶ ĐƠN'}</Text>
              </PressScale>
            )
          }
          {
            order?.order_status === 28 && (
              <PressScale
                style={styles.cancelContainer}
                onPress={confirmOrder}
              >
                <Text style={styles.confirmText}>{'XÁC NHẬN'}</Text>
              </PressScale>
            )
          }
          {/* {
            order?.order_status === 4 && (
              <Button
                styleView={styles.reOrderBtnContainer}
                styleButton={styles.reOrderBtn}
                styleText={styles.reOrderText}
                text={strings.orders.orderItem.reOrder}
                onPressEvent={() => {
                  navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN, {
                    order: {
                      ...order,
                      address: JSON.parse(order.address),
                      items: JSON.parse(order.items),
                    },
                  })
                }}
              />
            )
          } */}
        </View>
      </View>
    </PressScale>
  )
}

export default OrderItem
