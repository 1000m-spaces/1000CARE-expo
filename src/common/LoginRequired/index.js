import React from 'react'
import { Image } from 'react-native'
import { View, Text } from 'react-native'
import { empty_cart } from '~/assets/constants'

import styles from './styles'

const LoginRequired = () => {
  return (
    <View style={styles.itemContainer}>
      <Image
        resizeMode={'contain'}
        source={empty_cart}
        style={styles.image}
      />
      <Text style={styles.message}>
        {'Vui lòng đăng nhập để sử dụng chức năng'}
      </Text>
    </View>
  )
}

export default LoginRequired
