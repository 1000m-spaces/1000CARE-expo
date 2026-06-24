import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import dimens from '~/constants/dimens'
import { showToast } from '~/utils/toast'
import Colors from '../Colors/Colors'
import { Image } from '~/common/index'

const IconWallet = ({ image,textConten, onPress }) => {
  return(
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onPress) {
          onPress()
        }else {
          showToast('Feature is developping')
        }
      }}
    >
      <View
        style={styles.button}
      >
        <Image source={image} />
      </View>
      <Text style={styles.text}>{textConten}</Text>
    </TouchableOpacity>
  )
}
export default IconWallet

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: dimens.common.WINDOW_WIDTH/3,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  button: {
    height: 40,
    width: 40,
    backgroundColor: '#E5F9FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 65,
  },
  text: {
    marginTop: 5,
    color: Colors.textColor2,
    fontSize: 14,
    lineHeight: 22,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'normal',
  },
})