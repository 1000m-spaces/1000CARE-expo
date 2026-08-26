import React, {useCallback, useEffect, useState, useReducer} from 'react';
import {
  Animated,
  Text,
  View,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Image} from '~/common/index';
import ViewOverflow from 'react-native-view-overflow';
import {minWidthDevice} from '../../assets/config';
import Colors from '../../common/Colors/Colors';
import {Rectangle_title, icon_close} from '../../assets/constants';
import PressScale from '~/design-system/PressScale';

const MyModal = props => {
  const AnimatedViewOverflow = Animated.createAnimatedComponent(ViewOverflow);
  const {isOpen, isClosableOutside, isShowClose, isShowTitle, isClosable} =
    props;
  let springValue = new Animated.Value(1);
  const [isRunSpring, setRunSpring] = useState(false);

  const spring = useCallback(() => {
    springValue.setValue(0.65);
    // setRunSpring(true);
    Animated.spring(springValue, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  });

  const closeModal = useCallback(() => {
    if (isClosable) {
      props.onClose();
    }
  });

  const closeFromOutside = useCallback(() => {
    if (isClosableOutside) {
      closeModal();
    }
  }, [isClosableOutside]);

  useEffect(() => {
    spring();
  }, []);

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="none"
      onPress={closeModal}
      onBackdropPress={closeModal}
      onRequestClose={closeModal}>
      {/* {isClosableOutside && ( */}
      <TouchableWithoutFeedback
        // onPress={Keyboard.dismiss}
        onPress={closeFromOutside}
        style={styles.container}>
        <ViewOverflow style={styles.overflow}>
          <ViewOverflow style={styles.overflow_inner}>
            <TouchableWithoutFeedback>
              <AnimatedViewOverflow
                style={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  transform: [{scale: 1}],
                }}>
                {isShowTitle && (
                  <View style={styles.title_container}>
                    <ImageBackground
                      style={styles.title_bg}
                      source={Rectangle_title}>
                      <Text style={styles.title}>{props.title}</Text>
                    </ImageBackground>
                  </View>
                )}

                {isShowClose && (
                  <PressScale
                    onPress={closeModal}
                    style={styles.btn_close}>
                    <Image source={icon_close} style={styles.img_close} />
                  </PressScale>
                )}
                {props.children}
              </AnimatedViewOverflow>
            </TouchableWithoutFeedback>
          </ViewOverflow>
        </ViewOverflow>
      </TouchableWithoutFeedback>
      {/* )} */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overflow: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.dim,
  },
  overflow_inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_container: {
    justifyContent: 'center',
    width: '90%',
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 50,
    position: 'relative',
    zIndex: 1,
  },
  title_bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: minWidthDevice ? 15 : 18,
    marginLeft: minWidthDevice ? 25 : 15,
    fontWeight: '600',
  },
  diamond_bg: {
    width: 80,
    height: 60,
    position: 'absolute',
    left: 10,
    top: 0,
    zIndex: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    resizeMode: 'stretch',
  },
  diamond_label: {color: Colors.diamond_label, fontWeight: '600'},
  diamond: {color: Colors.white, fontWeight: '600'},
  btn_close: {position: 'absolute', right: 18, top: -15, zIndex: 100},
  img_close: {width: 40, height: 40, resizeMode: 'contain'},
});

MyModal.defaultProps = {
  loading: false,
  onClose: () => {},
  title: '',
  isClosableOutside: false,
  isShowClose: false,
  isShowTitle: true,
  isShowDiamond: false,
  Diamonds: 0,
  isClosable: true,
};

export default MyModal;
