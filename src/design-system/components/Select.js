import React, { useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { careRadius, careSpacing, semantic } from './tokens';

// Chuyển từ `bundle.js` của Design System "1000CARE". RN không có
// `<select>` gốc nên đây là một field bấm mở `Modal` liệt kê `options`
// (giống `~/common/ModalSelect` đã có trong repo, nhưng tách riêng theo
// API của design system 1000CARE). Giữ nguyên tên prop `label`/`value`/
// `options`/`error`/`helperText`/`disabled`/`onChange`; `onChange` nhận
// thẳng `value` của option được chọn thay vì object `event`.
export function Select({ label, value, options = [], error, helperText, disabled, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((opt) => opt.value === value);

  return (
    <View style={styles.field}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={label}
        disabled={disabled}
        onPress={() => setOpen(true)}
        style={[styles.select, error && styles.selectError, disabled && styles.disabled]}
      >
        <Text style={selected ? styles.value : styles.placeholder}>
          {selected ? selected.label : 'Chọn...'}
        </Text>
      </Pressable>
      {helperText ? (
        <Text style={[styles.helper, error && styles.helperError]}>{helperText}</Text>
      ) : null}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <FlatList
              data={options}
              keyExtractor={(opt) => opt.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  onPress={() => {
                    onChange && onChange(item.value);
                    setOpen(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: careSpacing.space1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: semantic.textPrimary,
  },
  select: {
    paddingVertical: careSpacing.space2,
    paddingHorizontal: careSpacing.space3,
    borderRadius: careRadius.md,
    borderWidth: 1,
    borderColor: semantic.border,
    backgroundColor: semantic.bgSurface,
  },
  selectError: {
    borderColor: semantic.danger,
  },
  disabled: {
    opacity: 0.5,
  },
  value: {
    fontSize: 14,
    color: semantic.textPrimary,
  },
  placeholder: {
    fontSize: 14,
    color: semantic.textMuted,
  },
  helper: {
    fontSize: 12,
    color: semantic.textMuted,
  },
  helperError: {
    color: semantic.danger,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(23,19,31,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: semantic.bgSurface,
    borderRadius: careRadius.lg,
    maxHeight: '60%',
    width: '90%',
    paddingVertical: careSpacing.space2,
  },
  option: {
    paddingVertical: careSpacing.space3,
    paddingHorizontal: careSpacing.space4,
  },
  optionText: {
    fontSize: 14,
    color: semantic.textPrimary,
  },
});

export default Select;
