import React from 'react';
import {View, StyleSheet} from 'react-native';

import PressScale from '~/design-system/PressScale';
import {DIMENS} from '../../constants';
import { s } from '~/utils/responsive';
import { brandShadow, liquidGlass, radiusScale } from '~/design-system/tokens';

const OUTLINE = 'outline';
const CLEAR = 'clear';
const SHADOW = 'shadow';

const Card = ({
  type = OUTLINE,
  style = {},
  onPress = null,
  disabled = false,
  children,
}) => {
  const shadow = type === SHADOW ? shadowStyle() : {};
  const content = (
    <View
      style={StyleSheet.flatten([
        styles.container(type),
        shadow,
        style,
      ])}>
      {children}
    </View>
  );

  // Bấm được => phản hồi scale(0.96) dùng chung (stateRules.pressed),
  // không dùng ripple/opacity mặc định để nhất quán với nút/component khác.
  if (onPress) {
    return (
      <PressScale onPress={onPress} disabled={disabled}>
        {content}
      </PressScale>
    );
  }

  return content;
};

const shadowStyle = () => ({
  ...brandShadow.soft,
});

const styles = {
  container: (type) => ({
    borderWidth: type === OUTLINE ? DIMENS.common.borderWidth : 0,
    borderColor: liquidGlass.border,
    borderRadius: s(radiusScale.xxxl),
    backgroundColor: liquidGlass.background,
  }),
};

export default Card;
