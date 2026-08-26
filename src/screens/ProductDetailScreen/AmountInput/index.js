import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import PressScale from '~/design-system/PressScale'

const AmountInput = ({
  onChangeText,
  onEndEditing,
  onPlus,
  onMinus,
  value,
  keyboardType,
}) => {
  return (
    <View style={styles.wrap}>
      <PressScale
        onPress={onMinus}
        style={styles.btnMinus}
      >
        <View
          style={styles.btnMinusContent}
        />
      </PressScale>
      <TextInput
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        keyboardType={keyboardType}
        value={value}
        style={styles.input}
      />
      <PressScale
        onPress={onPlus}
        style={styles.btnPlus}
      >
        <Text
          style={styles.btn}
        >+</Text>
      </PressScale>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  btnMinus: {
    width: 36,
    height: 36,
    backgroundColor: Colors.backgroundColor,

    borderRadius: 18,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnMinusContent: {
    width: 12,
    backgroundColor: Colors.black,
    height: 2,
  },
  input: {
    width: 80,
    height: 36,
    padding: 0,

    marginHorizontal: 6,

    textAlign: 'center',

    borderRadius: 18,
    fontSize: 16,

    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btn: {
    fontSize: 22,
    lineHeight: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  btnPlus: {
    width: 36,
    height: 36,
    backgroundColor: Colors.backgroundColor,
    
    borderRadius: 18,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AmountInput