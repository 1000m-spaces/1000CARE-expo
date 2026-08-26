import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PressScale from '~/design-system/PressScale'

const RadioButton = ({ selected, title, onClick }) => {
  return (
    <PressScale
      onPress={onClick}
      style={styles.wrap}
    >
      <View style={[styles.radio, { borderColor: selected ? '#0B7B8A' : '#CCC' }]}>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderColor: '#CCC',
    borderWidth: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0B7B8A',
  },
  text: {
    marginLeft: 6,
    color: '#595959',
  },
})

export default RadioButton