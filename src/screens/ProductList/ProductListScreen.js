import React, { useEffect, useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { useDispatch, useSelector } from 'react-redux'
import { Image } from '~/common/index'
import CartHeaderButton from '~/common/CartHeaderButton/CartHeaderButton'
import ProductItem from '~/common/ProductItem/ProductItem'
import { getListProducts, getListProductsBestSeller, getListProductsHotDeal, getListProductsOfTrademark, getListProductPriceSock, getListProductsPropose, getListProductsBySupplier } from '~/store/selector'
import { getProductByCate, getProductsByDistributor, requestGetProductBestSeller, requestGetProductsByTrademarkId, requestGetProductsHotDeal, requestGetProductPriceSock, requestGetProductPropose, getProductsBySupplier } from '~/store/actions'
import Colors from '~/common/Colors/Colors'
import { back } from '~/assets/constants'
import { LoadingView } from '~/common'
import EmptyItem from '~/common/EmptyItem/index'
import ErrorView from '~/common/ErrorView/index'
import { check_info } from '~/assets/constants'
import { Text } from '~/common/index'
import { Icon } from '~/common'
import { Fonts } from '~/assets/config'
import ProductItemListView from '~/common/ProductItemListView/ProductItemListView'
import SearchBar from './SearchBar'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, liquidGlass } from '~/design-system/tokens'
import AppBackground from '~/design-system/AppBackground'

const ListViewListProduct = ({ navigation, products, loadMore, onShowMessage, setMessage, setOpenMessage }) => {
  const keyExtractorProduct = useCallback((_, idx) => {
    return idx.toString()
  })
  return (
    <FlatList
      numColumns={1}
      contentContainerStyle={styles.listRowsContainer}
      data={Array.isArray(products) ? products : []}
      keyExtractor={keyExtractorProduct}
      onEndReachedThreshold={0.1}
      onEndReached={() => loadMore()}
      ListEmptyComponent={() => {
        return (
          <EmptyItem
            text='Không có sản phẩm nào'
          />
        )
      }}
      renderItem={({ item }) => {
        return (
          <ProductItemListView
            navigation={navigation}
            data={item}
            distributorId={item.distributor_id}
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
    />
  )
}

const GridViewListProduct = ({ navigation, products, loadMore, onShowMessage, setMessage, setOpenMessage }) => {
  const keyExtractorProduct = useCallback((_, idx) => {
    return idx.toString()
  })
  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={styles.listProductsContainer}
      data={Array.isArray(products) ? products : []}
      keyExtractor={keyExtractorProduct}
      onEndReachedThreshold={0.1}
      onEndReached={() => loadMore()}
      ListEmptyComponent={() => {
        return (
          <EmptyItem
            text='Không có sản phẩm nào'
          />
        )
      }}
      renderItem={({ item }) => {
        return (
          <ProductItem
            navigation={navigation}
            data={item}
            distributorId={item.distributor_id}
            type={2}
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
    />
  )
}

const ProductListScreen = ({ navigation, route }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const { title, distributorId, categoryId, trademarkId, type = 'product', productId, distributor } = route.params

  const [isLoading, setLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const [viewMode, setViewMode] = useState('list')
  const [query, setQuery] = useState({
    supplierSelected: null, 
    cateSelected: null,
    distributorSelected: null,
  })
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích')

  const dispatch = useDispatch()
  const listProduct = useSelector(state => getListProducts(state))
  const listProductsOfTrademark = useSelector(state => getListProductsOfTrademark(state))
  const listProductsHotDeal = useSelector(state => getListProductsHotDeal(state))
  const listProductsBestSeller = useSelector(state => getListProductsBestSeller(state))
  const listProductPriceSock = useSelector(state => getListProductPriceSock(state))
  const listProductsBySupplier = useSelector(state => getListProductsBySupplier(state))
  const listProductsProposeRaw = useSelector(state => getListProductsPropose(state, distributorId))
  const safeListProduct = Array.isArray(listProduct) ? listProduct : []
  const safeListProductsOfTrademark = Array.isArray(listProductsOfTrademark) ? listProductsOfTrademark : []
  const safeListProductsHotDeal = Array.isArray(listProductsHotDeal) ? listProductsHotDeal : []
  const safeListProductsBestSeller = Array.isArray(listProductsBestSeller) ? listProductsBestSeller : []
  const safeListProductPriceSock = Array.isArray(listProductPriceSock) ? listProductPriceSock : []
  const safeListProductsBySupplier = Array.isArray(listProductsBySupplier) ? listProductsBySupplier : []
  const safeListProductsProposeRaw = Array.isArray(listProductsProposeRaw) ? listProductsProposeRaw : []
  const [listProductsPropose, setListProductsPropose] = useState([])
  const [currentTab, setCurrentTab] = useState(null)
  useEffect(() => {
    setLoading(true)
    setCurrentPage(1)
    requestData(1, 11, false)
  }, [title, distributorId, categoryId])
  useEffect(() => {
    setCurrentTab({ id: 1, name: 'Siêu rẻ' })
    dispatch(requestGetProductPropose(distributorId, null, 2, 11,1))
  }, [])
  useEffect(() => {
    if (!safeListProductsProposeRaw || safeListProductsProposeRaw.length === 0) {
      setListProductsPropose([])
      return
    }
    const listProductPropose = []
    safeListProductsProposeRaw.forEach(propose => {
      if (Array.isArray(propose?.products) && propose.products.length > 0) {
        listProductPropose.push(...propose.products)
      }
    })
    setListProductsPropose(listProductPropose)
  }, [listProductsProposeRaw])

  useEffect(() => {
    setLoading(true)
    setCurrentPage(1)
    requestData(1, 11, false)
  }, [query])

  const getData = useCallback(() => {
    if (type === 'product' || type === 'similar' || type === 'product_by_distributor') {
      if (currentTab && currentTab?.id === 3) {
        if (query?.supplierSelected) {
          return safeListProductsBySupplier
        } else {
          return safeListProduct
        }
      }
      if (currentTab && currentTab?.id === 1) {
        return Array.isArray(listProductsPropose) ? listProductsPropose : []
      }
      if (currentTab && currentTab?.id === 2) {
        return safeListProductsHotDeal
      }
    } else if (type === 'trademark') {
      return safeListProductsOfTrademark
    } else if (type === 'promotion' || currentTab?.id === 2) {
      return safeListProductsHotDeal
    } else if (type === 'best_seller') {
      return safeListProductsBestSeller
    } else if (type === 'priceSock') {
      return safeListProductPriceSock
    } else if (type === 'propose') {
      return Array.isArray(listProductsPropose) ? listProductsPropose : []
    }
  }, [safeListProduct, safeListProductsOfTrademark, safeListProductsHotDeal, currentTab, safeListProductsBestSeller, safeListProductPriceSock, listProductsPropose, safeListProductsBySupplier, query])

  const requestData = (page, size, loadMore) => {
    if (type === 'product' || type === 'similar' || type === 'product_by_distributor') {
      if ((categoryId || type === 'similar' || query.cateSelected) && currentTab && currentTab?.id === 3) {
        if (query.cateSelected) { 
          dispatch(getProductByCate(query.cateSelected.category_id, page, size, loadMore))
        } else if (categoryId) {
          dispatch(getProductByCate(categoryId, page, size, loadMore))
        }
      } else if (query.supplierSelected && currentTab && currentTab?.id === 3) {
        dispatch(getProductsBySupplier(query.supplierSelected.id, page, size, loadMore))
      } else if (currentTab && currentTab?.id === 2) { // hot deal
        dispatch(requestGetProductsHotDeal(distributorId, page, size, loadMore))
      } else if (currentTab && currentTab?.id === 1) {
        dispatch(requestGetProductPropose(distributorId, productId, 2, size,page,loadMore))
      } else {
        dispatch(getProductsByDistributor(distributorId, page, size, loadMore))
      }
      
    } else if (type === 'trademark') {
      dispatch(requestGetProductsByTrademarkId(trademarkId, page, size, loadMore))
    } else if (type === 'promotion') {
      dispatch(requestGetProductsHotDeal(distributorId, page, size, loadMore))
    } else if (type === 'best_seller') {
      dispatch(requestGetProductBestSeller(distributorId, page, size, loadMore))
    } else if (type === 'priceSock') {
      if (query.distributorSelected) { 
        dispatch(requestGetProductPriceSock(query.distributorSelected?.id, size,page,loadMore))
      } else {
        dispatch(requestGetProductPriceSock(null, size,page,loadMore))
      }
    }else if (type === 'propose') {
      dispatch(requestGetProductPropose(distributorId, productId, 2, size,page,loadMore))
    }
  }

  const loadMore = () => {
    const data = getData() || []
    if (data.length >= currentPage * 11 && !isLoading) {
      setLoading(true)
      setCurrentPage(currentPage + 1)
      requestData(currentPage + 1, 11, true)
    }
  }

  useEffect(() => {
    setLoading(false)
  }, [listProduct, listProductsOfTrademark, listProductsHotDeal, listProductsBestSeller, listProductPriceSock, listProductsProposeRaw, listProductsBySupplier, query])

  const onShowMessage = (msg) => {
    setMessage(msg)
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 2000)
  }
  const handleGetProduct = (type) => {
    if (!type) {
      return
    }
    setCurrentTab(type)

    if (type && type?.id <= 2) {
      setQuery({
        supplierSelected: null, 
        cateSelected: [],
      })
    }
  }

  const clearPriceSockFilter = () => {
    setCurrentPage(1)
    setQuery({
      supplierSelected: null,
      cateSelected: null,
      distributorSelected: null,
    })
  }

  const activeDistributorName = query?.distributorSelected?.nick_name || query?.distributorSelected?.name

  return (
    <AppBackground>
      <View style={styles.minimalHeader}>
        <PressScale style={styles.minimalBackBtn} onPress={() => navigation.pop()}>
          <Image resizeMode={'contain'} style={styles.minimalBackIcon} source={back} />
        </PressScale>
        <CartHeaderButton navigation={navigation} />
      </View>
      {
        (type === 'product_by_distributor' || type === 'priceSock') && (
          <View style={styles.filterPanel}>
            <SearchBar
              navigation={navigation}
              type={type}
              viewMode={viewMode}
              setViewMode={setViewMode}
              onLoad={(supplierSelected, cateSelected, distributorSelected) => {
                setQuery({
                  supplierSelected, cateSelected, distributorSelected,
                })
              }}
              distributorId={distributorId}
              onTabChange={handleGetProduct}
              query={query}
              mode={type === 'priceSock' ? 'distributor' : 'supplier'}
            />
          </View>
        )
      }
      {type === 'priceSock' && activeDistributorName && (
        <View style={styles.activeFilterRow}>
          <View style={styles.activeFilterPill}>
            <Icon type="feather" name="filter" color={brandColors.tealPrimary} size={15} />
            <Text style={styles.activeFilterText} numberOfLines={1}>
              {`Đang lọc: ${activeDistributorName}`}
            </Text>
            <PressScale
              onPress={clearPriceSockFilter}
              style={styles.clearFilterButton}
            >
              <Icon type="feather" name="x" color={brandColors.surface} size={14} />
            </PressScale>
          </View>
        </View>
      )}
      <View
        style={styles.wrap}
      >
        {(viewMode === 'grid' || (type !== 'priceSock' && type !== 'product_by_distributor')) ? (
          <GridViewListProduct 
            navigation={navigation}
            products={getData()}
            loadMore={loadMore}
            onShowMessage={onShowMessage}
            setMessage={setMessage}
            setOpenMessage={setOpenMessage}
          />
        ) :
          (
            <ListViewListProduct 
              navigation={navigation}
              products={getData()}
              loadMore={loadMore}
              onShowMessage={onShowMessage}
              setMessage={setMessage}
              setOpenMessage={setOpenMessage}
            />
          )
        }
      </View>
      {isLoading && <LoadingView variant="grid" />}
      <ErrorView
        icon={check_info}
        error={message}
        isOpen={openMessage}
        onClose={() => setOpenMessage(false)}
      />
    </AppBackground>
  )
}
export default ProductListScreen

const styles = StyleSheet.create({
  minimalHeader: {
    marginHorizontal: s(16),
    marginTop: s(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  minimalBackBtn: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(11,123,138,0.12)',
  },
  minimalBackIcon: {
    width: s(16),
    height: s(16),
  },
  listProductsContainer: {
    paddingHorizontal: s(12),
    paddingBottom: s(96),
  },
  listRowsContainer: {
    paddingTop: s(2),
    paddingBottom: s(96),
  },
  wrap: {
    flex: 1,
    marginTop: s(10),
    backgroundColor: 'transparent',
  },
  title: {
    color: brandColors.tealPrimary,
    fontFamily: Fonts.bold,
    fontSize: fs(16),
    fontWeight: 'normal',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 100,
  },
  titleContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    height: s(58),
    flexDirection: 'column',
    marginLeft: -s(40),
  },
  filterPanel: {
    marginHorizontal: s(16),
    marginTop: s(10),
    backgroundColor: 'transparent',
  },
  activeFilterRow: {
    marginHorizontal: s(16),
    marginTop: s(10),
    flexDirection: 'row',
  },
  activeFilterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    paddingLeft: s(12),
    paddingRight: s(6),
    paddingVertical: s(6),
    borderRadius: s(999),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.borderTint,
  },
  activeFilterText: {
    flexShrink: 1,
    marginLeft: s(7),
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontSize: fs(12),
    lineHeight: fs(17),
    fontWeight: 'normal',
  },
  clearFilterButton: {
    width: s(24),
    height: s(24),
    marginLeft: s(8),
    borderRadius: s(12),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  marketHero: {
    marginHorizontal: s(16),
    marginTop: s(12),
    borderRadius: s(24),
    paddingHorizontal: s(18),
    paddingVertical: s(16),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...brandShadow.soft,
  },
  heroEyebrow: {
    fontFamily: Fonts.bold,
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: 'normal',
    letterSpacing: 1.5,
    color: brandColors.tealPrimary,
  },
  heroTitle: {
    marginTop: s(6),
    fontFamily: Fonts.bold,
    fontSize: fs(22),
    lineHeight: fs(28),
    fontWeight: 'normal',
    color: brandColors.textDark,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontFamily: Fonts.base,
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: 'normal',
    color: brandColors.muted,
  },
})
