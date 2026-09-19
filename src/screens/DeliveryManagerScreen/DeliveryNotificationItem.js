import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { Image } from '~/common/index'
import { delivered } from '~/assets/constants'
import { NAVIGATION_ORDER_DETAIL_SCREEN } from '~/navigation/routes'
import { getDateString } from '~/utils/date'
import PressScale from '~/design-system/PressScale'
import { brandColors } from '~/design-system/tokens'

const DeliveryNotificationItem = ({ data, navigation, goBack }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.wrapIcon}>
        <Image
          style={styles.icon}
          source={delivered}
        />
      </View>
      <View style={styles.wrapInfo}>
        <Text>
          <Text style={styles.textOrderCode}>{data.order_id}:</Text>
          <Text style={styles.textNotification}> {data?.tracking_info?.status_text}</Text>
        </Text>
        <View style={styles.wrapTimeAndButton}>
          <Text style={styles.textTime}>{data.created_time}</Text>
          <PressScale
            style={styles.button}
            onPress={() => navigation.navigate(NAVIGATION_ORDER_DETAIL_SCREEN, {
              goBack,
              order: {
                ...data,
                address: JSON.parse(data.address),
                items: JSON.parse(data.items),
              },
            })}
          >
            <Text style={styles.textButton}>Chi tiết</Text>
          </PressScale>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 118,
    backgroundColor: '#FFF',

    padding: 18,

    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderStyle: 'solid',

    display: 'flex',
    flexDirection: 'row',
  },
  wrapIcon: {
    width: 52,
    height: 52,
    backgroundColor: '#FFBBAF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 26,
  },
  icon: {
    width: 32,
    height: 32,
  },
  wrapInfo: {
    width: Dimensions.get('window').width - 36 - 18 - 52,
    height: '100%',

    marginLeft: 18,
  },
  textOrderCode: {
    fontSize: 14,
    color: brandColors.tealPrimary,

  },
  textNotification: {
    fontSize: 14,
    color: '#595959',
    
  },
  wrapTimeAndButton: {
    marginTop: 6,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTime: {
    fontSize: 12,
    color: '#8c8c8c',
    
  },
  button: {
    width: 90,
    height: 36,
    backgroundColor: brandColors.tealPrimary,
    borderRadius: 18,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 14,
    lineHeight: 16,
    color: '#FFF',
    
  },
})

export default DeliveryNotificationItem
