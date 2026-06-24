import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '~/common';
import { s, fs } from '../utils/responsive';
import { brandColors, brandGradients, brandShadow } from './tokens';
import { Fonts } from '~/assets/config';

const { width } = Dimensions.get('window');

const PremiumCard = ({ 
  title, 
  subtitle, 
  onPress, 
  colors = brandGradients.primary,
  image 
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.wrapper}>
      <LinearGradient
        colors={colors}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
          
          <TouchableOpacity style={styles.actionButton} onPress={onPress}>
            <Text style={styles.actionText}>Khám phá</Text>
          </TouchableOpacity>
        </View>

        {image && (
          <Image source={image} style={styles.cardImage} resizeMode="contain" />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: s(12),
    ...brandShadow.teal,
  },
  card: {
    width: width - s(32),
    height: s(160),
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
    fontSize: fs(22),
    fontWeight: 'normal',
    lineHeight: s(28),
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.88)',
    fontFamily: Fonts.base,
    fontSize: fs(14),
    marginTop: s(6),
    fontWeight: 'normal',
  },
  actionButton: {
    backgroundColor: brandColors.surface,
    paddingVertical: s(10),
    paddingHorizontal: s(20),
    borderRadius: s(15),
    alignSelf: 'flex-start',
  },
  actionText: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontSize: fs(13),
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
