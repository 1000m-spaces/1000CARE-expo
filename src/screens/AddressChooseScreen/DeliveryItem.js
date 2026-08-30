import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'

// Card địa chỉ theo spec redesign: viền teal + shadow tint teal cho địa
// chỉ mặc định, viền xám nhạt cho địa chỉ thường — thay cho hàng full-
// width có icon bong bóng tím trước đó.
const DeliveryItem = ({ address, onPress, onChange, onDelete, onDefault }) => {
  const isDefault = address?.is_default

  return (
    <PressScale
      onPress={onPress}
      style={[styles.wrapper, isDefault ? styles.wrapperDefault : styles.wrapperPlain]}
    >
      <View style={styles.headerRow}>
        <Text style={styles.addressName} numberOfLines={1}>
          {address?.full_name} - {address?.telephone}
        </Text>
        {isDefault && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Mặc định</Text>
          </View>
        )}
      </View>
      <Text style={styles.addressText}>
        {address?.street} - {address?.ward.name} - {address?.district.name} - {address?.province.name}
      </Text>
      <View style={styles.buttonWrapper}>
        <View style={{ flexDirection: 'row', gap: s(14) }}>
          <PressScale onPress={onChange}>
            <Text style={styles.changeAddressText}>Thay đổi</Text>
          </PressScale>
          <PressScale onPress={onDelete}>
            <Text style={styles.deleteAddressText}>Xóa</Text>
          </PressScale>
        </View>
        {!isDefault && (
          <PressScale onPress={onDefault}>
            <Text style={styles.defaultAddressText}>Đặt làm mặc định</Text>
          </PressScale>
        )}
      </View>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: brandColors.surface,
    borderRadius: s(radiusScale.xxl),
    padding: s(14),
    marginBottom: s(12),
  },
  wrapperPlain: {
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  wrapperDefault: {
    borderWidth: 1.5,
    borderColor: brandColors.tealPrimary,
    ...brandShadow.softSelected,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    marginBottom: s(6),
  },
  addressName: {
    flexShrink: 1,
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(13.5),
  },
  badge: {
    backgroundColor: brandColors.tealLight,
    paddingHorizontal: s(8),
    paddingVertical: s(2),
    borderRadius: s(radiusScale.xs),
  },
  badgeText: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(10),
  },
  addressText: {
    color: brandColors.muted,
    fontSize: fs(12.5),
    lineHeight: fs(18),
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(10),
  },
  changeAddressText: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(12.5),
  },
  deleteAddressText: {
    color: brandColors.danger,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(12.5),
  },
  defaultAddressText: {
    color: brandColors.muted,
    fontSize: fs(12),
  },
})

export default DeliveryItem
