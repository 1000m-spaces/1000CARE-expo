import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` (React.createElement thuần, web) của Design
// System "1000CARE". Giữ nguyên tên prop `variant`/`disabled`/`onClick`/
// `children` — RN không có `onClick`/`<button type>` nên `onClick` được
// nối vào `onPress` của Pressable, `type` được nhận nhưng không dùng.
export function Button({ variant = 'primary', disabled, onClick, type, children }) {
  const variantStyle = VARIANTS[variant] || VARIANTS.primary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={onClick}
      style={({ pressed }) => [
        styles.base,
        variantStyle.container,
        disabled && styles.disabled,
        pressed && !disabled && variantStyle.pressed,
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={variantStyle.text}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: careRadius.md,
    paddingVertical: 10,
    paddingHorizontal: careSpacing.space4,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});

const VARIANTS = {
  primary: StyleSheet.create({
    container: { backgroundColor: semantic.ctaBg },
    pressed: { backgroundColor: semantic.ctaBgHover },
    text: { color: semantic.ctaText, fontSize: 14, fontWeight: '600' },
  }),
  secondary: StyleSheet.create({
    container: { backgroundColor: semantic.bgSurface, borderColor: semantic.brand },
    pressed: { backgroundColor: semantic.brandSubtle },
    text: { color: semantic.brand, fontSize: 14, fontWeight: '600' },
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: 'transparent', borderColor: semantic.danger },
    pressed: { backgroundColor: semantic.dangerBg },
    text: { color: semantic.danger, fontSize: 14, fontWeight: '600' },
  }),
};

export default Button;
