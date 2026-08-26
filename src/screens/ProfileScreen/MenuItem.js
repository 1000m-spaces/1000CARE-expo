import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Image, Icon } from '~/common/index'
import { user } from '~/assets/constants'
import strings from '~/i18n'
import { getListNoti } from '~/store/actions'
import { useDispatch } from 'react-redux'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import PressScale from '~/design-system/PressScale'

const MenuItem = ({ data, navigation, isLoggedIn, onShowMessage, lengthNotiNonRead }) => {
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
      <View style={styles.wrapper}>
        <View style={[styles.wrapperIcon, { backgroundColor: data.background }]}>
          {
            data.icon1 ?
              <Icon
                size={24}
                name={data.icon1}
                type={data.type}
                color={data.colorIcon}
              />
              :
              <Image
                style={styles.icon}
                source={data.icon}
                errorImage={user}
                tintColor={data.colorIcon}
              />
          }
          {data.text == strings.profileScreen.notification && lengthNotiNonRead != 0 ?
            <View style={styles.viewNonNoti}>
              <Text style={{ color: brandColors.surface, fontSize: fs(10), fontWeight: '600' }}>{lengthNotiNonRead >= 100 ? '99+' : lengthNotiNonRead}</Text>
            </View>
            : undefined
          }
        </View>
        <Text style={styles.text}>{data.text}</Text>
      </View>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingHorizontal: s(18),
    paddingVertical: s(12),
    backgroundColor: 'transparent',

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperIcon: {
    width: s(42),
    height: s(42),
    borderRadius: s(16),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: s(24),
    height: s(24),
  },
  text: {
    marginLeft: s(12),
    fontSize: fs(14),
    color: brandColors.textDark,
    fontWeight: 'normal',
  },
  viewNonNoti: {
    position: 'absolute',
    top: -s(6),
    right: -s(6),
    backgroundColor: brandColors.danger,
    borderRadius: s(11),
    minWidth: s(22),
    height: s(22),
    paddingHorizontal: s(4),
    borderWidth: 2,
    borderColor: brandColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default MenuItem
