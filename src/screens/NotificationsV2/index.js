import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getNotificationsV2, markNotificationReadV2 } from '~/store/authV2/authV2Actions';
import { getNotificationsV2Status, getNotificationsV2 as getNotificationsV2Data } from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { NAVIGATION_ORDER_DETAIL_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

const KIND_META = {
  kyc_verified: { icon: 'check-circle', color: brandColors.success },
  kyc_rejected: { icon: 'x-circle', color: brandColors.danger },
  order_issue_supported: { icon: 'alert-triangle', color: brandColors.goldAccent },
};

const fmtDate = ts => (ts ? new Date(ts).toLocaleString('vi-VN') : '');

// GET/POST /customer/v1/notifications(/{id}/read) — thông báo thật từ
// backend mới (kyc_verified/kyc_rejected/order_issue_supported). Xem
// [[marketplace-core-business-model]].
const NotificationsV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getNotificationsV2Status(state));
  const notifications = useSelector(state => getNotificationsV2Data(state));
  const loading = status === Status.LOADING;

  useEffect(() => {
    dispatch(getNotificationsV2());
  }, []);

  const onPressItem = item => {
    if (!item.read_at) {
      dispatch(markNotificationReadV2(item.id));
    }
    if (item.order_id) {
      navigation.navigate(NAVIGATION_ORDER_DETAIL_V2, { orderId: item.order_id });
    }
  };

  const renderItem = ({ item }) => {
    const meta = KIND_META[item.kind] || { icon: 'bell', color: brandColors.tealPrimary };
    const unread = !item.read_at;
    return (
      <PressScale style={[styles.card, unread && styles.cardUnread]} onPress={() => onPressItem(item)}>
        <View style={[styles.iconWrap, { backgroundColor: `${meta.color}1A` }]}>
          <Icon type="feather" name={meta.icon} color={meta.color} size={s(18)} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.body} numberOfLines={3}>{item.body}</Text>
          <Text style={styles.time}>{fmtDate(item.created_at)}</Text>
        </View>
        {unread && <View style={styles.unreadDot} />}
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
        <Text style={styles.headerTitle}>Thông báo</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => dispatch(getNotificationsV2())} />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="bell-off" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có thông báo nào</Text>
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(14),
    marginBottom: s(12),
  },
  cardUnread: {
    borderColor: brandColors.tealPrimary,
    backgroundColor: brandColors.tealLight,
  },
  iconWrap: {
    width: s(38),
    height: s(38),
    borderRadius: s(13),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(13.5),
    fontWeight: '700',
  },
  body: {
    color: brandColors.muted,
    fontSize: fs(12.5),
    fontWeight: '600',
    marginTop: s(3),
    lineHeight: fs(18),
  },
  time: {
    color: brandColors.mutedLight,
    fontSize: fs(11),
    fontWeight: '600',
    marginTop: s(6),
  },
  unreadDot: {
    width: s(8),
    height: s(8),
    borderRadius: s(4),
    backgroundColor: brandColors.tealPrimary,
    marginTop: s(4),
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

export default NotificationsV2;
