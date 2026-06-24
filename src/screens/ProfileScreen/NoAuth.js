import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Image } from '~/common/index'
import strings from '~/i18n'
import { NAVIGATION_PHONE_VERIFY, NAVIGATION_TO_LOGIN_SCREEN } from '~/navigation/routes'
import { user } from '../../assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

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
          <Text style={styles.eyebrow}>ACCOUNT ACCESS</Text>
          <Text style={styles.title}>Tài khoản 1000CARE</Text>
          <Text style={styles.textNotification}>
            {strings.profileScreen.noAuth.title}
          </Text>
        </View>
      </View>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={styles.btnSignIn}
          onPress={() => navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)}
        >
          <Text style={styles.textSignIn}>{strings.profileScreen.noAuth.login}</Text>
        </TouchableOpacity>
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
    padding: s(18),
    margin: s(16),
    backgroundColor: brandColors.textDark,
    borderRadius: s(28),
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
  eyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.4,
    color: brandColors.goldAccent,
  },
  title: {
    marginTop: s(4),
    fontSize: fs(20),
    lineHeight: fs(25),
    fontWeight: '600',
    color: brandColors.surface,
  },
  textNotification: {
    marginTop: s(6),
    fontSize: fs(13),
    lineHeight: fs(19),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.66)',

  },
  btnGroup: {
    marginTop: s(18),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSignIn: {
    width: '100%',
    height: s(54),
    borderRadius: s(18),
    backgroundColor: brandColors.goldAccent,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSignIn: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '600',
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
