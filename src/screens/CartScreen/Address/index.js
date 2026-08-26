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

  return (
    <View style={styles.addressContainer}>
      <View style={styles.addressTitleContainer}>
        <View style={styles.row}>
          <Image 
            source={address_point}
            style={styles.iconGPS}
          />
          <Text
            style={styles.addressText}
          >
            Địa chỉ nhận hàng
          </Text>
        </View>
        <PressScale
          onPress={() => navigation.navigate(NAVIGATION_ADDRESS_CHOOSE_SCREEN, {
            chooseAddress: true,
          })}
        >
          <Text
            style={styles.chooseAddressText}
          >
            {
              cartData?.shipping_address ? 'Thay đổi' : 'Chọn'
            }
          </Text>
        </PressScale>
      </View>
      {
        checkValidAddress() ? (
          <View style={styles.addressInfoContainer}>
            <Text style={styles.addressName}>
              {cartData?.shipping_address?.full_name} - {cartData?.shipping_address?.telephone}
            </Text>
            <Text style={[styles.addressText, styles.mt6]}>
              {cartData?.shipping_address?.street} - {cartData?.shipping_address?.ward.name} - {cartData?.shipping_address?.district.name} - {cartData?.shipping_address?.province.name} - {cartData?.shipping_address?.country_id}
            </Text>
          </View>
        ) : null
      }
    </View>
  )
}

export default Address