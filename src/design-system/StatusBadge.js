import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { s, fs } from '~/utils/responsive';
import { brandColors } from './tokens';
import { Fonts } from '~/assets/config';

const variants = {
  success: {
    backgroundColor: brandColors.successTint,
    borderColor: '#D1FAE5',
    color: brandColors.success,
  },
  warning: {
    backgroundColor: brandColors.warningTint,
    borderColor: '#FFE6B3',
    color: brandColors.warning,
  },
  danger: {
    backgroundColor: brandColors.dangerTint,
    borderColor: '#FFD4D0',
    color: brandColors.danger,
  },
  info: {
    backgroundColor: brandColors.tealLight,
    borderColor: '#C9E9ED',
    color: brandColors.tealDark,
  },
};

const StatusBadge = ({ text, variant = 'info', style }) => {
  const colors = variants[variant] || variants.info;

  return (
    <View style={[styles.badge, { backgroundColor: colors.backgroundColor }, style]}>
      <Text style={[styles.text, { color: colors.color }]} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Pill trạng thái full-round theo spec (radius 999, không viền).
  badge: {
    minHeight: s(24),
    borderRadius: s(999),
    paddingHorizontal: s(10),
    paddingVertical: s(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: Fonts.bold,
    fontSize: fs(11),
    fontWeight: 'normal',
  },
});

export default StatusBadge;
