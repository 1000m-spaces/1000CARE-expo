import React, { useState, useEffect } from 'react'
import { FlatList, View } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { Text } from '~/common/index'
import ProductItemScrollHorizontal from '~/common/ProductItemScrollHorizontal/ProductItemScrollHorizontal'
import { check_info } from '~/assets/constants'
import ErrorView from '~/common/ErrorView/index'

import styles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getListProductsPropose } from '~/store/selector'
import { requestGetProductPropose } from '~/store/actions'
import { NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'
import Colors from '~/common/Colors/Colors'

const TopProduct = ({ navigation, product, distributorId }) => {
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích')
  const [openMessage, setOpenMessage] = useState(false)
  const products = useSelector(state => getListProductsPropose(state, distributorId))
  const dispatch = useDispatch()

  useEffect(() => {
    if (product) {
      dispatch(requestGetProductPropose(distributorId, product.product_id, 2, 10, 1))
    }
  }, [product])

  const onShowMessage = (msg) => {
    setMessage(msg)
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 2000)
  }

  if (!products || products.length === 0 || !products[0].products || products[0].products.length === 0) {
    return null
  }

  return (
    <View
      style={styles.mainContainer}
    >
      <View style={styles.titleContainer}>
        <Text
          style={styles.title}
        >
          {'Sản phẩm nên mua'}
        </Text>
        <PressScale
          style={styles.allContainer}
          onPress={() => {
            navigation.navigate(NAVIGATION_PRODUCT_LIST, {
              distributorId,
              type: 'propose',
              title: 'Tốp sản phẩm',
            })
          }}
        >
          <Text
            style={styles.all}
          >
            {'Xem tất cả'}
          </Text>
        </PressScale>
      </View>
      
      <FlatList
        data={products[0].products}
        horizontal={true}
        style={{ backgroundColor: Colors.backgroundColor }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <ProductItemScrollHorizontal
              navigation={navigation}
              data={item}
              distributorId={item.distributor_id}
              type={0}
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
          )
        }}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return (
            <View style={{ width: 6 }} />
          )
        }}
      />
      <ErrorView
        icon={check_info}
        error={message}
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />
    </View>
  )
}

export default TopProduct