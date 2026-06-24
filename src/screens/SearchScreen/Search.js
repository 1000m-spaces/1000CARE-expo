import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StatusBar, StyleSheet, FlatList, View, TouchableOpacity, SectionList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

import SearchBar from './SearchBar'
import { getSelectedDistri, getAuthStore } from '~/store/selector'
import { LoadingView, Text } from '~/common/index'
import ProductItem from '~/common/ProductItem/ProductItem'
import Colors from '~/common/Colors/Colors'
import EmptyItem from '~/common/EmptyItem/index'
import { searchProducts, searchDistributors, searchPharmacies } from '~/services/meilisearch'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'
import AppBackground from '~/design-system/AppBackground'

const SEARCH_TABS = {
  ALL: 0,
  PRODUCT: 1,
  DISTRIBUTOR: 2,
  PHARMACY: 3,
}

const Search = ({ navigation }) => {
  const [tab, setTab] = useState(SEARCH_TABS.PRODUCT)
  const [textSearch, setTextSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const ref_input = useRef()

  const [productResults, setProductResults] = useState([])
  const [distributorResults, setDistributorResults] = useState([])
  const [pharmacyResults, setPharmacyResults] = useState([])

  const currentDistri = useSelector(state => getSelectedDistri(state))
  const { isLoggedIn } = useSelector(state => getAuthStore(state))

  const keyExtractorProduct = useCallback((_, idx) => {
    return idx.toString()
  }, [])

  useEffect(() => {
    ref_input.current?.focus()
  }, [])

  const performSearch = async (query, searchTab) => {
    if (!query || query.trim() === '') {
      setProductResults([])
      setDistributorResults([])
      setPharmacyResults([])
      return
    }

    setIsLoading(true)
    try {
      switch (searchTab) {
        case SEARCH_TABS.PRODUCT:
          const productRes = await searchProducts(query, { limit: 50 })
          setProductResults(productRes.hits || [])
          break
        case SEARCH_TABS.DISTRIBUTOR:
          const distRes = await searchDistributors(query, { limit: 50 })
          setDistributorResults(distRes.hits || [])
          break
        case SEARCH_TABS.PHARMACY:
          const pharmaRes = await searchPharmacies(query, { limit: 50 })
          setPharmacyResults(pharmaRes.hits || [])
          break
        case SEARCH_TABS.ALL:
          const [products, distributors, pharmacies] = await Promise.all([
            searchProducts(query, { limit: 20 }),
            searchDistributors(query, { limit: 20 }),
            searchPharmacies(query, { limit: 20 }),
          ])
          setProductResults(products.hits || [])
          setDistributorResults(distributors.hits || [])
          setPharmacyResults(pharmacies.hits || [])
          break
      }
    } catch (error) {
      console.error('Meilisearch error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearch = useCallback(
    _.debounce((query, searchTab) => {
      performSearch(query, searchTab)
    }, 300),
    []
  )

  const onBack = () => {
    navigation.pop()
  }

  const onChangeText = (text) => {
    setTextSearch(text)
    debouncedSearch(text, tab)
  }

  const onTabChange = (newTab) => {
    setTab(newTab)
    if (textSearch) {
      performSearch(textSearch, newTab)
    }
  }

  const renderDistributorItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('DistributorDetail', { distributor: item })}
    >
      <Text style={styles.listItemTitle}>{item.name || item.nick_name || 'N/A'}</Text>
      <Text style={styles.listItemSubtitle}>{item.address || ''}</Text>
    </TouchableOpacity>
  )

  const renderPharmacyItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('PharmacyDetail', { pharmacy: item })}
    >
      <Text style={styles.listItemTitle}>{item.name || item.pharmacy_name || 'N/A'}</Text>
      <Text style={styles.listItemSubtitle}>{item.address || ''}</Text>
    </TouchableOpacity>
  )

  const getSectionData = () => {
    const sections = []
    if (productResults.length > 0) {
      sections.push({ title: 'Sản phẩm', data: productResults, type: 'product' })
    }
    if (distributorResults.length > 0) {
      sections.push({ title: 'Nhà phân phối', data: distributorResults, type: 'distributor' })
    }
    if (pharmacyResults.length > 0) {
      sections.push({ title: 'Cửa hàng', data: pharmacyResults, type: 'pharmacy' })
    }
    return sections
  }

  const renderSectionItem = ({ item, section }) => {
    switch (section.type) {
      case 'product':
        return (
          <ProductItem
            navigation={navigation}
            data={item}
            distributorId={item?.distributor_id}
            type={2}
          />
        )
      case 'distributor':
        return renderDistributorItem({ item })
      case 'pharmacy':
        return renderPharmacyItem({ item })
      default:
        return null
    }
  }

  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  )

  return (
    <AppBackground>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SearchBar
        ref_input={ref_input}
        navigation={navigation}
        onBack={() => onBack()}
        onChangeText={(text) => onChangeText(text)}
        idSearchDistri={-1}
        textSearch={textSearch}
      />

      <View style={styles.searchHero}>
        <Text style={styles.heroEyebrow}>SMART SEARCH</Text>
        <Text style={styles.heroTitle}>Tìm đúng sản phẩm nhanh hơn</Text>
        <Text style={styles.heroSubtitle}>Tra cứu sản phẩm, nhà phân phối và cửa hàng từ một màn hình.</Text>
      </View>

      <View style={styles.tabShell}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, tab === SEARCH_TABS.PRODUCT && styles.tabButtonActive]}
          onPress={() => onTabChange(SEARCH_TABS.PRODUCT)}
        >
          <Text style={[styles.tabText, tab === SEARCH_TABS.PRODUCT && styles.tabTextActive]}>Sản phẩm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === SEARCH_TABS.DISTRIBUTOR && styles.tabButtonActive]}
          onPress={() => onTabChange(SEARCH_TABS.DISTRIBUTOR)}
        >
          <Text style={[styles.tabText, tab === SEARCH_TABS.DISTRIBUTOR && styles.tabTextActive]}>Nhà phân phối</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === SEARCH_TABS.PHARMACY && styles.tabButtonActive]}
          onPress={() => onTabChange(SEARCH_TABS.PHARMACY)}
        >
          <Text style={[styles.tabText, tab === SEARCH_TABS.PHARMACY && styles.tabTextActive]}>Cửa hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, tab === SEARCH_TABS.ALL && styles.tabButtonActive]}
          onPress={() => onTabChange(SEARCH_TABS.ALL)}
        >
          <Text style={[styles.tabText, tab === SEARCH_TABS.ALL && styles.tabTextActive]}>Tất cả</Text>
        </TouchableOpacity>
      </View>
      </View>

      {isLoading ? <LoadingView variant="grid" /> : null}

      <View style={styles.wrap}>
        {tab === SEARCH_TABS.PRODUCT && (
          <FlatList
            numColumns={2}
            contentContainerStyle={styles.listProductsContainer}
            data={productResults}
            keyExtractor={keyExtractorProduct}
            renderItem={({ item }) => (
              <ProductItem
                navigation={navigation}
                data={item}
                distributorId={item?.distributor_id}
                type={2}
              />
            )}
            ListEmptyComponent={() => (
              <EmptyItem text="Không có sản phẩm nào" />
            )}
          />
        )}

        {tab === SEARCH_TABS.DISTRIBUTOR && (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={distributorResults}
            keyExtractor={keyExtractorProduct}
            renderItem={renderDistributorItem}
            ListEmptyComponent={() => (
              <EmptyItem text="Không có nhà phân phối nào" />
            )}
          />
        )}

        {tab === SEARCH_TABS.PHARMACY && (
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={pharmacyResults}
            keyExtractor={keyExtractorProduct}
            renderItem={renderPharmacyItem}
            ListEmptyComponent={() => (
              <EmptyItem text="Không có cửa hàng nào" />
            )}
          />
        )}

        {tab === SEARCH_TABS.ALL && (
          <SectionList
            sections={getSectionData()}
            keyExtractor={keyExtractorProduct}
            renderItem={renderSectionItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={() => (
              <EmptyItem text="Không có kết quả nào" />
            )}
            stickySectionHeadersEnabled={false}
          />
        )}
      </View>
    </AppBackground>
  )
}

const styles = StyleSheet.create({
  listProductsContainer: {
    paddingHorizontal: s(12),
    paddingBottom: s(96),
  },
  listContainer: {
    paddingHorizontal: s(16),
    paddingBottom: s(96),
  },
  wrap: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabShell: {
    backgroundColor: 'transparent',
    paddingHorizontal: s(16),
    paddingBottom: s(12),
  },
  searchHero: {
    marginHorizontal: s(16),
    marginTop: s(12),
    marginBottom: s(12),
    borderRadius: s(24),
    padding: s(16),
    backgroundColor: brandColors.tealDark,
    ...brandShadow.teal,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.5,
    color: brandColors.goldAccent,
  },
  heroTitle: {
    marginTop: s(5),
    fontSize: fs(22),
    lineHeight: fs(28),
    fontWeight: '600',
    color: brandColors.surface,
  },
  heroSubtitle: {
    marginTop: s(7),
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: brandColors.tealLight,
    borderRadius: s(16),
    padding: s(4),
  },
  tabButton: {
    flex: 1,
    paddingVertical: s(10),
    alignItems: 'center',
    borderRadius: s(12),
  },
  tabButtonActive: {
    backgroundColor: brandColors.surface,
    ...brandShadow.soft,
  },
  tabText: {
    fontSize: fs(12),
    color: brandColors.muted,
    fontWeight: '600',
  },
  tabTextActive: {
    fontWeight: '600',
    color: brandColors.tealPrimary,
  },
  listItem: {
    backgroundColor: brandColors.surface,
    padding: s(16),
    borderRadius: s(20),
    marginTop: s(10),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  listItemTitle: {
    fontSize: fs(15),
    fontWeight: '600',
    color: brandColors.textDark,
    marginBottom: s(4),
  },
  listItemSubtitle: {
    fontSize: fs(13),
    color: brandColors.muted,
  },
  sectionHeader: {
    backgroundColor: 'transparent',
    paddingHorizontal: s(16),
    paddingVertical: s(12),
  },
  sectionHeaderText: {
    fontSize: fs(14),
    fontWeight: '600',
    color: brandColors.tealPrimary,
  },
})

export default Search
