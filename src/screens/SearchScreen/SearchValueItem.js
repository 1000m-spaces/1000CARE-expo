import React from 'react'
import { Text, StyleSheet } from 'react-native'
import PressScale from '~/design-system/PressScale'

const SearchValueItem = ({ text, onClick }) => {
  return (
    <PressScale
      style={styles.wrap}
      onPress={onClick}
    >
      <Text style={styles.text}>{text}</Text>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrap: {
    padding: 18,

    borderColor: '#F5F5F5',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  text: {
    color: '#595959',
    fontSize: 14,
  },
})

export default SearchValueItem
