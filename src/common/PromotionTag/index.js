import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../Colors/Colors'

const PromotionTag = ({ text, style }) => {
  return (
    <View>
      <Text
        style={[styles.comboPromotion, style]}
      >
        {text}
      </Text>
    </View>
    
  )
}

const styles = StyleSheet.create({
  comboPromotion: {
    padding: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(218, 15, 0, 0.1)',
    color: Colors.redColor,
    fontSize: 10,
    lineHeight: 20,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
})

export default PromotionTag