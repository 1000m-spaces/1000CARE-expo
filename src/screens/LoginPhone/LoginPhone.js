import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import PressScale from '~/design-system/PressScale';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import { loginV2, resetLoginV2 } from '~/store/authV2/authV2Actions';
import {
  getLoginV2Status,
  getLoginV2Err,
  getMembershipsV2Status,
  getMembershipsV2,
} from '~/store/authV2/authV2Selector';
import ErrorView from '~/common/ErrorView';
import { Icon } from '~/common/index';
import AppBackground from '~/design-system/AppBackground';
import strings from '~/i18n';
// logoNeoMed (logo1000M.png) là logo công ty mẹ "1000M", có nền vuông
// teal ĐẶC luôn trong file ảnh — không phải logo 1000CARE. Dùng
// splash-logo-mark (mark trắng trong suốt, giống màn Splash) + tintColor
// để ra đúng logo 1000CARE, không còn bị vuông teal bao quanh.
const logo1000care = require('~/assets/configNeoMed/splash-logo-mark.png');
import { NAVIGATION_TO_MAIN_SCREEN, NAVIGATION_ACCOUNT_PENDING_APPROVAL } from '~/navigation/routes';
import Status from '~/common/Status/Status';
import { Fonts } from '~/assets/config';
import { brandColors, brandGradients, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Màn đăng nhập theo spec redesign: bố cục tối giản, canh giữa — thay cho
// card neumorphic to bản của bản premium trước đó.
// Ráp thật vào backend mới marketplace-core (auth/v1/login, phone+password
// — không còn OTP mỗi lần đăng nhập như luồng Firebase cũ) theo yêu cầu
// 2026-09-04. Xem [[marketplace-core-backend-migration]] trong memory:
// các API khác (sản phẩm/giỏ hàng/đơn hàng) vẫn ở backend cũ, không liên
// quan tới token đăng nhập này.
const LoginPhone = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginStatus = useSelector(state => getLoginV2Status(state));
  const loginErr = useSelector(state => getLoginV2Err(state));
  const membershipsStatus = useSelector(state => getMembershipsV2Status(state));
  const memberships = useSelector(state => getMembershipsV2(state));
  // Đăng nhập xong còn phải chờ check /auth/v1/memberships mới biết đi
  // đâu (Home hay màn chờ duyệt) — giữ nút ở trạng thái loading xuyên
  // suốt cả 2 bước cho mượt, tránh nhấp nháy giữa chừng.
  const loading = loginStatus === Status.LOADING || membershipsStatus === Status.LOADING;

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    if (loading) return;
    if (!phone || !password) {
      alert('Vui lòng nhập đầy đủ số điện thoại và mật khẩu');
      return;
    }
    dispatch(loginV2(phone, password));
  };

  useEffect(() => {
    if (membershipsStatus === Status.SUCCESS) {
      dispatch(resetLoginV2());
      const hasCustomer = Array.isArray(memberships?.customers) && memberships.customers.length > 0;
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: hasCustomer ? NAVIGATION_TO_MAIN_SCREEN : NAVIGATION_ACCOUNT_PENDING_APPROVAL }],
        }),
      );
    }
  }, [membershipsStatus, memberships]);

  return (
    <AppBackground>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.scrollContent}
      >
        <PressScale
          onPress={() => navigation.pop()}
          style={styles.backButton}
        >
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>

        <View style={styles.content}>
          <View style={styles.logoBadge}>
            <Image
              source={logo1000care}
              resizeMode="contain"
              style={[styles.logo, { tintColor: brandColors.tealPrimary }]}
            />
          </View>
          <Text style={styles.brandName}>1000CARE</Text>
          <Text style={styles.title}>{strings.loginScreen.title}</Text>

          <Text style={styles.inputLabel}>Số điện thoại</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="smartphone" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={phone}
              keyboardType="numeric"
              onChangeText={setPhone}
              placeholder="09xx xxx xxx"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <Text style={styles.inputLabel}>Mật khẩu</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="lock" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={brandColors.mutedLight}
              secureTextEntry
            />
          </View>

          <PressScale
            onPress={onLoginPress}
            disabled={loading}
            style={styles.loginButton}
          >
            <LinearGradient
              colors={loading ? [brandColors.border, brandColors.border] : brandGradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Đang xác thực...' : strings.common.login}
              </Text>
            </LinearGradient>
          </PressScale>

          <Text style={styles.registerLine}>
            Bạn chưa có tài khoản?{' '}
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              Đăng ký ngay
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>

      <ErrorView
        error={loginErr}
        isOpen={loginErr ? true : false}
        onClose={() => dispatch(resetLoginV2())}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  backButton: {
    marginTop: s(58),
    marginLeft: s(16),
  },
  backButtonGlass: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    ...brandShadow.soft,
  },
  content: {
    flex: 1,
    paddingHorizontal: s(24),
    paddingTop: s(20),
    paddingBottom: s(24),
    alignItems: 'center',
  },
  logoBadge: {
    width: s(96),
    height: s(96),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(10),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  brandName: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    color: brandColors.tealPrimary,
    fontSize: fs(20),
    marginBottom: s(24),
  },
  title: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    color: brandColors.textDark,
    fontSize: fs(18),
    marginBottom: s(24),
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'stretch',
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    color: brandColors.textDark,
    fontSize: fs(13),
    marginBottom: s(8),
  },
  inputOuter: {
    width: '100%',
    height: s(52),
    borderRadius: s(16),
    backgroundColor: '#F4F9F9',
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingHorizontal: s(16),
    marginBottom: s(24),
  },
  input: {
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '600',
    paddingVertical: 0,
  },
  loginButton: {
    width: '100%',
    borderRadius: s(16),
    overflow: 'hidden',
    marginBottom: s(18),
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  buttonGradient: {
    height: s(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(15),
  },
  registerLine: {
    color: brandColors.muted,
    fontSize: fs(13),
    textAlign: 'center',
  },
  registerLink: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
  },
});

export default LoginPhone;
