import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getOrdersListV2 } from '~/store/authV2/authV2Actions';
import { getOrdersV2Status, getOrdersV2, getIsLoggedInV2 } from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { NAVIGATION_ORDER_DETAIL_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

const ORDER_STATUS_LABEL = {
  placed: { text: 'Đã đặt', color: brandColors.goldAccent },
  confirmed: { text: 'NCC đã xác nhận', color: brandColors.tealPrimary },
  handed_to_carrier: { text: 'Đang giao', color: brandColors.tealPrimary },
  delivered: { text: 'Đã giao', color: brandColors.success },
  completed: { text: 'Hoàn tất', color: brandColors.success },
  cancelled: { text: 'Đã huỷ', color: brandColors.muted },
  rejected: { text: 'NCC từ chối', color: brandColors.danger },
};

// GET /customer/v1/orders — đơn hàng thật từ backend mới. Xem
// [[marketplace-core-business-model]] mục "shape Order thật".
// CẬP NHẬT 2026-09-16: giờ LÀ tab "Đơn hàng" CHÍNH (MainScreen.js) —
// đã thay hẳn khỏi backend NeoMed cũ theo quyết định "đổi luôn". Vẫn
// còn reachable qua route riêng nếu có nơi khác navigate thẳng tới,
// header tự ẩn nút back khi không có gì để pop (navigation.canGoBack()).
const OrdersV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getOrdersV2Status(state));
  const orders = useSelector(state => getOrdersV2(state));
  const loading = status === Status.LOADING;
  // Refetch khi phiên AuthV2 khôi phục xong lúc mở lại app (phòng trường
  // hợp màn này mount trước, xem authV2Sagas.restoreAuthV2Session).
  const isLoggedInV2 = useSelector(state => getIsLoggedInV2(state));

  useEffect(() => {
    dispatch(getOrdersListV2());
  }, [isLoggedInV2]);

  const renderItem = ({ item }) => {
    const statusInfo = ORDER_STATUS_LABEL[item.status] || { text: item.status, color: brandColors.muted };
    return (
      <PressScale
        style={styles.card}
        onPress={() => navigation.navigate(NAVIGATION_ORDER_DETAIL_V2, { orderId: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.orderId} numberOfLines={1}>Đơn #{String(item.id).slice(0, 8)}</Text>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
        </View>
        <Text style={styles.placedAt}>
          {item.placed_at ? new Date(item.placed_at).toLocaleString('vi-VN') : ''}
        </Text>
        <Text style={styles.subtotal}>{formatMoney(item.subtotal, { unit: 'đ' })}</Text>
      </PressScale>
    );
  };

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        {navigation.canGoBack() && (
          <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
            <View style={styles.backButtonGlass}>
              <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
            </View>
          </PressScale>
        )}
        <Text style={styles.headerTitle}>Đơn hàng</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => dispatch(getOrdersListV2())} />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có đơn hàng nào</Text>
            </View>
          )
        }
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
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
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(32),
    flexGrow: 1,
  },
  card: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(14),
    marginBottom: s(12),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderId: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  statusText: {
    fontSize: fs(12),
    fontWeight: '800',
  },
  placedAt: {
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
    marginTop: s(4),
  },
  subtotal: {
    color: brandColors.tealDark,
    fontSize: fs(15),
    fontWeight: '800',
    marginTop: s(8),
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: s(80),
    gap: s(10),
  },
  emptyText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
});

export default OrdersV2;
