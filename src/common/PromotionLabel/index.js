import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'

const PromotionLabel = ({ text, style }) => {
  return (
    <View style={[styles.wrap, style]}>
      <Image
        style={styles.image}
        source={require('~/assets/image_promotion/background.png')}
      />
      <Text style={styles.value}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: 72,
    height: 20,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 72,
    resizeMode: 'contain',
  },
  value: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
    position: 'absolute',
  },
})

export default PromotionLabel
