import React from 'react'
import { Text, View } from 'react-native'
import Modal from 'react-native-modal'
import { Image } from '../index'
// import Clipboard from '@react-native-community/clipboard'
import {
  info,
} from '~/assets/constants'
import styles from './styles'

const ErrorView = ({ isOpen, onClose, error, icon = info }) => {
  const errorMessage =
    typeof error === 'string'
      ? error
      : error?.message
        ? error.message
        : error
          ? String(error)
          : ''

  return (
    <Modal
      animationType="fade"
      transparent={true}
      backdropColor="#0A2F38"
      backdropOpacity={0.4}
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={500}
      hideModalContentWhileAnimating
      hasBackdrop={true}
      isVisible={isOpen}
      useNativeDriver={true}
      onBackdropPress={() => {
        if (onClose) {
          onClose()
        }
      }}
    >
      <View
        style={styles.mainContainer}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={styles.image}
        />
        <Text
          style={styles.message}
        >
          {errorMessage}
        </Text>
      </View>
    </Modal>
  )
}

export default ErrorView
