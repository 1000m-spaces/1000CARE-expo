import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import PressScale from '~/design-system/PressScale'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useDispatch, useSelector } from 'react-redux'
import { banner_2, banner_3, banner_4 } from '~/assets/constants'
import { NAVIGATION_PRODUCT_DETAIL_SCREEN, NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'
import {
  getListAdsBannerNeomed,
  getListDistributors,
  getListProductPriceSockHome,
  getListProductsBestSeller,
  getListProductsHotDeal,
} from '~/store/selector'
import { requestGetListAdsBannerHomeNeomedByDistributor } from '~/store/actions'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import { s, fs } from '~/utils/responsive'
import SliderBox from '~/common/SliderBox/index'
import AppSection from '~/design-system/AppSection'
import { brandColors, brandShadow, liquidGlass, radiusScale } from '~/design-system/tokens'
import HotProducts from './HotProducts'
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext'
import { Fonts } from '~/assets/config'

const screenWidth = Dimensions.get('window').width
const bannerWidth = screenWidth - s(32)
const SUPPLIER_CARD_WIDTH = s(128)
const SUPPLIER_CARD_GAP = s(12)
const SUPPLIER_RAIL_SIDE_PADDING = s(16)
const SUPPLIER_CARD_STEP = SUPPLIER_CARD_WIDTH + SUPPLIER_CARD_GAP
const bannerHeight = Math.round(bannerWidth / 2.8)
const hasItems = data => Array.isArray(data) && data.length > 0
const CONTENT_TOP_PADDING = s(10)

const shoppingTags = ['Hàng mới', 'Đang giảm giá', 'Bán chạy', 'Giao nhanh']
const foodAppFont = Fonts.bold
const supplierAccentPalette = ['#E94B94', '#24A76A', '#F7BD25', '#1FAFC2', '#F05A3F', '#7D62D9']
const supplierAccentKeywords = [
  { pattern: /chan[\s_-]*tam|ch[aâ]n\s*t[aâ]m|lotus/i, color: '#E94B94' },
  { pattern: /tamhanh|t[aâ]m\s*h[aạ]nh|tam\s*hanh/i, color: '#28A765' },
  { pattern: /hong[\s_-]*ha|h[oồ]ng\s*h[aà]/i, color: '#F5BD25' },
  { pattern: /regentox/i, color: '#5FBD4A' },
  { pattern: /lac[\s_-]*hong|l[aạ]c\s*h[oồ]ng/i, color: '#1C66D6' },
]

const getItemKey = (item, index) => String(item?.product_id ?? item?.id ?? item?.Id ?? index)
const getDistributorLogo = item => {
  const uri = item?.logo || item?.images || item?.image
  return uri ? { uri } : require('~/assets/configNeoMed/logo1000M.png')
}
const hexToRgba = (hex, alpha) => {
  const value = String(hex || '').replace('#', '')
  if (!/^[0-9A-Fa-f]{6}$/.test(value)) return `rgba(15,135,146,${alpha})`
  const r = parseInt(value.slice(0, 2), 16)
  const g = parseInt(value.slice(2, 4), 16)
  const b = parseInt(value.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
const getSupplierAccentColor = item => {
  const explicitColor = item?.brand_color || item?.primary_color || item?.color || item?.theme_color
  if (/^#[0-9A-Fa-f]{6}$/.test(String(explicitColor || ''))) return explicitColor

  const source = [
    item?.nick_name,
    item?.name,
    item?.company_name,
    item?.logo,
    item?.images,
    item?.image,
  ].filter(Boolean).join(' ')

  const keywordMatch = supplierAccentKeywords.find(({ pattern }) => pattern.test(source))
  if (keywordMatch) return keywordMatch.color

  const hash = source.split('').reduce((total, char) => total + char.charCodeAt(0), 0)
  return supplierAccentPalette[hash % supplierAccentPalette.length]
}
const getSupplierVoucherLabel = item => {
  const voucher = item?.voucher || item?.campaign || item?.promotion || item?.best_voucher
  const discount = Number(item?.discount || item?.voucher_discount || voucher?.discount || 0)
  const discountPercent = Number(item?.discount_percent || item?.percent || voucher?.discount_percent || voucher?.percent || 0)

  if (discountPercent > 0) return `Voucher -${Math.round(discountPercent)}%`
  if (discount > 0) return `Voucher ${formatMoney(discount, { unit: 'đ', space: false })}`
  return null
}
const getProductPrice = item => Number(item?.sale_price || item?.price || 0)
const getOriginalPrice = item => Number(item?.price || item?.listed_price || item?.original_price || 0)
const getDiscountLabel = item => {
  const price = getOriginalPrice(item)
  const salePrice = getProductPrice(item)
  if (price > 0 && salePrice > 0 && salePrice < price) {
    const discountAmount = price - salePrice
    return `Giảm ${Math.round(discountAmount / 1000)}k`
  }
  return null
}

const Skeleton = ({ children }) => (
  <SkeletonPlaceholder backgroundColor="#EAF2F3" highlightColor="#F8FFFF" speed={1200}>
    {children}
  </SkeletonPlaceholder>
)

const HomeModuleSkeleton = ({ variant = 'rail', withHeader = false, count = 3 }) => {
  const HeaderSkeleton = () => (
    <View style={styles.skeletonHeader}>
      <View>
        <SkeletonPlaceholder.Item width={s(156)} height={s(24)} borderRadius={s(8)} />
        <SkeletonPlaceholder.Item width={s(220)} height={s(16)} borderRadius={s(8)} marginTop={s(8)} />
      </View>
      <SkeletonPlaceholder.Item width={s(42)} height={s(42)} borderRadius={s(21)} />
    </View>
  )

  const renderFlash = () => (
    <View style={styles.skeletonRail}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPlaceholder.Item key={index} width={s(150)} marginRight={s(12)}>
          <SkeletonPlaceholder.Item width={s(150)} height={s(150)} borderRadius={s(18)} />
          <SkeletonPlaceholder.Item width={s(92)} height={s(13)} borderRadius={s(7)} marginTop={s(10)} />
          <SkeletonPlaceholder.Item width={s(130)} height={s(18)} borderRadius={s(8)} marginTop={s(8)} />
          <SkeletonPlaceholder.Item width={s(96)} height={s(20)} borderRadius={s(8)} marginTop={s(10)} />
        </SkeletonPlaceholder.Item>
      ))}
    </View>
  )

  const renderBrands = () => (
    <View style={styles.skeletonRail}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPlaceholder.Item key={index} width={s(126)} marginRight={s(12)}>
          <SkeletonPlaceholder.Item width={s(126)} height={s(126)} borderRadius={s(17)} />
          <SkeletonPlaceholder.Item width={s(112)} height={s(17)} borderRadius={s(8)} marginTop={s(10)} />
          <SkeletonPlaceholder.Item width={s(86)} height={s(17)} borderRadius={s(8)} marginTop={s(6)} />
        </SkeletonPlaceholder.Item>
      ))}
    </View>
  )

  const renderBanner = () => (
    <View style={styles.skeletonBannerWrap}>
      <SkeletonPlaceholder.Item width={bannerWidth} height={bannerHeight} borderRadius={s(30)} />
    </View>
  )

  const renderPromo = () => (
    <View style={styles.skeletonRail}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPlaceholder.Item key={index} width={s(98)} height={s(112)} borderRadius={s(19)} marginRight={s(12)} />
      ))}
    </View>
  )

  const renderSuppliers = () => (
    <View style={styles.skeletonRail}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonPlaceholder.Item key={index} width={SUPPLIER_CARD_WIDTH} height={s(168)} borderRadius={s(20)} marginRight={s(12)} />
      ))}
    </View>
  )

  const renderBestSeller = () => (
    <View style={styles.skeletonRail}>
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonPlaceholder.Item key={index} width={s(140)} height={s(200)} borderRadius={s(20)} marginRight={s(12)} />
      ))}
    </View>
  )

  const renderContent = () => {
    if (variant === 'flash') return renderFlash()
    if (variant === 'brand') return renderBrands()
    if (variant === 'banner') return renderBanner()
    if (variant === 'promo') return renderPromo()
    if (variant === 'supplier') return renderSuppliers()
    if (variant === 'bestSeller') return renderBestSeller()
    return renderFlash()
  }

  return (
    <View style={withHeader && styles.skeletonSection}>
      <Skeleton>
        {withHeader ? <HeaderSkeleton /> : null}
        {renderContent()}
      </Skeleton>
    </View>
  )
}

const TagRail = () => (
  <View style={styles.tagBlock}>
    <Text style={styles.tagQuestion}>Hôm nay bạn muốn mua gì?</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tagRail}
    >
      <View style={[styles.tagPill, styles.tagPillActive]}>
        <Text style={styles.tagTextActive}>Tất cả</Text>
      </View>
      {shoppingTags.map(tag => (
        <View key={tag} style={styles.tagPill}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
)

const CampaignBanner = ({ listAdsBanner }) => {
  const banners = useMemo(() => (
    hasItems(listAdsBanner)
      ? listAdsBanner
      : [{ images: banner_2 }, { images: banner_3 }, { images: banner_4 }]
  ).map(i => ({ image: i?.images })), [listAdsBanner])

  return (
    <View style={styles.bannerShell}>
      <SliderBox
        resizeMode="cover"
        dotColor={brandColors.goldAccent}
        dotStyle={styles.dot}
        dotContainerStyle={styles.dotContainer}
        paginationBoxStyle={styles.paginationBox}
        inactiveDotColor="rgba(255,255,255,0.55)"
        autoplay
        circleLoop
        parentWidth={bannerWidth}
        items={banners}
        openImage={() => {}}
        onCurrentItemPressed={() => {}}
        ImageComponentStyle={styles.bannerImage}
      />
    </View>
  )
}

const PromotionBannerRail = ({ navigation, products }) => {
  const safeProducts = Array.isArray(products) ? products.slice(0, 6) : []

  if (!safeProducts.length) {
    return <HomeModuleSkeleton variant="promo" count={4} />
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.hotDealRail}
    >
      {safeProducts.map((item, index) => {
        const price = getProductPrice(item)
        const originalPrice = getOriginalPrice(item)
        const hasPct = originalPrice > 0 && price > 0 && price < originalPrice
        const pctLabel = hasPct ? `-${Math.round(((originalPrice - price) / originalPrice) * 100)}%` : 'HOT'
        const accentColor = getSupplierAccentColor(item)

        return (
        <PressScale
          key={getItemKey(item, index)}
          style={[styles.hotDealTile, { backgroundColor: hexToRgba(accentColor, 0.08), borderColor: hexToRgba(accentColor, 0.22) }]}
          onPress={() => navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, {
            product: item,
            distributorId: item?.distributor_id,
          })}
        >
          <View style={styles.hotDealRibbon}>
            <Text style={styles.hotDealRibbonText}>{pctLabel}</Text>
          </View>
          <View style={styles.hotDealImagePanel}>
            <Image
              source={getProductImage(item, 'xl', banner_2)}
              style={styles.hotDealImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.hotDealName} numberOfLines={2}>{item?.name}</Text>
        </PressScale>
        )
      })}
    </ScrollView>
  )
}

// Card "Nhà cung cấp" theo spec bản cập nhật: 128x168, 2/3 trên là vùng
// logo (nền tint riêng theo NCC), 1/3 dưới là dải đặc màu teal + chữ
// voucher vàng — thay card gradient viền mờ cũ. Cả rail nằm trong khung
// thẻ nền tealLight riêng, có hiệu ứng scale theo vị trí cuộn (card gần
// tâm màn hình phóng to ~1.12x, card xa thu nhỏ ~0.86x).
const SupplierDealRail = ({ navigation, onItemPress, distributors }) => {
  const safeDistributors = Array.isArray(distributors) ? distributors.slice(0, 8) : []
  const scrollX = useRef(new Animated.Value(0)).current

  if (!safeDistributors.length) {
    // Trạng thái rỗng hiện rõ ràng bằng chữ thay vì skeleton mờ dễ bị
    // nhầm là "không có gì" — giúp phân biệt "đang tải" và "API trả về
    // rỗng" khi API /distributors/active chưa có dữ liệu.
    return (
      <View style={styles.supplierEmptyState}>
        <Text style={styles.supplierEmptyTitle}>Đang tải nhà cung cấp…</Text>
        <Text style={styles.supplierEmptySubtitle}>Danh sách sẽ hiển thị khi có nhà cung cấp đang hoạt động</Text>
      </View>
    )
  }

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.supplierRail}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true },
      )}
    >
      {safeDistributors.map((item, index) => {
        const supplierName = item?.nick_name || item?.name || 'Nhà cung cấp'
        const accentColor = getSupplierAccentColor(item)
        const voucherLabel = getSupplierVoucherLabel(item)
        const cardCenter = SUPPLIER_RAIL_SIDE_PADDING + index * SUPPLIER_CARD_STEP + SUPPLIER_CARD_WIDTH / 2
        const centerInputPoint = cardCenter - screenWidth / 2
        const scale = scrollX.interpolate({
          inputRange: [centerInputPoint - SUPPLIER_CARD_STEP, centerInputPoint, centerInputPoint + SUPPLIER_CARD_STEP],
          outputRange: [0.86, 1.12, 0.86],
          extrapolate: 'clamp',
        })

        return (
          <Animated.View
            key={getItemKey(item, index)}
            style={[styles.supplierTile, { transform: [{ scale }] }]}
          >
            <PressScale
              style={styles.supplierTilePress}
              onPress={() => {
                navigation.navigate(NAVIGATION_PRODUCT_LIST, {
                  type: 'product_by_distributor',
                  distributorId: item?.id,
                  distributor: item,
                  voucherLabel,
                  title: supplierName,
                })
              }}
            >
              <View style={[styles.supplierLogoZone, !voucherLabel && { flex: 1 }, { backgroundColor: hexToRgba(accentColor, 0.12) }]}>
                <View style={styles.supplierLogoWrap}>
                  <Image source={getDistributorLogo(item)} style={styles.supplierLogo} resizeMode="contain" />
                </View>
                <Text style={styles.supplierNameText} numberOfLines={2}>
                  {supplierName}
                </Text>
              </View>
              {voucherLabel && (
                <View style={styles.supplierVoucherStrip}>
                  <Text style={styles.supplierVoucherText} numberOfLines={2}>
                    {voucherLabel}
                  </Text>
                </View>
              )}
            </PressScale>
          </Animated.View>
        )
      })}
    </Animated.ScrollView>
  )
}

const FlashSalePriceSock = ({ navigation, products }) => {
  const safeProducts = Array.isArray(products) ? products.slice(0, 8) : []

  if (!safeProducts.length) {
    return <HomeModuleSkeleton variant="flash" withHeader count={3} />
  }

  return (
    <View style={styles.flashSection}>
      <View style={styles.foodHeader}>
        <View style={styles.foodHeaderCopy}>
          <View style={styles.flashTitleRow}>
            <View style={styles.flashAccentBar} />
            <Text style={styles.foodTitle}>Giá sốc hôm nay</Text>
            <View style={styles.flashHotBadge}>
              <Text style={styles.flashHotBadgeText}>HOT</Text>
            </View>
          </View>
          <Text style={styles.foodSubtitle} numberOfLines={1}>Giờ vàng deal hot - Sản phẩm giá tốt</Text>
        </View>
        <PressScale
          style={styles.foodArrow}
          onPress={() => navigation.navigate(NAVIGATION_PRODUCT_LIST, { type: 'priceSock', title: 'Sản phẩm giá sốc' })}
        >
          <Text style={styles.foodArrowText}>→</Text>
        </PressScale>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flashRail}>
        {safeProducts.map((item, index) => {
          const price = getProductPrice(item)
          const originalPrice = getOriginalPrice(item)
          const discountLabel = getDiscountLabel(item)
          return (
            <PressScale
              key={getItemKey(item, index)}
              style={styles.flashCard}
              onPress={() => navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, {
                product: item,
                distributorId: item?.distributor_id,
              })}
            >
              <View style={styles.flashImageWrap}>
                <Image source={getProductImage(item, 'xl', banner_2)} style={styles.flashImage} resizeMode="cover" />
                {discountLabel ? (
                  <View style={styles.flashDiscount}>
                    <Text style={styles.flashDiscountText}>{discountLabel}</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.flashBody}>
                <Text style={styles.flashStore} numberOfLines={1}>{item?.distributor?.nick_name || item?.supplier?.name || '1000CARE'}</Text>
                <Text style={styles.flashName} numberOfLines={2}>{item?.name}</Text>
                <View style={styles.flashPriceRow}>
                  <Text style={styles.flashPrice}>{formatMoney(price, { unit: 'đ', space: false })}</Text>
                  {originalPrice > price && (
                    <Text style={styles.flashOldPrice}>{formatMoney(originalPrice, { unit: 'đ', space: false })}</Text>
                  )}
                </View>
              </View>
            </PressScale>
          )
        })}
      </ScrollView>
    </View>
  )
}

const ListDistributor = ({ navigation, onItemPress, selectedDistri, onFavorClick, onAddProduct, onMessage, topInset = 0 }) => {
  const dispatch = useDispatch()
  const { handleScroll } = useTabBarVisibility()
  const listAdsBanner = useSelector(state => getListAdsBannerNeomed(state))
  const distributors = useSelector(state => getListDistributors(state))
  const hotDeals = useSelector(state => getListProductsHotDeal(state))
  const priceSockProducts = useSelector(state => getListProductPriceSockHome(state))
  const bestSellerProducts = useSelector(state => getListProductsBestSeller(state))

  useEffect(() => {
    dispatch(requestGetListAdsBannerHomeNeomedByDistributor(1, 1, 1, 100, 1))
  }, [dispatch])

  return (
    <ScrollView
      style={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, { paddingTop: CONTENT_TOP_PADDING + topInset }]}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <TagRail />

      <AppSection title="Chương trình khuyến mãi">
        {hasItems(listAdsBanner) ? (
          <CampaignBanner listAdsBanner={listAdsBanner} />
        ) : (
          <HomeModuleSkeleton variant="banner" />
        )}
      </AppSection>

      <FlashSalePriceSock navigation={navigation} products={priceSockProducts} />

      <View style={styles.supplierSectionCard}>
        <View style={styles.supplierSectionHeader}>
          <Text style={styles.supplierSectionTitle}>Nhà cung cấp</Text>
        </View>
        <SupplierDealRail navigation={navigation} onItemPress={onItemPress} distributors={distributors} />
      </View>

      <View style={styles.foodSection}>
        <View style={styles.foodHeader}>
          <Text style={styles.foodTitle}>Deal hời dành cho bạn</Text>
        </View>
        <PromotionBannerRail navigation={navigation} products={hotDeals} />
      </View>

      <AppSection title="Sản phẩm bán chạy">
        {hasItems(bestSellerProducts) ? (
          <HotProducts
            navigation={navigation}
            onFavorClick={onFavorClick}
            onAddProduct={onAddProduct}
            onMessage={onMessage}
          />
        ) : (
          <HomeModuleSkeleton variant="bestSeller" />
        )}
      </AppSection>

      <View style={{ height: s(164) }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    paddingTop: CONTENT_TOP_PADDING,
  },
  tagBlock: {
    marginHorizontal: s(16),
    marginBottom: s(18),
    borderRadius: s(30),
    padding: s(16),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  tagQuestion: {
    color: brandColors.textDark,
    fontFamily: Fonts.semiBold,
    fontSize: fs(18),
    lineHeight: fs(24),
    fontWeight: 'normal',
  },
  tagRail: {
    paddingTop: s(12),
    gap: s(8),
  },
  tagPill: {
    height: s(34),
    paddingHorizontal: s(14),
    borderRadius: s(17),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(11,123,138,0.1)',
  },
  tagText: {
    color: brandColors.tealDark,
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    fontWeight: 'normal',
  },
  tagPillActive: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  tagTextActive: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontSize: fs(13),
    fontWeight: '700',
  },
  bannerShell: {
    width: bannerWidth,
    height: bannerHeight,
    marginHorizontal: s(16),
    borderRadius: s(30),
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  bannerImage: {
    width: bannerWidth,
    height: bannerHeight,
    borderRadius: s(28),
  },
  dot: {
    width: s(7),
    height: s(7),
    borderRadius: s(4),
  },
  dotContainer: {
    marginHorizontal: s(3),
  },
  paginationBox: {
    paddingVertical: s(8),
  },
  skeletonSection: {
    marginTop: s(27),
  },
  skeletonHeader: {
    paddingHorizontal: s(18),
    marginBottom: s(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skeletonRail: {
    flexDirection: 'row',
    paddingHorizontal: s(16),
    paddingBottom: s(8),
    overflow: 'hidden',
  },
  skeletonBannerWrap: {
    marginHorizontal: s(16),
    width: bannerWidth,
    height: bannerHeight,
  },
  fallbackCard: {
    marginHorizontal: s(16),
    borderRadius: s(28),
    paddingHorizontal: s(18),
    paddingVertical: s(18),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
  },
  fallbackTitle: {
    color: brandColors.textDark,
    fontFamily: Fonts.semiBold,
    fontSize: fs(14),
    lineHeight: fs(18),
    fontWeight: 'normal',
  },
  fallbackDescription: {
    marginTop: s(6),
    color: brandColors.muted,
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    lineHeight: fs(19),
    fontWeight: 'normal',
  },
  foodSection: {
    marginTop: s(24),
  },
  foodHeader: {
    paddingHorizontal: s(18),
    marginBottom: s(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandSectionHeader: {
    alignItems: 'center',
  },
  foodHeaderCopy: {
    flex: 1,
  },
  flashTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(8),
  },
  flashAccentBar: {
    width: s(4),
    height: s(16),
    borderRadius: s(2),
    backgroundColor: brandColors.danger,
  },
  flashHotBadge: {
    backgroundColor: 'rgba(255,59,48,0.1)',
    paddingHorizontal: s(8),
    paddingVertical: s(3),
    borderRadius: s(radiusScale.xs),
  },
  flashHotBadgeText: {
    color: brandColors.danger,
    fontFamily: foodAppFont,
    fontSize: fs(10),
    fontWeight: '800',
  },
  foodTitle: {
    color: '#111827',
    fontFamily: foodAppFont,
    fontSize: fs(18),
    lineHeight: fs(24),
    fontWeight: 'normal',
    letterSpacing: 0,
  },
  foodSubtitle: {
    marginTop: s(2),
    color: '#7C858B',
    fontFamily: Fonts.base,
    fontSize: fs(12),
    lineHeight: fs(17),
    fontWeight: 'normal',
  },
  foodArrow: {
    width: s(42),
    height: s(42),
    borderRadius: s(21),
    backgroundColor: 'rgba(255,255,255,0.38)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.84)',
    shadowColor: '#0F2B33',
    shadowOffset: { width: s(6), height: s(8) },
    shadowOpacity: 0.12,
    shadowRadius: s(16),
    elevation: 5,
  },
  foodArrowText: {
    color: '#111827',
    fontFamily: Fonts.semiBold,
    fontSize: fs(22),
    lineHeight: fs(24),
    fontWeight: 'normal',
  },
  hotDealRail: {
    paddingHorizontal: s(16),
    gap: s(12),
  },
  hotDealTile: {
    width: s(104),
    height: s(130),
    borderRadius: s(20),
    borderWidth: 1,
    padding: s(10),
    paddingTop: s(14),
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: s(10) },
    shadowOpacity: 0.08,
    shadowRadius: s(22),
    elevation: 4,
  },
  hotDealRibbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: brandColors.goldAccent,
    paddingHorizontal: s(9),
    paddingVertical: s(4),
    borderTopLeftRadius: s(20),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: s(16),
    zIndex: 2,
  },
  hotDealRibbonText: {
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(10),
    fontWeight: '800',
  },
  hotDealImagePanel: {
    width: s(58),
    height: s(58),
    borderRadius: s(29),
    backgroundColor: brandColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: s(8),
    marginBottom: s(8),
    ...brandShadow.soft,
  },
  hotDealImage: {
    width: '78%',
    height: '78%',
  },
  hotDealName: {
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(10.5),
    lineHeight: fs(14),
    fontWeight: '700',
    textAlign: 'center',
  },
  supplierSectionCard: {
    marginHorizontal: s(16),
    marginBottom: s(24),
    borderRadius: s(radiusScale.xxl),
    backgroundColor: 'rgba(11,123,138,0.035)',
    paddingTop: s(16),
    paddingBottom: s(14),
  },
  supplierSectionHeader: {
    paddingHorizontal: s(16),
    marginBottom: s(10),
  },
  supplierSectionTitle: {
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(15),
    fontWeight: '800',
  },
  supplierEmptyState: {
    minHeight: s(118),
    marginHorizontal: s(16),
    borderRadius: s(radiusScale.xxl),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(18),
    ...brandShadow.soft,
  },
  supplierEmptyTitle: {
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(13.5),
    fontWeight: '700',
  },
  supplierEmptySubtitle: {
    marginTop: s(4),
    color: brandColors.muted,
    fontSize: fs(12),
    textAlign: 'center',
  },
  supplierRail: {
    paddingHorizontal: s(16),
    paddingVertical: s(6),
    gap: s(12),
  },
  supplierTile: {
    width: SUPPLIER_CARD_WIDTH,
    height: s(168),
  },
  supplierTilePress: {
    flex: 1,
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    backgroundColor: brandColors.surface,
    ...brandShadow.soft,
  },
  supplierLogoZone: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(8),
    padding: s(8),
  },
  supplierLogoWrap: {
    width: s(52),
    height: s(52),
    borderRadius: s(26),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    ...brandShadow.soft,
  },
  supplierLogo: {
    width: s(40),
    height: s(40),
  },
  supplierNameText: {
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(11),
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: fs(14),
    height: s(28),
  },
  supplierVoucherStrip: {
    flex: 1,
    backgroundColor: brandColors.tealDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(6),
  },
  supplierVoucherText: {
    color: brandColors.goldAccent,
    fontFamily: foodAppFont,
    fontSize: fs(11),
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: fs(14),
  },
  flashSection: {
    marginTop: s(27),
  },
  flashRail: {
    paddingHorizontal: s(16),
    gap: s(12),
    paddingBottom: s(4),
  },
  flashCard: {
    width: s(132),
    borderRadius: s(18),
    backgroundColor: brandColors.surface,
    overflow: 'hidden',
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: s(12) },
    shadowOpacity: 0.1,
    shadowRadius: s(26),
    elevation: 6,
  },
  flashImageWrap: {
    width: '100%',
    height: s(100),
    backgroundColor: brandColors.tealLight,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashImage: {
    width: '100%',
    height: '100%',
  },
  flashDiscount: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: brandColors.goldAccent,
    paddingVertical: s(4),
    paddingHorizontal: s(9),
    borderTopLeftRadius: s(18),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: s(16),
    zIndex: 3,
  },
  flashDiscountText: {
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(10),
    lineHeight: fs(13),
    fontWeight: 'normal',
  },
  flashBody: {
    padding: s(10),
  },
  flashStore: {
    color: brandColors.tealPrimary,
    fontFamily: foodAppFont,
    fontSize: fs(9.5),
    lineHeight: fs(13),
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  flashName: {
    marginTop: s(2),
    color: brandColors.textDark,
    fontFamily: foodAppFont,
    fontSize: fs(12),
    lineHeight: fs(17),
    height: s(34),
    fontWeight: 'normal',
  },
  flashPriceRow: {
    marginTop: s(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashPrice: {
    color: brandColors.tealDark,
    fontFamily: foodAppFont,
    fontSize: fs(13.5),
    lineHeight: fs(18),
    fontWeight: 'normal',
  },
  flashOldPrice: {
    marginLeft: s(5),
    color: brandColors.mutedLight,
    fontFamily: Fonts.base,
    fontSize: fs(10.5),
    lineHeight: fs(14),
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
})

export default ListDistributor
