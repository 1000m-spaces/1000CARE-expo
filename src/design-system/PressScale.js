import React, { useRef } from 'react';
import { Animated, Pressable } from 'react-native';
import { motion } from './tokens';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Phản hồi khi bấm dùng chung cho toàn app: co nhẹ (scale 0.96), KHÔNG đổi
 * màu nền/chữ — theo quy tắc `stateRules.pressed` trong tokens.js.
 * Bọc quanh bất kỳ nút/card nào cần cảm giác bấm nhất quán.
 *
 * Áp `style` trực tiếp lên AnimatedPressable (không còn bọc thêm 1 lớp
 * Animated.View con) — trước đây `style` (kể cả `flex:1`) chỉ được gán
 * cho View con nên các nút cần giãn full-width/flex trong hàng flex cha
 * (thanh tìm kiếm, nút CTA...) bị co lại theo nội dung thay vì giãn ra.
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
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => animateTo(toScale)}
      onPressOut={() => animateTo(1)}
      style={[style, { transform: [{ scale }] }, disabled && { opacity: 0.5 }]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
};

export default PressScale;
