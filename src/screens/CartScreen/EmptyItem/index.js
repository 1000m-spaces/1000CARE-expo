import React from 'react'
import { Image } from '~/common/index'
import { View, Text } from 'react-native'
import { empty_cart } from '~/assets/constants'
import strings from '~/i18n'

import styles from './styles'

const EmptyItem = () => {
  return (
    <View style={styles.itemContainer}>
      <Image
        resizeMode={'contain'}
        source={empty_cart}
        style={styles.image}
      />
      <Text style={styles.message}>
        {strings.cartDetail.emptyCart}
      </Text>
    </View>
  )
}

export default EmptyItem
