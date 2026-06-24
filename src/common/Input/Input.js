import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

const Input = props => {
  const { placeholder,style,onChangeText,keyboardType,value } = props
  return(
    <TextInput 
      placeholder={placeholder}
      style={[styles.styleTextInput,style]}
      placeholderTextColor={brandColors.mutedLight}
      underlineColorAndroid='transparent'
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      value={value}
    />
  )
}
export default Input

const styles = StyleSheet.create({
  styleTextInput: {
    minHeight: s(52),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    backgroundColor: liquidGlass.background,
    borderRadius: s(24),
    paddingHorizontal: s(16),
    color: brandColors.textDark,
    fontFamily: Fonts.base,
    fontSize: fs(14),
    fontWeight: 'normal',
    ...liquidGlass.shadow,
  },
})
