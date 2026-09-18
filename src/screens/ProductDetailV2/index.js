import React, { useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon, Text } from '~/common/index';
import { getProductDetailV2 as getProductDetailV2Action } from '~/store/catalogV2/catalogV2Actions';
import { getProductDetailV2Status, getProductDetailV2 as selectProductDetailV2 } from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { getV2ProductThumb } from '~/utils/image';
import { NAVIGATION_STORE_CATALOG_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Trang "Chi tiết sản phẩm" (2026-09-18, kiến trúc Campaign) —
// GET /customer/v1/products/{id}, đủ field backoffice quản lý (sku,
// barcode, nhóm ngành, nhóm sản phẩm, đơn vị tính, kiểm soát...). Mở từ
// bấm 1 SP ở home feed/kết quả tìm kiếm — chỉ cần `product_id`, KHÔNG
// cần biết trước store_id (trang tự trả `store_id` để bấm "Xem shop").
// Xem [[marketplace-core-business-model]].
const DetailRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue} numberOfLines={2}>{value}</Text>
    </View>
  );
};

const ProductDetailV2 = ({ navigation, route }) => {
  const { productId } = route.params || {};
  const dispatch = useDispatch();
  const status = useSelector(state => getProductDetailV2Status(state, productId));
  const product = useSelector(state => selectProductDetailV2(state, productId));
  const loading = status === Status.LOADING || status === undefined;

  useEffect(() => {
    if (productId) dispatch(getProductDetailV2Action(productId));
  }, [productId]);

  const thumb = getV2ProductThumb(product);

  const goToShop = () => {
    if (!product?.store_id) return;
    navigation.navigate(NAVIGATION_STORE_CATALOG_V2, { storeId: product.store_id });
  };

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButtonGlass}>
          <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
        </PressScale>
        <Text style={styles.headerTitle} numberOfLines={1}>Chi tiết sản phẩm</Text>
        <View style={{ width: s(38) }} />
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <Text style={styles.loadingText}>Đang tải...</Text>
        </View>
      ) : !product ? (
        <View style={styles.loadingWrap}>
          <Icon type="feather" name="alert-circle" color={brandColors.mutedLight} size={s(28)} />
          <Text style={styles.loadingText}>Không tìm thấy sản phẩm</Text>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.imageWrap}>
              {thumb ? (
                <Image source={{ uri: thumb }} style={styles.image} resizeMode="contain" />
              ) : (
                <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(40)} />
              )}
            </View>

            <View style={styles.badgeRow}>
              {product.rx ? <Text style={styles.rxBadge}>Kê đơn (Rx)</Text> : null}
              {product.controlled ? <Text style={styles.controlledBadge}>Kiểm soát đặc biệt</Text> : null}
            </View>

            <Text style={styles.name}>{product.name}</Text>
            {!!product.brand && <Text style={styles.brand}>{product.brand}</Text>}
            <Text style={styles.price}>{formatMoney(product.price, { unit: 'đ' })}</Text>

            <View style={styles.detailCard}>
              <DetailRow label="SKU" value={product.sku} />
              <DetailRow label="Mã vạch" value={product.barcode} />
              <DetailRow label="Nhóm ngành" value={product.vertical_code} />
              <DetailRow label="Nhóm sản phẩm" value={product.category_name} />
              <DetailRow label="Đơn vị tính" value={product.unit} />
            </View>

            {!!product.description && (
              <View style={styles.descCard}>
                <Text style={styles.descTitle}>Mô tả</Text>
                <Text style={styles.descText}>{product.description}</Text>
              </View>
            )}
          </ScrollView>

          <View style={styles.footer}>
            <PressScale style={styles.shopButton} onPress={goToShop} disabled={!product.store_id}>
              <Icon type="feather" name="shopping-bag" color={brandColors.surface} size={s(16)} />
              <Text style={styles.shopButtonText}>Xem shop</Text>
            </PressScale>
          </View>
        </>
      )}
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(8),
    paddingHorizontal: s(16),
    marginBottom: s(10),
  },
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
    flex: 1,
    textAlign: 'center',
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  loadingWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(10),
  },
  loadingText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(120),
  },
  imageWrap: {
    width: '100%',
    height: s(220),
    borderRadius: s(20),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(16),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: s(8),
    marginBottom: s(8),
  },
  rxBadge: {
    color: brandColors.dangerText,
    backgroundColor: brandColors.dangerTint,
    fontSize: fs(10.5),
    fontWeight: '800',
    paddingHorizontal: s(8),
    paddingVertical: s(4),
    borderRadius: s(8),
    overflow: 'hidden',
  },
  controlledBadge: {
    color: brandColors.warning,
    backgroundColor: brandColors.warningTint,
    fontSize: fs(10.5),
    fontWeight: '800',
    paddingHorizontal: s(8),
    paddingVertical: s(4),
    borderRadius: s(8),
    overflow: 'hidden',
  },
  name: {
    color: brandColors.textDark,
    fontSize: fs(17),
    fontWeight: '800',
    marginBottom: s(4),
  },
  brand: {
    color: brandColors.muted,
    fontSize: fs(12.5),
    fontWeight: '600',
    marginBottom: s(8),
  },
  price: {
    color: brandColors.tealDark,
    fontSize: fs(20),
    fontWeight: '800',
    marginBottom: s(18),
  },
  detailCard: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(14),
    marginBottom: s(16),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: s(8),
    borderBottomWidth: 1,
    borderBottomColor: brandColors.borderSoft,
    gap: s(12),
  },
  detailLabel: {
    color: brandColors.muted,
    fontSize: fs(12.5),
    fontWeight: '600',
  },
  detailValue: {
    flex: 1,
    textAlign: 'right',
    color: brandColors.textDark,
    fontSize: fs(12.5),
    fontWeight: '700',
  },
  descCard: {
    marginBottom: s(16),
  },
  descTitle: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '800',
    marginBottom: s(8),
  },
  descText: {
    color: brandColors.muted,
    fontSize: fs(12.5),
    lineHeight: fs(19),
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: s(16),
    backgroundColor: brandColors.surface,
    borderTopWidth: 1,
    borderTopColor: brandColors.borderSoft,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
    height: s(50),
    borderRadius: s(999),
    backgroundColor: brandColors.tealPrimary,
  },
  shopButtonText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontWeight: '800',
  },
});

export default ProductDetailV2;
