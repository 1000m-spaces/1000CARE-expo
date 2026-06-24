import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const AmountInput = ({ 
  onChangeText,
  onEndEditing,
  onPlus,
  onMinus,
  value,
  keyboardType,
}) => {
  return (
    <View>
      <View style={styles.wrap}>
        <TouchableOpacity
          onPress={onMinus}
          style={styles.btnMinus}
        >
          <View
            style={styles.btnMinusContent}
          />
        </TouchableOpacity>
        <TextInput
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
          keyboardType={keyboardType}
          value={value}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={onPlus}
          style={styles.btnPlus}
        >
          <Text style={styles.btn}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: s(18),
    overflow: 'hidden',
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
  },
  btnMinus: {
    width: s(32),
    height: s(32),
    backgroundColor: 'rgba(237,251,252,0.9)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: s(52),
    height: s(32),
    padding: 0,
    textAlign: 'center',
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '600',
    backgroundColor: liquidGlass.backgroundStrong,
  },
  btnMinusContent: {
    width: s(10),
    backgroundColor: brandColors.textDark,
    height: 2,
    alignSelf: 'center',
  },
  btn: {
    fontSize: fs(18),
    lineHeight: fs(30),
    color: brandColors.textDark,
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnPlus: {
    width: s(32),
    height: s(32),
    backgroundColor: 'rgba(237,251,252,0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AmountInput
