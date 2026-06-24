/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, View, TouchableOpacity, ScrollView, Image as ImageConver } from 'react-native'
import HTML from 'react-native-render-html'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '~/common/Header/index'
import { back, plus_2 } from '~/assets/constants'
import styles from './styles'
import { Button, CheckBox, Image, SVG, Text } from '~/common/index'
import Colors from '~/common/Colors/Colors'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import AmountInput from '../ProductDetailScreen/AmountInput/index'
import strings from '~/i18n'
import { getAddItemStatus, getCartError, getCampaignDetail } from '~/store/selector'
import Status from '~/common/Status/Status'
import { addMultiProductToCart, requestGetCampaignById } from '~/store/actions'
import DialogInfo from '~/common/DialogInfo/index'
import { check_info } from '~/assets/constants'
import { NAVIGATION_PRODUCT_DETAIL_SCREEN } from '~/navigation/routes'
import { getListItem as getProductInCart } from '~/store/cart/cartSelectors'
import { addToCart, updateCart } from '~/store/actions'
import placeholder from '~/assets/images/placeholder.png'

const PromotionTypes = {
  1: 'combo_meta',
  3: 'range_prices',
  4: 'discount_order_meta', // Chiết khấu x% khi đơn hàng trên y đồng
  5: 'gift_order_meta', // Tặng quà A khi đơn hàng trên y đồng
  6: 'accumulation_order_meta', // Tích lũy % khi đơn hàng trên y đồng
  7: 'discount_buying_products_meta', // Mua m/n sản phẩm, chiết khấu x% (đơn hàng trên y đồng)
  8: 'gift_buying_products_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  9: 'combo_advance_meta', // Mua m/n sản phẩm, Tặng quà A (đơn hàng trên y đồng)
  10: 'gift_buying_products_meta',
}

const ProductItemCampaign = ({ product, onClick, chooseAble, onCheck, addItem, distributorId, campaignType }) => {
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

  const inList = (productId, list = []) => {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].product_id === productId && list[i].distributor_id === distributorId) {
        return i
      }
    }
    return -1
  }
  const addProduct = useCallback(
    (qty) => {
      const index = inList(product.product_id, productInCart)
      if (index < 0) {
        dispatch(addToCart(product.product_id, distributorId, qty))
      } else {
        dispatch(updateCart(product.product_id, distributorId, product.qty + qty))
      }
    },
    [product, productInCart],
  )

  const addProd = () => {
    addProduct(1)
    if (addItem) {
      addItem()
    }

  }
  return (
    <TouchableOpacity
      onPress={onClick}
      style={styles.productContainer}
    >
      <Image
        style={styles.productImage}
        source={getProductImage(product, 'lg', placeholder)}
      />
      <View
        style={styles.productInfo}
      >
        <Text
          style={styles.productName}
          numberOfLines={2}
          ellipsizeMode='tail'
        >
          {product.name}
        </Text>
        <View
          style={styles.priceContainer}
        >
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={styles.priceTitle}>{'Giá:'}</Text>
            <Text style={styles.price}>{formatMoney(product.price, { unit: 'đ' })}</Text>
          </View>
          {campaignType === 8 || campaignType === 10 && <View>
            <TouchableOpacity
              onPress={addProd}
              style={styles.buttonAddContainer}
            >
              <Image
                source={plus_2}
                style={styles.buttonAdd}
              />
            </TouchableOpacity>
          </View>}

        </View>
      </View>
      {
        chooseAble && (
          <CheckBox
            onPress={onCheck}
            titleStyle={{}}
            checked={product?.checked}
          />
        )
      }
    </TouchableOpacity>
  )
}

const PromotionDetail = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const addItemStatus = useSelector((state) => getAddItemStatus(state))
  const detailCampaign = useSelector(state => getCampaignDetail(state))

  const [quantity, setQuantity] = useState(1)
  const [openDialog, setOpenDialog] = useState(false)
  const [isErrorDialog, setIsErrorDialog] = useState(false)
  const [onFocus, setOnFocus] = useState(true)
  const [message, setMessage] = useState('Thêm sản phẩm thành công')
  const [expand, setExpand] = useState(false)

  const [promotion, setPromotion] = useState(route?.params?.promotion ? route?.params?.promotion : null)
  // const promotion = route?.params?.promotion ? route?.params?.promotion : []
  // const distributorId = route?.params?.distributorId
  const [distributorId, setDistributorId] = useState(route?.params?.distributorId ? route?.params?.distributorId : '')
  const id_campaign = route?.params?.id_campaign
  const [products, setProducts] = useState([{ ...route?.params?.product, price: route?.params?.product?.sale_price, checked: true }])
  const cartError = useSelector((state) => getCartError(state))
  const [data, setData] = useState(promotion ? promotion[PromotionTypes[promotion?.campaign_type]] : null)
  const [applyAllProducts, setApplyAllProducts] = useState(true)

  if (id_campaign) {
    useEffect(() => {
      dispatch(requestGetCampaignById(id_campaign))
    }, [id_campaign])

    useEffect(() => {
      if (!detailCampaign) {
        return
      }
      // console.log('DETAIL PROMOTION SCREEN--------detailed campaign:::', detailCampaign)
      setProducts([])
      setPromotion(detailCampaign)
      setDistributorId(detailCampaign.distributor_id)
      const promotionData = detailCampaign[PromotionTypes[detailCampaign?.campaign_type]]
      setData(promotionData)
      if (promotionData?.items && promotionData?.items[0]?.applied_products) {
        setApplyAllProducts(false)
        setProducts(promotionData.items[0]?.applied_products?.map((p) => {
          return {
            ...p.product,
            checked: true,
          }
        }))
      } else if (promotionData?.products) {
        setApplyAllProducts(false)
        setProducts(promotionData?.products?.map((p) => {
          return {
            ...p,
            checked: true,
          }
        }))
      } else if (promotionData?.applied_products) {
        setApplyAllProducts(false)
        setProducts(promotionData?.applied_products?.map((p) => {
          return {
            ...p,
            checked: true,
          }
        }))

      }
    }, [detailCampaign])
  }
  const isValid = useCallback(() => {
    if (promotion?.campaign_type < 7) {
      return true
    }
    const minAppliedQty = data?.items[0]?.min_applied_qty || 0
    return minAppliedQty <= products.filter(p => p.checked).length
  }, [products])

  useEffect(() => {
    if (data?.items && data?.items[0]?.applied_products) {
      setApplyAllProducts(false)
      setProducts(data?.items[0]?.applied_products?.map((p) => {
        return {
          ...p.product,
          checked: true,
        }
      }))
    } else if (data?.products) {
      setApplyAllProducts(false)
      setProducts(data?.products?.map((p) => {
        return {
          ...p,
          checked: true,
        }
      }))
    }
  }, [])

  const addProd = (qty) => {
    setQuantity(quantity + qty)
  }

  const subProd = (qty) => {
    setQuantity(quantity - qty < 0 ? 0 : quantity - qty)
  }

  useEffect(() => {
    if (!onFocus) {
      return
    }
    if (addItemStatus === Status.SUCCESS) {
      setMessage('Thêm sản phẩm thành công')
      setIsErrorDialog(true)
      setTimeout(() => {
        setOpenDialog(false)
      }, 1000)
    } else if (addItemStatus === Status.ERROR) {
      setMessage(cartError)
      setIsErrorDialog(true)
      setTimeout(() => {
        setOpenDialog(false)
      }, 1000)
    } else if (addItemStatus === Status.LOADING) {
      setMessage('')
      setIsErrorDialog(false)
      setOpenDialog(true)
    }
  }, [addItemStatus])

  const addProductToCart = () => {
    if (quantity <= 0) {
      return
    }
    dispatch(addMultiProductToCart(products.filter(p => p.checked).map(p => {
      return {
        product_id: p.product_id,
        qty: data?.items && data?.items[0]?.applied_products
          && data?.items[0]?.applied_products[0]?.quantity ? data?.items[0]?.applied_products[0]?.quantity : quantity,
      }
    }), distributorId))
  }

  const onCheck = (index) => {
    setProducts(products.map((product, idx) => {
      if (idx === index) {
        return {
          ...product,
          checked: !product.checked,
        }
      }
      return product
    }))
  }
  const handleAddProduct = () => {
    setMessage('Thêm sản phẩm thành công')
    setOpenDialog(true)
    setTimeout(() => {
      setOpenDialog(false)
    }, 1000)
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Header
        title={'Chi tiết khuyến mãi'}
        leftAction={() => navigation.pop()}
        iconLeft={back}
        cart={true}
        navigation={navigation}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <ScrollView>
          <View
            style={styles.promotionInfoContainer}
          >
            <ImageConver
              style={styles.coverImage}
              source={{
                uri: promotion?.images ? promotion?.images : placeholder,
              }}
            />
            <Text
              color={Colors.textColor2}
              style={styles.promotionName}
            >
              {promotion?.name}
            </Text>
            <Text
              color={Colors.textColor3}
              style={styles.promotionEndDate}
            >
              {`Hết hạn ${promotion?.end_date}`}
            </Text>
            {
              promotion?.short_description?.length > 0 &&
              <HTML
                tagsStyles={{ p: { color: 'black', lineHeight: 18 } }}
                source={{ html: promotion?.short_description }}
              />
            }
          </View>
          <View
            style={styles.sectionContainer}
          >
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.title}>Sản phẩm áp dụng</Text>
              <TouchableOpacity
                onPress={() => setExpand(!expand)}
              >
                <SVG
                  width={24}
                  height={24}
                  name={expand ? 'chevron_up_outlined' : 'chevron_down_outlined'}
                  style={styles.chevronIcon}
                />
              </TouchableOpacity>
            </View>

            {products?.length > 0 && !applyAllProducts ? (
              products.map((product, idx) => {
                return expand && (
                  <ProductItemCampaign
                    key={idx}
                    campaignType={promotion?.campaign_type}
                    addItem={() => handleAddProduct()}
                    chooseAble={promotion?.campaign_type === 7 || promotion?.campaign_type === 8}
                    onCheck={
                      promotion?.campaign_type !== 7 && promotion?.campaign_type !== 8
                        ? null : () => {
                          onCheck(idx)
                        }}
                    onClick={() => {
                      setOnFocus(false)
                      navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, { product, distributorId, goBack: () => setOnFocus(true) })
                    }}
                    product={product}
                    distributorId={promotion?.distributor_id}
                  />
                )
              }))
              : <Text style={{ color: 'black', fontSize: 14 }}>Tất cả các sản phẩm</Text>
            }
          </View>
          {
            <View
              style={styles.sectionContainer}
            >
              <Text style={styles.title}>Chính sách</Text>
              {promotion?.description ?
                <HTML
                  tagsStyles={{ p: { color: 'black', lineHeight: 18 } }}
                  source={{ html: promotion?.description }}
                />
                : undefined
              }
            </View>
          }

        </ScrollView>
      </KeyboardAwareScrollView>
      <View
        style={styles.bottomContainer}
      >
        {
          promotion?.campaign_type !== 7 && promotion?.campaign_type !== 8 && promotion?.campaign_type !== 9 && products?.length > 0 ? (
            <>
              <AmountInput
                value={quantity.toString()}
                keyboardType='numeric'
                onChangeText={(text) => {
                  if (!isNaN(text)) {
                    setQuantity(Number(text) || 1)
                  }
                }}
                onEndEditing={() => {
                  const qty = Number(quantity)
                  setQuantity(qty)
                }}
                onMinus={() => subProd(1)}
                onPlus={() => addProd(1)}
              />
              <Button
                styleView={[styles.btnAddContainer]}
                styleButton={[styles.btnAdd]}
                styleText={{
                  fontSize: 14,
                  fontWeight: '600',
                }}
                onPressEvent={() => addProductToCart()}
                text={strings.productDetailScreen.addToCart}
              />
            </>
          ) : products?.length > 0 ? (
            <Button
              text={'Thêm giỏ hàng'}
              styleButton={[styles.styleButton, isValid() ? {} : {
                backgroundColor: '#C8C8C8',
              }]}
              styleView={styles.styleView}
              onPressEvent={() => {
                if (isValid()) {
                  addProductToCart()
                }
              }}
            />
          ) : undefined
        }
      </View>
      {/* </KeyboardAwareScrollView> */}
      <DialogInfo
        isOpen={openDialog}
        isError={isErrorDialog}
        isOrder={false}
        isLoading={true}
        message={message}
        icon={check_info}
        closeModal={() => setOpenDialog(false)}
      />
    </SafeAreaView>
  )
}

export default PromotionDetail