import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { s, fs } from '../utils/responsive';
import { brandColors, brandShadow } from './tokens';
import { Fonts } from '~/assets/config';

const PremiumInput = ({ label, value, onChangeText, placeholder, keyboardType = 'default', error, ...inputProps }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorInput]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={brandColors.mutedLight}
          keyboardType={keyboardType}
          {...inputProps}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: s(10),
    width: '100%',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: fs(14),
    color: brandColors.textDark,
    marginBottom: s(8),
    fontWeight: 'normal',
    marginLeft: s(4),
  },
  inputContainer: {
    backgroundColor: brandColors.surface,
    borderRadius: s(16),
    paddingHorizontal: s(16),
    height: s(56),
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: brandColors.border,
    ...brandShadow.soft,
  },
  input: {
    fontFamily: Fonts.base,
    fontSize: fs(16),
    color: brandColors.textDark,
    fontWeight: 'normal',
  },
  errorInput: {
    borderColor: brandColors.danger,
  },
  errorText: {
    color: brandColors.danger,
    fontFamily: Fonts.base,
    fontSize: fs(12),
    marginTop: s(4),
    marginLeft: s(4),
  },
});

export default PremiumInput;
