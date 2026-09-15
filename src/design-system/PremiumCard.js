import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import { Text } from '~/common';
import { s, fs } from '../utils/responsive';
import { brandColors, brandGradients, brandShadow, radiusScale } from './tokens';
import { Fonts } from '~/assets/config';
import PressScale from './PressScale';

const { width } = Dimensions.get('window');

// "Hero card" theo design system mới: nền màu ĐẶC (--ink), không
// gradient — giữ prop `colors` cho tương thích ngược, chỉ lấy màu đầu
// tiên của mảng.
const PremiumCard = ({
  title,
  subtitle,
  onPress,
  colors = brandGradients.primary,
  image
}) => {
  const backgroundColor = colors[0] || brandColors.tealPrimary;
  return (
    <PressScale onPress={onPress} style={styles.wrapper}>
      <View style={[styles.card, { backgroundColor }]}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>

          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Khám phá</Text>
          </View>
        </View>

        {image && (
          <Image source={image} style={styles.cardImage} resizeMode="contain" />
        )}
      </View>
    </PressScale>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: s(12),
    ...brandShadow.button,
  },
  card: {
    width: width - s(32),
    height: s(150),
    borderRadius: s(24),
    padding: s(22),
    alignSelf: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 2,
  },
  textContainer: {
    maxWidth: '70%',
  },
  title: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontSize: fs(19),
    fontWeight: 'normal',
    lineHeight: s(25),
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontFamily: Fonts.base,
    fontSize: fs(13),
    marginTop: s(6),
    fontWeight: 'normal',
  },
  actionButton: {
    backgroundColor: brandColors.surface,
    paddingVertical: s(9),
    paddingHorizontal: s(18),
    borderRadius: s(radiusScale.pill),
    alignSelf: 'flex-start',
  },
  actionText: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontSize: fs(12.5),
    fontWeight: 'normal',
  },
  cardImage: {
    position: 'absolute',
    right: -s(10),
    bottom: -s(10),
    width: s(140),
    height: s(140),
    zIndex: 1,
    opacity: 0.8,
  },
});

export default PremiumCard;
