import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Rect } from 'react-native-svg';
import { backgroundWash } from './tokens';

/**
 * Nền "wash" mới của bản redesign — 3 quầng màu radial (teal/gold) mờ dần,
 * phủ phía sau toàn bộ nội dung màn hình thay cho nền phẳng cũ.
 * Dùng react-native-svg để dựng radial-gradient thật (RN không hỗ trợ
 * radial-gradient native cho background thường).
 */
const BackgroundWash = ({ style }) => {
  const { width, height } = useWindowDimensions();

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: backgroundWash.base }, style]}>
      <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          {backgroundWash.blobs.map((blob, index) => (
            <RadialGradient
              key={index}
              id={`wash-blob-${index}`}
              cx={blob.cx}
              cy={blob.cy}
              r={blob.r}
            >
              <Stop offset="0" stopColor={blob.color} />
              <Stop offset="1" stopColor={blob.color} stopOpacity="0" />
            </RadialGradient>
          ))}
        </Defs>
        {backgroundWash.blobs.map((_, index) => (
          <Rect key={index} x="0" y="0" width={width} height={height} fill={`url(#wash-blob-${index})`} />
        ))}
      </Svg>
    </View>
  );
};

export default BackgroundWash;
