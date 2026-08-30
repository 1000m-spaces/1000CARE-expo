import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import PressScale from '~/design-system/PressScale';
import LiquidGlassView from '~/design-system/LiquidGlassView';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import {
  loginByPhone,
  requestGetListPhoneByPassFirebase,
  resetLogin,
  resetLoginPhone,
} from '~/store/auth/authActions';
import {
  getErrMsg,
  getLoginPhoneStatus,
} from '~/store/auth/authSelector';
import ErrorView from '~/common/ErrorView';
import { Icon } from '~/common/index';
import AppBackground from '~/design-system/AppBackground';
import strings from '~/i18n';
import { logoNeoMed } from '~/assets/constants';
import { NAVIGATION_CONFIRM } from '~/navigation/routes';
import Status from '~/common/Status/Status';
import { Fonts } from '~/assets/config';
import { brandColors, brandGradients } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Màn đăng nhập theo spec redesign: bố cục tối giản, canh giữa — thay cho
// card neumorphic to bản của bản premium trước đó.
const LoginPhone = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginStatus = useSelector(state => getLoginPhoneStatus(state));
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState('');
  const errorMsg = useSelector(state => getErrMsg(state));
  const [loginType, setLoginType] = useState('');

  useEffect(() => {
    dispatch(requestGetListPhoneByPassFirebase());
  }, []);

  const onLoginPress = () => {
    if (loading) return;
    if (!phone) {
      alert('Vui lòng nhập số điện thoại');
      return;
    }
    setLoading(true);
    setLoginType('LOGIN_BY_BE');
    dispatch(loginByPhone(phone, true));
  };

  useEffect(() => {
    if (loginStatus === Status.SUCCESS) {
      setLoading(false);
      dispatch(resetLoginPhone());
      navigation.navigate(NAVIGATION_CONFIRM, {
        type: loginType,
      });
    }
  }, [loginStatus]);

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
          <LiquidGlassView intensity="regular" style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </LiquidGlassView>
        </PressScale>

        <View style={styles.content}>
          <View style={styles.logoBadge}>
            <Image source={logoNeoMed} resizeMode="contain" style={styles.logo} />
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
        error={errorMsg}
        isOpen={errorMsg ? true : false}
        onClose={() => {
          setLoading(false);
          dispatch(resetLogin());
        }}
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
  },
  content: {
    flex: 1,
    paddingHorizontal: s(24),
    paddingTop: s(20),
    paddingBottom: s(24),
    alignItems: 'center',
  },
  logoBadge: {
    width: s(76),
    height: s(76),
    borderRadius: s(22),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(14),
    overflow: 'hidden',
  },
  logo: {
    width: '72%',
    height: '72%',
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
