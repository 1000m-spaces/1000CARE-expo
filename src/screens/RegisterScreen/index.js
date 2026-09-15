import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TextInput } from 'react-native';
import PressScale from '~/design-system/PressScale';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { registerV2, resetRegisterV2 } from '~/store/authV2/authV2Actions';
import { getRegisterV2Status, getRegisterV2Err } from '~/store/authV2/authV2Selector';
import ErrorView from '~/common/ErrorView';
import { Icon } from '~/common/index';
import AppBackground from '~/design-system/AppBackground';
import strings from '~/i18n';
import { NAVIGATION_CONFIRM } from '~/navigation/routes';
import Status from '~/common/Status/Status';
import { brandColors, brandGradients, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Màn đăng ký theo spec redesign: cùng bố cục tối giản với LoginPhone —
// back button nổi + tiêu đề cùng dòng, input dạng pill, nút CTA gradient.
// Ráp thật vào backend mới marketplace-core (auth/v1/register → gửi OTP
// → auth/v1/phone/verify ở màn Confirm type=REGISTER_V2 → phải đăng nhập
// lại bằng phone+password, xem [[marketplace-core-backend-migration]]).
const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const registerStatus = useSelector(state => getRegisterV2Status(state));
  const registerErr = useSelector(state => getRegisterV2Err(state));
  const submitting = registerStatus === Status.LOADING;

  const canSubmit = fullName.trim() && phone.trim() && password.trim() && agreed && !submitting;

  const onRegisterPress = () => {
    if (!canSubmit) return;
    dispatch(registerV2(phone, password));
  };

  useEffect(() => {
    if (registerStatus === Status.SUCCESS) {
      dispatch(resetRegisterV2());
      navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'REGISTER_V2',
        phone,
      });
    }
  }, [registerStatus]);

  return (
    <AppBackground>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.headerRow}>
          <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
            <View style={styles.backButtonGlass}>
              <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
            </View>
          </PressScale>
          <Text style={styles.headerTitle}>Tạo tài khoản mới</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.inputLabel}>Họ và tên</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="user" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="Nguyễn Văn A"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

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
            onPress={() => setAgreed(!agreed)}
            style={styles.termsRow}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Icon type="feather" name="check" color={brandColors.surface} size={s(11)} />}
            </View>
            <Text style={styles.termsText}>Tôi đồng ý với Điều khoản sử dụng</Text>
          </PressScale>

          <PressScale
            onPress={onRegisterPress}
            disabled={!canSubmit}
            style={styles.registerButton}
          >
            <LinearGradient
              colors={canSubmit ? brandGradients.primary : [brandColors.border, brandColors.border]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {submitting ? 'Đang đăng ký...' : strings.registerScreen.register}
              </Text>
            </LinearGradient>
          </PressScale>

          <Text style={styles.footerLine}>
            {strings.registerScreen.have_account}{' '}
            <Text style={styles.footerLink} onPress={() => navigation.pop()}>
              {strings.registerScreen.login_now}
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>

      <ErrorView
        error={registerErr}
        isOpen={registerErr ? true : false}
        onClose={() => dispatch(resetRegisterV2())}
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(8),
    marginLeft: s(16),
    marginBottom: s(14),
    gap: s(12),
  },
  backButton: {},
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
  headerTitle: {
    color: brandColors.textDark,
    fontSize: fs(17),
    fontWeight: '800',
  },
  content: {
    flex: 1,
    paddingHorizontal: s(24),
    paddingBottom: s(24),
  },
  inputLabel: {
    fontSize: fs(13),
    fontWeight: '700',
    color: brandColors.textDark,
    marginBottom: s(8),
  },
  inputOuter: {
    width: '100%',
    height: s(50),
    borderRadius: s(16),
    backgroundColor: '#F4F9F9',
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingHorizontal: s(16),
    marginBottom: s(18),
  },
  input: {
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '600',
    paddingVertical: 0,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    marginBottom: s(26),
  },
  checkbox: {
    width: s(18),
    height: s(18),
    borderRadius: s(5),
    borderWidth: 1.5,
    borderColor: brandColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  termsText: {
    flex: 1,
    fontSize: fs(12.5),
    color: brandColors.muted,
    fontWeight: '600',
  },
  registerButton: {
    width: '100%',
    borderRadius: s(16),
    overflow: 'hidden',
    marginBottom: s(18),
    ...brandShadow.button,
  },
  buttonGradient: {
    height: s(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: brandColors.surface,
    fontWeight: '700',
    fontSize: fs(15),
  },
  footerLine: {
    color: brandColors.muted,
    fontSize: fs(13),
    textAlign: 'center',
  },
  footerLink: {
    color: brandColors.tealPrimary,
    fontWeight: '700',
  },
});

RegisterScreen.navigationOptions = {
  header: null,
};

export default RegisterScreen;
