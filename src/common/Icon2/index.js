import React from 'react';

import icons from '~/assets/icons';
import Colors from '../Colors/Colors';
const Icon = ({name, color, size, ...props}) => {
  const IconSource = icons[name];
  const Svg = IconSource?.default || IconSource;

  if (!Svg) {
    return null;
  }

  const canRenderSvg = typeof Svg === 'function'
    || Boolean(Svg && typeof Svg === 'object' && (Svg.$$typeof || Svg.render));

  if (!canRenderSvg) {
    return null;
  }

  const colorProp = name.endsWith('outlined') ? {stroke: color} : {fill: color};

  return <Svg {...colorProp} width={size} height={size} {...props} />;
};

Icon.defaultProps = {
  color: Colors.systemColor2,
  size: 24,
};

export default Icon;
