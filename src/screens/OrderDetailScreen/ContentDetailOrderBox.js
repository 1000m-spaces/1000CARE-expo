import React from 'react'
import { View, StyleSheet } from 'react-native'
import { s } from '~/utils/responsive'
import { liquidGlass } from '~/design-system/tokens'

const ContentDetailOrderBox = ({ children }) => {
  return <View style={styles.wrap}>{children}</View>
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: s(9),
    backgroundColor: 'transparent',

    borderTopColor: liquidGlass.border,
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
})

export default ContentDetailOrderBox
