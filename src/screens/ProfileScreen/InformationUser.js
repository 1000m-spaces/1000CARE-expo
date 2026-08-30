import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import { avt_dafault } from '../../assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'
import { NAVIGATION_UPDATE_PROFILE } from '~/navigation/routes'

// Card tài khoản theo spec redesign: nền trắng, viền #EEF5F6, shadow "lifted"
// (thay panel tối trước đó). Vẫn giữ avatar ảnh thật (tính năng có sẵn) thay
// vì chữ cái viết tắt trong bản mock, vì app đã hỗ trợ upload ảnh đại diện.
const InformationUser = ({ user, navigation }) => {
  return (
    <View style={styles.wrapper}>
      <Image
        style={styles.avatar}
        source={user?.avatar_url && user?.avatar_url !== '' ? {
          uri: user?.avatar_url,
        } : avt_dafault}
        errorImage={avt_dafault}
      />
      <View style={styles.information}>
        <Text style={styles.fullName} numberOfLines={1}>{user?.username}</Text>
        <Text style={styles.username}>{user?.mobile}</Text>
      </View>
      <PressScale onPress={() => navigation.navigate(NAVIGATION_UPDATE_PROFILE)}>
        <Text style={styles.editLink}>Sửa</Text>
      </PressScale>
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
  editLink: {
    fontFamily: Fonts.bold,
    fontSize: fs(12),
    fontWeight: 'normal',
    color: brandColors.tealPrimary,
  },
})

export default InformationUser
