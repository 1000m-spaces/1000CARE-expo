import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import LiquidGlassView from '~/design-system/LiquidGlassView';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import ErrorView from '~/common/ErrorView';
import {
  getOrderDetailV2,
  resetOrderDetailV2,
  cancelOrderV2,
  resetCancelOrderV2,
  acknowledgeOrderV2,
} from '~/store/authV2/authV2Actions';
import {
  getOrderDetailV2Status,
  getOrderDetailV2 as getOrderDetailV2Data,
  getCancelOrderV2Status,
  getCancelOrderV2Err,
} from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { brandColors, brandGradients } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';
import { LinearGradient } from 'expo-linear-gradient';

const ORDER_STATUS_LABEL = {
  placed: { text: 'Đã đặt', color: brandColors.goldAccent },
  confirmed: { text: 'NCC đã xác nhận', color: brandColors.tealPrimary },
  handed_to_carrier: { text: 'Đang giao', color: brandColors.tealPrimary },
  delivered: { text: 'Đã giao', color: brandColors.success },
  completed: { text: 'Hoàn tất', color: brandColors.success },
  cancelled: { text: 'Đã huỷ', color: brandColors.muted },
  rejected: { text: 'NCC từ chối', color: brandColors.danger },
};

const CANCELLABLE_STATUSES = ['placed', 'confirmed'];

const fmtDate = ts => (ts ? new Date(ts).toLocaleString('vi-VN') : '');

// GET /customer/v1/orders/{id} — chi tiết đơn thật. `lines[]` có giá
// nhưng CHƯA có tên sản phẩm (FR-CUST-CATALOG chưa xong, xem
// [[marketplace-core-business-model]]) nên hiện tạm "SP #<product_id>".
const OrderDetail = ({ navigation, route }) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();

  const detailStatus = useSelector(state => getOrderDetailV2Status(state));
  const order = useSelector(state => getOrderDetailV2Data(state));
  const cancelStatus = useSelector(state => getCancelOrderV2Status(state));
  const cancelErr = useSelector(state => getCancelOrderV2Err(state));

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    dispatch(getOrderDetailV2(orderId));
    return () => dispatch(resetOrderDetailV2());
  }, [orderId]);

  useEffect(() => {
    if (cancelStatus === Status.SUCCESS) {
      setShowCancelModal(false);
      setCancelReason('');
    }
  }, [cancelStatus]);

  const loading = detailStatus === Status.LOADING && !order;
  const statusInfo = order ? ORDER_STATUS_LABEL[order.status] || { text: order.status, color: brandColors.muted } : null;
  const canCancel = order && CANCELLABLE_STATUSES.includes(order.status);
  const needsAck = order && order.status === 'rejected' && !order.customer_ack_at;

  const onConfirmCancel = () => {
    if (!cancelReason.trim()) return;
    dispatch(cancelOrderV2(orderId, cancelReason.trim()));
  };

  const onAcknowledge = () => {
    dispatch(acknowledgeOrderV2(orderId));
  };

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <LiquidGlassView intensity="regular" style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </LiquidGlassView>
        </PressScale>
        <Text style={styles.headerTitle}>Chi tiết đơn hàng</Text>
      </View>

      {loading && (
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      )}

      {order && (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.statusCard}>
            <Text style={styles.orderId}>Đơn #{String(order.id).slice(0, 8)}</Text>
            <Text style={[styles.statusValue, { color: statusInfo.color }]}>{statusInfo.text}</Text>
            {order.placed_at ? <Text style={styles.metaText}>Đặt lúc: {fmtDate(order.placed_at)}</Text> : null}
            {order.status === 'rejected' && order.reject_reason ? (
              <View style={styles.rejectBox}>
                <Text style={styles.rejectText}>Lý do NCC từ chối: {order.reject_reason}</Text>
              </View>
            ) : null}
            {order.status === 'cancelled' && order.cancel_reason ? (
              <Text style={styles.metaText}>Lý do huỷ: {order.cancel_reason}</Text>
            ) : null}
          </View>

          <Text style={styles.sectionLabel}>Sản phẩm</Text>
          {(order.lines || []).map(line => (
            <View key={line.id} style={styles.lineRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.lineName}>SP #{String(line.product_id).slice(0, 8)}</Text>
                <Text style={styles.lineQty}>
                  SL {line.qty} × {formatMoney(line.unit_price, { unit: 'đ' })}
                </Text>
              </View>
              <Text style={styles.lineTotal}>{formatMoney(line.line_total, { unit: 'đ' })}</Text>
            </View>
          ))}
          {(!order.lines || order.lines.length === 0) && (
            <Text style={styles.metaText}>Chưa hiển thị được danh sách sản phẩm chi tiết.</Text>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng cộng</Text>
            <Text style={styles.totalValue}>{formatMoney(order.subtotal, { unit: 'đ' })}</Text>
          </View>

          {needsAck && (
            <PressScale onPress={onAcknowledge} style={styles.ackButton}>
              <Text style={styles.ackButtonText}>Đã xem lý do từ chối</Text>
            </PressScale>
          )}

          {canCancel && (
            <PressScale onPress={() => setShowCancelModal(true)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Huỷ đơn hàng</Text>
            </PressScale>
          )}
        </ScrollView>
      )}

      <Modal visible={showCancelModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Lý do huỷ đơn</Text>
            <TextInput
              style={styles.modalInput}
              value={cancelReason}
              onChangeText={setCancelReason}
              placeholder="Nhập lý do..."
              placeholderTextColor={brandColors.mutedLight}
              multiline
            />
            <View style={styles.modalActions}>
              <PressScale onPress={() => setShowCancelModal(false)} style={styles.modalCancelBtn}>
                <Text style={styles.modalCancelText}>Đóng</Text>
              </PressScale>
              <PressScale onPress={onConfirmCancel} disabled={!cancelReason.trim()} style={styles.modalConfirmBtn}>
                <LinearGradient
                  colors={cancelReason.trim() ? brandGradients.primary : [brandColors.border, brandColors.border]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.modalConfirmGradient}
                >
                  <Text style={styles.modalConfirmText}>
                    {cancelStatus === Status.LOADING ? 'Đang huỷ...' : 'Xác nhận huỷ'}
                  </Text>
                </LinearGradient>
              </PressScale>
            </View>
          </View>
        </View>
      </Modal>

      <ErrorView error={cancelErr} isOpen={!!cancelErr} onClose={() => dispatch(resetCancelOrderV2())} />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
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
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: brandColors.muted,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: s(20),
    paddingBottom: s(40),
  },
  statusCard: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(16),
    marginBottom: s(20),
  },
  orderId: {
    color: brandColors.textDark,
    fontSize: fs(15),
    fontWeight: '700',
  },
  statusValue: {
    fontSize: fs(14),
    fontWeight: '800',
    marginTop: s(4),
  },
  metaText: {
    color: brandColors.muted,
    fontSize: fs(12.5),
    fontWeight: '600',
    marginTop: s(6),
  },
  rejectBox: {
    backgroundColor: 'rgba(255,59,48,0.08)',
    borderRadius: s(12),
    padding: s(10),
    marginTop: s(10),
  },
  rejectText: {
    color: brandColors.danger,
    fontSize: fs(12.5),
    fontWeight: '600',
  },
  sectionLabel: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
    marginBottom: s(10),
  },
  lineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: s(10),
    borderBottomWidth: 1,
    borderBottomColor: brandColors.borderSoft,
  },
  lineName: {
    color: brandColors.textDark,
    fontSize: fs(13.5),
    fontWeight: '700',
  },
  lineQty: {
    color: brandColors.muted,
    fontSize: fs(12),
    fontWeight: '600',
    marginTop: s(2),
  },
  lineTotal: {
    color: brandColors.tealDark,
    fontSize: fs(14),
    fontWeight: '800',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: s(16),
    marginBottom: s(24),
  },
  totalLabel: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  totalValue: {
    color: brandColors.tealDark,
    fontSize: fs(18),
    fontWeight: '800',
  },
  ackButton: {
    height: s(48),
    borderRadius: s(14),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(12),
  },
  ackButtonText: {
    color: brandColors.tealDark,
    fontWeight: '700',
    fontSize: fs(14),
  },
  cancelButton: {
    height: s(48),
    borderRadius: s(14),
    borderWidth: 1,
    borderColor: brandColors.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: brandColors.danger,
    fontWeight: '700',
    fontSize: fs(14),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(24),
  },
  modalCard: {
    width: '100%',
    backgroundColor: brandColors.surface,
    borderRadius: s(20),
    padding: s(20),
  },
  modalTitle: {
    color: brandColors.textDark,
    fontSize: fs(16),
    fontWeight: '800',
    marginBottom: s(14),
  },
  modalInput: {
    minHeight: s(80),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(12),
    padding: s(12),
    color: brandColors.textDark,
    fontSize: fs(14),
    textAlignVertical: 'top',
    marginBottom: s(16),
  },
  modalActions: {
    flexDirection: 'row',
    gap: s(10),
  },
  modalCancelBtn: {
    flex: 1,
    height: s(46),
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: brandColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCancelText: {
    color: brandColors.muted,
    fontWeight: '700',
  },
  modalConfirmBtn: {
    flex: 1,
    borderRadius: s(12),
    overflow: 'hidden',
  },
  modalConfirmGradient: {
    height: s(46),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalConfirmText: {
    color: brandColors.surface,
    fontWeight: '700',
  },
});

export default OrderDetail;
