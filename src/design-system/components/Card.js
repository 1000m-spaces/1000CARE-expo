import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE". Giữ nguyên tên
// prop `title`/`children`.
export function Card({ title, children }) {
  return (
    <View style={styles.card}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: semantic.bgSurface,
    borderWidth: 1,
    borderColor: semantic.border,
    borderRadius: careRadius.lg,
    padding: careSpacing.space5,
    shadowColor: '#262135',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: semantic.textPrimary,
    marginBottom: careSpacing.space2,
  },
});

export default Card;
