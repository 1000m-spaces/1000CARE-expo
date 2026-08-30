import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const InfoDetailOrder = ({ label, value, styleValue, styleWrap, styleLabel }) => {
  return (
    <View style={[styles.wrap, styleWrap]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, styleValue]} numberOfLines={1}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: s(16),
    paddingVertical: s(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: fs(12.5),
    color: brandColors.muted,
  },
  value: {
    flexShrink: 1,
    marginLeft: s(12),
    fontSize: fs(12.5),
    fontWeight: '700',
    color: brandColors.textDark,
    textAlign: 'right',
  },
})

export default InfoDetailOrder
