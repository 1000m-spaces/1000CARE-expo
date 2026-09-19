import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE". Giữ nguyên tên prop
// `label`/`placeholder`/`value`/`error`/`helperText`/`disabled`/`onChange`
// — không có `<label htmlFor>` ở RN nên `label` chỉ còn là `Text` +
// `accessibilityLabel`. `onChange` nhận thẳng chuỗi text mới (kiểu
// `onChangeText` của RN) thay vì object `event` như bản DOM gốc.
export function Input({ label, placeholder, value, error, helperText, disabled, onChange, type }) {
  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        style={[styles.input, error && styles.inputError, disabled && styles.disabled]}
        placeholder={placeholder}
        placeholderTextColor={semantic.textMuted}
        value={value}
        editable={!disabled}
        onChangeText={onChange}
        secureTextEntry={type === 'password'}
        keyboardType={type === 'email' ? 'email-address' : type === 'number' ? 'numeric' : 'default'}
      />
      {helperText ? (
        <Text style={[styles.helper, error && styles.helperError]}>{helperText}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: careSpacing.space1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: semantic.textPrimary,
  },
  input: {
    fontSize: 14,
    paddingVertical: careSpacing.space2,
    paddingHorizontal: careSpacing.space3,
    borderRadius: careRadius.md,
    borderWidth: 1,
    borderColor: semantic.border,
    backgroundColor: semantic.bgSurface,
    color: semantic.textPrimary,
  },
  inputError: {
    borderColor: semantic.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  helper: {
    fontSize: 12,
    color: semantic.textMuted,
  },
  helperError: {
    color: semantic.danger,
  },
});

export default Input;
