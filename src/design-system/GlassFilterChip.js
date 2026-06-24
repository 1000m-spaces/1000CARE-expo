import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from '~/common/index'
import { s, fs } from '~/utils/responsive'
import { brandColors } from './tokens'
import LiquidGlassView from './LiquidGlassView'
import { Fonts } from '~/assets/config'

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
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={style}>
      <LiquidGlassView
        intensity={selected ? 'strong' : 'regular'}
        style={[styles.container, selected && styles.containerSelected, contentStyle]}
      >
        {selected && <View pointerEvents="none" style={styles.selectedGlow} />}
        {children || (
          <Text
            style={[styles.label, selected && styles.labelSelected, textStyle]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
        )}
      </LiquidGlassView>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: s(44),
    paddingHorizontal: s(16),
    paddingVertical: s(10),
    borderRadius: s(22),
    backgroundColor: 'rgba(245,252,253,0.72)',
    borderColor: 'rgba(255,255,255,0.82)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerSelected: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: 'rgba(255,255,255,0.7)',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.26,
    shadowRadius: 16,
    elevation: 8,
  },
  selectedGlow: {
    position: 'absolute',
    top: s(5),
    left: s(9),
    width: s(16),
    height: s(16),
    borderRadius: s(8),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  label: {
    textAlign: 'center',
    color: brandColors.muted,
    fontFamily: Fonts.bold,
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: 'normal',
  },
  labelSelected: {
    color: brandColors.surface,
    fontWeight: 'normal',
  },
})

export default GlassFilterChip
