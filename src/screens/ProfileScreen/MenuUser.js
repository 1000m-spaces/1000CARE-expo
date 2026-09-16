import React, { useEffect, useState } from 'react'
import { Alert, View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import strings from '~/i18n'
import {
  NAVIGATION_KYC_SUBMIT,
  NAVIGATION_MARKETER_LINKS,
  NAVIGATION_NOTIFICATIONS_V2,
} from '~/navigation/routes'
import { resetCart } from '~/store/actions'
import { logoutV2 } from '~/store/authV2/authV2Actions'
import { getIsLoggedInV2 } from '~/store/authV2/authV2Selector'
import { safety_certificate, poweroff, mail, group_people } from '../../assets/constants'
import packageJson from '../../../package.json'

import MenuItem from './MenuItem'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

// Danh sách menu — 2026-09-16: dọn sạch các mục dùng backend NeoMed cũ
// KHÔNG có tương đương ở marketplace-core (Thông tin khách hàng/Voucher/
// Điểm mua hàng/Người giới thiệu/Nhà cung cấp yêu thích/Ủy quyền — toàn
// bộ phụ thuộc session `auth` cũ giờ không còn được thiết lập nữa vì
// đăng nhập đi qua AuthV2, nên các màn đó sẽ luôn trống/lỗi nếu giữ lại).
// Chỉ giữ mục nào ĐÃ CÓ backend mới thật. Xem
// [[marketplace-core-business-model]].
const MenuUser = ({ navigation, onShowMessage, listNotiNonRead }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => getIsLoggedInV2(state))
  const [lengthNotiNonRead, setLengthNotiNonRead] = useState([])
  const versionApp = packageJson.version

  useEffect(() => {
    setLengthNotiNonRead(Array.isArray(listNotiNonRead) ? listNotiNonRead.length : 0)
  }, [listNotiNonRead])
  const onLogoutPress = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            dispatch(resetCart())
            // Đăng xuất phải dọn CẢ 2 phiên — trước đây chỉ dọn phiên
            // NeoMed cũ (`logout()`), phiên AuthV2 (backend mới, đang
            // dùng thật) vẫn còn nguyên, đăng xuất "giả" không dọn token.
            dispatch(logoutV2())
          },
        },
      ],
    )
  }

  const data = [
    {
      text: 'Xác thực hồ sơ (GPP)',
      icon: safety_certificate,
      routePath: NAVIGATION_KYC_SUBMIT,
      isClickAvailable: true,
    },
    {
      text: 'Liên kết Marketer',
      icon: group_people,
      routePath: NAVIGATION_MARKETER_LINKS,
      isClickAvailable: true,
    },
    {
      text: 'Thông báo',
      icon: mail,
      routePath: NAVIGATION_NOTIFICATIONS_V2,
      isClickAvailable: true,
    },
    {
      text: strings.profileScreen.help,
      icon: safety_certificate,
      isClickAvailable: true,
      routePath: '',
    },
  ]

  if (isLoggedIn) {
    data.push({
      text: strings.profileScreen.logout,
      icon: poweroff,
      onPress: () => onLogoutPress(),
      routePath: '',
      isClickAvailable: true,
    })
  }

  return (
    <View>
      <View style={styles.wrapper}>
        {data.map((item, index) => (
          <MenuItem
            key={index}
            data={item}
            navigation={navigation}
            isLoggedIn={isLoggedIn}
            onShowMessage={onShowMessage}
            lengthNotiNonRead={lengthNotiNonRead}
            isLast={index === data.length - 1}
          />
        ))}
      </View>
      <Text style={styles.version}>{`Phiên bản ${versionApp}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: s(16),
    marginHorizontal: s(16),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(20),
    overflow: 'hidden',
    ...brandShadow.soft,
  },
  version: {
    textAlign: 'center',
    width: '100%',
    marginTop: s(14),
    color: brandColors.mutedLight,
    fontSize: fs(11),
  },
})

export default MenuUser
