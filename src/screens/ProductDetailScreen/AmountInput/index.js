import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

// Bộ đếm số lượng theo spec redesign: nền xám nhạt bo tròn, 2 nút tròn
// trắng nổi nhẹ (không viền), số ở giữa cho phép gõ trực tiếp (tính năng
// có sẵn của app, mock chỉ hiện số tĩnh).
const AmountInput = ({
  onChangeText,
  onEndEditing,
  onPlus,
  onMinus,
  value,
  keyboardType,
}) => {
  return (
    <View style={styles.wrap}>
      <PressScale
        onPress={onMinus}
        style={styles.btn}
      >
        <View style={styles.minusMark} />
      </PressScale>
      <TextInput
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        keyboardType={keyboardType}
        value={value}
        style={styles.input}
      />
      <PressScale
        onPress={onPlus}
        style={styles.btn}
      >
        <View style={styles.plusMarkH} />
        <View style={styles.plusMarkV} />
      </PressScale>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    backgroundColor: '#F4F9F9',
    borderRadius: s(14),
    paddingHorizontal: s(10),
    paddingVertical: s(6),
  },
  btn: {
    width: s(28),
    height: s(28),
    borderRadius: s(8),
    backgroundColor: brandColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  minusMark: {
    width: s(11),
    height: 1.6,
    backgroundColor: brandColors.tealPrimary,
  },
  plusMarkH: {
    position: 'absolute',
    width: s(11),
    height: 1.6,
    backgroundColor: brandColors.tealPrimary,
  },
  plusMarkV: {
    position: 'absolute',
    width: 1.6,
    height: s(11),
    backgroundColor: brandColors.tealPrimary,
  },
  input: {
    minWidth: s(28),
    padding: 0,
    textAlign: 'center',
    fontSize: fs(15),
    fontWeight: '700',
    color: brandColors.textDark,
  },
})

export default AmountInput
