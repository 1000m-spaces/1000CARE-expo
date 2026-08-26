/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image } from '~/common/index'
import { plus_2, heart, heart_red } from '../../assets/constants'
import PressScale from '~/design-system/PressScale'
import placeholder from '~/assets/images/placeholder.png'

import { getListItem as getProductInCart } from '~/store/cart/cartSelectors'

import { NAVIGATION_PRODUCT_DETAIL_SCREEN, NAVIGATION_COMBO_PRODUCT_DETAIL } from '~/navigation/routes'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import dimens from '~/constants/dimens'
import Colors from '../Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, requestAddProductWishList, requestRemoveProductWishList, updateCart } from '~/store/actions'
import { getAuthStore } from '~/store/selector'
import strings from '~/i18n'
import { gift_fill } from '~/assets/constants'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'

const numColumns = 2
const LAYOUTPADDING = 6 * 2
const ContentPadding = 9 * 2
const CategoriesWidth = 100
const ITEMPADDING = 4
const PRODUCT_WIDTH = dimens.common.WINDOW_WIDTH / numColumns - ITEMPADDING * 2 - 10
const IMAGE_CONTAINER_HEIGHT = PRODUCT_WIDTH
const IMAGE_HEIGHT = IMAGE_CONTAINER_HEIGHT - 8
const PRODUCT_COLUMN_WIDTH = (dimens.common.WINDOW_WIDTH - CategoriesWidth - LAYOUTPADDING - ContentPadding) / 3
const PRODUCT_COLUMN_HEIGHT = 120
const IMAGE_COLUMN_WIDTH = PRODUCT_COLUMN_WIDTH
const IMAGE_COLUMN_HEIGHT = PRODUCT_COLUMN_HEIGHT * 3.5 / 5

const ProductItem = ({ navigation, data, distributorId, type, addButton = true, combo = false, goBack, onFavorClick, onAdd, onMessage, onNavigate, productWidth }) => {
  const { isLoggedIn } = useSelector(state => getAuthStore(state))
  const cartData = useSelector((state) => getProductInCart(state))
  const dispatch = useDispatch()
  const getProducts = useCallback(() => {
    const data = []
    if (!cartData || !cartData.items)
      return []
    cartData.items.forEach(cd => {
      if (!cd.items)
        return
      cd.items.forEach(item => {
        data.push({
          ...item,
          distributor_id: cd.distributor.id,
        })
      })
    })
    return data
  }, [cartData])
  const productInCart = getProducts()
  const effectiveDistributorId = distributorId || data?.distributor_id || data?.distributor?.id
  const addProduct = useCallback(
    (qty) => {
      const index = inList(data.product_id, productInCart)
      if (index < 0) {
        dispatch(addToCart(data.product_id, effectiveDistributorId, qty))
      } else {
        dispatch(updateCart(data.product_id, effectiveDistributorId, (productInCart[index]?.qty || 0) + qty))
      }
    },
    [data.product_id, effectiveDistributorId, productInCart],
  )

  const addProd = (qty) => {
    console.log('distributorId', distributorId)
    addProduct(qty)
  }

  const inList = (productId, list = []) => {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].product_id === productId && list[i].distributor_id === effectiveDistributorId) {
        return i
      }
    }
    return -1
  }

  const addItem = () => {
    if (!isLoggedIn) {
      if (onMessage) {
        onMessage(strings.common.requireLogin)
      }
      return
    }
    if (onAdd) {
      onAdd()
    }
    addProd(1)
  }

  const favorClick = () => {
    // Yêu cầu đăng nhập để thêm/xóa yêu thích
    if (!isLoggedIn) {
      if (onMessage) {
        onMessage(strings.common.requireLogin)
      }
      return
    }
    if (data.is_wishlist) {
      dispatch(requestRemoveProductWishList(data.product_id))
      if (onFavorClick) {
        data.is_wishlist = false
        onFavorClick(false)
      }
    } else {
      dispatch(requestAddProductWishList(data.product_id))
      if (onFavorClick) {
        data.is_wishlist = true
        onFavorClick(true)
      }
    }
  }

  const isPending = data.distributor?.status === 2

  const resolvedProductWidth = Number(productWidth) > 0 ? Number(productWidth) : PRODUCT_WIDTH
  const resolvedImageContainerHeight = resolvedProductWidth
  const resolvedImageHeight = resolvedImageContainerHeight - 8
  const supplierName = data?.distributor?.nick_name || data?.supplier?.name || ''
  const isPointPayment = data.payment_type === 2
  const hasDiscount = !isPointPayment && Number(data.price) > 0 && Number(data.sale_price) > 0 && Number(data.sale_price) !== Number(data.price)
  const discountPercent = hasDiscount ? Math.max(0, 100 - (Number(data.sale_price) / Number(data.price)) * 100).toFixed(1) : null

  return (
    <PressScale
      onPress={() => {
        if (isPending) {
          return
        }
        // Cho phép xem chi tiết sản phẩm mà không cần đăng nhập
        if (navigation && data.product_type === 2) {
          navigation.navigate(NAVIGATION_COMBO_PRODUCT_DETAIL, {
            banner: data,
            distributorId: data.distributor_id,
          })
        } else if (navigation) {
          navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, { product: data, distributorId, combo, goBack })
          if (onNavigate) {
            onNavigate()
          }
        }
      }}
    >
      {
        type ? (
          <View
            style={[
              styles.productContainer,
              {
                width: resolvedProductWidth,
                height: resolvedProductWidth * 1.72 + 64,
              },
            ]}
          >
            {
              isPending && (
                <View style={styles.overlay}>
                  <Text
                    style={styles.pending}
                  >
                    {'Coming soon'}
                  </Text>
                </View>
              )
            }
            <View style={[styles.imageContainer, { height: resolvedImageContainerHeight }]}>
              <Image
                style={[styles.productImage, { height: resolvedImageHeight }]}
                widthImage={Number(1.5 * resolvedProductWidth).toFixed(0)}
                heightImage={Number(1.5 * resolvedImageHeight).toFixed(0)}
                source={getProductImage(data, 'xl', placeholder)}
              />
              {hasDiscount && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountBadgeText}>-{discountPercent}%</Text>
                </View>
              )}
              <PressScale
                onPress={() => favorClick()}
                style={styles.favorContainer}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Image
                  style={styles.favorIcon}
                  resizeMode={'contain'}
                  source={data.is_wishlist ? heart_red : heart}
                  tintColor={Colors.errorColor}
                />
              </PressScale>
              {
                data.range_prices && data.range_prices.length > 0 && (
                  <View style={styles.giftBadge}>
                    <Image
                      style={styles.giftBadgeIcon}
                      source={gift_fill}
                      tintColor={brandColors.surface}
                    />
                  </View>
                )
              }
            </View>
            <View style={styles.productInfoContainer}>
              <Text
                style={styles.productName}
                numberOfLines={2}
                ellipsizeMode='tail'
              >{data.name}</Text>
              {!!supplierName && (
                <Text
                  style={styles.supplierName}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >{supplierName}</Text>
              )}
              <View style={styles.priceRow}>
                <View style={styles.priceTextBlock}>
                  <Text
                    style={isPointPayment ? styles.salePrice : styles.price}
                    numberOfLines={1}
                    ellipsizeMode='tail'
                  >
                    {formatMoney(data.sale_price, { unit: isPointPayment ? 'điểm' : 'đ', space: false })}
                  </Text>
                  {hasDiscount && (
                    <Text style={styles.discount} numberOfLines={1}>
                      {formatMoney(data.price, { unit: 'đ', space: false })}
                    </Text>
                  )}
                </View>
                {addButton && (
                  <PressScale
                    onPress={() => addItem()}
                    style={styles.buttonAddContainer}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Image
                      source={plus_2}
                      style={styles.buttonAdd}
                      tintColor={brandColors.surface}
                    />
                  </PressScale>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.imageColumnContainer}>
            {
              isPending && (
                <View style={styles.overlay}>
                  <Text
                    style={styles.pending}
                  >
                    {'Coming soon'}
                  </Text>
                </View>
              )
            }
            <Image
              style={styles.productImageColumn}
              widthImage={Number(IMAGE_COLUMN_WIDTH - 2).toFixed(0)}
              heightImage={Number(IMAGE_COLUMN_HEIGHT - 2).toFixed(0)}
              source={getProductImage(data, 'xl', placeholder)}
            />
            <Text
              style={styles.productColumName}
              numberOfLines={2}
              ellipsizeMode='tail'
            >{data.name}</Text>
          </View>
        )
      }
    </PressScale>
  )
}

export default ProductItem

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: fs(14),
    color: brandColors.textDark,
  },
  buttonAll: {
    height: 24,
    borderRadius: s(12),
    borderWidth: 1,
    borderColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    paddingHorizontal: LAYOUTPADDING,
    paddingVertical: 4,
    fontSize: fs(12),
    color: brandColors.tealPrimary,
  },
  listProductsContainer: {
    marginTop: 20,
  },
  productContainer: {
    width: PRODUCT_WIDTH,
    height: PRODUCT_WIDTH * 1.4 + 50,
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: brandColors.surface,
    margin: s(5),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    overflow: 'hidden',
    ...brandShadow.soft,
  },
  productColumnContainer: {
    width: PRODUCT_COLUMN_WIDTH,
    height: PRODUCT_COLUMN_HEIGHT,
    flexDirection: 'column',
  },
  imageContainer: {
    height: IMAGE_CONTAINER_HEIGHT,
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: s(8),
    position: 'relative',
  },
  imageColumnContainer: {
    backgroundColor: brandColors.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
    width: PRODUCT_COLUMN_WIDTH,
    height: 120,
    borderRadius: s(radiusScale.lg),
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
  },
  productImageColumn: {
    width: IMAGE_COLUMN_WIDTH - 2,
    height: IMAGE_COLUMN_HEIGHT - 2,
    resizeMode: 'contain',
  },
  productInfoContainer: {
    paddingHorizontal: s(10),
    paddingTop: s(8),
    paddingBottom: s(10),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  productNameContainer: {
    marginTop: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  productName: {
    fontFamily: Fonts.bold,
    fontSize: fs(13),
    color: brandColors.textDark,
    lineHeight: fs(18),
    minHeight: fs(36),
    fontWeight: 'normal',
    letterSpacing: -0.1,
  },
  supplierName: {
    fontFamily: Fonts.base,
    color: brandColors.muted,
    fontSize: fs(11),
    lineHeight: fs(15),
    marginTop: s(2),
  },
  productColumName: {
    fontFamily: Fonts.bold,
    fontSize: fs(14),
    color: brandColors.textDark,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 15,
    marginHorizontal: 2,
    flex: 2,
  },
  buttonAddContainer: {
    backgroundColor: brandColors.tealPrimary,
    width: s(30),
    height: s(30),
    borderRadius: s(radiusScale.pill),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...brandShadow.teal,
  },
  buttonAdd: {
    width: s(13),
    height: s(13),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: s(8),
  },
  priceTextBlock: {
    flex: 1,
    minWidth: 0,
    paddingRight: s(8),
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  actionColumn: {
    width: s(30),
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  favorContainer: {
    position: 'absolute',
    top: s(6),
    right: s(6),
    height: s(26),
    width: s(26),
    borderRadius: s(radiusScale.pill),
    backgroundColor: 'rgba(255,255,255,0.86)',
    alignItems: 'center',
    justifyContent: 'center',
    ...brandShadow.soft,
  },
  favorIcon: {
    height: s(15),
    width: s(15),
  },
  discountBadge: {
    position: 'absolute',
    top: s(6),
    left: s(6),
    backgroundColor: brandColors.danger,
    borderRadius: s(radiusScale.pill),
    paddingHorizontal: s(7),
    paddingVertical: s(3),
  },
  discountBadgeText: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(10),
    lineHeight: fs(12),
    color: brandColors.surface,
  },
  giftBadge: {
    position: 'absolute',
    bottom: s(6),
    left: s(6),
    width: s(22),
    height: s(22),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
    ...brandShadow.soft,
  },
  giftBadgeIcon: {
    width: s(12),
    height: s(12),
  },
  priceContainer: {
    marginTop: 1,
    flexDirection: 'row',
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: fs(15),
    marginTop: 1,
    fontWeight: 'normal',
    color: brandColors.goldAccent,
    lineHeight: fs(19),
    letterSpacing: -0.2,
  },
  salePriceContainer: {
    marginTop: 1,
    flexDirection: 'row',
    // flex: 2,
  },
  salePrice: {
    fontFamily: Fonts.bold,
    fontSize: fs(15),
    fontWeight: 'normal',
    color: brandColors.goldAccent,
    lineHeight: fs(19),
    letterSpacing: -0.2,
  },
  discount: {
    marginTop: s(1),
    fontFamily: Fonts.base,
    fontSize: fs(10),
    color: brandColors.mutedLight,
    fontWeight: 'normal',
    lineHeight: fs(13),
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    marginTop: 9,
  },
  circleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: brandColors.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundBtn: {
    width: 66,
    height: 32,
    borderRadius: 28,
    marginHorizontal: 4,
    backgroundColor: brandColors.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signText: {
    color: brandColors.muted,
    fontSize: fs(14),
  },
  quatityInput: {
    color: brandColors.muted,
    fontSize: fs(12),
    lineHeight: 15,
    flex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(114, 114, 114, 0.5)',
    position: 'absolute',
    zIndex: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pending: {
    fontFamily: Fonts.bold,
    textAlign: 'center',
    color: Colors.white,
  },
})
