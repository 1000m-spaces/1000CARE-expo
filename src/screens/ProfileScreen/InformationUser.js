import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Icon } from '~/common/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

// Card tài khoản theo spec redesign: nền trắng, viền #EEF5F6, shadow "lifted".
// 2026-09-16: đổi hẳn sang hiển thị dữ liệu backend mới (`kyc` —
// GET /customer/v1/kyc, có `name`/`contact_phone` của nhà thuốc) thay vì
// avatar ảnh thật của backend NeoMed cũ (marketplace-core chưa có upload
// avatar) — dùng icon nhà thuốc thay ảnh đại diện.
const InformationUser = ({ kyc, debugKycStatus }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.avatar}>
        <Icon type="feather" name="shopping-bag" color={brandColors.tealPrimary} size={s(24)} />
      </View>
      <View style={styles.information}>
        <Text style={styles.fullName} numberOfLines={1}>{kyc?.name || 'Nhà thuốc'}</Text>
        <Text style={styles.username}>{kyc?.contact_phone || ''}</Text>
        {/* TẠM THỜI 2026-09-18 — debug bug "tên nhà thuốc không hiện",
            xoá dòng này sau khi xác định xong nguyên nhân. */}
        {!kyc?.name && (
          <Text style={styles.debugText}>Debug: kycStatus={String(debugKycStatus)}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(14),
    padding: s(16),
    margin: s(16),
    marginBottom: s(0),
    backgroundColor: brandColors.surface,
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  avatar: {
    width: s(56),
    height: s(56),
    borderRadius: s(28),
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealLight,
  },
  information: {
    flex: 1,
  },
  fullName: {
    fontFamily: Fonts.bold,
    fontSize: fs(15),
    fontWeight: 'normal',
    color: brandColors.textDark,
  },
  username: {
    marginTop: s(2),
    fontSize: fs(12.5),
    fontWeight: 'normal',
    color: brandColors.muted,
  },
  debugText: {
    marginTop: s(4),
    fontSize: fs(10.5),
    color: brandColors.danger,
    fontWeight: '600',
  },
})

export default InformationUser
