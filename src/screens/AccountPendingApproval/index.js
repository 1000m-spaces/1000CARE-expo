import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { CommonActions } from '@react-navigation/native';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { membershipsV2, logoutV2 } from '~/store/authV2/authV2Actions';
import { getMembershipsV2Status, getMembershipsV2 } from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { NAVIGATION_TO_LOGIN_SCREEN, NAVIGATION_TO_MAIN_SCREEN } from '~/navigation/routes';
import { brandColors, brandGradients } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Hiện sau khi đăng nhập (backend mới marketplace-core) mà
// GET /auth/v1/memberships trả customers rỗng — identity có tài khoản
// nhưng CHƯA được backoffice gắn vào nhà thuốc nào, mọi API
// /customer/v1/* khác đều trả 403 not_a_member. Xem
// [[marketplace-core-business-model]] mục "Duyệt user".
const AccountPendingApproval = ({ navigation }) => {
  const dispatch = useDispatch();
  const membershipsStatus = useSelector(state => getMembershipsV2Status(state));
  const memberships = useSelector(state => getMembershipsV2(state));
  const checking = membershipsStatus === Status.LOADING;

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

  return (
    <AppBackground>
      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Icon type="feather" name="clock" color={brandColors.tealDark} size={s(34)} />
        </View>
        <Text style={styles.title}>Tài khoản đang chờ duyệt</Text>
        <Text style={styles.message}>
          Tài khoản của bạn chưa được gắn vào nhà thuốc nào trên hệ thống.
          Vui lòng liên hệ quản trị viên (1000CARE) để được thêm vào nhà
          thuốc của bạn, sau đó quay lại kiểm tra.
        </Text>

        <PressScale onPress={onCheckAgain} disabled={checking} style={styles.checkButton}>
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
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.24,
    shadowRadius: s(20),
    elevation: 6,
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
