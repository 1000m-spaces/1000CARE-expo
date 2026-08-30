import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const InformationItem = ({ label, value }) => {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={styles.value}>{value}</Text>
      ) : (
        value
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: s(12),
    paddingVertical: s(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: fs(12.5),
    color: brandColors.muted,
  },
  value: {
    fontSize: fs(12.5),
    fontWeight: '700',
    color: brandColors.textDark,
  },
})

export default InformationItem
