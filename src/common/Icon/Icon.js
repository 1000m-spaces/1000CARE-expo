import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ThemeContext} from '../../theme';
import {DIMENS} from '../../constants';
import getIconType from './helpers/getIconType';
import PressScale from '~/design-system/PressScale';

// Possible icon set supported by this Icon component
export const IconTypes = [
  'zocial',
  'octicon',
  'material',
  'material-community',
  'ionicon',
  'foundation',
  'evilicon',
  'entypo',
  'font-awesome',
  'font-awesome-5',
  'fontisto',
  'simple-line-icon',
  'feather',
  'antdesign',
];

const defaultProps = {
  name: '',
  type: 'material',
  onPress: null,
  disabled: false,
  size: DIMENS.common.iconSize,
  color: null,
  style: {},
};

const Icon = ({name, type, size, color, style, onPress, disabled}) => {
  const {theme} = useContext(ThemeContext);

  const Component = onPress ? PressScale : React.Fragment;

  const IconComponent = getIconType(type);

  return (
    <Component
      {...(onPress && {
        onPress,
        disabled,
      })}>
      <IconComponent
        testID="icon"
        size={size}
        name={name}
        color={disabled ? theme.disabledDarkColor : color || theme.iconColor}
        style={StyleSheet.flatten([styles.iconStyle, style])}
      />
    </Component>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    backgroundColor: 'transparent',
  },
});


Icon.defaultProps = defaultProps;

export default Icon;
