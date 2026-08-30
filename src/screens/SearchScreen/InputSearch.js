import React, { useState, useEffect } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { Icon } from '../../common'
import PressScale from '~/design-system/PressScale'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const InputSearch = (props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(props?.textSearch)
  }, [props?.textSearch])

  return (
    <View style={styles.searchSection}>
      <Icon
        type="feather"
        name={'search'}
        color={brandColors.tealDark}
        size={16}
      />
      <TextInput
        style={styles.input}
        placeholder="Bạn đang tìm sản phẩm gì?"
        placeholderTextColor={brandColors.mutedLight}
        onChangeText={(text) => {
          props.onChangeText(text)
          setValue(text)
        }}
        value={value}
        ref={props?.ref_input}
        autoFocus={true}
      />
      {value.length > 0 && (
        <PressScale
          onPress={() => {
            props.onChangeText('')
            setValue('')
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon
            type="ionicon"
            name={'close-circle'}
            color={brandColors.mutedLight}
            size={18}
          />
        </PressScale>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    backgroundColor: '#F4F9F9',
    borderRadius: s(16),
    height: s(44),
    paddingHorizontal: s(14),
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: fs(13.5),
    color: brandColors.textDark,
    fontWeight: '600',
    padding: 0,
  },
})

export default InputSearch
