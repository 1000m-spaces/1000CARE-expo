import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import {
  getMarketerLinksV2 as getMarketerLinksV2Action,
  confirmMarketerLinkV2,
  rejectMarketerLinkV2,
} from '~/store/authV2/authV2Actions';
import {
  getMarketerLinksV2Status,
  getMarketerLinksV2,
  getMarketerLinkActionStatusV2,
} from '~/store/authV2/authV2Selector';
import Status from '~/common/Status/Status';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

const SOURCE_LABEL = { invite: 'Marketer mời', admin: 'Backoffice gán' };
const STATUS_LABEL = {
  pending: { text: 'Chờ xác nhận', color: brandColors.goldAccent },
  confirmed: { text: 'Đã xác nhận', color: brandColors.success },
  rejected: { text: 'Đã từ chối', color: brandColors.danger },
};

// GET/POST /customer/v1/marketer-links(...)/confirm|reject — liên kết
// với marketer (đối tác giới thiệu). Xem
// [[marketplace-core-business-model]].
const MarketerLinks = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getMarketerLinksV2Status(state));
  const links = useSelector(state => getMarketerLinksV2(state));
  const actionStatus = useSelector(state => getMarketerLinkActionStatusV2(state));
  const loading = status === Status.LOADING;

  useEffect(() => {
    dispatch(getMarketerLinksV2Action());
  }, []);

  const renderItem = ({ item }) => {
    const statusInfo = STATUS_LABEL[item.status] || STATUS_LABEL.pending;
    const rowBusy = actionStatus[item.id] === Status.LOADING;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Icon type="feather" name="user-check" color={brandColors.tealDark} size={s(18)} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.marketerName} numberOfLines={1}>
              {item.marketer_name || `Marketer #${item.marketer_id}`}
            </Text>
            <Text style={styles.sourceText}>{SOURCE_LABEL[item.source] || item.source}</Text>
          </View>
          <Text style={[styles.statusText, { color: statusInfo.color }]}>{statusInfo.text}</Text>
        </View>

        {item.status === 'pending' && (
          <View style={styles.actionRow}>
            <PressScale
              disabled={rowBusy}
              onPress={() => dispatch(rejectMarketerLinkV2(item.id))}
              style={styles.rejectButton}
            >
              <Text style={styles.rejectButtonText}>Từ chối</Text>
            </PressScale>
            <PressScale
              disabled={rowBusy}
              onPress={() => dispatch(confirmMarketerLinkV2(item.id))}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>{rowBusy ? 'Đang xử lý...' : 'Xác nhận'}</Text>
            </PressScale>
          </View>
        )}
      </View>
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
        <Text style={styles.headerTitle}>Liên kết Marketer</Text>
      </View>

      <FlatList
        data={links}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => dispatch(getMarketerLinksV2Action())} />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="users" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có liên kết marketer nào</Text>
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
  card: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(16),
    padding: s(14),
    marginBottom: s(12),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(10),
  },
  avatar: {
    width: s(40),
    height: s(40),
    borderRadius: s(14),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketerName: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
  },
  sourceText: {
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
    marginTop: s(2),
  },
  statusText: {
    fontSize: fs(12),
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    gap: s(10),
    marginTop: s(14),
  },
  rejectButton: {
    flex: 1,
    height: s(40),
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: brandColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rejectButtonText: {
    color: brandColors.muted,
    fontWeight: '700',
    fontSize: fs(13),
  },
  confirmButton: {
    flex: 1,
    height: s(40),
    borderRadius: s(12),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: brandColors.surface,
    fontWeight: '700',
    fontSize: fs(13),
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

export default MarketerLinks;
