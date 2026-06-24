import React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Colors from '../Colors/Colors';

const {height: screenHeight} = Dimensions.get('window');

const BottomSheet = ({
  title,
  children,
  snap, // We'll use this to control visibility in a simple way
  onClose,
  ...otherProps
}) => {
  const isVisible = typeof snap === 'number' ? snap > 0 : false;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      {...otherProps}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.dragIndicator} />
          {title && (
            <View style={styles.titleContainer}>
              {typeof title === 'string' ? (
                <Text style={styles.titleText}>{title}</Text>
              ) : (
                title
              )}
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Icon
                  name="close"
                  size={24}
                  color={Colors.gray}
                  type="material-community"
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: screenHeight * 0.9,
    paddingBottom: 20,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 10,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  closeButton: {
    padding: 5,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});

export default BottomSheet;
