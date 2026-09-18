import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { getKycV2 as getKycV2Action, getNotificationsV2 as getNotificationsV2Action } from '~/store/authV2/authV2Actions'
import { getIsLoggedInV2, getKycV2, getKycV2Status, getKycV2Err, getNotificationsV2 } from '~/store/authV2/authV2Selector'
import InformationUser from './InformationUser'
import MenuUser from './MenuUser'
import NoAuth from './NoAuth'
import ErrorView from '~/common/ErrorView/index'
import { check_info } from '~/assets/constants'
import { s } from '~/utils/responsive'
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext'
import AppBackground from '~/design-system/AppBackground'

// Header tài khoản giờ dùng identity backend mới (marketplace-core/
// AuthV2) — 2026-09-16, cùng đợt thay hẳn Home/Đơn hàng/Giỏ hàng. `kyc`
// (GET /customer/v1/kyc) có sẵn `name`/`contact_phone` của nhà thuốc,
// dùng làm tên/SĐT hiển thị thay vì `user` (backend NeoMed cũ, luôn
// rỗng vì đăng nhập giờ qua AuthV2, không còn ghi vào `auth`/`user`
// reducer cũ). Xem [[marketplace-core-business-model]].
const ProfileScreen = props => {
  const { handleScroll } = useTabBarVisibility()
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('')

  const isLoggedIn = useSelector(state => getIsLoggedInV2(state))
  const notificationsV2 = useSelector(state => getNotificationsV2(state))
  const listNotiNonRead = notificationsV2.filter(n => !n.read_at)

  const dispatch = useDispatch()
  const kyc = useSelector(state => getKycV2(state))
  // TẠM THỜI 2026-09-18 — debug bug "tên nhà thuốc không hiện" (sếp báo
  // vào được Tài khoản nhưng tên vẫn ghi chung chung "Nhà thuốc"), xoá
  // sau khi xác định xong nguyên nhân.
  const kycStatus = useSelector(state => getKycV2Status(state))
  const kycErr = useSelector(state => getKycV2Err(state))

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getKycV2Action())
      dispatch(getNotificationsV2Action())
    }
  }, [isLoggedIn])

  // Tự tải lại KYC mỗi lần quay lại tab này — phòng trường hợp lần gọi
  // đầu (lúc mount) bị lỗi mạng thoáng qua và không có cách nào tự hồi
  // phục trước đây (ScrollView không kéo-để-làm-mới).
  useFocusEffect(
    useCallback(() => {
      if (isLoggedIn) {
        dispatch(getKycV2Action())
      }
    }, [isLoggedIn]),
  )

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
            kyc={kyc}
            debugKycStatus={kycStatus}
            debugKycErr={kycErr}
            onRetryKyc={() => dispatch(getKycV2Action())}
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
