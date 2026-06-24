import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from '~/common/index';
import Modal from 'react-native-modal';

import styles from './styles';
import { close, close_white, shopping_cart_white, successPay } from '~/assets/constants';
import Colors from '~/common/Colors/Colors';
import strings from '~/i18n';
import {
  info,
} from '~/assets/constants';

const DialogInfo = ({ isOpen, isError, closeModal, isLoading, isOrder, message, icon = info, custom = false, children }) => {
  if (isLoading) {
    return null;
  }

  const bodyComponent = () => {
    if (isError) {
      return (
        <View
          style={styles.errorViewMainContainer}
        >
          <Image
            source={icon}
            resizeMode="contain"
            style={styles.image}
          />
          <Text
            style={styles.errorMessage}
          >
            {message}
          </Text>
        </View>
      );
    }

    return (
      <View
        style={styles.mainContainer}
      >
        <TouchableOpacity
          style={styles.closeBtnContainer}
          onPress={closeModal}
        >
          <Image
            style={styles.closeBtn}
            resizeMode={'contain'}
            source={close}
          />
        </TouchableOpacity>
        <View
          style={styles.contentContainer}
        >
          <View
            style={[styles.bigCircle, isError ? { backgroundColor: 'rgba(245, 34, 45, 0.25)' } : { backgroundColor: 'rgba(77, 221, 138, 0.5)' }]}
          >
            <View
              style={[styles.smallCircle, isError ? { backgroundColor: Colors.errorColor } : { backgroundColor: '#4DDD8A' }]}
            >
              {isOrder ?
                <Image
                  resizeMode={'contain'}
                  source={isError ? close_white : shopping_cart_white}
                />
                :
                <Image
                  resizeMode={'contain'}
                  source={isError ? close_white : successPay}
                />
              }
            </View>
          </View>
          {!isLoading && (
            <Text style={styles.contentTitle}>{isError ? strings.Confirm.messageCheckoutFailed : strings.Confirm.messageSuccess}</Text>
          )}
        </View>
      </View>
    );
  };

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
      style={styles.modal}
      avoidKeyboard={false}
      hideModalContentWhileAnimating
      useNativeDriver={true}
      onRequestClose={closeModal}
      onModalHide={closeModal}
      onBackdropPress={() => {
        if (isError && closeModal) {
          closeModal();
        }
      }}
    >
      {custom ? children : bodyComponent()}
    </Modal>
  );
};

export default DialogInfo;
