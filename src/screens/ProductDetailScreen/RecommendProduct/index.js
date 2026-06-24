import React, { useState,useEffect } from 'react'
import { View } from 'react-native'
import { Text } from '~/common/index'
import ProductItem from '~/common/ProductItem/ProductItem'
import { check_info } from '~/assets/constants'
import ErrorView from '~/common/ErrorView/index'
import dimens from '~/constants/dimens'
import { s } from '~/utils/responsive'

import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getListProductsByDistributorId } from '~/store/selector'
import { getProductByCateByDistributorId } from '~/store/actions'

const RecommendProduct = ({ navigation, product, scrollToTop }) => {
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích')
  const [openMessage, setOpenMessage] = useState(false)
  const products = useSelector(state => getListProductsByDistributorId(state, 1))
  const safeProducts = Array.isArray(products) ? products : []
  const dispatch = useDispatch()

  useEffect(() => {
    if (product && product.categories) {
      const cateNeomed = product.categories.find(cate => cate?.supplier?.distributor?.id === 1)
      if (!cateNeomed) {
        return
      }
      setTimeout(() => {
        dispatch(getProductByCateByDistributorId(1, cateNeomed.category_id, 1, 10, false))
      }, 500)
    }
  }, [product])

  useEffect(() => {
    console.log('products', products)
  }, [products])

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

  const productWidth = (dimens.common.WINDOW_WIDTH - s(64)) / 2
  const rows = Array.from({ length: Math.ceil(safeProducts.length / 2) }, (_, index) => safeProducts.slice(index * 2, index * 2 + 2))
  const renderProduct = (item, index) => (
    <View
      key={(item?.product_id ?? item?.id ?? index).toString()}
      style={styles.productCell}
    >
      <ProductItem
        navigation={navigation}
        data={item}
        distributorId={item.distributor_id}
        type={2}
        productWidth={productWidth}
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
  )

  return (
    <View
      style={styles.mainContainer}
    >
      <View>
        <Text
          style={styles.title}
        >
          {'Có thể bạn quan tâm'}
        </Text>
      </View>
      <View style={styles.productGrid}>
        {rows.map((row, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            style={styles.productRow}
          >
            {row.map(renderProduct)}
          </View>
        ))}
      </View>
      <ErrorView
        icon={check_info}
        error={message}
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />
    </View>
  )
}

export default RecommendProduct
