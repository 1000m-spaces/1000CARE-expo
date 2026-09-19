import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Linking, Platform, ScrollView, RefreshControl, Animated, Easing, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import { getVersionNew, getForceUpdate, getUpdate } from '~/store/selector';
import styles from './styles';
import { NAVIGATION_SEARCH_V2, NAVIGATION_SEARCH_RESULTS_V2, NAVIGATION_CHAT_LIST_V2, NAVIGATION_PRODUCT_DETAIL_V2 } from '~/navigation/routes';
import { getProductMessageThreadsV2 } from '~/store/catalogV2/catalogV2Selector';
import { getIsLoggedInV2 } from '~/store/authV2/authV2Selector';
import {
  getCampaignsV2,
  getSearchSuggestionsV2,
} from '~/store/catalogV2/catalogV2Actions';
import {
  getCampaignsV2Status,
  getCampaignsV2 as selectCampaignsV2,
  getSearchSuggestionsV2Status,
  getSearchSuggestionsV2 as selectSearchSuggestionsV2,
} from '~/store/catalogV2/catalogV2Selector';
import Status from '~/common/Status/Status';
import { Icon, Text } from '~/common/index';
import { formatMoney } from '~/utils/format';
import { getV2ProductThumb } from '~/utils/image';
import { asyncStorage } from '~/store/index';
import packageJson from '../../../package.json';
import PremiumButton from '~/design-system/PremiumButton';
import { brandColors, brandShadow } from '~/design-system/tokens';
import { showToast } from '~/utils/toast';
import strings from '~/i18n';
import BackgroundWash from '~/design-system/BackgroundWash';
import PressScale from '~/design-system/PressScale';
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext';
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

// Trang chủ — kiến trúc Campaign (2026-09-18, thay hẳn home-banners/
// featured-suppliers/suppliers/{id}/products): banner carousel → NCC
// nổi bật (banner riêng + dòng SP ngang mỗi NCC, SP đã kèm sẵn trong
// campaign — không cần gọi thêm API riêng) → "Giá sốc" → "Gợi ý hôm
// nay". Dữ liệu thật, đã tự verify bằng curl. Xem
// [[marketplace-core-business-model]].
// Banner phải rộng ĐÚNG BẰNG bề ngang nội dung (màn hình - lề 20 mỗi
// bên, khớp `homeStoreListContent.paddingHorizontal`) — trước để cứng
// s(343) nên bị hụt/dư so với máy thật, lộ viền trắng + slide kế bên
// lấp ló 2 bên (sếp báo 2026-09-18). Paging chỉ khớp khít khi bề rộng
// item = đúng bề rộng ScrollView, không cộng thêm marginRight.
const { width: DEVICE_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = DEVICE_WIDTH - s(40);

// Trong lúc chờ banner thật (API chưa deploy hoặc đang tải): thanh
// trượt bo tròn 2 đầu + "viên thuốc" chạy qua lại — theo đúng ý sếp,
// thay vì để trống trơn không có gì.
// Quãng đường trượt = bề rộng track - bề rộng viên thuốc - lề 2 đầu.
const BANNER_CAPSULE_TRACK_WIDTH = BANNER_WIDTH - s(48) - s(24);
// Mượt hơn (2026-09-19, sếp báo chỗ đổi chiều đi/về còn hơi cứng):
// - Easing đổi từ `inOut(ease)` (quadratic mặc định RN, hơi "gãy" ở gần
//   2 đầu) sang bezier chuẩn Material "standard" (.4,0,.2,1) — mượt và
//   tự nhiên hơn ở cả lúc bắt đầu lẫn lúc dừng.
// - Thêm hiệu ứng "squash & stretch" (scaleX phồng nhẹ 1→1.16→1 giữa
//   quãng đường) — cùng lấy từ `progress` nên luôn đồng bộ khớp hướng
//   di chuyển, tạo cảm giác viên thuốc có "đàn hồi" khi trượt thay vì
//   chỉ dịch chuyển cứng nhắc theo 1 trục.
const BannerLoadingCapsule = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const smoothEasing = Easing.bezier(0.4, 0, 0.2, 1);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1100,
          easing: smoothEasing,
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1100,
          easing: smoothEasing,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const translateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, BANNER_CAPSULE_TRACK_WIDTH],
  });
  const scaleX = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.16, 1],
  });

  return (
    <View style={[styles.bannerLoadingTrack, { width: BANNER_WIDTH }]}>
      <Animated.View
        style={[styles.bannerLoadingCapsule, { transform: [{ translateX }, { scaleX }] }]}
      />
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
        style={[styles.bannerCarousel, { width: BANNER_WIDTH }]}
        snapToInterval={BANNER_WIDTH}
        decelerationRate="fast"
        onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {banners.map(item => (
          <Image
            key={item.id}
            source={{ uri: item.banner_url }}
            style={[styles.bannerImage, { width: BANNER_WIDTH }]}
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

// `sale_price` (2026-09-19, chỉ campaign flash_sale) — tuỳ chọn, không
// phải SP nào trong list "Giá sốc" cũng có (backoffice thêm SP vào
// list trước, đặt giá sốc sau). Có thì gạch ngang `price` + nổi bật
// `sale_price`; không có thì hiện `price` bình thường như SP khác.
const SupplierProductCard = ({ product, onPress }) => {
  const thumb = getV2ProductThumb(product);
  const hasSale = product.sale_price != null && product.sale_price < product.price;
  return (
    <PressScale style={styles.supplierProductCard} onPress={() => onPress(product)}>
      {thumb ? (
        <Image source={{ uri: thumb }} style={styles.supplierProductImage} resizeMode="contain" />
      ) : (
        <View style={[styles.supplierProductImage, styles.supplierProductImagePlaceholder]}>
          <Icon type="feather" name="package" color={brandColors.mutedLight} size={s(22)} />
        </View>
      )}
      <Text style={styles.supplierProductName} numberOfLines={2}>{product.name}</Text>
      {hasSale ? (
        <View style={styles.supplierProductSaleRow}>
          <Text style={styles.supplierProductSalePrice}>{formatMoney(product.sale_price, { unit: 'đ' })}</Text>
          <Text style={styles.supplierProductOldPrice}>{formatMoney(product.price, { unit: 'đ' })}</Text>
        </View>
      ) : (
        <Text style={styles.supplierProductPrice}>{formatMoney(product.price, { unit: 'đ' })}</Text>
      )}
    </PressScale>
  );
};

// Mỗi NCC nổi bật = 1 campaign `featured_supplier`, đã kèm sẵn
// `products[]` ngay trong response — KHÔNG cần gọi thêm API sản phẩm
// riêng như bản home-banners/featured-suppliers cũ (2026-09-18). Bấm SP
// → trang chi tiết thật (có store_id để "Xem shop"/sau này thêm giỏ).
const FeaturedSupplierBlock = ({ campaign, onProductPress }) => {
  const products = campaign.products || [];
  return (
    <View style={styles.featuredSupplierBlock}>
      {!!campaign.banner_url && (
        <Image source={{ uri: campaign.banner_url }} style={styles.featuredSupplierBanner} resizeMode="cover" />
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.supplierProductRail}>
        {products.map(p => (
          <SupplierProductCard key={p.product_id} product={p} onPress={onProductPress} />
        ))}
      </ScrollView>
    </View>
  );
};

// Đếm ngược tới `campaign.ends_at` (2026-09-19) — server chỉ trả 1 mốc
// thời gian tĩnh, tick từng giây là việc của client. Backoffice giữ
// nguyên mốc này khi sửa linh tinh khác (đổi SP, bật/tắt...) nên tin
// tưởng hiển thị liên tục, KHÔNG cần refetch campaign để "làm mới" giờ.
const formatCountdownPart = n => String(n).padStart(2, '0');
const CountdownTimer = ({ endsAt }) => {
  const [remainingMs, setRemainingMs] = useState(() => new Date(endsAt).getTime() - Date.now());

  useEffect(() => {
    const tick = () => setRemainingMs(new Date(endsAt).getTime() - Date.now());
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (remainingMs <= 0) return null;

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <View style={styles.countdownWrap}>
      <Icon type="feather" name="clock" color={brandColors.dangerText} size={s(12)} />
      <Text style={styles.countdownText}>
        {formatCountdownPart(hours)}:{formatCountdownPart(minutes)}:{formatCountdownPart(seconds)}
      </Text>
    </View>
  );
};

// "Giá sốc" (campaign `flash_sale`) — SP có thể thuộc NHIỀU NCC/store
// khác nhau gộp chung 1 dải, giá thật hoặc `sale_price` (nếu backoffice
// đã đặt). `ends_at` (tuỳ chọn, cấp campaign) → đếm ngược, không có thì
// khỏi hiện — hiển thị y hệt dòng SP nổi bật, chỉ khác tiêu đề + icon.
const FlashSaleSection = ({ campaigns, onProductPress }) => {
  if (!campaigns.length) return null;
  return (
    <View style={styles.flashSaleSection}>
      <View style={styles.flashSaleTitleRow}>
        <Icon type="feather" name="zap" color={brandColors.warning || brandColors.tealDark} size={s(16)} />
        <Text style={styles.flashSaleTitle}>Giá sốc</Text>
      </View>
      {campaigns.map(campaign => (
        <View key={campaign.id} style={styles.flashSaleCampaignBlock}>
          {!!campaign.ends_at && <CountdownTimer endsAt={campaign.ends_at} />}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.supplierProductRail}
          >
            {(campaign.products || []).map(p => (
              <SupplierProductCard key={p.product_id} product={p} onPress={onProductPress} />
            ))}
          </ScrollView>
        </View>
      ))}
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
            onPress={() => navigation.navigate(NAVIGATION_SEARCH_RESULTS_V2, { keyword: item.keyword })}
          >
            <Icon type="feather" name="search" color={brandColors.tealDark} size={s(13)} />
            <Text style={styles.suggestionChipText} numberOfLines={1}>{item.keyword}</Text>
          </PressScale>
        ))}
      </View>
    </View>
  );
};

// Header thu gọn CHỈ còn nút chat (2026-09-19, theo yêu cầu) — bỏ icon
// tìm kiếm và giỏ hàng khỏi đây. Giỏ hàng dời xuống nút tròn nổi riêng
// ở CustomTabBar (xem [[marketplace-core-business-model]]); tìm kiếm dời
// xuống 1 thanh riêng ngay đầu nội dung cuộn (`SearchEntryBar` bên dưới)
// để không mất hẳn lối vào — header không có chỗ cho input đầy đủ.
const MarketplaceHeader = ({ navigation }) => {
  return (
    <View style={styles.marketHeader}>
      <View style={styles.marketHeaderTop}>
        <View style={styles.marketHeaderSpacer} />
        <HomeChatButton navigation={navigation} />
      </View>
    </View>
  );
};

const SearchEntryBar = ({ navigation }) => (
  <PressScale style={styles.searchEntryBar} onPress={() => navigation.navigate(NAVIGATION_SEARCH_V2)}>
    <Icon type="feather" name="search" color={brandColors.tealDark} size={s(16)} />
    <Text style={styles.searchEntryText}>Bạn đang tìm sản phẩm gì?</Text>
  </PressScale>
);

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { handleScroll } = useTabBarVisibility();

  const versionNew = useSelector(state => getVersionNew(state));
  const forceUpdate = useSelector(state => getForceUpdate(state));
  const isUpdate = useSelector(state => getUpdate(state));
  const versionApp = packageJson.version;
  const [isSkip, setSkip] = useState('');

  // Phòng trường hợp màn này mount TRƯỚC khi phiên AuthV2 kịp khôi phục
  // xong lúc mở app (xem authV2Sagas.restoreAuthV2Session) — request đầu
  // có thể 401 vì chưa có token, refetch lại ngay khi isLoggedInV2 lên true.
  const isLoggedInV2 = useSelector(state => getIsLoggedInV2(state));

  const banners = useSelector(state => selectCampaignsV2(state, 'banner'));
  const bannersStatus = useSelector(state => getCampaignsV2Status(state, 'banner'));
  const featuredSupplierCampaigns = useSelector(state => selectCampaignsV2(state, 'featured_supplier'));
  const flashSaleCampaigns = useSelector(state => selectCampaignsV2(state, 'flash_sale'));
  const suggestions = useSelector(state => selectSearchSuggestionsV2(state));
  const loading = bannersStatus === Status.LOADING;

  const goToProductDetail = product => {
    navigation.navigate(NAVIGATION_PRODUCT_DETAIL_V2, { productId: product.product_id });
  };

  const load = () => {
    dispatch(getCampaignsV2('banner'));
    dispatch(getCampaignsV2('featured_supplier'));
    dispatch(getCampaignsV2('flash_sale'));
    dispatch(getSearchSuggestionsV2());
  };

  useEffect(() => {
    load();
    asyncStorage.getSkipForceUpdate().then(setSkip);
  }, [isLoggedInV2]);

  return (
    <View style={styles.backgroundImage}>
      <BackgroundWash />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.container}>
          <MarketplaceHeader navigation={navigation} />
          <ScrollView
            style={styles.homeStoreList}
            contentContainerStyle={styles.homeStoreListContent}
            refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <SearchEntryBar navigation={navigation} />
            <HomeBannerCarousel banners={banners} status={bannersStatus} />
            <FlashSaleSection campaigns={flashSaleCampaigns} onProductPress={goToProductDetail} />
            {featuredSupplierCampaigns.map(campaign => (
              <FeaturedSupplierBlock
                key={campaign.id}
                campaign={campaign}
                onProductPress={goToProductDetail}
              />
            ))}
            <TodaySuggestions suggestions={suggestions} navigation={navigation} />
          </ScrollView>
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
