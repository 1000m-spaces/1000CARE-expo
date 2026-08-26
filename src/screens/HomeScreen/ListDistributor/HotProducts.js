import React from 'react'
import { FlatList, Image, View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { banner_2 } from '~/assets/constants'
import { NAVIGATION_PRODUCT_DETAIL_SCREEN } from '~/navigation/routes'
import { getListProductsBestSeller } from '~/store/selector'
import { DIMENS } from '~/constants/index'
import { s, fs } from '~/utils/responsive'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import PressScale from '~/design-system/PressScale'
import { brandColors, radiusScale } from '~/design-system/tokens'

const HotProducts = ({ navigation }) => {
  const listProductsBestSeller = useSelector(state => getListProductsBestSeller(state))
  const safeList = Array.isArray(listProductsBestSeller) ? listProductsBestSeller : []
  if (safeList.length === 0) return null

  const productWidth = Math.round((DIMENS.common.WINDOW_WIDTH - s(44)) / 2)
  const snapToInterval = productWidth + s(12)
  const listHeight = s(252)

  const getPrice = item => Number(item?.sale_price || item?.price || 0)
  const getOriginalPrice = item => Number(item?.price || item?.original_price || item?.listed_price || 0)
  const hasDiscount = item => {
    const price = getOriginalPrice(item)
    const salePrice = getPrice(item)
    return price > 0 && salePrice > 0 && salePrice < price
  }
  const goProductDetail = item => {
    navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, {
      product: item,
      distributorId: item?.distributor_id,
    })
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={safeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: listHeight }}
        contentContainerStyle={{ paddingHorizontal: s(16), paddingBottom: s(8) }}
        decelerationRate="fast"
        snapToInterval={snapToInterval}
        snapToAlignment="start"
        keyExtractor={(item, idx) => String(item?.product_id ?? item?.id ?? idx)}
        renderItem={({ item }) => (
          <PressScale
            style={[styles.dealCard, { width: productWidth }]}
            onPress={() => goProductDetail(item)}
          >
            <View style={styles.dealTop}>
              <Text style={styles.dealName} numberOfLines={2}>{item?.name}</Text>
              <View style={styles.dealImageRow}>
                <Image
                  source={getProductImage(item, 'xl', banner_2)}
                  style={styles.dealImage}
                  resizeMode="contain"
                />
                {hasDiscount(item) && (
                  <View style={styles.giftPanel}>
                    <Text style={styles.giftTitle}>GIÁ TỐT</Text>
                    <Text
                      style={styles.giftValue}
                      numberOfLines={1}
                    >
                      -{Math.round(((getOriginalPrice(item) - getPrice(item)) / getOriginalPrice(item)) * 100)}%
                    </Text>
                  </View>
                )}
              </View>
            </View>
            <View style={styles.priceBand}>
              <View pointerEvents="none" style={styles.priceSlant} />
              <View style={styles.priceBlock}>
                {hasDiscount(item) && (
                  <Text style={styles.oldPrice}>{formatMoney(getOriginalPrice(item), { unit: 'đ', space: false })}</Text>
                )}
                <Text
                  style={styles.salePrice}
                  numberOfLines={1}
                  ellipsizeMode="clip"
                >
                  {formatMoney(getPrice(item), { unit: 'đ', space: false })}
                </Text>
              </View>
              <View style={styles.buyButton}>
                <Text style={styles.buyText}>MUA NGAY</Text>
              </View>
            </View>
          </PressScale>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: s(8),
    paddingTop: s(2),
  },
  dealCard: {
    height: s(236),
    marginRight: s(12),
    borderRadius: s(radiusScale.xxxl),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    backgroundColor: brandColors.surface,
    overflow: 'hidden',
    shadowColor: brandColors.tealDark,
    shadowOffset: { width: 0, height: s(7) },
    shadowOpacity: 0.12,
    shadowRadius: s(12),
    elevation: 5,
  },
  dealTop: {
    flex: 1,
    paddingTop: s(10),
    paddingHorizontal: s(8),
    backgroundColor: brandColors.tealLight,
  },
  dealName: {
    height: s(36),
    color: brandColors.textDark,
    fontSize: fs(10.5),
    lineHeight: fs(13),
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  dealImageRow: {
    height: s(126),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dealImage: {
    width: '52%',
    height: '98%',
  },
  giftPanel: {
    width: '45%',
    minHeight: s(88),
    borderRadius: s(radiusScale.xxl),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(2),
  },
  giftTitle: {
    color: brandColors.surface,
    fontSize: fs(10),
    lineHeight: fs(13),
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  giftValue: {
    width: '100%',
    marginTop: s(6),
    color: brandColors.surface,
    fontSize: fs(17),
    lineHeight: fs(21),
    fontWeight: '700',
    textAlign: 'center',
  },
  priceBand: {
    height: s(58),
    backgroundColor: brandColors.tealDark,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: s(8),
    paddingRight: s(6),
    overflow: 'hidden',
  },
  priceSlant: {
    position: 'absolute',
    left: s(-18),
    top: 0,
    bottom: 0,
    width: '63%',
    backgroundColor: 'rgba(0,0,0,0.14)',
    transform: [{ skewX: '-22deg' }],
  },
  priceBlock: {
    flex: 1,
    marginRight: s(2),
    zIndex: 1,
  },
  oldPrice: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: fs(10.5),
    lineHeight: fs(13),
    fontWeight: '600',
    textDecorationLine: 'line-through',
  },
  salePrice: {
    color: brandColors.surface,
    fontSize: fs(14),
    lineHeight: fs(18),
    fontWeight: '700',
  },
  buyButton: {
    width: s(76),
    height: s(32),
    borderRadius: s(radiusScale.xxl),
    backgroundColor: brandColors.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  buyText: {
    color: brandColors.textDark,
    fontSize: fs(10.5),
    lineHeight: fs(13),
    fontWeight: '700',
    textAlign: 'center',
  },
})

export default HotProducts
