import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getStoresV2 } from '~/store/catalogV2/catalogV2Actions';
import { getStoresV2Status, getStoresV2 as selectStoresV2 } from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { NAVIGATION_STORE_CATALOG_V2, NAVIGATION_PRODUCT_MESSAGES_V2 } from '~/navigation/routes';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// GET /customer/v1/stores — chọn nhà thuốc để xem catalog/giỏ hàng THẬT.
// Màn RIÊNG (chưa đụng tab "Giỏ quà" hay checkout thật), xem
// [[marketplace-core-business-model]] mục catalog/cart đổi 2026-09-14/15.
const StoresV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getStoresV2Status(state));
  const stores = useSelector(state => selectStoresV2(state));
  const loading = status === Status.LOADING;

  useEffect(() => {
    dispatch(getStoresV2());
  }, []);

  const renderItem = ({ item }) => (
    <PressScale
      style={styles.card}
      onPress={() => navigation.navigate(NAVIGATION_STORE_CATALOG_V2, { storeId: item.id, storeName: item.name })}
    >
      <View style={styles.cardIcon}>
        <Icon type="feather" name="shopping-bag" color={brandColors.tealPrimary} size={s(18)} />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.storeName} numberOfLines={1}>{item.name}</Text>
        {!!item.address && (
          <Text style={styles.storeAddress} numberOfLines={1}>{item.address}</Text>
        )}
      </View>
      <Icon type="feather" name="chevron-right" color={brandColors.mutedLight} size={s(18)} />
    </PressScale>
  );

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <Text style={styles.headerTitle}>Đặt hàng theo nhà thuốc</Text>
      </View>

      <PressScale
        style={styles.messagesEntry}
        onPress={() => navigation.navigate(NAVIGATION_PRODUCT_MESSAGES_V2)}
      >
        <Icon type="feather" name="gift" color={brandColors.goldDark} size={s(18)} />
        <Text style={styles.messagesEntryText}>Sản phẩm marketer gửi</Text>
        <Icon type="feather" name="chevron-right" color={brandColors.goldDark} size={s(16)} />
      </PressScale>

      <FlatList
        data={stores}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => dispatch(getStoresV2())} />
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="home" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có nhà thuốc nào</Text>
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
    flexShrink: 1,
  },
  messagesEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
    marginHorizontal: s(20),
    marginBottom: s(14),
    paddingVertical: s(12),
    paddingHorizontal: s(14),
    borderRadius: s(14),
    backgroundColor: brandColors.warningTint,
  },
  messagesEntryText: {
    flex: 1,
    color: brandColors.goldDark,
    fontSize: fs(13),
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: s(20),
    paddingBottom: s(32),
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
  storeAddress: {
    color: brandColors.muted,
    fontSize: fs(11.5),
    fontWeight: '600',
    marginTop: s(2),
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

export default StoresV2;
