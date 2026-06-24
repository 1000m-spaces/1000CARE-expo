import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { s, fs } from '../utils/responsive';
import { brandColors, brandGradients, brandShadow } from './tokens';
import { Fonts } from '~/assets/config';

const PremiumButton = ({ text, onPress, style, textStyle, colors = brandGradients.primary, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.78}
      style={[styles.container, disabled && styles.disabled, style]}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? [brandColors.border, brandColors.border] : colors}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: s(16),
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
