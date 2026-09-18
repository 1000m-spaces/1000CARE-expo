import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Linking, Platform, FlatList, ScrollView, RefreshControl, Animated, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import { getVersionNew, getForceUpdate, getUpdate } from '~/store/selector';
import { getAuthStore } from '~/store/selector';
import styles from './styles';
import { NAVIGATION_TO_SEARCH, NAVIGATION_CHAT_LIST_V2, NAVIGATION_MY_CARTS_V2, NAVIGATION_STORE_CATALOG_V2 } from '~/navigation/routes';
import { getProductMessageThreadsV2 } from '~/store/catalogV2/catalogV2Selector';
import { getIsLoggedInV2 } from '~/store/authV2/authV2Selector';
import {
  getStoresV2,
  getHomeBannersV2,
  getFeaturedSuppliersV2,
  getSupplierProductsV2,
  getSearchSuggestionsV2,
} from '~/store/catalogV2/catalogV2Actions';
import {
  getStoresV2Status,
  getStoresV2 as selectStoresV2,
  getHomeBannersV2Status,
  getHomeBannersV2 as selectHomeBannersV2,
  getFeaturedSuppliersV2Status,
  getFeaturedSuppliersV2 as selectFeaturedSuppliersV2,
  getSupplierProductsV2 as selectSupplierProductsV2,
  getSearchSuggestionsV2Status,
  getSearchSuggestionsV2 as selectSearchSuggestionsV2,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { Icon, Text } from '~/common/index';
import { formatMoney } from '~/utils/format';
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

// Trang chủ mới (2026-09-17, marketplace-core-21) — layout đã chốt với
// chủ dự án: banner carousel → NCC nổi bật (banner riêng + dòng SP
// ngang mỗi NCC) → "Gợi ý hôm nay". Dữ liệu hiện là MOCK (backoffice
// nhập tay), CHƯA deploy lên dev-api-mkp.1000m.vn lúc code — code theo
// đúng contract, chưa tự verify bằng curl thật. Xem
// [[marketplace-core-business-model]].
// Trong lúc chờ banner thật (API chưa deploy hoặc đang tải): thanh
// trượt bo tròn 2 đầu + "viên thuốc" chạy qua lại — theo đúng ý sếp,
// thay vì để trống trơn không có gì.
// Quãng đường trượt = bề rộng track - bề rộng viên thuốc - lề 2 đầu.
const BANNER_CAPSULE_TRACK_WIDTH = s(343) - s(48) - s(24);
const BannerLoadingCapsule = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 950,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 950,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BANNER_CAPSULE_TRACK_WIDTH],
  });

  return (
    <View style={styles.bannerLoadingTrack}>
      <Animated.View style={[styles.bannerLoadingCapsule, { transform: [{ translateX }] }]} />
    </View>
  );
};

const HomeBannerCarousel = ({ banners, status }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!banners.length) {
    return status === Status.LOADING ? <BannerLoadingCapsule /> : null;
  }

  const onMomentumScrollEnd = e => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    setActiveIndex(Math.round(contentOffset.x / layoutMeasurement.width));
  };

  return (
    <View style={styles.bannerCarouselWrap}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerCarousel}
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {banners.map(item => (
          <Image
            key={item.asset_id}
            source={{ uri: item.url }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      {banners.length > 1 && (
        <View style={styles.bannerDotsRow}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[styles.bannerDot, index === activeIndex && styles.bannerDotActive]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const SupplierProductCard = ({ product }) => (
  <View style={styles.supplierProductCard}>
    {product.media ? (
      <Image source={{ uri: product.media }} style={styles.supplierProductImage} resizeMode="contain" />
    ) : (
      <View style={[styles.supplierProductImage, styles.supplierProductImagePlaceholder]}>
        <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(22)} />
      </View>
    )}
    <Text style={styles.supplierProductName} numberOfLines={2}>{product.name}</Text>
    <Text style={styles.supplierProductPrice}>{formatMoney(product.price, { unit: 'đ' })}</Text>
  </View>
);

// Mỗi NCC nổi bật: banner riêng + dòng sản phẩm ngang (~2.5 SP/màn).
// CHƯA gắn onPress vào từng SP — chưa rõ shape có store_id để biết mở
// đúng giỏ hàng nào (giỏ scope theo store, không theo supplier), để
// tránh đoán mò khi backend còn mock. Xem ghi chú ở AuthV2API.js.
const FeaturedSupplierBlock = ({ supplier }) => {
  const dispatch = useDispatch();
  const products = useSelector(state => selectSupplierProductsV2(state, supplier.supplier_id));

  useEffect(() => {
    dispatch(getSupplierProductsV2(supplier.supplier_id, 10));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier.supplier_id]);

  return (
    <View style={styles.featuredSupplierBlock}>
      {!!supplier.banner_url && (
        <Image source={{ uri: supplier.banner_url }} style={styles.featuredSupplierBanner} resizeMode="cover" />
      )}
      <View style={styles.featuredSupplierHeader}>
        {!!supplier.logo_url && (
          <Image source={{ uri: supplier.logo_url }} style={styles.featuredSupplierLogo} resizeMode="contain" />
        )}
        <Text style={styles.featuredSupplierName} numberOfLines={1}>{supplier.legal_name}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.supplierProductRail}>
        {products.map(p => (
          <SupplierProductCard key={p.product_id} product={p} />
        ))}
      </ScrollView>
    </View>
  );
};

// "Gợi ý hôm nay" — có product_id thì lẽ ra mở thẳng SP, nhưng chưa có
// màn chi tiết SP theo product_id trần (StoreCatalogV2 cần storeId) nên
// tạm xử lý đồng nhất: điền từ khoá vào ô tìm kiếm (màn Search cũ,
// endpoint /search thật để dành làm sau — xem AuthV2API.searchProductsV2).
const TodaySuggestions = ({ suggestions, navigation }) => {
  if (!suggestions.length) return null;
  return (
    <View style={styles.suggestionsSection}>
      <Text style={styles.suggestionsTitle}>Gợi ý hôm nay</Text>
      <View style={styles.suggestionsWrap}>
        {suggestions.map(item => (
          <PressScale
            key={item.id}
            style={styles.suggestionChip}
            onPress={() => navigation.navigate(NAVIGATION_TO_SEARCH, { prefill: item.keyword })}
          >
            <Icon type="feather" name="search" color={brandColors.tealDark} size={s(13)} />
            <Text style={styles.suggestionChipText} numberOfLines={1}>{item.keyword}</Text>
          </PressScale>
        ))}
      </View>
    </View>
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

  const banners = useSelector(state => selectHomeBannersV2(state));
  const bannersStatus = useSelector(state => getHomeBannersV2Status(state));
  const featuredSuppliers = useSelector(state => selectFeaturedSuppliersV2(state));
  const suggestions = useSelector(state => selectSearchSuggestionsV2(state));

  const load = () => {
    dispatch(getStoresV2());
    dispatch(getHomeBannersV2());
    dispatch(getFeaturedSuppliersV2());
    dispatch(getSearchSuggestionsV2());
  };

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
              <>
                <HomeBannerCarousel banners={banners} status={bannersStatus} />
                {featuredSuppliers.map(supplier => (
                  <FeaturedSupplierBlock key={supplier.supplier_id} supplier={supplier} />
                ))}
                <TodaySuggestions suggestions={suggestions} navigation={navigation} />
                <View style={styles.homeStoreListHeader}>
                  <Text style={styles.homeStoreListTitle}>Đặt hàng theo nhà thuốc</Text>
                  <Text style={styles.homeStoreListSubtitle}>Chọn 1 cửa hàng để xem sản phẩm và giá</Text>
                </View>
              </>
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
