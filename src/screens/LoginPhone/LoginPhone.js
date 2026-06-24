import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, Easing, StyleSheet, TextInput } from 'react-native';
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
import { brandColors } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

const LoginPhone = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginStatus = useSelector(state => getLoginPhoneStatus(state));
  const [loading, setLoading] = useState(false);
  
  const [phone, setPhone] = useState('');
  const errorMsg = useSelector(state => getErrMsg(state));
  const [loginType, setLoginType] = useState('');

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    dispatch(requestGetListPhoneByPassFirebase());
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start();
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
        <View style={styles.screen}>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            style={styles.backButton}
            activeOpacity={0.78}
          >
            <Icon type="feather" name="chevron-left" color={brandColors.textDark} size={s(30)} />
          </TouchableOpacity>

          <Animated.View style={[styles.card, {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }]}>
            <View style={styles.logoRing}>
              <Image source={logoNeoMed} resizeMode="contain" style={styles.logo} />
            </View>
            <Text style={styles.brandName} allowFontScaling={false}>1000CARE</Text>

            <View style={styles.formIntro}>
              <Text style={styles.title}>{strings.loginScreen.title}</Text>
            </View>

            <Text style={styles.inputLabel}>Số điện thoại</Text>
            <View style={styles.inputOuter}>
              <View style={styles.inputHighlight} />
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

            <TouchableOpacity
              activeOpacity={0.82}
              onPress={onLoginPress}
              disabled={loading}
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            >
              <LinearGradient
                colors={loading ? [brandColors.border, brandColors.border] : [brandColors.tealDark, brandColors.tealPrimary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Đang xác thực...' : strings.common.login}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <Text style={styles.registerLine}>
              Bạn chưa có tài khoản?{' '}
              <Text
                style={styles.registerLink}
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                Đăng ký ngay
              </Text>
            </Text>
          </Animated.View>
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

const neumorphicShadow = {
  shadowColor: '#86AEB5',
  shadowOffset: { width: s(10), height: s(12) },
  shadowOpacity: 0.28,
  shadowRadius: s(22),
  elevation: 8,
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
    paddingHorizontal: s(28),
    paddingTop: s(108),
    paddingBottom: s(28),
    justifyContent: 'flex-start',
  },
  backButton: {
    position: 'absolute',
    top: s(20),
    left: s(28),
    width: s(46),
    height: s(46),
    borderRadius: s(23),
    backgroundColor: 'rgba(255,255,255,0.24)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.86)',
    shadowColor: '#6F9EA6',
    shadowOffset: { width: s(8), height: s(10) },
    shadowOpacity: 0.28,
    shadowRadius: s(16),
    elevation: 7,
    overflow: 'hidden',
  },
  card: {
    width: '100%',
    minHeight: s(560),
    borderRadius: s(34),
    backgroundColor: '#EEF9FA',
    paddingHorizontal: s(30),
    paddingTop: s(44),
    paddingBottom: s(38),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.76)',
    ...neumorphicShadow,
  },
  logoRing: {
    width: s(92),
    height: s(92),
    borderRadius: s(28),
    padding: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6F9EA6',
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.14,
    shadowRadius: s(18),
    elevation: 5,
    overflow: 'hidden',
  },
  logo: {
    width: s(92),
    height: s(92),
    borderRadius: s(28),
  },
  brandName: {
    marginTop: s(16),
    color: brandColors.tealPrimary,
    fontSize: fs(30),
    lineHeight: fs(38),
    fontWeight: '600',
    letterSpacing: 0,
  },
  formIntro: {
    alignSelf: 'stretch',
    marginTop: s(42),
    marginBottom: s(28),
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(25),
    lineHeight: fs(32),
    fontWeight: '600',
    textAlign: 'center',
  },
  inputLabel: {
    alignSelf: 'stretch',
    color: brandColors.textDark,
    fontSize: fs(14),
    lineHeight: fs(18),
    fontWeight: '600',
    marginBottom: s(9),
    marginLeft: s(4),
  },
  inputOuter: {
    width: '100%',
    height: s(58),
    borderRadius: s(22),
    backgroundColor: 'rgba(255,255,255,0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(18),
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.86)',
    shadowColor: '#6F9EA6',
    shadowOffset: { width: s(8), height: s(10) },
    shadowOpacity: 0.34,
    shadowRadius: s(16),
    elevation: 7,
    overflow: 'hidden',
  },
  inputHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: s(22),
    backgroundColor: 'rgba(238,252,253,0.42)',
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderTopColor: 'rgba(105,145,153,0.32)',
    borderLeftColor: 'rgba(105,145,153,0.2)',
    borderRightWidth: 2.5,
    borderBottomWidth: 2.5,
    borderRightColor: 'rgba(255,255,255,0.94)',
    borderBottomColor: 'rgba(255,255,255,0.94)',
  },
  input: {
    flex: 1,
    marginLeft: s(12),
    color: brandColors.textDark,
    fontSize: fs(18),
    lineHeight: fs(24),
    fontWeight: '600',
    paddingVertical: 0,
  },
  loginButton: {
    width: '100%',
    marginTop: s(34),
    borderRadius: s(23),
    overflow: 'hidden',
    shadowColor: '#0A6470',
    shadowOffset: { width: s(6), height: s(8) },
    shadowOpacity: 0.24,
    shadowRadius: s(12),
    elevation: 5,
  },
  loginButtonDisabled: {
    shadowOpacity: 0.08,
  },
  buttonGradient: {
    minHeight: s(58),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(24),
  },
  buttonText: {
    color: brandColors.surface,
    fontSize: fs(16),
    lineHeight: fs(22),
    fontWeight: '600',
  },
  registerLine: {
    marginTop: s(28),
    color: brandColors.muted,
    fontSize: fs(14),
    lineHeight: fs(20),
    fontWeight: '600',
    textAlign: 'center',
  },
  registerLink: {
    color: brandColors.tealPrimary,
    fontWeight: '600',
  },
});

export default LoginPhone;
