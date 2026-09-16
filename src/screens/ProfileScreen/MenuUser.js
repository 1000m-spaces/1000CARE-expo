import React, { useEffect, useState } from 'react'
import { Alert, View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import strings from '~/i18n'
import {
  NAVIGATION_INFO_CUSTOMER, NAVIGATION_REFERRAL_SCREEN, NAVIGATION_TO_SPLASH_SCREEN,
  NAVIGATION_LIST_NOTI_SCREEN, NAVIGATION_VOUCHER, NAVIGATION_WALLET, NAVIGATION_FAVOURITE_SUPPLIER, NAVIGATION_AUTHORITY,
  NAVIGATION_KYC_SUBMIT,
  NAVIGATION_MARKETER_LINKS,
  NAVIGATION_NOTIFICATIONS_V2,
} from '~/navigation/routes'
import { logout, resetCart } from '~/store/actions'
import { getAuthStore } from '~/store/selector'
import { safety_certificate, poweroff, mail, credit_card, group_people, gift, account, heart, exception } from '../../assets/constants'
import packageJson from '../../../package.json'

import MenuItem from './MenuItem'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

const MenuUser = ({ navigation, onShowMessage, listNotiNonRead }) => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector(state => getAuthStore(state))
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
            dispatch(logout())
          },
        },
      ],
    )
  }

  const data = [
    {
      text: 'Thông tin khách hàng',
      icon: account,
      routePath: NAVIGATION_INFO_CUSTOMER,
      isClickAvailable: true,
    },
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
      text: 'Thông báo (bản thử nghiệm mới)',
      icon: mail,
      routePath: NAVIGATION_NOTIFICATIONS_V2,
      isClickAvailable: true,
    },
    {
      text: 'Voucher của bạn',
      icon: gift,
      routePath: NAVIGATION_VOUCHER,
      icon1: 'gift',
      type: 'feather',
      isClickAvailable: true,
    },
    {
      text: 'Điểm mua hàng',
      icon: credit_card,
      routePath: NAVIGATION_WALLET,
      isClickAvailable: true,
    },
    {
      text: strings.profileScreen.notification,
      icon: mail,
      routePath: NAVIGATION_LIST_NOTI_SCREEN,
      isClickAvailable: true,
      // routePath: ''
    },
    {
      text: 'Người giới thiệu',
      icon: group_people,
      routePath: NAVIGATION_REFERRAL_SCREEN,
      isClickAvailable: true,
    },
    {
      text: 'Nhà cung cấp yêu thích',
      icon: heart,
      icon1: 'heart',
      type: 'feather',
      routePath: NAVIGATION_FAVOURITE_SUPPLIER,
      isClickAvailable: true,
    },
    {
      text: 'Ủy quyền',
      // icon: heart,
      icon: exception,
      // type: 'feather',
      routePath: NAVIGATION_AUTHORITY,
      isClickAvailable: true,
    },
    {
      text: strings.profileScreen.help,
      icon: safety_certificate,
      isClickAvailable: true,
      routePath: '',
    },
    // {
    //   text: strings.profileScreen.language'),
    //   icon: global,
    //   routePath: '',
    // },
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
