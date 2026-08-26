import React from 'react'
import { View, Text } from 'react-native'
import Image from '../Image/Image'
import { voucher_icon, right_arrow } from '~/assets/constants'
import styles from './styles'
import { formatMoneyString } from '~/utils/format'
import PressScale from '~/design-system/PressScale'

const SectionVoucher = ({ title, onPress, voucher }) => {
  return (
    <PressScale
      style={styles.wrap}
      onPress={onPress}
    >
      <View style={styles.wrapTitle}>
        <Image
          style={styles.iconCOD}
          resizeMode={'contain'}
          source={voucher_icon}
          tintColor="#FAAD14"
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}
      >
        {
          voucher && (
            <View style={styles.saleOff}>
              <Text style={styles.textSaleOff}>{`${formatMoneyString(voucher?.discount)}`}</Text>
            </View>
          )
        }
        <Image
          style={styles.iconChoose}
          source={right_arrow}
        />
      </View>

    </PressScale>)
}

export default SectionVoucher