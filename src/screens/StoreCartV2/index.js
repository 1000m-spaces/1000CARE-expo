import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getStoreCartV2, updateCartItemV2, deleteCartItemV2 } from '~/store/catalogV2/catalogV2Actions';
import {
  getStoreCartV2 as selectStoreCartV2,
  getStoreCartV2Status,
  getCartItemV2ActionStatus,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// GET/PUT/DELETE /customer/v1/stores/{id}/cart — giỏ hàng THẬT, kèm
// subtotal + min_order_value (0 = không giới hạn, do Store/backoffice đặt,
// KHÔNG phải NCC). Màn RIÊNG, CHƯA đụng checkout thật — nút "Đặt hàng" ở
// cuối chỉ bật khi đủ min_order_value nhưng hiện chỉ để dành chỗ, chưa nối
// API đặt đơn. Xem [[marketplace-core-business-model]].
const StoreCartV2 = ({ navigation, route }) => {
  const { storeId, storeName } = route.params || {};
  const dispatch = useDispatch();
  const status = useSelector(state => getStoreCartV2Status(state, storeId));
  const cart = useSelector(state => selectStoreCartV2(state, storeId));
  const loading = status === Status.LOADING;

  const load = () => dispatch(getStoreCartV2(storeId));

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const items = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const minOrderValue = cart?.min_order_value || 0;
  const meetsMinOrder = minOrderValue === 0 || subtotal >= minOrderValue;
  const progress = minOrderValue > 0 ? Math.min(1, subtotal / minOrderValue) : 1;

  const onChangeQty = (productId, nextQty) => {
    if (nextQty <= 0) {
      dispatch(deleteCartItemV2(storeId, productId));
    } else {
      dispatch(updateCartItemV2(storeId, productId, nextQty));
    }
  };

  const onRemove = productId => {
    Alert.alert('Xoá sản phẩm', 'Xoá sản phẩm này khỏi giỏ hàng?', [
      { text: 'Huỷ', style: 'cancel' },
      { text: 'Xoá', style: 'destructive', onPress: () => dispatch(deleteCartItemV2(storeId, productId)) },
    ]);
  };

  const renderItem = ({ item }) => (
    <CartRow item={item} storeId={storeId} onChangeQty={onChangeQty} onRemove={onRemove} />
  );

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <Text style={styles.headerTitle} numberOfLines={1}>Giỏ hàng · {storeName || ''}</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={item => String(item.product_id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="shopping-cart" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
            </View>
          )
        }
      />

      {items.length > 0 && (
        <View style={styles.summaryBar}>
          {minOrderValue > 0 && (
            <View style={styles.progressWrap}>
              <View style={styles.progressTrack}>
                <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              </View>
              <Text style={[styles.progressText, meetsMinOrder && styles.progressTextOk]}>
                {meetsMinOrder
                  ? 'Đã đủ giá trị đơn tối thiểu'
                  : `Cần thêm ${formatMoney(minOrderValue - subtotal, { unit: 'đ' })} để đạt tối thiểu ${formatMoney(minOrderValue, { unit: 'đ' })}`}
              </Text>
            </View>
          )}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tạm tính</Text>
            <Text style={styles.summaryValue}>{formatMoney(subtotal, { unit: 'đ' })}</Text>
          </View>
          <View style={[styles.checkoutButton, !meetsMinOrder && styles.checkoutButtonDisabled]}>
            <Text style={styles.checkoutButtonText}>
              {meetsMinOrder ? 'Đặt hàng (sắp ra mắt)' : 'Chưa đủ đơn tối thiểu'}
            </Text>
          </View>
        </View>
      )}
    </AppBackground>
  );
};

const CartRow = ({ item, storeId, onChangeQty, onRemove }) => {
  const actionStatus = useSelector(state => getCartItemV2ActionStatus(state, storeId, item.product_id));
  const busy = actionStatus === Status.LOADING;
  return (
    <View style={styles.card}>
      {item.media ? (
        <Image source={{ uri: item.media }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder]}>
          <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(20)} />
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        {!!item.brand && <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>}
        <Text style={styles.lineTotal}>{formatMoney(item.line_total, { unit: 'đ' })}</Text>
      </View>
      <View style={styles.rightCol}>
        <PressScale onPress={() => onRemove(item.product_id)} style={styles.removeBtn}>
          <Icon type="feather" name="trash-2" color={brandColors.mutedLight} size={s(14)} />
        </PressScale>
        <View style={styles.stepper}>
          <PressScale
            style={[styles.stepperBtn, busy && styles.stepperBtnDisabled]}
            disabled={busy}
            onPress={() => onChangeQty(item.product_id, item.qty - 1)}
          >
            <Icon type="feather" name="minus" color={brandColors.tealDark} size={s(14)} />
          </PressScale>
          <Text style={styles.stepperQty}>{item.qty}</Text>
          <PressScale
            style={[styles.stepperBtnAdd, busy && styles.stepperBtnDisabled]}
            disabled={busy}
            onPress={() => onChangeQty(item.product_id, item.qty + 1)}
          >
            <Icon type="feather" name="plus" color={brandColors.surface} size={s(14)} />
          </PressScale>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: s(8),
    marginLeft: s(16),
    marginRight: s(16),
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
    fontSize: fs(16),
    fontWeight: '800',
    flexShrink: 1,
  },
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(160),
    flexGrow: 1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(12),
    marginBottom: s(12),
  },
  thumb: {
    width: s(56),
    height: s(56),
    borderRadius: s(12),
    backgroundColor: brandColors.tealLight,
  },
  thumbPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
  },
  brand: {
    color: brandColors.muted,
    fontSize: fs(11),
    fontWeight: '600',
    marginTop: s(2),
  },
  lineTotal: {
    color: brandColors.tealDark,
    fontSize: fs(13.5),
    fontWeight: '800',
    marginTop: s(4),
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: s(8),
  },
  removeBtn: {
    padding: s(2),
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  stepperBtn: {
    width: s(26),
    height: s(26),
    borderRadius: s(13),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealLight,
  },
  stepperBtnAdd: {
    width: s(26),
    height: s(26),
    borderRadius: s(13),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealPrimary,
  },
  stepperBtnDisabled: {
    opacity: 0.4,
  },
  stepperQty: {
    minWidth: s(18),
    textAlign: 'center',
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '800',
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
  summaryBar: {
    position: 'absolute',
    left: s(20),
    right: s(20),
    bottom: s(24),
    borderRadius: s(20),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    padding: s(16),
    ...brandShadow.sheet,
  },
  progressWrap: {
    marginBottom: s(12),
  },
  progressTrack: {
    height: s(6),
    borderRadius: s(3),
    backgroundColor: brandColors.borderSoft,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: s(3),
    backgroundColor: brandColors.goldAccent,
  },
  progressText: {
    marginTop: s(6),
    color: brandColors.muted,
    fontSize: fs(11),
    fontWeight: '600',
  },
  progressTextOk: {
    color: brandColors.success,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: s(12),
  },
  summaryLabel: {
    color: brandColors.muted,
    fontSize: fs(13),
    fontWeight: '600',
  },
  summaryValue: {
    color: brandColors.textDark,
    fontSize: fs(18),
    fontWeight: '800',
  },
  checkoutButton: {
    height: s(48),
    borderRadius: s(14),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: brandColors.border,
  },
  checkoutButtonText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontWeight: '800',
  },
});

export default StoreCartV2;
