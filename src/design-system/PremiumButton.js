import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { s, fs } from '../utils/responsive';
import { brandColors, brandGradients, brandShadow, radiusScale } from './tokens';
import { Fonts } from '~/assets/config';
import PressScale from './PressScale';

// Design system mới không dùng gradient ở nút — màu phẳng (mặc định
// brandColors.tealPrimary, giữ prop `colors` cho tương thích ngược,
// chỉ lấy màu đầu tiên của mảng).
const PremiumButton = ({ text, onPress, style, textStyle, colors = brandGradients.primary, disabled }) => {
  const backgroundColor = disabled ? brandColors.border : colors[0] || brandColors.tealPrimary;
  return (
    <PressScale
      onPress={onPress}
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
    >
      <View style={[styles.gradient, { backgroundColor }]}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </View>
    </PressScale>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    marginVertical: s(8),
    ...brandShadow.teal,
  },
  gradient: {
    paddingVertical: s(14),
    paddingHorizontal: s(24),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: s(56),
  },
  text: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontSize: fs(16),
    fontWeight: 'normal',
    letterSpacing: 0,
  },
  disabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default PremiumButton;
