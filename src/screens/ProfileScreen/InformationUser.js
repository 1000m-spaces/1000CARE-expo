import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import { avt_dafault } from '../../assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

const InformationUser = ({ user, navigation }) => {
  return (
    <View
      style={styles.wrapper}
    >
      <View style={styles.topRow}>
        <Image
          style={styles.avatar}
          source={user?.avatar_url && user?.avatar_url !== '' ? {
            uri: user?.avatar_url,
          }: avt_dafault}
          errorImage={avt_dafault}
        />
        <View style={styles.information}>
          <Text style={styles.eyebrow}>TÀI KHOẢN 1000CARE</Text>
          <Text style={styles.fullName}>{user?.username}</Text>
          <Text style={styles.username}>{user?.mobile}</Text>
        </View>
      </View>
      <View style={styles.memberStrip}>
        <View>
          <Text style={styles.memberLabel}>Trạng thái</Text>
          <Text style={styles.memberValue}>Đã xác thực</Text>
        </View>
        <View style={styles.memberBadge}>
          <Text style={styles.memberBadgeText}>ACTIVE</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: s(18),
    margin: s(16),
    backgroundColor: brandColors.textDark,
    borderRadius: s(28),
    ...brandShadow.soft,
  },
  topRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: s(64),
    height: s(64),
    borderRadius: s(32),
    flexShrink: 0,
    borderWidth: 3,
    borderColor: brandColors.tealLight,
  },
  information: {
    marginLeft: s(12),
    flex: 1,
  },
  eyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.4,
    color: brandColors.goldAccent,
  },
  fullName: {
    marginTop: s(4),
    fontSize: fs(18),
    fontWeight: '600',
    color: brandColors.surface,
  },
  username: {
    marginTop: s(4),
    fontSize: fs(12),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.64)',
  },
  memberStrip: {
    marginTop: s(18),
    borderRadius: s(20),
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    padding: s(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  memberLabel: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.56)',
  },
  memberValue: {
    marginTop: s(2),
    fontSize: fs(14),
    lineHeight: fs(18),
    fontWeight: '600',
    color: brandColors.surface,
  },
  memberBadge: {
    borderRadius: s(999),
    paddingHorizontal: s(10),
    paddingVertical: s(6),
    backgroundColor: brandColors.tealLight,
  },
  memberBadgeText: {
    fontSize: fs(10),
    lineHeight: fs(13),
    fontWeight: '600',
    color: brandColors.tealDark,
  },
})

export default InformationUser
