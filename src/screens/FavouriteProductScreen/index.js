import React, { useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import PressScale from '~/design-system/PressScale'

import styles from './style'
import CustomHeader from '~/common/CustomHeader/index'
import FavoriteProduct from './FavoriteProduct/index'
import ExclusiveProduct from './ExclusiveProduct/index'
import RecentlyProduct from './RecentlyProduct/index'
import { Text } from '~/common/index'
import { getAuthStore } from '~/store/selector'
import { useSelector } from 'react-redux'
import LoginRequired from '~/common/LoginRequired/index'
import ErrorView from '~/common/ErrorView/index'
import { check_info } from '~/assets/constants'

const Tabs = [
  {
    id: 1,
    title: 'Dành riêng cho bạn',
  },
  {
    id: 2,
    title: 'Sản phẩm yêu thích',
  },
  {
    id: 3,
    title: 'Đã xem gần đây',
  },
]

const FavouriteProductScreen = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState(1)
  const { isLoggedIn } = useSelector(state => getAuthStore(state))
  
  const [openMessage, setOpenMessage] = useState(false)
  const [message, setMessage] = useState('Đã thêm sản phẩm yêu thích')

  const onFavorClick =(isAdd) => {
    if (isAdd) {
      setMessage('Đã thêm sản phẩm yêu thích')
    } else {
      setMessage('Đã xóa sản phẩm yêu thích')
    }
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 1000)
  }

  const onAddProduct = () => {
    setMessage('Thêm sản phẩm thành công')
    setOpenMessage(true)
    setTimeout(() => {
      setOpenMessage(false)
    }, 1000)
  }

  const getComponentByTab = () => {
    if (currentTab === 1) {
      return (
        <ExclusiveProduct
          navigation={navigation}
          onFavorClick={onFavorClick}
          onMessage={(msg) => {
            setMessage(msg)
            setOpenMessage(true)
            setTimeout(() => {
              setOpenMessage(false)
            }, 2000)
          }}
          onAddProduct={onAddProduct}
        />
      )
    } else if (currentTab === 2) {
      return (
        <FavoriteProduct 
          navigation={navigation}
          onFavorClick={onFavorClick}
          onMessage={(msg) => {
            setMessage(msg)
            setOpenMessage(true)
            setTimeout(() => {
              setOpenMessage(false)
            }, 2000)
          }}
          onAddProduct={onAddProduct}
        />
      )
    } else if (currentTab === 3) {
      return (
        <RecentlyProduct
          navigation={navigation}
          onMessage={(msg) => {
            setMessage(msg)
            setOpenMessage(true)
            setTimeout(() => {
              setOpenMessage(false)
            }, 2000)
          }}
          onFavorClick={onFavorClick}
          onAddProduct={onAddProduct}
        />
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader
        navigation={navigation}
        title={'Riêng cho bạn'}
        search={false}
      />
      {
        isLoggedIn ? (
          <>
            <FlatList
              style={styles.listViewContainer}
              data={Tabs}
              contentContainerStyle={styles.listViewContent}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <PressScale
                    style={item.id === currentTab ?
                      [styles.tabItem, styles.tabSelected]
                      : styles.tabItem}
                    onPress={() => setCurrentTab(item.id)}
                  >
                    <Text
                      style={item.id === currentTab ?
                        [styles.tabTitle, styles.tabTitleSelected]
                        : styles.tabTitle}
                    >
                      {item.title}
                    </Text>
                  </PressScale>
                )
              }}
              keyExtractor={(item, index) => {
                return index.toString()
              }}
            />
            {
              getComponentByTab()
            }
          </>
        ) : <LoginRequired />
      }
      <ErrorView
        error={message}
        isOpen={openMessage}
        icon={check_info}
        onClose={() => setOpenMessage(false)}
      />
    </SafeAreaView>
  )
}
export default FavouriteProductScreen

