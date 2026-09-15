import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getStoreProductsV2 } from '~/store/catalogV2/catalogV2Actions';
import {
  getProductMessageThreadV2,
  getStoreProductsV2 as selectStoreProductsV2,
} from '~/store/catalogV2/catalogV2Selector';
import { getLocalMessages, addLocalMessage } from '~/neomed/chatLocalStore';
import { NAVIGATION_PRODUCT_MESSAGE_PREVIEW_V2 } from '~/navigation/routes';
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
      <ProductMessageBubble
        key={item.key}
        message={item.data}
        navigation={navigation}
        marketerName={marketerName}
      />
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

// Bong bóng tóm tắt — bấm vào mở ProductMessagePreviewV2 để xem đủ danh
// sách SP + bấm "Áp dụng vào giỏ hàng" ở đó (tách 2 bước theo đúng luồng
// đã chốt: xem trước → thấy hợp thì mới áp dụng), thay vì nhồi cả list
// SP + 2 nút hành động ngay trong khung chat.
const ProductMessageBubble = ({ message, navigation, marketerName }) => {
  const products = useSelector(state => selectStoreProductsV2(state, message.store_id));
  const alreadyApplied = !!message.applied_at;
  const count = message.product_ids?.length || 0;

  const matchedNames = (message.product_ids || [])
    .map(id => products.find(p => p.product_id === id)?.name)
    .filter(Boolean);
  const previewText = matchedNames.length
    ? matchedNames.length > 1
      ? `${matchedNames[0]} và ${matchedNames.length - 1} sản phẩm khác`
      : matchedNames[0]
    : 'Đang tải sản phẩm...';

  return (
    <View style={[styles.bubbleRow, styles.bubbleRowTheirs]}>
      {!!message.note?.trim() && (
        <View style={styles.bubbleTheirs}>
          <Text style={styles.bubbleTheirsText}>{message.note.trim()}</Text>
        </View>
      )}
      <PressScale
        style={styles.productBubble}
        onPress={() => navigation.navigate(NAVIGATION_PRODUCT_MESSAGE_PREVIEW_V2, {
          messageId: message.id,
          marketerName,
        })}
      >
        <View style={styles.pbHead}>
          <Icon type="feather" name="package" color={brandColors.tealPrimary} size={s(15)} />
          <Text style={styles.pbEyebrow}>GỢI Ý SẢN PHẨM</Text>
          <View style={styles.pbBadge}>
            <Text style={styles.pbBadgeText}>{count} SP</Text>
          </View>
        </View>

        <Text style={styles.pbPreview} numberOfLines={1}>{previewText}</Text>

        {alreadyApplied ? (
          <View style={styles.pbAppliedRow}>
            <Icon type="feather" name="check-circle" color={brandColors.success} size={s(14)} />
            <Text style={styles.pbAppliedText}>Đã áp dụng vào giỏ hàng</Text>
          </View>
        ) : (
          <View style={styles.pbFooter}>
            <Text style={styles.pbFooterText}>Xem chi tiết & áp dụng</Text>
            <Icon type="feather" name="chevron-right" color={brandColors.tealPrimary} size={s(14)} />
          </View>
        )}
      </PressScale>
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
  pbPreview: {
    paddingHorizontal: s(14),
    paddingBottom: s(12),
    fontSize: fs(12.5),
    color: brandColors.textDark,
    fontWeight: '600',
  },
  pbFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: s(6),
    padding: s(14),
    borderTopWidth: 1,
    borderTopColor: brandColors.border,
  },
  pbFooterText: {
    color: brandColors.tealPrimary,
    fontSize: fs(11.5),
    fontWeight: '700',
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
