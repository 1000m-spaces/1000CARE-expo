import React, { useState } from 'react'
import { View, TextInput, StyleSheet, FlatList } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { Icon } from '~/common'
import { Text } from '~/common/index'
import { NAVIGATION_FILTER_PRODUCT } from '~/navigation/routes'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

const tabs = [
  { id: 1, name: 'Siêu rẻ', icon: true, iconName: 'star' },
  { id: 2, name: 'Khuyến mãi', icon: false, iconName: '' },
  { id: 3, name: 'Tất cả', icon: false, iconName: '' },
  // { id: 4, name: 'Lọc', icon: true, iconName: 'filter' },
]
const SearchBar = ({ navigation, type, viewMode, setViewMode, onLoad, query, distributorId, mode = 'supplier', onTabChange }) => {
  const [tabSelected, setTabSelected] = useState(0)

  const handleTabChanged = (tab, index) => {
    if (tab.id === 4) {
      navigation.navigate(NAVIGATION_FILTER_PRODUCT, {
        onLoad: onLoad,
        query,
        distributorId : type !== 'priceSock' ? distributorId : null,
        mode,
      })
    } else {
      setTabSelected(index)
      onTabChange(tab)
    }
  }
  return (
    <View
      style={styles.wrapperContainer}
    >
      {type === 'product_by_distributor' &&
      <View>
        <FlatList
          data={tabSelected !== 2 ? tabs.filter(i => i.id !== 4) : tabs}
          horizontal
          renderItem={({ item, index }) => {
            return (
              <PressScale
                style={tabSelected === index ? styles.wrapperDisplayTabSelected : styles.wrapperDisplayTab}
                onPress={() => handleTabChanged(item, index)}
              >
                <Text style={tabSelected === index ? styles.titleTabSelected : styles.titleTab}>{item.name}</Text>
                {item.icon &&
                  <Icon
                    type="font-awesome"
                    name={item.iconName}
                    color={item.iconName === 'filter' ? brandColors.tealPrimary : brandColors.goldAccent}
                    size={18}
                  />}
              </PressScale>
            )
          }}
        />
      </View> }
      {type === 'priceSock' &&
        <PressScale
          onPress={() => navigation.navigate(NAVIGATION_FILTER_PRODUCT, {
            onLoad: onLoad,
            query,
            distributorId : type !== 'priceSock' ? distributorId : null,
            mode,
          })}
          style={styles.searchContainer}
        >
          <View
            style={type=== 'priceSock' || type === 'product_by_distributor' ? styles.wrapperInputSearch : { width:'100%' }}
          >
            <View
              style={styles.wrapperTextInput}
            >
              <Icon
                type="feather"
                name={'filter'}
                color={brandColors.tealPrimary}
                size={20}
              />
              <TextInput
                style={styles.searchInput}
                editable={false}
                placeholder={'Lọc theo giá, nhóm sản phẩm'}
                placeholderTextColor={brandColors.mutedLight}
              />
            </View>
          </View>
          <Icon
            type="feather"
            name={'sliders'}
            color={brandColors.tealDark}
            size={22}
          />
        </PressScale>}
      {
        (type === 'priceSock' || type === 'product_by_distributor') && (
          <PressScale
            style={styles.wrapperDisplayIcon}
            onPress={() => {
              if (viewMode === 'list') {
                setViewMode('grid')
              } else {
                setViewMode('list')
              }
            }}
          >
            {
              viewMode === 'list' ? (
                <Icon
                  type="feather"
                  name={'grid'}
                  color={brandColors.tealDark}
                  size={22}
                />
              ) : (
                <Icon
                  type="feather"
                  name={'list'}
                  color={brandColors.tealDark}
                  size={22}
                />
              )
            }
          </PressScale>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  titleTab:  {
    fontFamily: Fonts.regular,
    fontSize: fs(13),
    lineHeight: fs(17),
    fontWeight: 'normal',
    marginRight: s(4),
    color: brandColors.tealDark,
  },
  titleTabSelected: {
    fontFamily: Fonts.semiBold,
    fontSize: fs(13),
    lineHeight: fs(17),
    marginRight: s(4),
    fontWeight: 'normal',
    color: brandColors.surface,
  },
  wrapperInputSearch: { 
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapperContainer: {
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection:'row',
    width: '100%',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  wrapperTextInput: {
    alignItems: 'center',
    flexDirection:'row',
    height: s(44),
    paddingHorizontal: s(14),
    flex: 1,
  },
  iconFilter: {
    marginRight: 0,
  },
  wrapperDisplayTab: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: liquidGlass.borderTint,
    backgroundColor: liquidGlass.backgroundTint,
    paddingVertical: s(8),
    paddingHorizontal: s(12),
    marginVertical: s(4),
    marginHorizontal: s(3),
    borderRadius: s(999),
    alignItems: 'center',
  },
  wrapperDisplayTabSelected: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: brandColors.tealPrimary,
    backgroundColor: brandColors.tealPrimary,
    paddingVertical: s(8),
    paddingHorizontal: s(12),
    marginVertical: s(4),
    marginHorizontal: s(3),
    borderRadius: s(999),
    alignItems: 'center',
  },
  wrapperDisplayIcon: {
    width: s(52),
    height: s(52),
    borderWidth: 1,
    borderColor: liquidGlass.borderTint,
    backgroundColor: liquidGlass.backgroundStrong,
    marginLeft: s(8),
    borderRadius: s(16),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  searchInput:{
    flex: 1,
    marginLeft: s(10),
    fontFamily: Fonts.bold,
    fontSize: fs(13),
    fontWeight: 'normal',
    color: brandColors.textDark,
    paddingVertical: 0,
  },
  searchContainer:{
    flexDirection: 'row',
    flex: 1,
    backgroundColor: liquidGlass.backgroundStrong,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: s(16),
    height: s(52),
    paddingRight: s(12),
    borderWidth: 1,
    borderColor: liquidGlass.borderTint,
  },
  searchWithIconContainer: {
    flex: 1,
  },
})

export default SearchBar
