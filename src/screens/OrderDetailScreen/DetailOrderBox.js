import React from 'react'
import { View, StyleSheet } from 'react-native'
import { s } from '~/utils/responsive'
import { liquidGlass } from '~/design-system/tokens'

const DetailOrderBox = ({ children }) => {
  return <View style={styles.wrap}>{children}</View>
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: s(12),
    marginHorizontal: s(16),
    borderRadius: s(18),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    overflow: 'hidden',
    ...liquidGlass.shadow,
  },
})

export default DetailOrderBox
