import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { motion } from './tokens';

/**
 * Phản hồi khi bấm dùng chung cho toàn app: co nhẹ (scale 0.96), KHÔNG đổi
 * màu nền/chữ — theo quy tắc `stateRules.pressed` trong tokens.js.
 * Bọc quanh bất kỳ nút/card nào cần cảm giác bấm nhất quán.
 */
const PressScale = ({
  children,
  onPress,
  disabled,
  style,
  toScale = motion.pressScale.toScale,
  ...rest
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const animateTo = value => {
    Animated.timing(scale, {
      toValue: value,
      duration: motion.pressScale.duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => animateTo(toScale)}
      onPressOut={() => animateTo(1)}
      {...rest}
    >
      <Animated.View style={[style, { transform: [{ scale }] }, disabled && { opacity: 0.5 }]}>
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default PressScale;
