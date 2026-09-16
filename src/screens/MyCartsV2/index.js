import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getCartsV2, getStoresV2 } from '~/store/catalogV2/catalogV2Actions';
import { getCartsV2Status, getCartsV2 as selectCartsV2, getStoresV2 as selectStoresV2 } from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { NAVIGATION_STORE_CART_V2, NAVIGATION_STORES_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Tab "Giỏ hàng" chính — thay tab "Giỏ quà" cũ (backend NeoMed) theo
// quyết định 2026-09-16 (thay hẳn Home/Đơn hàng/Giỏ hàng sang
// marketplace-core). GET /customer/v1/carts liệt kê MỌI giỏ đang mở
// theo TẤT CẢ store cùng lúc (khác getStoreCartV2 chỉ theo 1 store) —
// mỗi dòng ở đây là giỏ của 1 nhà thuốc/cửa hàng, bấm vào mở
// StoreCartV2 để xem/sửa chi tiết + đặt hàng thật. Xem
// [[marketplace-core-business-model]].
const MyCartsV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getCartsV2Status(state));
  const carts = useSelector(state => selectCartsV2(state));
  const stores = useSelector(state => selectStoresV2(state));
  const loading = status === Status.LOADING;

  const load = () => {
    dispatch(getCartsV2());
    dispatch(getStoresV2());
  };

  useEffect(() => {
    load();
  }, []);

  // Chỉ hiện giỏ có sản phẩm — giỏ rỗng (server tự tạo sẵn khi ghé 1
  // store) không có ý nghĩa hiển thị ở đây.
  const nonEmptyCarts = carts.filter(c => (c.items || []).length > 0);

  const renderItem = ({ item }) => {
    const store = stores.find(s => s.id === item.store_id);
    const storeName = store?.name || `Nhà thuốc #${String(item.store_id).slice(0, 6)}`;
    const itemCount = (item.items || []).reduce((sum, i) => sum + (i.qty || 0), 0);
    const subtotal = (item.items || []).reduce((sum, i) => sum + (i.line_total || 0), 0);
    return (
      <PressScale
        style={styles.card}
        onPress={() => navigation.navigate(NAVIGATION_STORE_CART_V2, { storeId: item.store_id, storeName })}
      >
        <View style={styles.cardIcon}>
          <Icon type="feather" name="shopping-cart" color={brandColors.tealPrimary} size={s(18)} />
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.storeName} numberOfLines={1}>{storeName}</Text>
          <Text style={styles.itemCount}>{itemCount} sản phẩm</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.subtotal}>{formatMoney(subtotal, { unit: 'đ' })}</Text>
          <Icon type="feather" name="chevron-right" color={brandColors.mutedLight} size={s(16)} />
        </View>
      </PressScale>
    );
  };

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
      </View>

      <FlatList
        data={nonEmptyCarts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="shopping-cart" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có giỏ hàng nào</Text>
              <PressScale style={styles.browseButton} onPress={() => navigation.navigate(NAVIGATION_STORES_V2)}>
                <Text style={styles.browseButtonText}>Chọn nhà thuốc để mua sắm</Text>
              </PressScale>
            </View>
          )
        }
      />
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    marginTop: s(8),
    marginHorizontal: s(20),
    marginBottom: s(14),
  },
  headerTitle: {
    color: brandColors.textDark,
    fontSize: fs(20),
    fontWeight: '800',
  },
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(96),
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
    padding: s(14),
    marginBottom: s(12),
  },
  cardIcon: {
    width: s(38),
    height: s(38),
    borderRadius: s(12),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealLight,
  },
  cardBody: {
    flex: 1,
  },
  storeName: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  itemCount: {
    marginTop: s(2),
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
  },
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
  },
  subtotal: {
    color: brandColors.tealDark,
    fontSize: fs(13.5),
    fontWeight: '800',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: s(80),
    gap: s(14),
  },
  emptyText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
  browseButton: {
    marginTop: s(4),
    paddingHorizontal: s(20),
    height: s(44),
    borderRadius: s(14),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealPrimary,
  },
  browseButtonText: {
    color: brandColors.surface,
    fontSize: fs(13),
    fontWeight: '700',
  },
});

export default MyCartsV2;
