import React, { useEffect, useState } from 'react'
import { Alert, View, StyleSheet, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import strings from '~/i18n'
import {
  NAVIGATION_INFO_CUSTOMER, NAVIGATION_REFERRAL_SCREEN, NAVIGATION_TO_SPLASH_SCREEN,
  NAVIGATION_LIST_NOTI_SCREEN, NAVIGATION_VOUCHER, NAVIGATION_WALLET, NAVIGATION_FAVOURITE_SUPPLIER, NAVIGATION_AUTHORITY
} from '~/navigation/routes'
import { logout, resetCart } from '~/store/actions'
import { getAuthStore } from '~/store/selector'
import { safety_certificate, poweroff, mail, credit_card, group_people, gift, account, heart, exception } from '../../assets/constants'
import packageJson from '../../../package.json'

import MenuItem from './MenuItem'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, liquidGlass } from '~/design-system/tokens'

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
      background: 'rgba(255, 153, 0, 0.1)',
      icon: account,
      colorIcon: '#FF9900',
      routePath: NAVIGATION_INFO_CUSTOMER,
      isClickAvailable: true,
    },
    {
      text: 'Voucher của bạn',
      background: 'rgba(245, 34, 45, 0.1)',
      icon: gift,
      colorIcon: 'rgba(245, 34, 45, 1)',
      routePath: NAVIGATION_VOUCHER,
      icon1: 'gift',
      type: 'feather',
      isClickAvailable: true,
    },
    {
      text: 'Điểm mua hàng',
      background: 'rgba(0, 149, 217, 0.1)',
      icon: credit_card,
      colorIcon: 'rgba(0, 149, 217, 1)',
      routePath: NAVIGATION_WALLET,
      isClickAvailable: true,
    },
    {
      text: strings.profileScreen.notification,
      background: 'rgba(196, 29, 127, 0.1)',
      icon: mail,
      colorIcon: 'rgba(196, 29, 127, 1)',
      routePath: NAVIGATION_LIST_NOTI_SCREEN,
      isClickAvailable: true,
      // routePath: ''
    },
    {
      text: 'Người giới thiệu',
      background: 'rgba(196, 29, 127, 0.1)',
      icon: group_people,
      colorIcon: '#C41D7F',
      routePath: NAVIGATION_REFERRAL_SCREEN,
      isClickAvailable: true,
    },
    {
      text: 'Nhà cung cấp yêu thích',
      background: 'rgba(245, 34, 45, 0.1)',
      icon: heart,
      icon1: 'heart',
      type: 'feather',
      // colorIcon: '#272C44',
      colorIcon: 'rgba(245, 34, 45, 1)',
      routePath: NAVIGATION_FAVOURITE_SUPPLIER,
      isClickAvailable: true,
    },
    {
      text: 'Ủy quyền',
      background: '#F9FBE7',
      // icon: heart,
      icon: exception,
      // type: 'feather',
      // colorIcon: '#272C44',
      colorIcon: '#827717',
      routePath: NAVIGATION_AUTHORITY,
      isClickAvailable: true,
    },
    {
      text: strings.profileScreen.help,
      background: 'rgba(25, 200, 116, 0.1)',
      icon: safety_certificate,
      colorIcon: 'rgba(25, 200, 116, 1)',
      isClickAvailable: true,
      routePath: '',
    },
    // {
    //   text: strings.profileScreen.language'),
    //   background: 'rgba(19, 194, 194, 0.1)',
    //   icon: global,
    //   colorIcon: 'rgba(19, 194, 194, 1)',
    //   routePath: '',
    // },
  ]

  if (isLoggedIn) {
    data.push({
      text: strings.profileScreen.logout,
      background: 'rgba(109, 148, 245, 0.1)',
      icon: poweroff,
      colorIcon: 'rgba(109, 148, 245, 1)',
      onPress: () => onLogoutPress(),
      routePath: '',
      isClickAvailable: true,
    })
  }

  return (
    <View style={styles.wrapper}>
      {data.map((item, index) => (
        <MenuItem
          key={index}
          data={item}
          navigation={navigation}
          isLoggedIn={isLoggedIn}
          onShowMessage={onShowMessage}
          lengthNotiNonRead={lengthNotiNonRead}
        />
      ))}
      <Text
        style={{
          textAlign: 'center',
          width: '100%',
          color: brandColors.muted,
          fontSize: fs(12),
        }}
      >{`Version: ${versionApp}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flexGrow: 1,
    paddingBottom: s(20),
    marginTop: s(4),
    marginHorizontal: s(16),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    borderRadius: s(24),
    overflow: 'hidden',
    ...brandShadow.soft,

    borderTopColor: brandColors.borderSoft,
    borderTopWidth: 0,
    borderStyle: 'solid',
  },
})

export default MenuUser
