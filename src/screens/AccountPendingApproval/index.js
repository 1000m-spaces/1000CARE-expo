import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { membershipsV2, logoutV2 } from '~/store/authV2/authV2Actions';
import { getMembershipsV2Status, getMembershipsV2 } from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_MAIN_SCREEN,
  NAVIGATION_PHARMACY_REGISTRATION,
} from '~/navigation/routes';
import { brandColors, brandGradients, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Key cục bộ đánh dấu "đã gửi đăng ký nhà thuốc từ máy này" — backend
// không có cách phân biệt "chưa từng đăng ký" với "đã đăng ký, đang chờ
// duyệt" chỉ qua GET /auth/v1/memberships (cả 2 đều trả customers rỗng
// cho tới khi có membership), nên dùng cờ local để quyết định hiện nút
// "Đăng ký nhà thuốc" hay chỉ hiện "đang chờ duyệt".
const REGISTERED_FLAG_KEY = 'v2_pharmacy_registration_submitted';

// Hiện sau khi đăng nhập (backend mới marketplace-core) mà
// GET /auth/v1/memberships trả customers rỗng — identity có tài khoản
// nhưng CHƯA được backoffice duyệt vào nhà thuốc nào, mọi API
// /customer/v1/* khác đều trả 403 not_a_member. Xem
// [[marketplace-core-business-model]] mục "Duyệt user". Đính chính
// 2026-09-08: nhà thuốc CÓ thể tự đăng ký (POST /customer/v1/registration)
// thay vì phải chờ backoffice tạo trước.
const AccountPendingApproval = ({ navigation }) => {
  const dispatch = useDispatch();
  const membershipsStatus = useSelector(state => getMembershipsV2Status(state));
  const memberships = useSelector(state => getMembershipsV2(state));
  const checking = membershipsStatus === Status.LOADING;

  const [hasRegistered, setHasRegistered] = useState(null); // null = đang đọc storage

  useEffect(() => {
    AsyncStorage.getItem(REGISTERED_FLAG_KEY).then(value => setHasRegistered(value === 'true'));
  }, []);

  // Mỗi lần quay lại màn này (vd sau khi gửi đăng ký xong) tự check lại.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem(REGISTERED_FLAG_KEY).then(value => setHasRegistered(value === 'true'));
      dispatch(membershipsV2());
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (
      membershipsStatus === Status.SUCCESS &&
      Array.isArray(memberships?.customers) &&
      memberships.customers.length > 0
    ) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: NAVIGATION_TO_MAIN_SCREEN }],
        }),
      );
    }
  }, [membershipsStatus, memberships]);

  const onCheckAgain = () => {
    dispatch(membershipsV2());
  };

  const onLogout = () => {
    dispatch(logoutV2());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: NAVIGATION_TO_LOGIN_SCREEN }],
      }),
    );
  };

  const onGoRegister = () => {
    AsyncStorage.setItem(REGISTERED_FLAG_KEY, 'true');
    setHasRegistered(true);
    navigation.navigate(NAVIGATION_PHARMACY_REGISTRATION);
  };

  return (
    <AppBackground>
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Icon type="feather" name="clock" color={brandColors.tealDark} size={s(34)} />
        </View>
        <Text style={styles.title}>
          {hasRegistered ? 'Hồ sơ nhà thuốc đang chờ duyệt' : 'Tài khoản chưa có nhà thuốc'}
        </Text>
        <Text style={styles.message}>
          {hasRegistered
            ? 'Đội ngũ 1000CARE đang xét duyệt hồ sơ nhà thuốc của bạn. Vui lòng quay lại kiểm tra sau.'
            : 'Bạn chưa đăng ký nhà thuốc nào trên hệ thống. Đăng ký ngay để bắt đầu sử dụng.'}
        </Text>

        {!hasRegistered && (
          <PressScale onPress={onGoRegister} style={styles.checkButton}>
            <LinearGradient
              colors={brandGradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.checkButtonGradient}
            >
              <Text style={styles.checkButtonText}>Đăng ký nhà thuốc</Text>
            </LinearGradient>
          </PressScale>
        )}

        <PressScale onPress={onCheckAgain} disabled={checking} style={hasRegistered ? styles.checkButton : styles.secondaryButton}>
          {hasRegistered ? (
            <LinearGradient
              colors={checking ? [brandColors.border, brandColors.border] : brandGradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.checkButtonGradient}
            >
              <Text style={styles.checkButtonText}>
                {checking ? 'Đang kiểm tra...' : 'Kiểm tra lại'}
              </Text>
            </LinearGradient>
          ) : (
            <Text style={styles.secondaryButtonText}>
              {checking ? 'Đang kiểm tra...' : 'Đã đăng ký rồi, kiểm tra lại'}
            </Text>
          )}
        </PressScale>

        <PressScale onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </PressScale>
      </View>
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(28),
  },
  iconBadge: {
    width: s(76),
    height: s(76),
    borderRadius: s(22),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(20),
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(18),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: s(10),
  },
  message: {
    color: brandColors.muted,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: s(28),
  },
  checkButton: {
    width: '100%',
    borderRadius: s(16),
    overflow: 'hidden',
    marginBottom: s(14),
    ...brandShadow.button,
  },
  checkButtonGradient: {
    height: s(52),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonText: {
    color: brandColors.surface,
    fontWeight: '700',
    fontSize: fs(15),
  },
  secondaryButton: {
    paddingVertical: s(12),
    marginBottom: s(6),
  },
  secondaryButtonText: {
    color: brandColors.tealPrimary,
    fontWeight: '700',
    fontSize: fs(13.5),
  },
  logoutButton: {
    paddingVertical: s(10),
  },
  logoutText: {
    color: brandColors.muted,
    fontWeight: '700',
    fontSize: fs(13.5),
    textDecorationLine: 'underline',
  },
});

export default AccountPendingApproval;
