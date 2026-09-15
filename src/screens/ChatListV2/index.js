import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getProductMessagesV2 } from '~/store/catalogV2/catalogV2Actions';
import { getProductMessagesV2Status, getProductMessageThreadsV2 } from '~/store/catalogV2/catalogV2Selector';
import { getMarketerLinksV2 } from '~/store/authV2/authV2Actions';
import { getMarketerLinksV2 as selectMarketerLinksV2 } from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { NAVIGATION_CHAT_THREAD_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// Danh sách "hội thoại" với marketer — KHÔNG có module chat thật ở
// backend (marketplace-core không có, thống nhất với 1000care-seller-app-f1
// 2026-09-15). Hội thoại ở đây là nhóm CLIENT-SIDE các ProductMessage
// (GET /customer/v1/product-messages) theo member_marketer_id — chỉ
// marketer nào đã gửi ít nhất 1 gợi ý sản phẩm mới xuất hiện ở đây (chưa
// hỗ trợ pharmacy tự mở hội thoại mới). Tên marketer: API không trả
// (chỉ có UUID) — lấy tạm từ marketer-links đã confirm nếu có, không thì
// hiện "Marketer #<id rút gọn>" (đã báo gap này cho marketplace-core-21,
// chờ FR mới nếu cần tên thật). Xem [[marketplace-core-business-model]].
const resolveMarketerName = (marketerId, marketerLinks) => {
  const link = (marketerLinks || []).find(l => l.marketer_id === marketerId)
  if (link?.marketer_name) return link.marketer_name
  return `Marketer #${String(marketerId).slice(0, 6)}`
}

const ChatListV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getProductMessagesV2Status(state));
  const threads = useSelector(state => getProductMessageThreadsV2(state));
  const marketerLinks = useSelector(state => selectMarketerLinksV2(state));
  const loading = status === Status.LOADING;

  const load = () => {
    dispatch(getProductMessagesV2());
    dispatch(getMarketerLinksV2());
  };

  useEffect(() => {
    load();
  }, []);

  const renderItem = ({ item }) => {
    const marketerName = resolveMarketerName(item.marketerId, marketerLinks);
    const last = item.lastMessage;
    const preview = last?.note?.trim()
      ? last.note.trim()
      : `Gợi ý ${last?.product_ids?.length || 0} sản phẩm`;
    return (
      <PressScale
        style={styles.row}
        onPress={() => navigation.navigate(NAVIGATION_CHAT_THREAD_V2, { marketerId: item.marketerId, marketerName })}
      >
        <View style={styles.avatar}>
          <Icon type="feather" name="user" color={brandColors.tealPrimary} size={s(18)} />
        </View>
        <View style={styles.body}>
          <View style={styles.bodyTop}>
            <Text style={styles.name} numberOfLines={1}>{marketerName}</Text>
            {!!last?.created_at && (
              <Text style={styles.time}>{new Date(last.created_at).toLocaleDateString('vi-VN')}</Text>
            )}
          </View>
          <Text style={styles.preview} numberOfLines={1}>{preview}</Text>
        </View>
        {item.unappliedCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.unappliedCount}</Text>
          </View>
        )}
      </PressScale>
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
        <Text style={styles.headerTitle}>Tin nhắn marketer</Text>
      </View>

      <FlatList
        data={threads}
        keyExtractor={item => item.marketerId}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="message-circle" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có hội thoại nào</Text>
              <Text style={styles.emptySubtext}>
                Khi marketer gửi gợi ý sản phẩm cho bạn, hội thoại sẽ xuất hiện ở đây.
              </Text>
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
  row: {
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
  avatar: {
    width: s(42),
    height: s(42),
    borderRadius: s(21),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealLight,
  },
  body: {
    flex: 1,
  },
  bodyTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  time: {
    color: brandColors.mutedLight,
    fontSize: fs(10.5),
    fontWeight: '600',
    marginLeft: s(8),
  },
  preview: {
    marginTop: s(3),
    color: brandColors.muted,
    fontSize: fs(12),
    fontWeight: '600',
  },
  badge: {
    minWidth: s(20),
    height: s(20),
    borderRadius: s(10),
    paddingHorizontal: s(6),
    backgroundColor: brandColors.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: brandColors.surface,
    fontSize: fs(10.5),
    fontWeight: '800',
  },
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: s(80),
    paddingHorizontal: s(32),
    gap: s(10),
  },
  emptyText: {
    color: brandColors.mutedLight,
    fontSize: fs(13),
    fontWeight: '600',
  },
  emptySubtext: {
    color: brandColors.mutedLight,
    fontSize: fs(11.5),
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: fs(17),
  },
});

export default ChatListV2;
