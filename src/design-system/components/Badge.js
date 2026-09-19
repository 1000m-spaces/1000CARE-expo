import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE". Giữ nguyên tên
// prop `tone`/`children`.
export function Badge({ tone = 'info', children }) {
  const toneStyle = TONES[tone] || TONES.info;
  return (
    <View style={[styles.badge, toneStyle.container]}>
      <Text style={[styles.text, toneStyle.text]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: careRadius.full,
    paddingVertical: 2,
    paddingHorizontal: careSpacing.space3,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

const TONES = {
  success: StyleSheet.create({
    container: { backgroundColor: semantic.successBg },
    text: { color: semantic.success },
  }),
  warning: StyleSheet.create({
    container: { backgroundColor: semantic.warningBg },
    text: { color: semantic.warning },
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: semantic.dangerBg },
    text: { color: semantic.danger },
  }),
  info: StyleSheet.create({
    container: { backgroundColor: semantic.infoBg },
    text: { color: semantic.info },
  }),
};

export default Badge;
