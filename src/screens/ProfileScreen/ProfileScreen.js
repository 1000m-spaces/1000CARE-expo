import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { getProfile, getListNoti } from '~/store/actions'
import { getAuthStore, getUser, isGetListNotiNonRead } from '~/store/selector'
import InformationUser from './InformationUser'
import MenuUser from './MenuUser'
import NoAuth from './NoAuth'
import ErrorView from '~/common/ErrorView/index'
import { check_info } from '~/assets/constants'
import { s } from '~/utils/responsive'
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext'
import AppBackground from '~/design-system/AppBackground'

const ProfileScreen = props => {
  const { handleScroll } = useTabBarVisibility()
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('')

  const { isLoggedIn } = useSelector(state => getAuthStore(state))
  const listNotiNonRead = useSelector(state => isGetListNotiNonRead(state))

  const dispatch = useDispatch()
  const user = useSelector(state => getUser(state))

  useEffect(() => {
    dispatch(getProfile())
    dispatch(getListNoti(0, 1, false, 0))
  }, [])

  const onShowMessage = (msg) => {
    setMessage(msg)
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 2000)
  }

  return (
    <AppBackground>
    <ScrollView
      style={{ backgroundColor: 'transparent' }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: s(112) }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {
        isLoggedIn ? (
          <InformationUser
            navigation={props.navigation}
            user={user}
          />
        ) :
          (
            <NoAuth navigation={props.navigation} />
          )
      }
      <MenuUser
        onShowMessage={(msg) => onShowMessage(msg)}
        navigation={props.navigation}
        listNotiNonRead={listNotiNonRead}
      />
      <ErrorView
        error={message}
        isOpen={openMessage}
        icon={check_info}
        onClose={() => setOpenMessage(false)}
      />
    </ScrollView>
    </AppBackground>
  )
}
export default ProfileScreen
