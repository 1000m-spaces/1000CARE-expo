import React, { useState,useEffect } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import { Text } from '~/common/index'
import ProductItemScrollHorizontal from '~/common/ProductItemScrollHorizontal/ProductItemScrollHorizontal'
import { check_info } from '~/assets/constants'
import ErrorView from '~/common/ErrorView/index'

import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getListProducts } from '~/store/selector'
import { getProductByCate } from '~/store/actions'
import { NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'

const SimilarProduct = ({ navigation, product, scrollToTop }) => {
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích')
  const [openMessage, setOpenMessage] = useState(false)
  const products = useSelector(state => getListProducts(state))
  const safeProducts = Array.isArray(products) ? products : []
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('product', product)
    const category = Array.isArray(product?.categories) ? product.categories.find(cate => cate?.supplier?.distributor?.id !== 1) : null
    if (product && category) {
      dispatch(getProductByCate(category?.category_id, 0, 10))
    }
  }, [product])

  const onShowMessage = (msg) => {
    setMessage(msg)
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 2000)
  }

  if (safeProducts.length === 0) {
    return null
  }

  return (
    <View
      style={styles.mainContainer}
    >
      <View>
        <Text
          style={styles.title}
        >
          {'Sản phẩm tương tự'}
        </Text>
        <TouchableOpacity
          style={styles.allContainer}
          onPress={() => {
            navigation.navigate(NAVIGATION_PRODUCT_LIST, {
              categoryId: Array.isArray(product?.categories) && product.categories.length > 0 ? product.categories[0].category_id : undefined,
              type: 'similar',
              title: 'Sản phẩm tương tự',
            })
          }}
        >
          <Text
            style={styles.all}
          >
            {'Tất cả'}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {safeProducts.map((item, index) => (
          <View
            key={(item?.product_id ?? item?.id ?? index).toString()}
            style={index < safeProducts.length - 1 ? styles.productSpacer : null}
          >
            <ProductItemScrollHorizontal
              navigation={navigation}
              data={item}
              distributorId={item.distributor_id}
              type={2}
              onNavigate={scrollToTop}
              onMessage={(msg) => onShowMessage(msg)}
              onFavorClick={(isAdd) => {
                if (isAdd) {
                  setMessage('Đã thêm sản phẩm yêu thích')
                } else {
                  setMessage('Đã xóa sản phẩm yêu thích')
                }
                setOpenMessage(true)
                setTimeout(() => {
                  setOpenMessage(false)
                }, 1000)
              }}
              onAdd={() => {
                console.log('item', item)
                setMessage('Thêm sản phẩm thành công')
                setOpenMessage(true)
                setTimeout(() => {
                  setOpenMessage(false)
                }, 1000)
              }}
            />
          </View>
        ))}
      </ScrollView>
      <ErrorView
        icon={check_info}
        error={message}
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />
    </View>
  )
}

export default SimilarProduct
