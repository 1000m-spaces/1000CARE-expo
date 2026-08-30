import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from '~/common/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, radiusScale } from './tokens'
import PressScale from './PressScale'
import { Fonts } from '~/assets/config'

// Chip lọc theo spec redesign: pill nhỏ bo 12px, trắng viền #EEF5F6 khi
// chưa chọn / nền teal đặc khi chọn — thay cho pill kính lớn bo 22px cũ.
const GlassFilterChip = ({
  label,
  selected = false,
  onPress,
  style,
  contentStyle,
  textStyle,
  children,
}) => {
  return (
    <PressScale
      onPress={onPress}
      style={[styles.container, selected && styles.containerSelected, style, contentStyle]}
    >
      {children || (
        <Text
          style={[styles.label, selected && styles.labelSelected, textStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {label}
        </Text>
      )}
    </PressScale>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: s(36),
    paddingHorizontal: s(16),
    paddingVertical: s(8),
    borderRadius: s(radiusScale.lg),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSelected: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  label: {
    textAlign: 'center',
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontSize: fs(12.5),
    fontWeight: 'normal',
  },
  labelSelected: {
    color: brandColors.surface,
    fontWeight: 'normal',
  },
})

export default GlassFilterChip
