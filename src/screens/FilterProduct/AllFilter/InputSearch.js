import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from '~/common'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const InputSearch = ({ textSearch, onChangeText, ref_input, placeholder = 'Nhập tên sản phẩm' }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(textSearch)
  },[textSearch])

  return (
    <View style={styles.wrap}>
      <TextInput
        placeholderTextColor={brandColors.mutedLight}
        underlineColorAndroid='transparent'
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(text) => {
          onChangeText(text)
          setValue(text)
        }}
        value={value}
        ref={ref_input}
      />
      <Icon
        style={styles.icon}
        type="feather"
        name={'search'}
        color={brandColors.tealPrimary}
        size={20}
      />
      <TouchableOpacity
        onPress={() => {
          onChangeText('')
          setValue('')
        }}
        style={styles.iconCancel}
      >
        <Icon
          type="material"
          name={'cancel'}
          color={brandColors.mutedLight}
          size={20}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: s(16),
    paddingTop: s(10),
  },
  input: {
    width: '100%',
    height: s(52),
    backgroundColor: liquidGlass.backgroundStrong,
    paddingLeft: s(48),
    borderRadius: s(16),
    color: brandColors.textDark,
    paddingRight: s(48),
    borderWidth: 1,
    borderColor: liquidGlass.borderTint,
    fontSize: fs(13),
    fontWeight: '600',
  },
  icon: {
    position: 'absolute',
    left: s(31),
    top: s(25),
  },
  iconCancel: {
    width: s(34),
    height: s(34),
    position: 'absolute',
    right: s(24),
    top: s(19),
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default InputSearch
