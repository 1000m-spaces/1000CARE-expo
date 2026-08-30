import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const RadioButton = ({ selected, title, onClick }) => {
  return (
    <PressScale
      onPress={onClick}
      style={styles.wrap}
    >
      <View style={[styles.radio, { borderColor: selected ? brandColors.tealPrimary : brandColors.borderSoft }]}>
        {
          selected ? <View style={styles.dot} /> : <></>
        }
      </View>
      <Text style={styles.text}>{title}</Text>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: s(18),
    height: s(18),
    borderRadius: s(9),
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: brandColors.tealPrimary,
  },
  text: {
    marginLeft: s(8),
    fontSize: fs(13),
    color: brandColors.textDark,
    fontWeight: '600',
  },
})

export default RadioButton
