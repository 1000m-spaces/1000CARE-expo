import React from 'react'
import { Text, View } from 'react-native'
import { Image } from '~/common/index'
import Modal from 'react-native-modal'
import PressScale from '~/design-system/PressScale'

import styles from './styles'
import { close, close_white, shopping_cart_white } from '~/assets/constants'
import Colors from '~/common/Colors/Colors'

const StatusCheckoutDialog = ({ isOpen, isError, closeModal, orderId, distributorName }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      backdropColor="rgba(0, 0, 0, 0.25)"
      animationInTiming={500}
      animationOutTiming={500}
      backdropTransitionInTiming={200}
      backdropTransitionOutTiming={500}
      hasBackdrop={true}
      isVisible={isOpen}
      useNativeDriver={true}
      onRequestClose={closeModal}
      onModalHide={closeModal}
    >
      <View 
        style={styles.mainContainer}
      >
        <PressScale
          style={styles.closeBtnContainer}
          onPress={closeModal}
        >
          <Image
            style={styles.closeBtn}
            resizeMode={'contain'}
            source={close}
          />
        </PressScale>
        <View
          style={styles.contentContainer}
        >
          <View
            style={[styles.bigCircle, isError ? { backgroundColor: 'rgba(245, 34, 45, 0.25)' } : { backgroundColor: 'rgba(77, 221, 138, 0.5)' }]}
          >
            <View
              style={[styles.smallCircle, isError ? { backgroundColor: Colors.errorColor } : { backgroundColor: '#4DDD8A' }]}
            >
              {
                <Image
                  resizeMode={'contain'}
                  source={isError ? close_white : shopping_cart_white}
                />
              }
            </View>
          </View>
          <Text style={styles.message}>
            {'Đặt hàng tại Nhà cung cấp Traphaco thành công. Mã đơn hàng #12345'}
          </Text>
        </View>
      </View>
    </Modal>
  )
}

export default StatusCheckoutDialog