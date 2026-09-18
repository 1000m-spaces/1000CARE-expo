import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { Image } from '~/common/index'
import strings from '~/i18n'
import { NAVIGATION_PHONE_VERIFY, NAVIGATION_TO_LOGIN_SCREEN } from '~/navigation/routes'
import { user } from '../../assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

// Card trắng đúng theo hệ thống card mới (thay panel tối trước đó) — nút
// đăng nhập màu phẳng teal (bỏ hẳn gradient). `style` full-width phải
// gán thẳng lên PressScale (không phải lên View con) — xem ghi chú ở
// PressScale.js, nếu không nút sẽ co lại theo nội dung thay vì giãn hết
// hàng.
const NoAuth = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.notification}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.imageNotification}
            source={user}
          />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title}>Tài khoản 1000CARE</Text>
          <Text style={styles.textNotification}>
            {strings.profileScreen.noAuth.title}
          </Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <PressScale
          style={styles.btnSignIn}
          onPress={() => navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)}
        >
          <Text style={styles.textSignIn}>{strings.profileScreen.noAuth.login}</Text>
        </PressScale>
        {/* <TouchableOpacity
          style={styles.btnSignUp}
          onPress={() => navigation.navigate(NAVIGATION_PHONE_VERIFY, { title: strings.profileScreen.noAuth.register') })}
        >
          <Text style={styles.textSignUp}>{strings.profileScreen.noAuth.register')}</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: s(16),
    margin: s(16),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(20),
    ...brandShadow.soft,
  },
  notification: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageWrap: {
    width: s(52),
    height: s(52),
    borderRadius: s(18),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealLight,
  },
  imageNotification: {
    width: s(24),
    height: s(24),
    tintColor: brandColors.tealPrimary,
  },
  copy: {
    flex: 1,
    marginLeft: s(12),
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: fs(15),
    fontWeight: 'normal',
    color: brandColors.textDark,
  },
  textNotification: {
    marginTop: s(4),
    fontSize: fs(12.5),
    lineHeight: fs(17),
    fontWeight: 'normal',
    color: brandColors.muted,
  },
  btnGroup: {
    marginTop: s(16),
  },
  btnSignIn: {
    width: '100%',
    height: s(50),
    borderRadius: s(999),
    backgroundColor: brandColors.tealPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignIn: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontSize: fs(14),
    fontWeight: 'normal',
  },
  btnSignUp: {
    marginLeft: s(12),
    width: s(122),
    height: s(42),
    borderRadius: s(16),
    backgroundColor: brandColors.surface,

    borderColor: brandColors.tealPrimary,
    borderWidth: 1,
    borderStyle: 'solid',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignUp: {
    color: brandColors.tealPrimary,
    fontSize: fs(14),
    fontWeight: '600',
  },
})

export default NoAuth
