import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, View, ScrollView } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import styles from './styles'
import { Button, CheckBox, Image, Text } from '~/common/index'
import { formatMoney } from '~/utils/format'
import { getProductImage } from '~/utils/image'
import { getAddProductPromotionToCartStatus, getCartError } from '~/store/selector'
import Status from '~/common/Status/Status'
import { addProdPromotionToCart, resetAddPorductPromotionStatus } from '~/store/actions'
import DialogInfo from '~/common/DialogInfo/index'
import ErrorView from '~/common/ErrorView/index'
import { check_info } from '~/assets/constants'
import { NAVIGATION_PRODUCT_DETAIL_SCREEN } from '~/navigation/routes'
import placeholder from '~/assets/images/placeholder.png'

const ProductItem = ({ product, onClick, onCheck }) => {
  return (
    <PressScale
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
          <Text style={styles.priceTitle}>{'Giá:'}</Text>
          <Text style={styles.price}>{formatMoney(product.price, { unit: 'đ' })}</Text>
        </View>
        <View
          style={styles.priceContainer}
        >
          <Text style={styles.priceTitle}>{'Số lượng:'}</Text>
          <Text style={styles.quantity}>{product.quantity}</Text>
        </View>
      </View>
      {
        onCheck && (
          <CheckBox
            onPress={onCheck}
            checked={product?.checked}
          />
        )
      }
    </PressScale>
  )
}

const ChooseGiftPromotion = ({ navigation, route }) => {
  const data = route?.params?.promotion
  const distributorId = route?.params?.distributorId
  const paymentType = route?.params?.paymentType
  const dispatch = useDispatch()

  const addItemStatus = useSelector((state) => getAddProductPromotionToCartStatus(state))
  const cartError = useSelector((state) => getCartError(state))

  const [openDialog, setOpenDialog] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('Chọn sản phẩm thành công')
  const [onFocus, setOnFocus] = useState(true)

  useEffect(() => {
    const gifts = data?.gifts || []
    if (gifts.length > 0) {
      setProducts(gifts.map((p) => {
        return {
          ...p.product,
          quantity: p.quantity,
          checked: false,
        }
      }))
    }
  }, [data])

  useEffect(() => {
    if (!onFocus) {
      return
    }
    if (addItemStatus === Status.SUCCESS) {
      setMessage('Chọn sản phẩm thành công')
      dispatch(resetAddPorductPromotionStatus())
      setOpenDialog(false)
      setOpenMessage(true)
      setTimeout(() => {
        setOpenMessage(false)
        navigation.pop()
      }, 500)
    } else if (addItemStatus === Status.ERROR) {
      setMessage(cartError)
      dispatch(resetAddPorductPromotionStatus())
      setOpenDialog(false)
      setOpenMessage(true)
      setTimeout(() => {
        setOpenMessage(false)
      }, 1500)
    }
  }, [addItemStatus])

  const addProductToCart = () => {
    setOpenDialog(true)
    dispatch(addProdPromotionToCart(
      {
        promo_products: [{
          campaign_id: data?.campaign_id,
          product_ids: products.filter(p => p.checked).map(p => p.product_id),
        }],
        distributor_id: distributorId,
        payment_type: paymentType,
      }))
  }

  const isValid = useCallback(() => {
    return (data?.gift_selection_limit || 0) === products.filter(p => p.checked).length
  }, [products, data])

  const onCheck = (index, value) => {
    if (value && products.filter(p => p.checked).length >= (data?.gift_selection_limit || 0)) {
      setMessage(`Bạn chỉ được chọn ${data?.gift_selection_limit || 0} sản phẩm tặng`)
      setOpenMessage(true)
      return
    }

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

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Header
        title={'Chọn sản phẩm khuyến mãi'}
        leftAction={() => navigation.pop()}
        iconLeft={back}
        cart={false}
        navigation={navigation}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <ScrollView>
          <View
            style={styles.sectionContainer}
          >
            <Text style={styles.title}>Danh sách sản phẩm</Text>
            {
              products.map((product, idx) => {
                return (
                  <ProductItem
                    key={idx}
                    onCheck={() => {
                      onCheck(idx, !product.checked)
                    }}
                    onClick={() => {
                      navigation.navigate(NAVIGATION_PRODUCT_DETAIL_SCREEN, { product, distributorId, goBack: () => setOnFocus(true) })
                    }}
                    product={product}
                  />
                )
              })
            }
          </View>
        </ScrollView>
        <View
          style={styles.bottomContainer}
        >
          <Button
            text={'Chọn sản phẩm'}
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
        </View>
      </KeyboardAwareScrollView>
      <ErrorView
        isOpen={openMessage}
        error={message}
        icon={check_info}
        onClose={() => setOpenMessage(false)}
      />
      <DialogInfo
        isOpen={openDialog}
        isError={false}
        isOrder={false}
        isLoading={true}
        message={''}
        closeModal={() => setOpenDialog(false)}
      />
    </SafeAreaView>
  )
}

export default ChooseGiftPromotion