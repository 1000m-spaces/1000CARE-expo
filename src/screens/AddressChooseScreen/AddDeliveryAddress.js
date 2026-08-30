import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import strings from '~/i18n'
import PressScale from '~/design-system/PressScale'
import { brandColors, radiusScale } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'

// Hàng "Thêm địa chỉ mới" theo spec: viền đứt nét teal trên nền tealLight
// + chấm tròn "+" teal, thay cho hàng trắng phẳng cũ.
const AddDeliveryAddress = ({ onPress }) => {
  return (
    <PressScale
      style={styles.wrap}
      onPress={onPress}
    >
      <View style={styles.plusDot}>
        <Text style={styles.plusText}>+</Text>
      </View>
      <Text style={styles.text}>{strings.addressChoose.addAddressTitle}</Text>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    backgroundColor: brandColors.tealLight,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: brandColors.tealPrimary,
    borderRadius: s(radiusScale.xxl),
    padding: s(14),
    marginBottom: s(14),
  },
  plusDot: {
    width: s(30),
    height: s(30),
    borderRadius: s(15),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: brandColors.surface,
    fontSize: fs(16),
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
  },
  text: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(13),
  },
})

export default AddDeliveryAddress
