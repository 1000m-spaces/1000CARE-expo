import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { Image } from '~/common/index'
import { getDateString } from '~/utils/date'
import { formatMoneyString } from '~/utils/format'
import styles from './styles'
import PressScale from '~/design-system/PressScale'
const listMethod = ['COD', 'NEOW', 'NEOWP', 'VQR']

const VoucherItem = ({ data, type, onClick, listVoucherExpired, orgDistributorId }) => {
  const [hidden, setHidden] = useState(true)
  const method = (paymentMethod) => listMethod.filter(word => paymentMethod.indexOf(word) != -1).map((item, index) => {
    return (
      <View style={{ borderWidth: 1, marginTop: 5, borderColor: '#F5222D', marginRight: 5, paddingHorizontal: 2, borderRadius: 2 }}>
        <Text style={[styles.titleVoucher, { fontSize: 10, color: '#F5222D' }]}>{item == 'COD' ? 'COD' : item == 'NEOW' ? 'Điểm mua hàng' : 'Điểm tích lũy'}</Text>
      </View>
    )
  })
  const element = {
    'canUse': (<View>
      {/* <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.campaign?.start_date, 'DD-MM-yyyy')} - ${getDateString(data?.campaign?.end_date, 'DD-MM-yyyy')}`}</Text> */}
      {/* <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.create_at, 'DD/MM/yyyy')} - ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text> */}
      <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text>
      {
        !data.is_valid && data?.order_limit ? (
          <Text style={styles.textSaleOff}>{`Đơn hàng tối thiêu ${formatMoneyString(data?.order_limit)}`}</Text>
        ) : null
      }
      <View style={styles.row}>
        <View style={styles.saleOff}>
          <Text style={styles.textSaleOff}>{`Giảm ${data?.discount / 1000}k`}</Text>
        </View>
        {
          data.is_valid ? (
            <PressScale
              style={styles.useButton}
              onPress={onClick}
            >
              <Text style={styles.textButton}>Sử dụng</Text>
            </PressScale>
          ) : (
            <View
              style={styles.disableButton}
            >
              <Text style={styles.textButton}>Sử dụng</Text>
            </View>
          )
        }
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {method(data.payment_method)}
      </View>
    </View>),
    'picked': (<View>
      <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text>
      <View style={styles.row}>
        <View style={styles.saleOff}>
          <Text style={styles.textSaleOff}>{`Giảm ${data?.discount / 1000}k`}</Text>
        </View>
        <PressScale
          style={styles.deleteButton}
          onPress={onClick}
        >
          <Text style={styles.textButton}>Hủy chọn</Text>
        </PressScale>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {method(data.payment_method)}
      </View>
    </View>),
    'assigned': (
      <View>
        <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text>
        {
          !data.is_valid && data?.order_limit ? (
            <Text style={styles.textSaleOff}>{`Đơn hàng tối thiêu ${formatMoneyString(data?.order_limit)}`}</Text>
          ) : null
        }
        <View style={styles.saleOff}>
          <Text style={styles.textSaleOff}>{`Giảm ${data?.discount / 1000}k`}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {method(data.payment_method)}
        </View>
      </View>

    ),
    'claimed': (<View>
      <Text style={styles.timeVoucher}>Mã ĐH: <Text style={styles.codeOrder}>{data?.order_id}</Text></Text>
      <Text style={styles.timeVoucher}>Ngày SD: {data?.update_at}</Text>
    </View>),
    'disabled': (<View>
      <Text style={styles.timeVoucher}>HSD: <Text style={styles.expired}>Đã hết hạn</Text></Text>
      <View style={styles.saleOff}>
        <Text style={styles.textSaleOff}>{`Giảm ${data?.discount / 1000}k`}</Text>
      </View>
    </View>),
  }

  useEffect(() => {
    if (listVoucherExpired.length != 0) {
      for (const value of listVoucherExpired) {
        console.log('KDLJSLKDKKKKKKKKK:', orgDistributorId)
        if (Object.values(value) == data?.id && (Object.keys(value)[0] != orgDistributorId)) {
          setHidden(false)
          return
        } else {
          setHidden(true)
        }
      }
    }
  }, [data])
  if (hidden) {
    return (
      <View style={styles.wrapper}>
        <Image
          style={styles.imageVoucher}
          source={data?.campaign?.images ? { uri: data?.campaign?.images } : require('~/assets/image_voucher/voucher.jpg')}
          resizeMode={'contain'}
        />
        {
          type === 'canUse' && !data.is_valid && <View style={styles.overlay} />
        }
        <View style={styles.infoVoucher}>
          <Text
            style={styles.titleVoucher}
            numberOfLines={2}
            ellipsizeMode='tail'
          >
            {data?.name}
          </Text>
          {
            data?.campaign && data?.campaign?.distributor && (data?.campaign?.distributor?.nick_name !== '' || data?.campaign?.distributor?.name !== '') && (
              <Text
                style={styles.distributorName}
                numberOfLines={2}
                ellipsizeMode='tail'
              >
                NCC: {data?.campaign?.distributor?.nick_name ? data?.campaign?.distributor?.nick_name : data?.campaign?.distributor?.name}
              </Text>
            )
          }
          {
            element[type]
          }
        </View>
      </View>
    )
  } else {
    return null
  }
}

export default VoucherItem
