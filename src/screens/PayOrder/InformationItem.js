import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

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
    paddingHorizontal: 18,
    paddingVertical: 9,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#8C8C8C',
  },
  value: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#595959',
  },
})

export default InformationItem
