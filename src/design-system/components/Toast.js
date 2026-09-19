import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE". Đây là component
// HIỂN THỊ INLINE (tone + message dạng banner), khác với
// `~/utils/toast.js` đã có sẵn trong repo (gọi `react-native-simple-toast`
// để hiện toast nổi kiểu Android/hệ thống, không nhận `tone`). Hai thứ
// phục vụ mục đích khác nhau — không hợp nhất. Giữ nguyên tên prop
// `tone`/`message`.
export function Toast({ tone = 'info', message }) {
  const toneStyle = TONES[tone] || TONES.info;
  return (
    <View style={[styles.toast, toneStyle.container]}>
      <Text style={[styles.message, toneStyle.text]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: careRadius.md,
    borderWidth: 1,
    paddingVertical: careSpacing.space3,
    paddingHorizontal: careSpacing.space4,
  },
  message: {
    fontSize: 14,
  },
});

const TONES = {
  success: StyleSheet.create({
    container: { backgroundColor: semantic.successBg, borderColor: semantic.success },
    text: { color: semantic.success },
  }),
  warning: StyleSheet.create({
    container: { backgroundColor: semantic.warningBg, borderColor: semantic.warning },
    text: { color: semantic.warning },
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: semantic.dangerBg, borderColor: semantic.danger },
    text: { color: semantic.danger },
  }),
  info: StyleSheet.create({
    container: { backgroundColor: semantic.infoBg, borderColor: semantic.info },
    text: { color: semantic.info },
  }),
};

export default Toast;
