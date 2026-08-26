import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import ProductItem from '~/common/ProductItem/ProductItem'
import { DIMENS } from '~/constants/index'
import { NAVIGATION_PRODUCT_LIST } from '~/navigation/routes'
import { getListProductsHotDeal } from '~/store/selector'
import { s, fs } from '~/utils/responsive'
import PressScale from '~/design-system/PressScale'

const ListProductPromotion = ({ navigation, onFavorClick, onAddProduct, onMessage }) => {
  const listProductsHotDeal = useSelector(state => getListProductsHotDeal(state))
  const safeList = Array.isArray(listProductsHotDeal) ? listProductsHotDeal : []
  if (safeList.length === 0) return null

  const productWidth = Math.round(DIMENS.common.WINDOW_WIDTH * 0.36)
  const snapToInterval = productWidth + 10
  const listHeight = productWidth * 1.65 + 58 + s(14)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerAccent} />
          <Text style={styles.headerTitle}>KHUYẾN MÃI ĐỘC QUYỀN</Text>
        </View>
        <PressScale
          style={styles.seeAllBtn}
          onPress={() => navigation.navigate(NAVIGATION_PRODUCT_LIST, { type: 'promotion', title: 'Sản phẩm khuyến mãi' })}
        >
          <Text style={styles.seeAllText}>Xem tất cả</Text>
        </PressScale>
      </View>
      <FlatList
        data={safeList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: listHeight }}
        contentContainerStyle={{ paddingHorizontal: s(10) }}
        decelerationRate="fast"
        snapToInterval={snapToInterval}
        snapToAlignment="start"
        keyExtractor={(item, idx) => String(item?.product_id ?? item?.id ?? idx)}
        renderItem={({ item }) => (
          <ProductItem
            type={1}
            navigation={navigation}
            data={item}
            onFavorClick={onFavorClick}
            onAdd={onAddProduct}
            distributorId={item?.distributor_id}
            onMessage={onMessage}
            productWidth={productWidth}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: s(20),
    marginHorizontal: s(12),
    marginBottom: s(12),
    paddingTop: s(16),
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: s(16),
    marginBottom: s(12),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAccent: {
    width: s(4),
    height: s(18),
    backgroundColor: '#F59E0B',
    borderRadius: s(2),
    marginRight: s(8),
  },
  headerTitle: {
    fontSize: fs(13),
    fontWeight: '600',
    color: '#1A202C',
    letterSpacing: 0.5,
  },
  seeAllBtn: {
    backgroundColor: '#FFFBEB',
    paddingHorizontal: s(12),
    paddingVertical: s(6),
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  seeAllText: {
    color: '#F59E0B',
    fontSize: fs(12),
    fontWeight: '600',
  },
})

export default ListProductPromotion
