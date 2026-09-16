import React, { useEffect, useState } from 'react';
import { View, Image, Linking, Platform, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import { getVersionNew, getForceUpdate, getUpdate } from '~/store/selector';
import { getListItem } from '~/store/cart/cartSelectors';
import { getAuthStore } from '~/store/selector';
import styles from './styles';
import { NAVIGATION_TO_SEARCH, NAVIGATION_CHAT_LIST_V2, NAVIGATION_MY_CARTS_V2, NAVIGATION_STORE_CATALOG_V2 } from '~/navigation/routes';
import { getProductMessageThreadsV2 } from '~/store/catalogV2/catalogV2Selector';
import { getIsLoggedInV2 } from '~/store/authV2/authV2Selector';
import { getStoresV2 } from '~/store/catalogV2/catalogV2Actions';
import { getStoresV2Status, getStoresV2 as selectStoresV2 } from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { Icon, Text } from '~/common/index';
import { asyncStorage } from '~/store/index';
import packageJson from '../../../package.json';
import PremiumButton from '~/design-system/PremiumButton';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { showToast } from '~/utils/toast';
import strings from '~/i18n';
import BackgroundWash from '~/design-system/BackgroundWash';
import PressScale from '~/design-system/PressScale';
import { s, fs } from '~/utils/responsive';

// Trang chủ — 2026-09-16: thay hẳn sang backend marketplace-core theo
// quyết định "đổi luôn, thay hẳn" (đã báo rõ rủi ro: marketplace-core
// còn ở môi trường dev có thể bị reset dữ liệu, và KHÔNG có khái niệm
// banner/deal hời/bán chạy như bản NeoMed cũ — sếp đồng ý chấp nhận,
// app hiện chưa có người dùng thật nên không ràng buộc gì). Nội dung
// chính giờ là danh sách "Store" (tầng bán hàng của marketer, xem
// [[marketplace-core-business-model]]) — bấm vào 1 store để xem
// catalog/giỏ hàng của store đó (StoreCatalogV2). Toàn bộ luồng
// distributor/hot-deal/best-seller/banner NeoMed cũ đã gỡ khỏi màn này.
const HomeCartButton = ({ navigation }) => {
  const { isLoggedIn } = useSelector(state => getAuthStore(state));
  const isLoggedInV2 = useSelector(state => getIsLoggedInV2(state));

  const onPress = () => {
    if (!isLoggedInV2) {
      showToast(strings.common.requireLogin);
      return;
    }
    navigation.navigate(NAVIGATION_MY_CARTS_V2);
  };

  return (
    <PressScale style={styles.cartTouch} onPress={onPress}>
      <View style={styles.cartPill}>
        <Icon type="feather" name="shopping-cart" color={brandColors.tealDark} size={22} />
      </View>
    </PressScale>
  );
};

// Nút chat marketer — dời từ FAB nổi (CustomTabBar) vào đây theo yêu cầu
// 2026-09-15: thu gọn thanh tìm kiếm thành icon để lấy chỗ cho nút này.
// Badge đếm số hội thoại còn gợi ý sản phẩm CHƯA áp dụng (dữ liệu thật).
const HomeChatButton = ({ navigation }) => {
  const chatThreads = useSelector(state => getProductMessageThreadsV2(state));
  const unreadCount = chatThreads.reduce((sum, t) => sum + (t.unappliedCount > 0 ? 1 : 0), 0);
  const isLoggedInV2 = useSelector(state => getIsLoggedInV2(state));

  const onPress = () => {
    if (!isLoggedInV2) {
      showToast(strings.common.requireLogin);
      return;
    }
    navigation.navigate(NAVIGATION_CHAT_LIST_V2);
  };

  return (
    <PressScale style={styles.cartTouch} onPress={onPress}>
      <View style={styles.cartPill}>
        <Icon type="feather" name="message-circle" color={brandColors.tealDark} size={22} />
      </View>
      {isLoggedInV2 && unreadCount > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{unreadCount > 9 ? '9+' : unreadCount}</Text>
        </View>
      )}
    </PressScale>
  );
};

const MarketplaceHeader = ({ navigation }) => {
  return (
    <View style={styles.marketHeader}>
      <View style={styles.marketHeaderTop}>
        <PressScale
          style={styles.searchTouch}
          onPress={() => navigation.navigate(NAVIGATION_TO_SEARCH)}
        >
          <View style={styles.searchDock}>
            <Icon type="feather" name="search" color={brandColors.tealDark} size={20} />
          </View>
        </PressScale>
        <View style={styles.marketHeaderSpacer} />
        <HomeChatButton navigation={navigation} />
        <HomeCartButton navigation={navigation} />
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const versionNew = useSelector(state => getVersionNew(state));
  const forceUpdate = useSelector(state => getForceUpdate(state));
  const isUpdate = useSelector(state => getUpdate(state));
  const versionApp = packageJson.version;
  const [isSkip, setSkip] = useState('');

  const storesStatus = useSelector(state => getStoresV2Status(state));
  const stores = useSelector(state => selectStoresV2(state));
  const loading = storesStatus === Status.LOADING;
  // Phòng trường hợp màn này mount TRƯỚC khi phiên AuthV2 kịp khôi phục
  // xong lúc mở app (xem authV2Sagas.restoreAuthV2Session) — request đầu
  // có thể 401 vì chưa có token, refetch lại ngay khi isLoggedInV2 lên true.
  const isLoggedInV2 = useSelector(state => getIsLoggedInV2(state));

  const load = () => dispatch(getStoresV2());

  useEffect(() => {
    load();
    asyncStorage.getSkipForceUpdate().then(setSkip);
  }, [isLoggedInV2]);

  const renderStore = ({ item }) => (
    <PressScale
      style={styles.storeCard}
      onPress={() => navigation.navigate(NAVIGATION_STORE_CATALOG_V2, { storeId: item.id, storeName: item.name })}
    >
      <View style={styles.storeCardIcon}>
        <Icon type="feather" name="shopping-bag" color={brandColors.tealPrimary} size={s(20)} />
      </View>
      <View style={styles.storeCardBody}>
        <Text style={styles.storeCardName} numberOfLines={2}>{item.name}</Text>
        {!!item.address && (
          <Text style={styles.storeCardAddress} numberOfLines={1}>{item.address}</Text>
        )}
      </View>
      <Icon type="feather" name="chevron-right" color={brandColors.mutedLight} size={s(18)} />
    </PressScale>
  );

  return (
    <View style={styles.backgroundImage}>
      <BackgroundWash />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          <MarketplaceHeader navigation={navigation} />
          <FlatList
            style={styles.homeStoreList}
            data={stores}
            keyExtractor={item => String(item.id)}
            renderItem={renderStore}
            contentContainerStyle={styles.homeStoreListContent}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
            ListHeaderComponent={
              <View style={styles.homeStoreListHeader}>
                <Text style={styles.homeStoreListTitle}>Đặt hàng theo nhà thuốc</Text>
                <Text style={styles.homeStoreListSubtitle}>Chọn 1 cửa hàng để xem sản phẩm và giá</Text>
              </View>
            }
            ListEmptyComponent={
              !loading && (
                <View style={styles.homeStoreEmptyWrap}>
                  <Icon type="feather" name="home" color={brandColors.mutedLight} size={s(32)} />
                  <Text style={styles.homeStoreEmptyText}>Chưa có cửa hàng nào</Text>
                </View>
              )
            }
          />
        </View>

        <Modal
          onBackdropPress={() => { }}
          transparent={true}
          isVisible={(isUpdate == true && isSkip == 'false') || (isUpdate == true && forceUpdate == true)}
        >
          <View style={styles.viewContent}>
            <View>
              <Image
                style={styles.image}
                source={require('~/assets/configNeoMed/logoNeoMed.png')}
              />
              <Text style={styles.textVerApp}>Version: {versionApp}</Text>
            </View>
            {forceUpdate == true ? (
              <PremiumButton
                text={`Cập nhật phiên bản ${versionNew}`}
                onPress={() => {
                  asyncStorage.setSkipForceUpdate('false');
                }}
              />
            ) : (
              <View style={{ flexDirection: 'column', width: '100%' }}>
                <PremiumButton
                  text={`Cập nhật ngay (${versionNew})`}
                  onPress={() => {
                    asyncStorage.setSkipForceUpdate('false');
                    if (Platform.OS === 'android') {
                      Linking.openURL('https://play.google.com/store/apps/details?id=com.ciaolink.neomed');
                    } else {
                      Linking.openURL('https://apps.apple.com/vn/app/neo-med/id1540253107');
                    }
                  }}
                />
                <PressScale
                  onPress={() => {
                    asyncStorage.setSkipForceUpdate('true');
                    setSkip('true');
                  }}
                  style={{ marginTop: 10, alignItems: 'center' }}
                >
                  <Text style={{ color: brandColors.muted }}>Để sau</Text>
                </PressScale>
              </View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};
export default HomeScreen;
