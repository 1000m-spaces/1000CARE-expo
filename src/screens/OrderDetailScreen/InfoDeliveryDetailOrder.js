import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const InfoDeliveryDetailOrder = ({ title, time, status }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.wrapLeft}>
        <View style={styles.dot} />
        <View style={styles.wrapInfo}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapLeft: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    backgroundColor: '#029E9D',

    borderRadius: 6,
  },
  wrapInfo: {
    marginLeft: 18,
  },
  title: {
    fontSize: 12,
    color: '#595959',
  },
  time: {
    fontSize: 12,
    color: '#8C8C8C',
  },
  status: {
    fontSize: 12,
    color: '#595959',
  },
})

export default InfoDeliveryDetailOrder
