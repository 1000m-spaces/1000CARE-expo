import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getStoreProductsV2, applyProductMessageV2 } from '~/store/catalogV2/catalogV2Actions';
import {
  getStoreProductsV2 as selectStoreProductsV2,
  getProductMessageByIdV2,
  getApplyProductMessageV2Status,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { getV2ProductThumb } from '~/utils/image';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Xem trước đầy đủ 1 "gợi ý sản phẩm" marketer gửi trước khi quyết định
// áp dụng — mở từ bong bóng chat (ChatThreadV2), theo đúng luồng: bấm
// bong bóng → xem list SP → thấy hợp thì bấm "Áp dụng vào giỏ hàng"
// (POST /customer/v1/product-messages/{id}/apply-to-cart, cộng thẳng
// vào giỏ hàng thật của họ). Xem [[marketplace-core-business-model]]
// mục 'chat marketer'.
const ProductMessagePreviewV2 = ({ navigation, route }) => {
  const { messageId, marketerName } = route.params || {};
  const dispatch = useDispatch();
  const message = useSelector(state => getProductMessageByIdV2(state, messageId));
  const products = useSelector(state => selectStoreProductsV2(state, message?.store_id));
  const applyStatus = useSelector(state => getApplyProductMessageV2Status(state, messageId));
  const applying = applyStatus === Status.LOADING;
  const alreadyApplied = !!message?.applied_at;

  useEffect(() => {
    if (message?.store_id) {
      dispatch(getStoreProductsV2(message.store_id));
    }
  }, [message?.store_id]);

  const matchedProducts = (message?.product_ids || [])
    .map(id => products.find(p => p.product_id === id))
    .filter(Boolean);
  const stillLoading = matchedProducts.length < (message?.product_ids?.length || 0);
  const subtotal = matchedProducts.reduce((sum, p) => sum + (p.price || 0), 0);

  const onApply = () => {
    dispatch(applyProductMessageV2(messageId));
  };

  if (!message) {
    return (
      <AppBackground>
        <View style={styles.headerRow}>
          <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
            <View style={styles.backButtonGlass}>
              <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
            </View>
          </PressScale>
          <Text style={styles.headerTitle}>Gợi ý sản phẩm</Text>
        </View>
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyText}>Không tìm thấy gợi ý này</Text>
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle} numberOfLines={1}>Gợi ý sản phẩm</Text>
          {!!marketerName && <Text style={styles.headerSubtitle} numberOfLines={1}>Từ {marketerName}</Text>}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!!message.note?.trim() && (
          <View style={styles.noteCard}>
            <Icon type="feather" name="message-square" color={brandColors.tealDark} size={s(14)} />
            <Text style={styles.noteText}>{message.note.trim()}</Text>
          </View>
        )}

        <Text style={styles.sectionLabel}>{message.product_ids?.length || 0} sản phẩm được gợi ý</Text>

        {matchedProducts.map(p => (
          <View key={p.product_id} style={styles.productRow}>
            {getV2ProductThumb(p) ? (
              <Image source={{ uri: getV2ProductThumb(p) }} style={styles.thumb} />
            ) : (
              <View style={[styles.thumb, styles.thumbPlaceholder]}>
                <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(18)} />
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>{p.name}</Text>
              {!!p.brand && <Text style={styles.productBrand} numberOfLines={1}>{p.brand}</Text>}
            </View>
            <Text style={styles.productPrice}>{formatMoney(p.price, { unit: 'đ' })}</Text>
          </View>
        ))}

        {stillLoading && <Text style={styles.loadingText}>Đang tải thêm sản phẩm...</Text>}
      </ScrollView>

      <View style={styles.summaryBar}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tạm tính</Text>
          <Text style={styles.summaryValue}>{formatMoney(subtotal, { unit: 'đ' })}</Text>
        </View>

        {alreadyApplied ? (
          <View style={styles.appliedButton}>
            <Icon type="feather" name="check-circle" color={brandColors.success} size={s(16)} />
            <Text style={styles.appliedButtonText}>Đã áp dụng vào giỏ hàng</Text>
          </View>
        ) : (
          <View style={styles.actionsRow}>
            <PressScale style={styles.laterButton} onPress={() => navigation.pop()}>
              <Text style={styles.laterButtonText}>Xem sau</Text>
            </PressScale>
            <PressScale style={styles.applyButton} disabled={applying} onPress={onApply}>
              <Icon type="feather" name="shopping-cart" color={brandColors.surface} size={s(15)} />
              <Text style={styles.applyButtonText}>
                {applying ? 'Đang áp dụng...' : 'Áp dụng vào giỏ hàng'}
              </Text>
            </PressScale>
          </View>
        )}
      </View>
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
    fontSize: fs(16),
    fontWeight: '800',
  },
  headerSubtitle: {
    marginTop: s(2),
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(180),
  },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: s(8),
    backgroundColor: brandColors.tealLight,
    borderRadius: s(14),
    padding: s(14),
    marginBottom: s(18),
  },
  noteText: {
    flex: 1,
    color: brandColors.tealDark,
    fontSize: fs(13),
    lineHeight: fs(19),
    fontWeight: '600',
  },
  sectionLabel: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
    marginBottom: s(10),
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(12),
    marginBottom: s(10),
  },
  thumb: {
    width: s(52),
    height: s(52),
    borderRadius: s(12),
    backgroundColor: brandColors.tealLight,
  },
  thumbPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    color: brandColors.textDark,
    fontSize: fs(13),
    fontWeight: '700',
  },
  productBrand: {
    marginTop: s(2),
    color: brandColors.muted,
    fontSize: fs(11),
    fontWeight: '600',
  },
  productPrice: {
    color: brandColors.tealDark,
    fontSize: fs(13.5),
    fontWeight: '800',
  },
  loadingText: {
    textAlign: 'center',
    color: brandColors.mutedLight,
    fontSize: fs(12),
    fontWeight: '600',
    marginTop: s(8),
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  actionsRow: {
    flexDirection: 'row',
    gap: s(10),
  },
  laterButton: {
    paddingHorizontal: s(16),
    height: s(48),
    borderRadius: s(14),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: brandColors.border,
  },
  laterButtonText: {
    color: brandColors.muted,
    fontSize: fs(13.5),
    fontWeight: '700',
  },
  applyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
    height: s(48),
    borderRadius: s(14),
    backgroundColor: brandColors.tealPrimary,
  },
  applyButtonText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontWeight: '800',
  },
  appliedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
    height: s(48),
    borderRadius: s(14),
    backgroundColor: brandColors.successTint,
  },
  appliedButtonText: {
    color: brandColors.successText,
    fontSize: fs(14),
    fontWeight: '800',
  },
});

export default ProductMessagePreviewV2;
