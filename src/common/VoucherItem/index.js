import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { getDateString } from '~/utils/date'
import { formatMoneyString } from '~/utils/format'
import styles from './styles'
import PressScale from '~/design-system/PressScale'
import { brandGradients } from '~/design-system/tokens'
const listMethod = ['COD', 'NEOW', 'NEOWP', 'VQR']

// Card voucher dạng "vé" theo spec redesign: cuống trái gradient teal hiện
// giá trị giảm, phần phải là nội dung — thay cho hàng có ảnh banner + badge
// giảm giá rời rạc trước đó.
const VoucherItem = ({ data, type, onClick, listVoucherExpired, orgDistributorId }) => {
  const [hidden, setHidden] = useState(true)
  const method = (paymentMethod) => listMethod.filter(word => paymentMethod.indexOf(word) != -1).map((item, index) => {
    return (
      <View key={index} style={styles.methodTag}>
        <Text style={styles.methodTagText}>{item == 'COD' ? 'COD' : item == 'NEOW' ? 'Điểm mua hàng' : 'Điểm tích lũy'}</Text>
      </View>
    )
  })
  const element = {
    'canUse': (<View>
      <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text>
      {
        !data.is_valid && data?.order_limit ? (
          <Text style={styles.conditionText}>{`Đơn hàng tối thiêu ${formatMoneyString(data?.order_limit)}`}</Text>
        ) : null
      }
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {method(data.payment_method)}
      </View>
    </View>),
    'picked': (<View>
      <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text>
      <PressScale
        style={styles.deleteButton}
        onPress={onClick}
      >
        <Text style={styles.textButton}>Hủy chọn</Text>
      </PressScale>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {method(data.payment_method)}
      </View>
    </View>),
    'assigned': (
      <View>
        <Text style={styles.timeVoucher}>{`HSD: ${getDateString(data?.end_date, 'DD/MM/yyyy')}`}</Text>
        {
          !data.is_valid && data?.order_limit ? (
            <Text style={styles.conditionText}>{`Đơn hàng tối thiêu ${formatMoneyString(data?.order_limit)}`}</Text>
          ) : null
        }
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
    </View>),
  }

  useEffect(() => {
    if (listVoucherExpired.length != 0) {
      for (const value of listVoucherExpired) {
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
        <LinearGradient
          colors={brandGradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.stub}
        >
          <Text style={styles.stubValue} numberOfLines={1} adjustsFontSizeToFit>
            {`${data?.discount / 1000}k`}
          </Text>
          <Text style={styles.stubLabel}>GIẢM</Text>
        </LinearGradient>
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
