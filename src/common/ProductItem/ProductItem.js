/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Image, Icon } from '~/common/index'
import { heart, heart_red } from '../../assets/constants'
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
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'

const numColumns = 2
const LAYOUTPADDING = 6 * 2
const ContentPadding = 9 * 2
const CategoriesWidth = 100
const ITEMPADDING = 4
const PRODUCT_WIDTH = dimens.common.WINDOW_WIDTH / numColumns - ITEMPADDING * 2 - 10
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
            style={[styles.card, { width: resolvedProductWidth }]}
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
            <View style={styles.photoWrap}>
              <Image
                style={styles.photo}
                widthImage={Number(1.5 * resolvedProductWidth).toFixed(0)}
                heightImage={Number(1.5 * resolvedProductWidth).toFixed(0)}
                source={getProductImage(data, 'xl', placeholder)}
              />
              <PressScale
                onPress={() => favorClick()}
                style={styles.wishlistButton}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Image
                  style={styles.wishlistIcon}
                  resizeMode={'contain'}
                  source={data.is_wishlist ? heart_red : heart}
                  tintColor={data.is_wishlist ? Colors.errorColor : brandColors.mutedLight}
                />
              </PressScale>
              {
                data.range_prices && data.range_prices.length > 0 && (
                  <View style={styles.giftDot}>
                    <Icon type="feather" name="gift" size={s(11)} color={brandColors.surface} />
                  </View>
                )
              }
              {addButton && (
                <PressScale
                  onPress={() => addItem()}
                  style={styles.addFab}
                >
                  <Icon type="feather" name="plus" size={s(16)} color={brandColors.surface} />
                </PressScale>
              )}
            </View>
            <View style={styles.info}>
              <Text
                style={styles.productName}
                numberOfLines={2}
                ellipsizeMode='tail'
              >{data.name}</Text>
              {!!supplierName && (
                <Text
                  style={styles.subtitle}
                  numberOfLines={1}
                  ellipsizeMode='tail'
                >{supplierName}</Text>
              )}
              <Text style={styles.priceLine} numberOfLines={1}>
                <Text style={isPointPayment ? styles.salePrice : styles.price}>
                  {formatMoney(data.sale_price, { unit: isPointPayment ? 'điểm' : 'đ', space: false })}
                </Text>
                {hasDiscount && (
                  <Text style={styles.discount}>
                    {'  '}{formatMoney(data.price, { unit: 'đ', space: false })}
                  </Text>
                )}
                {hasDiscount && (
                  <Text style={styles.discountPercent}>{'  '}-{discountPercent}%</Text>
                )}
              </Text>
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
  card: {
    flexDirection: 'column',
    backgroundColor: brandColors.surface,
    margin: s(5),
    borderRadius: s(radiusScale.xxxl),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    overflow: 'hidden',
    ...brandShadow.soft,
  },
  photoWrap: {
    height: s(104),
    backgroundColor: brandColors.tealLight,
    position: 'relative',
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  wishlistButton: {
    position: 'absolute',
    top: s(8),
    left: s(8),
    width: s(22),
    height: s(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistIcon: {
    height: s(15),
    width: s(15),
  },
  giftDot: {
    position: 'absolute',
    bottom: s(8),
    left: s(8),
    width: s(20),
    height: s(20),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.goldAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addFab: {
    position: 'absolute',
    bottom: s(8),
    right: s(8),
    width: s(30),
    height: s(30),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: brandColors.tealDark,
    shadowOffset: { width: 0, height: s(3) },
    shadowOpacity: 0.28,
    shadowRadius: s(6),
    elevation: 4,
  },
  info: {
    paddingHorizontal: s(10),
    paddingTop: s(9),
    paddingBottom: s(11),
  },
  subtitle: {
    marginTop: s(2),
    fontFamily: Fonts.base,
    fontSize: fs(11),
    lineHeight: fs(14),
    color: brandColors.muted,
    fontWeight: 'normal',
  },
  priceLine: {
    marginTop: s(6),
  },
  discountPercent: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(11),
    color: brandColors.danger,
  },
  productColumnContainer: {
    width: PRODUCT_COLUMN_WIDTH,
    height: PRODUCT_COLUMN_HEIGHT,
    flexDirection: 'column',
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
  productImageColumn: {
    width: IMAGE_COLUMN_WIDTH - 2,
    height: IMAGE_COLUMN_HEIGHT - 2,
    resizeMode: 'contain',
  },
  productName: {
    fontFamily: Fonts.bold,
    fontSize: fs(11.5),
    color: brandColors.textDark,
    lineHeight: fs(16),
    minHeight: fs(32),
    fontWeight: 'normal',
    letterSpacing: -0.1,
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
  price: {
    fontFamily: Fonts.bold,
    fontSize: fs(13),
    fontWeight: 'normal',
    color: brandColors.tealDark,
    letterSpacing: -0.2,
  },
  salePrice: {
    fontFamily: Fonts.bold,
    fontSize: fs(13),
    fontWeight: 'normal',
    color: brandColors.tealDark,
    letterSpacing: -0.2,
  },
  discount: {
    fontFamily: Fonts.base,
    fontSize: fs(11),
    color: brandColors.mutedLight,
    fontWeight: 'normal',
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
