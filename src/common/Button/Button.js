import React from 'react'
import Colors from '../../common/Colors/Colors'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandShadow, radiusScale } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

const Button = ({ text, onPressEvent, styleView, styleButton, styleText, disabled=false }) => {
  return (
    <View style={[styles.container,styleView]}>
      <PressScale
        style={[styles.btn_container,styleButton]}
        onPress={onPressEvent}
        disabled={disabled}
      >
        <Text style={[styles.text,styleText]}>{text}</Text>
      </PressScale>
    </View>
  )
}

const styles = StyleSheet.create({
  btn_container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: s(52),
    paddingVertical: s(12),
    paddingHorizontal: s(24),
    backgroundColor: Colors.systemColor2,
    borderRadius: s(radiusScale.xxl),
    ...brandShadow.teal,
  },
  container: {
    paddingHorizontal: s(20),
  },
  loading: { position: 'absolute', left: 20 },
  text: {
    color: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: fs(16),
    fontWeight: 'normal',
    textAlign: 'center',
    letterSpacing: 0,
  },
})

export default Button
