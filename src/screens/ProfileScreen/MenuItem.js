import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Image, Icon } from '~/common/index'
import { user } from '~/assets/constants'
import strings from '~/i18n'
import { getListNoti } from '~/store/actions'
import { useDispatch } from 'react-redux'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

const MenuItem = ({ data, navigation, isLoggedIn, onShowMessage, lengthNotiNonRead, isLast }) => {
  const dispatch = useDispatch()
  const getListNotiAll = () => {
    dispatch(getListNoti(10, 1, false))
  }
  return (
    <PressScale
      onPress={() => {
        if (!data.isClickAvailable) {
          return
        }
        if (!isLoggedIn) {
          onShowMessage(strings.common.requireLogin)
          return
        }
        if (data.text == strings.profileScreen.notification) {
          getListNotiAll()
        }
        if (data.routePath !== '') {
          if (data.onPress)
            data.onPress()
          navigation.push(data.routePath)
        } else if (data.onPress) {
          data.onPress()
        } else {
          onShowMessage('Feature is developping')
        }
      }}
    >
      <View style={[styles.wrapper, !isLast && styles.wrapperDivider]}>
        {
          data.icon1 ?
            <Icon
              size={18}
              name={data.icon1}
              type={data.type}
              color={brandColors.tealPrimary}
            />
            :
            <Image
              style={styles.icon}
              source={data.icon}
              errorImage={user}
              tintColor={brandColors.tealPrimary}
            />
        }
        <Text style={styles.text}>{data.text}</Text>
        {data.text == strings.profileScreen.notification && lengthNotiNonRead != 0 ? (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>{lengthNotiNonRead >= 100 ? '99+' : lengthNotiNonRead}</Text>
          </View>
        ) : null}
        <Text style={styles.chevron}>›</Text>
      </View>
    </PressScale>
  )
}

// Hàng menu phẳng theo spec redesign: icon nét mỏng màu teal thống nhất
// (bỏ chip nền màu riêng từng mục), có chevron cuối hàng, ngăn cách bằng
// đường kẻ mảnh thay vì để rời từng khối.
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: s(16),
    paddingVertical: s(14),
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
  },
  wrapperDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#F4F9F9',
  },
  icon: {
    width: s(18),
    height: s(18),
  },
  text: {
    flex: 1,
    fontFamily: Fonts.base,
    fontSize: fs(13.5),
    color: brandColors.textDark,
    fontWeight: '600',
  },
  chevron: {
    color: brandColors.mutedLight,
    fontSize: fs(16),
  },
  unreadBadge: {
    marginRight: s(4),
    minWidth: s(20),
    height: s(20),
    borderRadius: s(999),
    paddingHorizontal: s(6),
    backgroundColor: brandColors.danger,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadBadgeText: {
    color: brandColors.surface,
    fontSize: fs(10.5),
    fontWeight: '700',
  },
})

export default MenuItem
