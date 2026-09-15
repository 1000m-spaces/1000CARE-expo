import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getStoreProductsV2, applyProductMessageV2 } from '~/store/catalogV2/catalogV2Actions';
import {
  getProductMessageThreadV2,
  getStoreProductsV2 as selectStoreProductsV2,
  getApplyProductMessageV2Status,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { formatMoney } from '~/utils/format';
import { getLocalMessages, addLocalMessage } from '~/neomed/chatLocalStore';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Màn 1 hội thoại — ghép 2 nguồn dữ liệu KHÁC HẲN NHAU theo đúng thống
// nhất với 1000care-seller-app-f1 (app Marketer) 2026-09-15:
// 1) Bong bóng "gợi ý sản phẩm" — DỮ LIỆU THẬT qua backend
//    (GET /customer/v1/product-messages, product_ids join với
//    GET /customer/v1/stores/{storeID}/products để có tên/giá/ảnh —
//    API product-messages chỉ trả product_ids trần, không có sẵn).
// 2) Bong bóng chữ mình gõ — CHỈ lưu local (AsyncStorage qua
//    chatLocalStore), KHÔNG gửi đi đâu cả, marketer không thấy được.
//    Phải luôn hiện rõ banner cảnh báo, không để người dùng tưởng nhầm
//    là đã nhắn tin 2 chiều thật.
// Xem [[marketplace-core-business-model]] mục 'chat marketer'.
const ChatThreadV2 = ({ navigation, route }) => {
  const { marketerId, marketerName } = route.params || {};
  const dispatch = useDispatch();
  const thread = useSelector(state => getProductMessageThreadV2(state, marketerId));
  const [localMessages, setLocalMessages] = useState([]);
  const [draft, setDraft] = useState('');

  const productMessages = thread?.messages || [];

  const storeIds = useMemo(
    () => [...new Set(productMessages.map(m => m.store_id).filter(Boolean))],
    [productMessages],
  );

  useEffect(() => {
    storeIds.forEach(storeId => dispatch(getStoreProductsV2(storeId)));
  }, [storeIds.join(',')]);

  useEffect(() => {
    if (!marketerId) return;
    getLocalMessages(marketerId).then(setLocalMessages);
  }, [marketerId]);

  const onSend = async () => {
    const text = draft.trim();
    if (!text) return;
    setDraft('');
    const saved = await addLocalMessage(marketerId, text);
    setLocalMessages(prev => [...prev, saved]);
  };

  // Ghép 2 nguồn theo dòng thời gian để hiển thị xen kẽ tự nhiên.
  const timeline = useMemo(() => {
    const productEntries = productMessages.map(m => ({
      type: 'product',
      key: `p-${m.id}`,
      at: m.created_at,
      data: m,
    }));
    const textEntries = localMessages.map(m => ({
      type: 'text',
      key: `t-${m.id}`,
      at: m.createdAt,
      data: m,
    }));
    return [...productEntries, ...textEntries].sort((a, b) => new Date(a.at) - new Date(b.at));
  }, [productMessages, localMessages]);

  const renderItem = ({ item }) => {
    if (item.type === 'text') {
      return (
        <View style={[styles.bubbleRow, styles.bubbleRowMine]}>
          <View style={styles.bubbleMine}>
            <Text style={styles.bubbleMineText}>{item.data.text}</Text>
          </View>
        </View>
      );
    }
    return (
      <ProductMessageBubble key={item.key} message={item.data} />
    );
  };

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <Text style={styles.headerTitle} numberOfLines={1}>{marketerName || 'Hội thoại'}</Text>
      </View>

      <View style={styles.warningBanner}>
        <Icon type="feather" name="info" color={brandColors.goldDark} size={s(14)} />
        <Text style={styles.warningText}>
          Tin nhắn văn bản hiện chỉ lưu trên máy này, marketer chưa nhận được — tính năng nhắn tin 2 chiều đang phát triển. Gợi ý sản phẩm thì đồng bộ thật.
        </Text>
      </View>

      <FlatList
        data={timeline}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        inverted={false}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.composer}>
          <TextInput
            style={styles.composerInput}
            placeholder="Nhắn tin..."
            placeholderTextColor={brandColors.mutedLight}
            value={draft}
            onChangeText={setDraft}
            multiline
          />
          <PressScale style={styles.sendButton} onPress={onSend} disabled={!draft.trim()}>
            <Icon type="feather" name="send" color={brandColors.surface} size={s(16)} />
          </PressScale>
        </View>
      </KeyboardAvoidingView>
    </AppBackground>
  );
};

const ProductMessageBubble = ({ message }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => selectStoreProductsV2(state, message.store_id));
  const applyStatus = useSelector(state => getApplyProductMessageV2Status(state, message.id));
  const applying = applyStatus === Status.LOADING;
  const alreadyApplied = !!message.applied_at;

  const matchedProducts = (message.product_ids || [])
    .map(id => products.find(p => p.product_id === id))
    .filter(Boolean);

  return (
    <View style={[styles.bubbleRow, styles.bubbleRowTheirs]}>
      {!!message.note?.trim() && (
        <View style={styles.bubbleTheirs}>
          <Text style={styles.bubbleTheirsText}>{message.note.trim()}</Text>
        </View>
      )}
      <View style={styles.productBubble}>
        <View style={styles.pbHead}>
          <Icon type="feather" name="package" color={brandColors.tealPrimary} size={s(15)} />
          <Text style={styles.pbEyebrow}>GỢI Ý SẢN PHẨM</Text>
          <View style={styles.pbBadge}>
            <Text style={styles.pbBadgeText}>{message.product_ids?.length || 0} SP</Text>
          </View>
        </View>

        {matchedProducts.length === 0 ? (
          <Text style={styles.pbLoading}>Đang tải sản phẩm...</Text>
        ) : (
          matchedProducts.map(p => (
            <View key={p.product_id} style={styles.pbRow}>
              {p.media ? (
                <Image source={{ uri: p.media }} style={styles.pbThumb} />
              ) : (
                <View style={styles.pbThumb} />
              )}
              <Text style={styles.pbName} numberOfLines={1}>{p.name}</Text>
              <Text style={styles.pbPrice}>{formatMoney(p.price, { unit: 'đ' })}</Text>
            </View>
          ))
        )}

        {alreadyApplied ? (
          <View style={styles.pbAppliedRow}>
            <Icon type="feather" name="check-circle" color={brandColors.success} size={s(14)} />
            <Text style={styles.pbAppliedText}>Đã áp dụng vào giỏ hàng</Text>
          </View>
        ) : (
          <View style={styles.pbActions}>
            <PressScale
              style={styles.pbApplyButton}
              disabled={applying}
              onPress={() => dispatch(applyProductMessageV2(message.id))}
            >
              <Icon type="feather" name="shopping-cart" color={brandColors.surface} size={s(13)} />
              <Text style={styles.pbApplyText}>{applying ? 'Đang áp dụng...' : 'Áp dụng vào giỏ hàng'}</Text>
            </PressScale>
            <PressScale style={styles.pbLaterButton}>
              <Text style={styles.pbLaterText}>Xem sau</Text>
            </PressScale>
          </View>
        )}
      </View>
      {!!message.created_at && (
        <Text style={styles.bubbleTime}>{new Date(message.created_at).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</Text>
      )}
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
    marginBottom: s(10),
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
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(16),
    fontWeight: '800',
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: s(8),
    marginHorizontal: s(20),
    marginBottom: s(10),
    padding: s(10),
    borderRadius: s(12),
    backgroundColor: brandColors.warningTint,
  },
  warningText: {
    flex: 1,
    color: brandColors.goldDark,
    fontSize: fs(10.5),
    lineHeight: fs(15),
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: s(16),
    paddingBottom: s(16),
    gap: s(10),
  },
  bubbleRow: {
    maxWidth: '84%',
    gap: s(4),
  },
  bubbleRowMine: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  bubbleRowTheirs: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  bubbleMine: {
    backgroundColor: brandColors.tealPrimary,
    borderRadius: s(18),
    borderBottomRightRadius: s(4),
    paddingVertical: s(10),
    paddingHorizontal: s(14),
  },
  bubbleMineText: {
    color: brandColors.surface,
    fontSize: fs(13.5),
    lineHeight: fs(19),
    fontWeight: '500',
  },
  bubbleTheirs: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    borderRadius: s(18),
    borderBottomLeftRadius: s(4),
    paddingVertical: s(10),
    paddingHorizontal: s(14),
  },
  bubbleTheirsText: {
    color: brandColors.textDark,
    fontSize: fs(13.5),
    lineHeight: fs(19),
    fontWeight: '500',
  },
  bubbleTime: {
    fontSize: fs(10),
    color: brandColors.mutedLight,
    fontWeight: '600',
    paddingHorizontal: s(4),
  },
  productBubble: {
    width: s(260),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.border,
    borderRadius: s(18),
    borderBottomLeftRadius: s(4),
    overflow: 'hidden',
    ...brandShadow.soft,
  },
  pbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(7),
    paddingHorizontal: s(14),
    paddingTop: s(12),
    paddingBottom: s(8),
  },
  pbEyebrow: {
    fontSize: fs(10),
    fontWeight: '700',
    letterSpacing: 0.6,
    color: brandColors.tealDark,
  },
  pbBadge: {
    marginLeft: 'auto',
    backgroundColor: brandColors.goldTint,
    paddingHorizontal: s(9),
    paddingVertical: s(3),
    borderRadius: s(999),
  },
  pbBadgeText: {
    fontSize: fs(10.5),
    fontWeight: '800',
    color: brandColors.goldDark,
  },
  pbLoading: {
    paddingHorizontal: s(14),
    paddingBottom: s(12),
    fontSize: fs(11.5),
    color: brandColors.mutedLight,
    fontWeight: '600',
  },
  pbRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
    paddingHorizontal: s(14),
    paddingVertical: s(8),
    borderTopWidth: 1,
    borderTopColor: brandColors.border,
  },
  pbThumb: {
    width: s(36),
    height: s(36),
    borderRadius: s(8),
    backgroundColor: brandColors.tealLight,
  },
  pbName: {
    flex: 1,
    fontSize: fs(12.5),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  pbPrice: {
    fontSize: fs(12.5),
    fontWeight: '800',
    color: brandColors.tealDark,
  },
  pbActions: {
    flexDirection: 'row',
    gap: s(8),
    padding: s(14),
    borderTopWidth: 1,
    borderTopColor: brandColors.border,
  },
  pbApplyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(6),
    backgroundColor: brandColors.tealPrimary,
    borderRadius: s(12),
    paddingVertical: s(10),
  },
  pbApplyText: {
    color: brandColors.surface,
    fontSize: fs(11.5),
    fontWeight: '700',
  },
  pbLaterButton: {
    paddingVertical: s(10),
    paddingHorizontal: s(6),
  },
  pbLaterText: {
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
  },
  pbAppliedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(6),
    padding: s(14),
    borderTopWidth: 1,
    borderTopColor: brandColors.border,
  },
  pbAppliedText: {
    color: brandColors.success,
    fontSize: fs(11.5),
    fontWeight: '700',
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: s(8),
    paddingHorizontal: s(16),
    paddingTop: s(10),
    paddingBottom: s(16),
    backgroundColor: brandColors.surface,
    borderTopWidth: 1,
    borderTopColor: brandColors.border,
  },
  composerInput: {
    flex: 1,
    maxHeight: s(100),
    backgroundColor: brandColors.tealLight,
    borderRadius: s(20),
    paddingHorizontal: s(16),
    paddingVertical: s(10),
    fontSize: fs(13.5),
    color: brandColors.textDark,
  },
  sendButton: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealPrimary,
  },
});

export default ChatThreadV2;
