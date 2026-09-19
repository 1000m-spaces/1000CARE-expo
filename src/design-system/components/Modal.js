import React from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE", dựng trên `Modal`
// gốc của RN. Giữ nguyên tên prop `open`/`title`/`onClose`/`footer`/
// `children`. README gốc ghi rõ giới hạn: chưa có focus trap/khoá scroll
// nền — bản RN này cũng không có tương đương (RN không có "scroll nền"
// theo nghĩa DOM).
export function Modal({ open, title, onClose, footer, children }) {
  if (!open) return null;
  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal} onStartShouldSetResponder={() => true}>
          {title ? <Text style={styles.header}>{title}</Text> : null}
          <View style={styles.body}>{children}</View>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </View>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(23,19,31,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: semantic.bgSurface,
    borderRadius: careRadius.lg,
    padding: careSpacing.space6,
    maxWidth: 420,
    width: '90%',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: semantic.textPrimary,
    marginBottom: careSpacing.space3,
  },
  body: {
    marginBottom: careSpacing.space5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: careSpacing.space3,
  },
});

export default Modal;
