import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '~/assets/constants'
import { updateCart } from '~/store/actions'
import { formatMoney, getProductImage } from '~/utils/index'
import { CheckBox, Image, Text } from '~/common/index'

import styles from './styles'
import AmountInput from './AmountInput'
import Colors from '~/common/Colors/Colors'
import PromotionTag from '~/common/PromotionTag/index'
import { gift_fill } from '~/assets/constants'
import Status from '~/common/Status/Status'
import { getUpdateCartStatus } from '~/store/selector'
import { check_info } from '~/assets/constants'
import ErrorView from '~/common/ErrorView/index'
import { Fonts } from '~/assets/config'
import placeholder from '~/assets/images/placeholder.png'

const ProductItem = ({ product, distributorId, productInCart, setOpenDialogWaiting, onDeleteProduct, isSelected, setSelection }) => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(product.qty)
  const [hideOriginPrice, setHideOriginPrice] = useState(false)
  const [message, setMessage] = useState('')
  const [openMessage, setOpenMessage] = useState(false)

  const updateCartStatus = useSelector((state) => getUpdateCartStatus(state))

  const addProduct = useCallback(
    (qty) => {
      dispatch(updateCart(product.product_id, distributorId, product.qty + qty))
    },
    [productInCart],
  )
  const subProduct = useCallback(
    (qty) => {
      dispatch(updateCart(product.product_id, distributorId, product.qty - qty))
    },
    [productInCart],
  )

  const addProd = (qty) => {
    addProduct(qty)
  }

  const subProd = (qty) => {
    subProduct(qty)
  }

  const removeProd = () => {
    if (onDeleteProduct) {
      onDeleteProduct({
        ...product,
        distributorId,
      })
    } else {
      const qty = product.qty
      subProduct(qty)
    }
  }

  useEffect(() => {
    setQuantity(product.qty)
  }, [product])

  useEffect(() => {
    if (updateCartStatus === Status.LOADING) {
      setOpenDialogWaiting(true)
    }
  }, [updateCartStatus])

  useEffect(() => {
    if (product.range_prices)
      for (const value of product.range_prices) {
        if (value.sale_price === product.price) {
          return setHideOriginPrice(true)
        } else {
          setHideOriginPrice(false)
        }
      }
  }, [product])

  return (
    <TouchableOpacity
      style={styles.productContainer}
    >
      <CheckBox
        checked={isSelected}
        onPress={setSelection}
        containerStyle={{
          height: 24,
          alignSelf: 'center',
        }}
        size={24}
      />
      <View
        style={styles.logoContainer}
      >
        <Image
          resizeMode="cover"
          style={styles.logo}
          source={getProductImage(product, 'lg', placeholder)}
        />
      </View>

      <View
        style={styles.productInfoContainer}
      >
        <Text
          ellipsizeMode='tail'
          style={styles.productName}
        >
          {`${product.product_name}`}
        </Text>
        <View
          style={styles.infoContainer}
        >
          <Text
            style={styles.priceLabel}
            color={Colors.textColor2}
          >
            Giá:
          </Text>
          <View>
            {
              product.payment_type !== 2 && (
                <Text
                  style={styles.price}
                >
                  {formatMoney(product.price, { unit: 'đ' })}
                  {
                    product.price !== product.origin_price && (
                      <Text style={styles.originPrice}>{formatMoney(product.origin_price, { unit: 'đ', space: false })}</Text>
                    )
                  }
                </Text>
              )
            }
            {
              product.payment_type === 2 && (
                <Text style={styles.salePrice}>
                  {formatMoney(product.price, { unit: 'điểm' })}
                </Text>
              )
            }
          </View>
          {
            product.is_promotion && (
              <Image
                style={styles.promotionLabel}
                source={gift_fill}
                tintColor={Colors.systemColor2}
              />
            )
          }
        </View>

        {
          !product.is_promotion && product.range_prices && product.range_prices.length > 0 && (
            <FlatList
              style={{ flex: 1, marginTop: 6 }}
              data={product.range_prices || []}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <PromotionTag
                    text={`${item.min_quantity}sp/-${item.discount}%`}
                  />
                )
              }}
              keyExtractor={(_, index) => index.toString()}
              ItemSeparatorComponent={() => {
                return (
                  <View style={{ width: 6 }} />
                )
              }}
            />
          )
        }
        {
          !product.is_promotion ? (
            <View
              style={styles.priceContainer}
            >
              <AmountInput
                value={quantity?.toString()}
                keyboardType='numeric'
                onChangeText={(text) => {
                  if (product.product_status === 0)
                    return
                  if (!isNaN(text)) {
                    if (Number(text) <= 10000000) {
                      setQuantity(Number(text))
                    } else {
                      setQuantity(10000000)
                      setMessage(`Không được quá ${formatMoney(10000000, { unit: '' })} sản phẩm`)
                      setOpenMessage(true)
                    }
                  }
                }}
                onEndEditing={() => {
                  if (product.product_status === 0)
                    return
                  const qty = Number(quantity)
                  if (qty > 0) {
                    if (qty - product.qty > 0) {
                      addProd(qty - product.qty)
                    } else if (qty - product.qty < 0) {
                      subProd(product.qty - qty)
                    }
                  } else {
                    setQuantity(product.qty)
                  }
                }}
                onMinus={() => {
                  if (product.product_status === 0)
                    return
                  subProd(1)
                }}
                onPlus={() => {
                  if (product.product_status === 0)
                    return
                  if (Number(quantity) < 10000000) {
                    addProd(1)
                  } else {
                    setQuantity(10000000)
                    setMessage(`Không được quá ${formatMoney(10000000, { unit: '' })} sản phẩm`)
                    setOpenMessage(true)
                  }
                }}
              />
            </View>
          ) : (
            <View
              style={styles.infoContainer}
            >
              <Text
                style={styles.priceLabel}
                color={Colors.textColor2}
              >
                Số lượng:
              </Text>
              <Text
                style={styles.priceLabel}
                color={Colors.textColor2}
              >
                {product.qty}
              </Text>
            </View>
          )
        }

        <View
          style={styles.paymentPriceContainer}
        >
          <Text
            style={styles.priceLabel}
            color={Colors.textColor2}
          >
            Thành tiền:
          </Text>
          {
            product.payment_type !== 2 && (
              <Text
                numberOfLines={2}
                style={styles.price}
              >
                {formatMoney(product.qty * product.price)}
              </Text>
            )
          }
          {
            product.payment_type === 2 && (
              <Text style={styles.salePrice}>
                {formatMoney(product.qty * product.price, { unit: 'điểm' })}
                {
                  hideOriginPrice && (
                    <Text style={styles.originPrice}>{formatMoney(product.qty * product.origin_price, { unit: 'điểm' })}</Text>
                  )
                }
              </Text>
            )
          }
        </View>
      </View>
      {
        product.product_status === 0 && (
          <View style={styles.overlay} >
            <Text
              style={{
                color: Colors.white,
                fontWeight: '600',
                fontSize: 28,
                lineHeight: 34,
                fontFamily: Fonts.bold,
              }}
            >HẾT HÀNG</Text>
          </View>
        )
      }
      {
        !product?.is_promotion && (
          <TouchableOpacity
            style={styles.btnCloseContainer}
            onPress={() => removeProd()}
          >
            <Image
              resizeMode="contain"
              style={styles.btnClose}
              source={close}
            />
          </TouchableOpacity>
        )
      }
      <ErrorView
        error={message}
        icon={check_info}
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />
    </TouchableOpacity>
  )
}

export default ProductItem
