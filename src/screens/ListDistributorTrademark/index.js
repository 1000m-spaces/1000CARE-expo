import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Header from '~/common/Header/index'
import { getDistributorsActive, requestGetTrademarksAdvertisement } from '~/store/actions'
import { back } from '~/assets/constants'
import { LoadingView, Text } from '~/common'
import ItemDistributor from '~/common/ItemDistributor/index'
import { getListDistributors, getListTrademarksAdvertisement } from '~/store/selector'
import EmptyItem from '~/common/EmptyItem/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

const ListDistributorTrademark = ({ navigation, route }) => {
  // const [currentPage, setCurrentPage] = useState(1)
  const { title, type, onItemPress, distributorId } = route.params
  const [isLoading, setLoading] = useState(false)
  const listDistributors = useSelector(state => getListDistributors(state))
  const listTrademarksAdvertisement = useSelector(state => getListTrademarksAdvertisement(state))
  // const statuslistrademarks = useSelector(state => statusGetlistrademarks(state));

  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    // setCurrentPage(1)
    if (type === 'distributor') {
      dispatch(getDistributorsActive(0, 1, 10000, false))
    } else {
      dispatch(requestGetTrademarksAdvertisement(distributorId, 1, 1, 10000, false))
    }
  }, [type])

  // const loadMore = () => {
  //   if (getData().length >= currentPage*16 && !isLoading && statuslistrademarks != Status.LOADING) {
  //     setLoading(true)
  //     setCurrentPage(currentPage + 1)
  //     if (type === 'distributor') {
  //       dispatch(getDistributorsActive(0, currentPage + 1, 16, true))
  //     } else {
  //       dispatch(requestGetTrademarksAdvertisement(distributorId, 1, currentPage + 1, 16, true))
  //     }
  //   }
  // }

  const getData = useCallback(() => {
    if (type === 'distributor') {
      return listDistributors
    } else {
      return listTrademarksAdvertisement
    }
  }, [listDistributors, listTrademarksAdvertisement])

  useEffect(() => {
    setLoading(false)
  }, [listDistributors, listTrademarksAdvertisement])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        leftAction={()=> navigation.pop()}
        iconLeft={back}
        title={title}
        navigation={navigation}
        cart={false}
      />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>{type === 'distributor' ? 'SUPPLIER DIRECTORY' : 'BRAND DIRECTORY'}</Text>
        <Text style={styles.heroTitle}>{title}</Text>
        <Text style={styles.heroSubtitle}>
          {type === 'distributor'
            ? 'Chọn nhà cung cấp để xem danh mục sản phẩm phù hợp với cửa hàng của bạn.'
            : 'Chọn thương hiệu để lọc nhanh các sản phẩm đang phân phối.'}
        </Text>
      </View>
      <View
        style={styles.wrap}
      >
        {getData() ? 
          <FlatList
            style={styles.listDistributors}
            contentContainerStyle={styles.distributors}
            data={getData()}
            numColumns={3}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadMore()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ItemDistributor
                  onItemPress={() => {
                    navigation.pop()
                    if (onItemPress) {
                      onItemPress(item)
                    }
                  }}
                  data={item}
                />
              )
            }}
            keyExtractor={(_, idx) => idx.toString()}
            ListEmptyComponent={() => (
              <EmptyItem text={type === 'distributor' ? 'Chưa có nhà cung cấp' : 'Chưa có thương hiệu'} />
            )}
          /> : null }
      </View>
      {isLoading && <LoadingView variant="list" />}
    </SafeAreaView>
  )
}
export default ListDistributorTrademark

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  hero: {
    marginHorizontal: s(16),
    marginTop: s(14),
    borderRadius: s(28),
    padding: s(20),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  heroEyebrow: {
    fontFamily: Fonts.bold,
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: 'normal',
    letterSpacing: 1.6,
    color: brandColors.tealPrimary,
  },
  heroTitle: {
    marginTop: s(6),
    fontFamily: Fonts.bold,
    fontSize: fs(25),
    lineHeight: fs(31),
    fontWeight: 'normal',
    color: brandColors.textDark,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontFamily: Fonts.base,
    fontSize: fs(13),
    lineHeight: fs(20),
    fontWeight: 'normal',
    color: brandColors.muted,
  },
  wrap: {
    flex: 1,
    marginTop: s(12),
    backgroundColor: 'transparent',
  },
  listDistributors: {
    flex: 1,
  },
  distributors: {
    paddingHorizontal: s(14),
    paddingBottom: s(36),
    alignItems: 'center',
  },
})
