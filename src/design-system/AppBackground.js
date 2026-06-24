import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { brandColors } from './tokens'

const AppBackground = ({ children, edges = ['top'], style, safeAreaStyle }) => {
  return (
    <View style={[styles.background, style]}>
      <SafeAreaView edges={edges} style={[styles.safeArea, safeAreaStyle]}>
        {children}
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
})

export default AppBackground
