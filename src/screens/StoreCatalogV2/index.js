import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getStoreProductsV2, getStoreCartV2, updateCartItemV2, getStoreCategoriesV2 } from '~/store/catalogV2/catalogV2Actions';
import {
  getStoreProductsV2Status,
  getStoreProductsV2 as selectStoreProductsV2,
  getStoreCartV2 as selectStoreCartV2,
  getCartItemV2ActionStatus,
  getStoreCategoriesV2 as selectStoreCategoriesV2,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { getV2ProductThumb } from '~/utils/image';
import { NAVIGATION_STORE_CART_V2, NAVIGATION_PRODUCT_DETAIL_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

const ProductRow = ({ item, qty, storeId, onChangeQty, navigation }) => {
  const actionStatus = useSelector(state => getCartItemV2ActionStatus(state, storeId, item.product_id));
  const busy = actionStatus === Status.LOADING;
  const thumb = getV2ProductThumb(item);
  return (
    <View style={styles.card}>
      <PressScale
        style={styles.cardTapArea}
        onPress={() => navigation.navigate(NAVIGATION_PRODUCT_DETAIL_V2, { productId: item.product_id })}
      >
        {thumb ? (
          <Image source={{ uri: thumb }} style={styles.thumb} />
        ) : (
          <View style={[styles.thumb, styles.thumbPlaceholder]}>
            <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(20)} />
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
          {!!item.brand && <Text style={styles.brand} numberOfLines={1}>{item.brand}</Text>}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatMoney(item.price, { unit: 'đ' })}</Text>
            {item.rx ? <Text style={styles.rxBadge}>Rx</Text> : null}
          </View>
        </View>
      </PressScale>
      <View style={styles.stepper}>
        <PressScale
          style={[styles.stepperBtn, (busy || qty === 0) && styles.stepperBtnDisabled]}
          disabled={busy || qty === 0}
          onPress={() => onChangeQty(item.product_id, qty - 1)}
        >
          <Icon type="feather" name="minus" color={brandColors.tealDark} size={s(14)} />
        </PressScale>
        <Text style={styles.stepperQty}>{qty}</Text>
        <PressScale
          style={[styles.stepperBtnAdd, busy && styles.stepperBtnDisabled]}
          disabled={busy}
          onPress={() => onChangeQty(item.product_id, qty + 1)}
        >
          <Icon type="feather" name="plus" color={brandColors.surface} size={s(14)} />
        </PressScale>
      </View>
    </View>
  );
};

// GET /customer/v1/stores/{id}/products — catalog THẬT theo nhà thuốc.
// PUT /customer/v1/stores/{id}/cart/items/{productId} để +/- số lượng
// ngay tại đây (giỏ hàng thật, chưa đụng checkout). Thanh danh mục
// (2026-09-18, kiến trúc Campaign) kiểu Shopee: GET .../categories liệt
// kê danh mục CÓ hàng trong store này, bấm 1 danh mục thì gọi lại
// .../products?category_id= để lọc. Xem
// [[marketplace-core-business-model]].
const StoreCatalogV2 = ({ navigation, route }) => {
  const { storeId, storeName } = route.params || {};
  const dispatch = useDispatch();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const status = useSelector(state => getStoreProductsV2Status(state, storeId));
  const products = useSelector(state => selectStoreProductsV2(state, storeId));
  const categories = useSelector(state => selectStoreCategoriesV2(state, storeId));
  const cart = useSelector(state => selectStoreCartV2(state, storeId));
  const loading = status === Status.LOADING;

  const cartQtyByProduct = {};
  (cart?.items || []).forEach(item => {
    cartQtyByProduct[item.product_id] = item.qty;
  });
  const cartCount = (cart?.items || []).reduce((sum, item) => sum + (item.qty || 0), 0);

  const load = () => {
    dispatch(getStoreProductsV2(storeId, activeCategoryId));
    dispatch(getStoreCartV2(storeId));
    dispatch(getStoreCategoriesV2(storeId));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId]);

  const onSelectCategory = categoryId => {
    const nextId = categoryId === activeCategoryId ? null : categoryId;
    setActiveCategoryId(nextId);
    dispatch(getStoreProductsV2(storeId, nextId));
  };

  const onChangeQty = (productId, nextQty) => {
    dispatch(updateCartItemV2(storeId, productId, Math.max(0, nextQty)));
  };

  const renderItem = ({ item }) => (
    <ProductRow
      item={item}
      qty={cartQtyByProduct[item.product_id] || 0}
      storeId={storeId}
      onChangeQty={onChangeQty}
      navigation={navigation}
    />
  );

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <Text style={styles.headerTitle} numberOfLines={1}>{storeName || 'Catalog'}</Text>
      </View>

      {categories.length > 0 && (
        <View style={styles.categoryRowWrap}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            <PressScale
              style={[styles.categoryChip, !activeCategoryId && styles.categoryChipActive]}
              onPress={() => onSelectCategory(null)}
            >
              <Text style={[styles.categoryChipText, !activeCategoryId && styles.categoryChipTextActive]}>
                Tất cả
              </Text>
            </PressScale>
            {categories.map(cat => (
              <PressScale
                key={cat.category_id}
                style={[styles.categoryChip, activeCategoryId === cat.category_id && styles.categoryChipActive]}
                onPress={() => onSelectCategory(cat.category_id)}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    activeCategoryId === cat.category_id && styles.categoryChipTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {cat.category_name}
                </Text>
              </PressScale>
            ))}
          </ScrollView>
          {/* Fade mờ dần ở rìa phải (2026-09-19, sửa lại lần 2) — bản sửa
              trước chỉ giới hạn bề rộng chữ để "…" hoạt động, nhưng cái
              user thấy là "cắt" lại là do BẢN THÂN thanh cuộn: ở vị trí
              nghỉ (chưa cuộn), chip cuối cùng vừa lọt khung hình luôn bị
              rìa màn hình cắt ngang dở dang — đây là hành vi tự nhiên
              của MỌI thanh cuộn ngang (không phải lỗi chữ), không có
              cách nào tránh 100% trừ khi che bằng 1 dải mờ dần để nhìn
              như CHỦ Ý gợi ý "còn nữa, cuộn tiếp đi" thay vì trông như
              vỡ layout. pointerEvents="none" để không chặn cuộn/bấm. */}
          <LinearGradient
            colors={['transparent', brandColors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.categoryFade}
            pointerEvents="none"
          />
        </View>
      )}

      <FlatList
        data={products}
        keyExtractor={item => String(item.product_id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="box" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Nhà thuốc chưa có sản phẩm nào</Text>
            </View>
          )
        }
      />

      {cartCount > 0 && (
        <PressScale
          style={styles.cartBar}
          onPress={() => navigation.navigate(NAVIGATION_STORE_CART_V2, { storeId, storeName })}
        >
          <View style={styles.cartBarLeft}>
            <Icon type="feather" name="shopping-cart" color={brandColors.surface} size={s(16)} />
            <Text style={styles.cartBarText}>{cartCount} sản phẩm</Text>
          </View>
          <Text style={styles.cartBarSubtotal}>{formatMoney(cart?.subtotal || 0, { unit: 'đ' })}</Text>
        </PressScale>
      )}
    </AppBackground>
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
    fontSize: fs(17),
    fontWeight: '800',
    flexShrink: 1,
  },
  categoryRowWrap: {
    position: 'relative',
    marginBottom: s(14),
  },
  categoryRow: {
    paddingHorizontal: s(20),
    gap: s(8),
  },
  categoryFade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: s(28),
  },
  categoryChip: {
    paddingHorizontal: s(14),
    paddingVertical: s(9),
    borderRadius: s(999),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
  },
  categoryChipActive: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  categoryChipText: {
    // maxWidth đặt Ở ĐÂY (trên chính Text, KHÔNG phải trên View chip
    // cha) — maxWidth của cha không tự ép Text con co lại vì Text không
    // nằm trong 1 flex row cần chia chỗ, nó tự đo theo nội dung rồi
    // TRÀN ra ngoài maxWidth của cha (RN không tự cắt trừ khi chính
    // Text bị giới hạn bề rộng) — đây là lý do bản sửa trước (maxWidth
    // trên categoryChip) không ăn thua, chip vẫn bị rìa màn hình cắt
    // cụt giữa chữ thay vì tự rút gọn "…" (báo lỗi lại 2026-09-19).
    maxWidth: s(160) - s(28),
    color: brandColors.textDark,
    fontSize: fs(12),
    fontWeight: '700',
  },
  categoryChipTextActive: {
    color: brandColors.surface,
  },
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(100),
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
  cardTapArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    marginTop: s(4),
  },
  price: {
    color: brandColors.tealDark,
    fontSize: fs(13.5),
    fontWeight: '800',
  },
  rxBadge: {
    color: brandColors.dangerText,
    backgroundColor: brandColors.dangerTint,
    fontSize: fs(9.5),
    fontWeight: '800',
    paddingHorizontal: s(5),
    paddingVertical: s(1.5),
    borderRadius: s(5),
    overflow: 'hidden',
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
  cartBar: {
    position: 'absolute',
    left: s(20),
    right: s(20),
    bottom: s(24),
    height: s(56),
    borderRadius: s(16),
    backgroundColor: brandColors.tealPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: s(18),
    ...brandShadow.sheet,
  },
  cartBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  cartBarText: {
    color: brandColors.surface,
    fontSize: fs(13),
    fontWeight: '700',
  },
  cartBarSubtotal: {
    color: brandColors.goldAccent,
    fontSize: fs(14),
    fontWeight: '800',
  },
});

export default StoreCatalogV2;
