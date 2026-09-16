import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { shopping_bag, fire, home, gift, pill, account } from '../../assets/constants'
import HomeScreen from '../HomeScreen/HomeScreen'
import ProfileScreen from '../ProfileScreen/ProfileScreen'
import OrdersV2 from '../OrdersV2'
import MyCartsV2 from '../MyCartsV2'
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_FAVOURITE_PRODUCT_SCREEN,
  NAVIGATION_TO_REWARD_REDEMPTION_SCREEN,
  NAVIGATION_CONFIRM_ORDER_PRODUCTS_SCREEN,
  NAVIGATION_VOUCHER,
  NAVIGATION_ORDER_DETAIL_SCREEN,
  NAVIGATION_ORDERS_SCREEN,
  NAVIGATION_MY_CARTS_V2,
  NAVIGATION_TOPUP_SCREEN,
  NAVIGATION_PROMOTION_DETAIL,
  NAVIGATION_TO_PROFILE_SCREEN,
} from '../../navigation/routes'
// import RewardRedemption from '../RewardRedemption'
// import FavouriteProductScreen from '../FavouriteProductScreen'
// Firebase messaging removed — use expo-notifications instead
// import PushNotification from 'react-native-push-notification'
import { saveTokenFcm, requestGetItemHistory, offOpenNoti } from '~/store/actions'
import { getOpenNoti } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import { Fonts } from '~/assets/config'

import CustomTabBar from '../../navigation/CustomTabBar'
import { TabBarVisibilityProvider } from '~/navigation/TabBarVisibilityContext'

const Tab = createBottomTabNavigator()
const MainScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  const openNoti = useSelector(state => getOpenNoti(state))

  const notiCampaign = (dataNoti) => {
    if (dataNoti.CampaignType == 2) {
      navigation.navigate(NAVIGATION_TOPUP_SCREEN, { distributor: { id: dataNoti?.DistributorId } })
    }
    else if (dataNoti.CampaignType == 3) {
      navigation.navigate(NAVIGATION_VOUCHER)
    } else {
      navigation.navigate(NAVIGATION_PROMOTION_DETAIL, {
        id_campaign: dataNoti.Id,
      })
    }
  }

  return (
    <TabBarVisibilityProvider>
      <Tab.Navigator
        lazy
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={NAVIGATION_TO_HOME_SCREEN}
      >

        <Tab.Screen
          name={NAVIGATION_TO_HOME_SCREEN}
          component={HomeScreen}
          options={{ title: 'Trang chủ' }}
        />
        <Tab.Screen
          name={NAVIGATION_ORDERS_SCREEN}
          component={OrdersV2}
          options={{ title: 'Đơn hàng' }}
        />
      <Tab.Screen
        name={NAVIGATION_MY_CARTS_V2}
        component={MyCartsV2}
        options={{ title: 'Giỏ hàng' }}
      />
      {/* <Tab.Screen
        name={NAVIGATION_TO_REWARD_REDEMPTION_SCREEN}
        component={RewardRedemption}
        options={{ title: 'Điểm tích luỹ' }}
      />
      <Tab.Screen
        name={NAVIGATION_FAVOURITE_PRODUCT_SCREEN}
        component={FavouriteProductScreen}
        options={{ title: 'Riêng cho bạn' }}
      /> */}

      <Tab.Screen
        name={NAVIGATION_TO_PROFILE_SCREEN}
        component={ProfileScreen}
        options={{ title: 'Tài khoản' }}
      />
      </Tab.Navigator>
    </TabBarVisibilityProvider>
  )
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontFamily: Fonts.medium,
  },
  tinyLogo: {
    width: 10,
    height: 10,
  },
  imageTab: {
    width: 20,
    height: 20,
  },
})

export default MainScreen
