import React, { useEffect, useMemo } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { useDispatch, useSelector } from 'react-redux'
import { banner_2, banner_3, banner_4 } from '~/assets/constants'
import { NAVIGATION_LIST_DISTRIBUTOR_TRADEMARK, NAVIGATION_PRODUCT_DETAIL_SCREEN, NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'
import {
  getListAdsBannerNeomed,
  getListDistributors,
  getListProductPriceSockHome,
  getListProductsBestSeller,
  getListProductsHotDeal,
  getListTrademarksAdvertisement,
} from '~/store/selector'
import { requestGetListAdsBannerHomeNeomedByDistributor } from '~/store/actions'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import { s, fs } from '~/utils/responsive'
import SliderBox from '~/common/SliderBox/index'
import AppSection from '~/design-system/AppSection'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import ListTrademarksAdvertisement from './ListTrademarksAdvertisement'
import HotProducts from './HotProducts'
import { useTabBarVisibility } from '~/navigation/TabBarVisibilityContext'
import { Fonts } from '~/assets/config'

const screenWidth = Dimensions.get('window').width
const bannerWidth = screenWidth - s(32)
const bannerHeight = Math.round(bannerWidth / 2.8)
const hasItems = data => Array.isArray(data) && data.length > 0
const CONTENT_TOP_PADDING = s(10)

const shoppingTags = ['Hàng mới', 'Đang giảm giá', 'Bán chạy', 'Giao nhanh']
const foodAppFont = Fonts.bold
const couponColors = ['#FF5A3D', '#16B7C8', '#FFB22E', '#41CDA5', '#F66D8F', '#8E68FF']
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
const getDiscountPercentLabel = item => {
  const price = getOriginalPrice(item)
  const salePrice = getProductPrice(item)
  if (price > 0 && salePrice > 0 && salePrice < price) {
    return `GIẢM ${Math.round(((price - salePrice) / price) * 100)}%`
  }
  return 'HOT DEAL'
}

const Skeleton = ({ children }) => (
  <SkeletonPlaceholder backgroundColor="#EAF2F3" highlightColor="#F8FFFF" speed={1200}>
    {children}
  </SkeletonPlaceholder>
)

const HomeModuleSkeleton = ({ variant = 'rail', withHeader = false, count = 3 }) => {
  const productWidth = Math.round((Dimensions.get('window').width - s(44)) / 2)

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
        <SkeletonPlaceholder.Item key={index} width={s(112)} height={s(126)} borderRadius={s(20)} marginRight={s(12)} />
      ))}
    </View>
  )

  const renderBestSeller = () => (
    <View style={styles.skeletonRail}>
      {Array.from({ length: 2 }).map((_, index) => (
        <SkeletonPlaceholder.Item key={index} width={productWidth} height={s(236)} borderRadius={s(24)} marginRight={s(12)} />
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
      {safeProducts.map((item, index) => (
        <TouchableOpacity
          key={getItemKey(item, index)}
          activeOpacity={0.88}
          style={[styles.hotDealTile, { backgroundColor: couponColors[index % couponColors.length] }]}
          onPress={() => navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, {
            product: item,
            distributorId: item?.distributor_id,
          })}
        >
          <View style={styles.hotDealImagePanel}>
            <Image
              source={getProductImage(item, 'xl', banner_2)}
              style={styles.hotDealImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.hotDealLabel}>
            <Text style={styles.hotDealLabelText} numberOfLines={1}>{getDiscountPercentLabel(item)}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const SupplierDealRail = ({ navigation, onItemPress, distributors }) => {
  const safeDistributors = Array.isArray(distributors) ? distributors.slice(0, 8) : []

  if (!safeDistributors.length) {
    return <HomeModuleSkeleton variant="supplier" count={4} />
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.supplierRail}
    >
      {safeDistributors.map((item, index) => (
        (() => {
          const supplierName = item?.nick_name || item?.name || 'Nhà cung cấp'
          const canWrapName = /\s/.test(supplierName)
          const accentColor = getSupplierAccentColor(item)

          return (
            <TouchableOpacity
              key={getItemKey(item, index)}
              activeOpacity={0.86}
              style={styles.supplierTile}
              onPress={() => {
                if (onItemPress) onItemPress(item)
              }}
            >
              <LinearGradient
                colors={['#FFFFFF', hexToRgba(accentColor, 0.05), hexToRgba(accentColor, 0.14), hexToRgba(accentColor, 0.26)]}
                locations={[0, 0.48, 0.76, 1]}
                start={{ x: 0.12, y: 0 }}
                end={{ x: 0.9, y: 1 }}
                style={styles.supplierTileGradient}
              >
                <View style={styles.supplierLogoWrap}>
                  <Image source={getDistributorLogo(item)} style={styles.supplierLogo} resizeMode="contain" />
                </View>
                <View style={styles.supplierDealBadge}>
                  <Text
                    style={[styles.supplierDealText, { color: accentColor }]}
                    numberOfLines={canWrapName ? 2 : 1}
                    adjustsFontSizeToFit={!canWrapName}
                    minimumFontScale={0.68}
                  >
                    {supplierName}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )
        })()
      ))}
    </ScrollView>
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
          <Text style={styles.foodTitle}>Giá sốc hôm nay</Text>
          <Text style={styles.foodSubtitle} numberOfLines={1}>Giờ vàng deal hot - Sản phẩm giá tốt</Text>
        </View>
        <TouchableOpacity
          style={styles.foodArrow}
          onPress={() => navigation.navigate(NAVIGATION_PRODUCT_LIST, { type: 'priceSock', title: 'Sản phẩm giá sốc' })}
        >
          <Text style={styles.foodArrowText}>→</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.flashRail}>
        {safeProducts.map((item, index) => {
          const price = getProductPrice(item)
          const originalPrice = getOriginalPrice(item)
          const discountLabel = getDiscountLabel(item)
          return (
            <TouchableOpacity
              key={getItemKey(item, index)}
              activeOpacity={0.88}
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
              <Text style={styles.flashStore} numberOfLines={1}>{item?.distributor?.nick_name || item?.supplier?.name || '1000CARE'}</Text>
              <Text style={styles.flashName} numberOfLines={2}>{item?.name}</Text>
              <View style={styles.flashPriceRow}>
                <Text style={styles.flashPrice}>{formatMoney(price, { unit: 'đ', space: false })}</Text>
                {originalPrice > price && (
                  <Text style={styles.flashOldPrice}>{formatMoney(originalPrice, { unit: 'đ', space: false })}</Text>
                )}
              </View>
            </TouchableOpacity>
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
  const trademarks = useSelector(state => getListTrademarksAdvertisement(state))
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

      <FlashSalePriceSock navigation={navigation} products={priceSockProducts} />

      <AppSection title="Chương trình khuyến mãi">
        {hasItems(listAdsBanner) ? (
          <CampaignBanner listAdsBanner={listAdsBanner} />
        ) : (
          <HomeModuleSkeleton variant="banner" />
        )}
      </AppSection>

      <AppSection
        title="Thương hiệu nổi bật"
        headerStyle={styles.brandSectionHeader}
        action={(
          <TouchableOpacity
            style={styles.foodArrow}
            activeOpacity={0.86}
            onPress={() => {
              navigation.navigate(NAVIGATION_LIST_DISTRIBUTOR_TRADEMARK, {
                type: 'trademark',
                onItemPress: (item) => {
                  navigation.navigate(NAVIGATION_PRODUCT_LIST, {
                    type: 'trademark',
                    distributorId: selectedDistri?.id,
                    trademarkId: item?.id,
                    title: item?.name,
                  })
                },
                title: 'Thương hiệu',
              })
            }}
          >
            <Text style={styles.foodArrowText}>→</Text>
          </TouchableOpacity>
        )}
      >
        {hasItems(trademarks) ? (
          <ListTrademarksAdvertisement
            navigation={navigation}
            distributor={selectedDistri}
            onMessage={onMessage}
          />
        ) : (
          <HomeModuleSkeleton variant="brand" count={3} />
        )}
      </AppSection>

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

      <View style={styles.foodSection}>
        <View style={styles.foodHeader}>
          <Text style={styles.foodTitle}>Nhà cung cấp</Text>
        </View>
        <SupplierDealRail navigation={navigation} onItemPress={onItemPress} distributors={distributors} />
      </View>

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
    width: s(98),
    height: s(112),
    borderRadius: s(19),
    padding: s(7),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#263238',
    shadowOffset: { width: 0, height: s(6) },
    shadowOpacity: 0.08,
    shadowRadius: s(10),
    elevation: 3,
  },
  hotDealImagePanel: {
    width: s(66),
    height: s(66),
    borderRadius: s(33),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  hotDealImage: {
    width: s(60),
    height: s(48),
  },
  hotDealLabel: {
    width: '100%',
    borderRadius: s(8),
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: s(6),
    paddingVertical: s(5),
    alignItems: 'center',
  },
  hotDealLabelText: {
    color: '#0F8792',
    fontFamily: foodAppFont,
    fontSize: fs(11),
    lineHeight: fs(14),
    fontWeight: 'normal',
  },
  supplierRail: {
    paddingHorizontal: s(16),
    gap: s(12),
  },
  supplierTile: {
    width: s(112),
    height: s(126),
    borderRadius: s(20),
    shadowColor: '#263238',
    shadowOffset: { width: 0, height: s(6) },
    shadowOpacity: 0.08,
    shadowRadius: s(10),
    elevation: 3,
  },
  supplierTileGradient: {
    flex: 1,
    borderRadius: s(20),
    padding: s(8),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  supplierLogoWrap: {
    width: s(58),
    height: s(58),
    borderRadius: s(29),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(8),
  },
  supplierLogo: {
    width: s(48),
    height: s(48),
  },
  supplierDealBadge: {
    width: '100%',
    minHeight: s(34),
    borderRadius: s(9),
    backgroundColor: 'rgba(255,255,255,0.94)',
    paddingHorizontal: s(7),
    paddingVertical: s(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  supplierDealText: {
    color: '#0F8792',
    fontFamily: foodAppFont,
    fontSize: fs(9.5),
    lineHeight: fs(12),
    fontWeight: 'normal',
    maxWidth: s(94),
    textAlign: 'center',
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
    width: s(150),
  },
  flashImageWrap: {
    width: s(150),
    height: s(150),
    borderRadius: s(18),
    backgroundColor: '#FFFFFF',
    borderWidth: s(4),
    borderColor: '#FF6B45',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashImage: {
    width: '112%',
    height: '112%',
  },
  flashDiscount: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    minWidth: '52%',
    backgroundColor: 'rgba(255,106,69,0.94)',
    paddingVertical: s(5),
    paddingHorizontal: s(9),
    borderTopRightRadius: s(13),
    zIndex: 3,
  },
  flashDiscountText: {
    color: '#FFFFFF',
    fontFamily: foodAppFont,
    fontSize: fs(12),
    lineHeight: fs(17),
    fontWeight: 'normal',
  },
  flashStore: {
    marginTop: s(7),
    color: '#7C858B',
    fontFamily: Fonts.base,
    fontSize: fs(11),
    lineHeight: fs(15),
    fontWeight: 'normal',
  },
  flashName: {
    marginTop: s(2),
    color: '#111827',
    fontFamily: foodAppFont,
    fontSize: fs(14),
    lineHeight: fs(19),
    fontWeight: 'normal',
  },
  flashPriceRow: {
    marginTop: s(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashPrice: {
    color: '#19C3BE',
    fontFamily: foodAppFont,
    fontSize: fs(16),
    lineHeight: fs(22),
    fontWeight: 'normal',
  },
  flashOldPrice: {
    marginLeft: s(5),
    color: '#8A9399',
    fontFamily: Fonts.base,
    fontSize: fs(12),
    lineHeight: fs(16),
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
})

export default ListDistributor
