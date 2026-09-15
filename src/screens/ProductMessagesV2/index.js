import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PressScale from '~/design-system/PressScale';
import AppBackground from '~/design-system/AppBackground';
import { Icon } from '~/common/index';
import { getProductMessagesV2, applyProductMessageV2 } from '~/store/catalogV2/catalogV2Actions';
import {
  getProductMessagesV2Status,
  getProductMessagesV2 as selectProductMessagesV2,
  getApplyProductMessageV2Status,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';

// GET /customer/v1/product-messages — bộ sản phẩm marketer curate gửi
// riêng cho khách. Thay hẳn cơ chế tự-vào-giỏ theo ?member= cũ — phải bấm
// "Áp dụng vào giỏ" mới cộng vào giỏ hàng thật. Xem
// [[marketplace-core-business-model]].
const ProductMessagesV2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const status = useSelector(state => getProductMessagesV2Status(state));
  const messages = useSelector(state => selectProductMessagesV2(state));
  const loading = status === Status.LOADING;

  const load = () => dispatch(getProductMessagesV2());

  useEffect(() => {
    load();
  }, []);

  const renderItem = ({ item }) => <MessageCard item={item} />;

  return (
    <AppBackground>
      <View style={styles.headerRow}>
        <PressScale onPress={() => navigation.pop()} style={styles.backButton}>
          <View style={styles.backButtonGlass}>
            <Icon type="feather" name="chevron-left" color={brandColors.tealPrimary} size={s(18)} />
          </View>
        </PressScale>
        <Text style={styles.headerTitle}>Sản phẩm marketer gửi</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyWrap}>
              <Icon type="feather" name="gift" color={brandColors.mutedLight} size={s(32)} />
              <Text style={styles.emptyText}>Chưa có sản phẩm nào được gửi</Text>
            </View>
          )
        }
      />
    </AppBackground>
  );
};

const MessageCard = ({ item }) => {
  const dispatch = useDispatch();
  const applyStatus = useSelector(state => getApplyProductMessageV2Status(state, item.id));
  const applying = applyStatus === Status.LOADING;
  const applied = applyStatus === Status.SUCCESS;

  return (
    <View style={styles.card}>
      {!!item.title && <Text style={styles.title}>{item.title}</Text>}
      {!!item.note && <Text style={styles.note}>{item.note}</Text>}
      <PressScale
        style={[styles.applyButton, applied && styles.applyButtonDone]}
        disabled={applying || applied}
        onPress={() => dispatch(applyProductMessageV2(item.id))}
      >
        <Icon
          type="feather"
          name={applied ? 'check' : 'shopping-cart'}
          color={brandColors.surface}
          size={s(14)}
        />
        <Text style={styles.applyButtonText}>
          {applied ? 'Đã áp dụng vào giỏ' : applying ? 'Đang áp dụng...' : 'Áp dụng vào giỏ'}
        </Text>
      </PressScale>
    </View>
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
  title: {
    color: brandColors.textDark,
    fontSize: fs(14),
    fontWeight: '700',
    marginBottom: s(4),
  },
  note: {
    color: brandColors.muted,
    fontSize: fs(12),
    fontWeight: '600',
    lineHeight: fs(18),
    marginBottom: s(12),
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(6),
    height: s(40),
    borderRadius: s(12),
    backgroundColor: brandColors.tealPrimary,
  },
  applyButtonDone: {
    backgroundColor: brandColors.success,
  },
  applyButtonText: {
    color: brandColors.surface,
    fontSize: fs(12.5),
    fontWeight: '700',
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

export default ProductMessagesV2;
