import React from 'react'
import { FlatList, Image, View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { banner_2 } from '~/assets/constants'
import { NAVIGATION_PRODUCT_DETAIL_SCREEN } from '~/navigation/routes'
import { getListProductsBestSeller } from '~/store/selector'
import { s, fs } from '~/utils/responsive'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import PressScale from '~/design-system/PressScale'
import { brandColors } from '~/design-system/tokens'

// Card "Bán chạy" đồng bộ theo cùng ngôn ngữ thiết kế của card "Giá sốc
// hôm nay" trong bộ spec (nền trắng, radius 20, shadow teal mềm, badge
// giảm giá vàng góc trên-trái, giá teal đậm) — thay cho khối nền teal đặc
// + dải giá skew trước đó.
const HotProducts = ({ navigation }) => {
  const listProductsBestSeller = useSelector(state => getListProductsBestSeller(state))
  const safeList = Array.isArray(listProductsBestSeller) ? listProductsBestSeller : []
  if (safeList.length === 0) return null

  const productWidth = s(140)
  const snapToInterval = productWidth + s(12)
  const listHeight = s(220)

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
            <View style={styles.imageWrap}>
              <Image
                source={getProductImage(item, 'xl', banner_2)}
                style={styles.dealImage}
                resizeMode="contain"
              />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {hasDiscount(item)
                    ? `-${Math.round(((getOriginalPrice(item) - getPrice(item)) / getOriginalPrice(item)) * 100)}%`
                    : '🔥 BÁN CHẠY'}
                </Text>
              </View>
            </View>
            <View style={styles.body}>
              <Text style={styles.dealName} numberOfLines={2}>{item?.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.salePrice} numberOfLines={1}>
                  {formatMoney(getPrice(item), { unit: 'đ', space: false })}
                </Text>
                {hasDiscount(item) && (
                  <Text style={styles.oldPrice} numberOfLines={1}>
                    {formatMoney(getOriginalPrice(item), { unit: 'đ', space: false })}
                  </Text>
                )}
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
    height: s(200),
    marginRight: s(12),
    borderRadius: s(20),
    backgroundColor: brandColors.surface,
    overflow: 'hidden',
    shadowColor: '#0A2F38',
    shadowOffset: { width: 0, height: s(12) },
    shadowOpacity: 0.1,
    shadowRadius: s(26),
    elevation: 6,
  },
  imageWrap: {
    height: s(104),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealImage: {
    width: '62%',
    height: '72%',
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: brandColors.goldAccent,
    paddingVertical: s(4),
    paddingHorizontal: s(9),
    borderTopLeftRadius: s(20),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: s(16),
  },
  badgeText: {
    color: brandColors.textDark,
    fontSize: fs(9.5),
    lineHeight: fs(13),
    fontWeight: '800',
  },
  body: {
    flex: 1,
    padding: s(10),
  },
  dealName: {
    height: s(34),
    color: brandColors.textDark,
    fontSize: fs(12),
    lineHeight: fs(17),
    fontWeight: '700',
  },
  priceRow: {
    marginTop: s(6),
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: s(5),
  },
  salePrice: {
    color: brandColors.tealDark,
    fontSize: fs(14.5),
    lineHeight: fs(19),
    fontWeight: '800',
  },
  oldPrice: {
    color: brandColors.mutedLight,
    fontSize: fs(10.5),
    lineHeight: fs(14),
    fontWeight: '600',
    textDecorationLine: 'line-through',
  },
})

export default HotProducts
