import React from 'react'
import { Image } from '~/common/index'
import { View, Text } from 'react-native'
import { box_empty } from '~/assets/constants'

import styles from './styles'

const EmptyItem = ({ image = box_empty, text = 'Hiện tại không có lịch sử giao dịch nào' }) => {
  return (
    <View style={styles.itemContainer}>
      <Image
        resizeMode={'contain'}
        source={image}
        style={styles.image}
      />
      <Text style={styles.message}>
        {text}
      </Text>
    </View>
  )
}

export default EmptyItem
