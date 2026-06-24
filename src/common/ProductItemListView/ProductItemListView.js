/* eslint-disable react-native/no-inline-styles */
import React, { useCallback } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Image } from '~/common/index'
import { plus_2, heart, heart_red } from '../../assets/constants'
import placeholder from '~/assets/images/placeholder.png'

import { getListItem as getProductInCart } from '~/store/cart/cartSelectors'

import { NAVIGATION_PRODUCT_DETAIL_SCREEN, NAVIGATION_COMBO_PRODUCT_DETAIL } from '~/navigation/routes'
import { formatMoney } from '~/utils/format'
import Colors from '../Colors/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, requestAddProductWishList, requestRemoveProductWishList, updateCart } from '~/store/actions'
import { getAuthStore } from '~/store/selector'
import strings from '~/i18n'
import { Fonts } from '~/assets/config'
import dimens from '~/constants/dimens'
import { getProductImage } from '~/utils/image'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, liquidGlass } from '~/design-system/tokens'

const ProductItemListView = ({ navigation, data, distributorId, addButton = true, combo = false, goBack, onFavorClick, onAdd, onMessage, onNavigate }) => {
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
  const addProduct = useCallback(
    (qty) => {
      const index = inList(data.product_id, productInCart)
      if (index < 0) {
        dispatch(addToCart(data.product_id, distributorId, qty))
      } else {
        dispatch(updateCart(data.product_id, distributorId, data.qty + qty))
      }
    },
    [data, productInCart],
  )

  const addProd = (qty) => {
    addProduct(qty)
  }

  const inList = (productId, list = []) => {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].product_id === productId && list[i].distributor_id === distributorId) {
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
  const supplierName = data?.distributor?.nick_name || data?.distributor?.name || ''
  const hasDiscount = data.sale_price !== data.price

  return (
    <TouchableOpacity
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
    // style={{
    //   width: '100%',
    // }}
    >
      <View style={styles.productContainer}>
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
        <View style={styles.imageWrap}>
          <Image
            source={getProductImage(data, 'xl', placeholder)}
            resizeMode={'contain'}
            widthImage={s(68)}
            heightImage={s(68)}
            style={styles.productImage}
          />
        </View>
        <View style={styles.infoBlock}>
          <Text
            style={styles.productName}
            numberOfLines={2}
            ellipsizeMode='tail'
          >{data.name}</Text>
          {!!supplierName && (
            <Text
              style={styles.supplier}
              numberOfLines={1}
              ellipsizeMode='tail'
            >{supplierName}</Text>
          )}
          <View style={styles.priceContainer}>
            <Text
              style={styles.price}
              numberOfLines={1}
              ellipsizeMode='tail'
            >{formatMoney(data.sale_price, { unit: 'đ', space: false })}</Text>
            {hasDiscount && (
              <Text
                style={styles.discount}
                numberOfLines={1}
                ellipsizeMode='tail'
              >{formatMoney(data.price, { unit: 'đ', space: false })}</Text>
            )}
          </View>
        </View>
        <View style={styles.actionColumn}>
          {
            addButton && (
              <TouchableOpacity
                onPress={() => addItem()}
                style={styles.buttonAddContainer}
              >
                <Image
                  source={plus_2}
                  style={styles.buttonAdd}
                />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            onPress={() => favorClick()}
            style={styles.favorContainer}
          >
            <Image
              style={styles.favorIcon}
              resizeMode={'contain'}
              source={data.is_wishlist ? heart_red : heart}
              tintColor={Colors.errorColor}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductItemListView

const styles = StyleSheet.create({
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
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: liquidGlass.backgroundStrong,
    marginHorizontal: s(16),
    marginVertical: s(6),
    paddingVertical: s(10),
    paddingHorizontal: s(10),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    borderRadius: s(16),
    width: dimens.common.WINDOW_WIDTH - s(32),
    ...brandShadow.soft,
  },
  imageWrap: {
    width: s(78),
    height: s(78),
    borderRadius: s(12),
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productImage: {
    width: s(68),
    height: s(68),
  },
  infoBlock: {
    flex: 1,
    minHeight: s(78),
    paddingHorizontal: s(10),
    justifyContent: 'space-between',
  },
  actionColumn: {
    width: s(38),
    minHeight: s(78),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonAddContainer: {
    backgroundColor: brandColors.tealPrimary,
    width: s(34),
    height: s(34),
    borderRadius: s(17),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAdd: {
    width: s(15),
    height: s(15),
  },
  productName: {
    fontSize: fs(13),
    color: brandColors.textDark,
    lineHeight: fs(18),
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: fs(15),
    fontWeight: 'normal',
    color: brandColors.goldAccent,
    lineHeight: fs(20),
  },
  favorContainer: {
    width: s(34),
    height: s(34),
    alignItems: 'center',
    justifyContent: 'center',
  },
  favorIcon: {
    height: s(27),
    width: s(27),
  },
  supplier: {
    marginTop: s(3),
    fontFamily: Fonts.base,
    fontSize: fs(11),
    lineHeight: fs(15),
    color: brandColors.muted,
    fontWeight: 'normal',
  },
  discount: {
    marginLeft: s(5),
    fontSize: fs(11),
    color: brandColors.mutedLight,
    fontWeight: 'normal',
    lineHeight: fs(18),
    textDecorationLine: 'line-through',
  },
})
