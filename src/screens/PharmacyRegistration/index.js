import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import PressScale from '~/design-system/PressScale';
import LiquidGlassView from '~/design-system/LiquidGlassView';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import ErrorView from '~/common/ErrorView';
import { registerCustomerV2, resetRegisterCustomerV2 } from '~/store/authV2/authV2Actions';
import { getRegisterCustomerV2Status, getRegisterCustomerV2Err } from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { brandColors, brandGradients } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Nhà thuốc TỰ đăng ký — POST /customer/v1/registration (đính chính
// 2026-09-08: không cần backoffice tạo trước). Xem
// [[marketplace-core-business-model]] mục "Duyệt user". Ảnh giấy phép
// (docs[]) chưa gửi kèm ở bước này — media upload cho KYC đang mock/
// chờ backend (FR-KYC-MEDIA), nộp bổ sung sau ở màn KycSubmit khi có.
const PharmacyRegistration = ({ navigation }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [pharmacistName, setPharmacistName] = useState('');
  const [email, setEmail] = useState('');

  const status = useSelector(state => getRegisterCustomerV2Status(state));
  const err = useSelector(state => getRegisterCustomerV2Err(state));
  const submitting = status === Status.LOADING;

  const canSubmit = name.trim() && address.trim() && contactPhone.trim() && pharmacistName.trim() && !submitting;

  const onSubmit = () => {
    if (!canSubmit) return;
    dispatch(
      registerCustomerV2({
        name,
        address,
        contactPhone,
        pharmacistName,
        email,
        docs: [],
      }),
    );
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigation.pop();
    }
  }, [status]);

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="always">
        <View style={styles.headerRow}>
          <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
            <LiquidGlassView intensity="regular" style={styles.backButtonGlass}>
              <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
            </LiquidGlassView>
          </PressScale>
          <Text style={styles.headerTitle}>Đăng ký nhà thuốc</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            Điền thông tin nhà thuốc để bắt đầu — sau khi gửi, đội ngũ
            1000CARE sẽ xét duyệt hồ sơ trước khi bạn đặt được đơn hàng.
          </Text>

          <Text style={styles.inputLabel}>Tên nhà thuốc</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="home" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Nhà thuốc ABC"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <Text style={styles.inputLabel}>Địa chỉ</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="map-pin" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Số nhà, đường, phường/xã, tỉnh/thành"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <Text style={styles.inputLabel}>Số điện thoại liên hệ</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="phone" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={contactPhone}
              keyboardType="numeric"
              onChangeText={setContactPhone}
              placeholder="09xx xxx xxx"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <Text style={styles.inputLabel}>Dược sĩ phụ trách</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="user" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={pharmacistName}
              onChangeText={setPharmacistName}
              placeholder="Nguyễn Văn A"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <Text style={styles.inputLabel}>Email (tuỳ chọn)</Text>
          <View style={styles.inputOuter}>
            <Icon type="feather" name="mail" color={brandColors.tealDark} size={s(18)} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="nhathuoc@vidu.com"
              placeholderTextColor={brandColors.mutedLight}
            />
          </View>

          <Text style={styles.noteText}>
            Ảnh giấy chứng nhận GPP sẽ nộp bổ sung sau ở mục "Xác thực hồ sơ" trong Tài khoản.
          </Text>

          <PressScale onPress={onSubmit} disabled={!canSubmit} style={styles.submitButton}>
            <LinearGradient
              colors={canSubmit ? brandGradients.primary : [brandColors.border, brandColors.border]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButtonGradient}
            >
              <Text style={styles.submitButtonText}>
                {submitting ? 'Đang gửi...' : 'Gửi đăng ký'}
              </Text>
            </LinearGradient>
          </PressScale>
        </View>
      </ScrollView>

      <ErrorView
        error={err}
        isOpen={!!err}
        onClose={() => dispatch(resetRegisterCustomerV2())}
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
    marginTop: s(58),
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
  },
  headerTitle: {
    color: brandColors.textDark,
    fontSize: fs(17),
    fontWeight: '800',
  },
  content: {
    paddingHorizontal: s(24),
    paddingBottom: s(32),
  },
  subtitle: {
    color: brandColors.muted,
    fontSize: fs(13),
    lineHeight: fs(19),
    fontWeight: '600',
    marginBottom: s(20),
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
    marginBottom: s(16),
  },
  input: {
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '600',
    paddingVertical: 0,
  },
  noteText: {
    color: brandColors.mutedLight,
    fontSize: fs(11.5),
    lineHeight: fs(17),
    fontWeight: '600',
    marginBottom: s(20),
  },
  submitButton: {
    width: '100%',
    borderRadius: s(16),
    overflow: 'hidden',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
  },
  submitButtonGradient: {
    height: s(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: brandColors.surface,
    fontWeight: '700',
    fontSize: fs(15),
  },
});

export default PharmacyRegistration;
