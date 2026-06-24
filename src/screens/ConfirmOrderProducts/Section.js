import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Section = ({ title, children }) => {
  return <View style={styles.wrap}>
    <View style={styles.headSection}>
      <Text style={styles.titleSection}>{title}</Text>
    </View>
    <View style={styles.bodySection}>
      {
        children
      }
    </View>
  </View>
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFF',
    display: 'flex',
    flex: 1,
  },
  headSection: {
    width: '100%',
    padding: 18,

    borderTopWidth: 1,
    borderColor: '#F5F5F5',
    borderStyle: 'solid',
  },
  titleSection: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#595959',
  },
  bodySection: {
    borderTopWidth: 1,
    borderColor: '#F5F5F5',
    borderStyle: 'solid',
  },
})

export default Section