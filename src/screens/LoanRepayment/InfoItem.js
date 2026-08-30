import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

// Dòng thông tin ngang label-trái/value-phải theo spec, thay cho khối
// label-trên/value-dưới có viền dưới cũ.
const InfoItem = ({ title, children }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: s(9),
  },
  text: {
    fontSize: fs(12.5),
    color: brandColors.muted,
  },
})

export default InfoItem
