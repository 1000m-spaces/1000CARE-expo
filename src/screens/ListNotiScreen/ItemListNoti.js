import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import Text from '~/common/Text/index'
import bell from '~/assets/icons/bell.png'
import styles from './styles'
import { getTime, convertBirth } from '~/utils'
import PressScale from '~/design-system/PressScale'

const ItemListNoti = ({ item, index, onPress, isReadAll }) => {
  const [read, setRead] = useState(false)
  const data = (() => {
    try {
      return item?.data ? JSON.parse(item.data) : {}
    } catch (_) {
      return {}
    }
  })()
  useEffect(() => {
    setRead(item?.is_read)
  },[item])

  return(
    <PressScale
      onPress={() => {
        onPress(data, item?.id, item?.is_read)
        setRead(true)
      }}
      style={styles.buttonItem(read, isReadAll)}
    >
      <View style={styles.statusRail(read, isReadAll)} />
      <View style={styles.viewBell(read, isReadAll)}>
        <Image
          source={bell}
          style={styles.gift_fill}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text
            numberOfLines={2}
            style={styles.title}
          >{item.title}</Text>
          {!read && !isReadAll ? <View style={styles.unreadDot} /> : null}
        </View>
        <View>
          <Text style={styles.textTime}>{getTime(data.StartTime)} {convertBirth(data.StartDate)}</Text>
          <Text
            numberOfLines={3}
            style={styles.textMessage}
          >{item.message}</Text>
        </View>
      </View>
    </PressScale>
  )
}
export default ItemListNoti
