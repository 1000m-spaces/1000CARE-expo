import React from 'react'
import styles from './styles'
import { View } from 'react-native'

import { address_point } from '~/assets/constants'
import { Image, Text } from '~/common/index'
import { NAVIGATION_ADDRESS_CHOOSE_SCREEN } from '~/navigation/routes'
import { getListItem } from '~/store/selector'
import { useSelector } from 'react-redux'
import PressScale from '~/design-system/PressScale'

const Address = ({ navigation }) => {
  const cartData = useSelector((state) => getListItem(state))

  const checkValidAddress = () => {
    if (!cartData?.shipping_address?.ward?.id || !cartData?.shipping_address?.district?.id || !cartData?.shipping_address?.province?.id) {
      return false
    }
    return true
  }

  const hasAddress = checkValidAddress()

  return (
    <PressScale
      style={styles.addressContainer}
      onPress={() => navigation.navigate(NAVIGATION_ADDRESS_CHOOSE_SCREEN, {
        chooseAddress: true,
      })}
    >
      <Image
        source={address_point}
        style={styles.iconGPS}
      />
      <View style={styles.addressInfoContainer}>
        {
          hasAddress ? (
            <>
              <Text style={styles.addressName} numberOfLines={1}>
                {cartData?.shipping_address?.full_name} - {cartData?.shipping_address?.telephone}
              </Text>
              <Text style={[styles.addressText, styles.mt6]} numberOfLines={1}>
                {cartData?.shipping_address?.street} - {cartData?.shipping_address?.ward.name} - {cartData?.shipping_address?.district.name} - {cartData?.shipping_address?.province.name}
              </Text>
            </>
          ) : (
            <Text style={styles.addressText}>Địa chỉ nhận hàng</Text>
          )
        }
      </View>
      <Text style={styles.chooseAddressText}>
        {hasAddress ? 'Thay đổi' : 'Chọn'}
      </Text>
    </PressScale>
  )
}

export default Address
