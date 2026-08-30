import React, { useState } from 'react'
import { View, StyleSheet, useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import PressScale from '~/design-system/PressScale'
import { Text } from '~/common/index'
import Exchange from './Exchange/Exchange'
import Surplus from './Surplus/Surplus'
import { brandColors, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'
import BackgroundWash from '~/design-system/BackgroundWash'

// Màn "Sao kê tài khoản" viết lại theo spec: header kính chung của app +
// 2 pill-tab "Giao dịch"/"Số dư" (tab chọn nền teal đặc) thay cho TabBar
// gạch chân mặc định của react-native-tab-view.
const AccountStatement = props => {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'exchange', title: 'Giao dịch' },
    { key: 'surplus', title: 'Số dư' },
  ])

  const renderScene = SceneMap({
    exchange: Exchange,
    surplus: Surplus,
  })

  return (
    <View style={styles.container}>
      <BackgroundWash />
      <Header
        title={'Sao kê tài khoản'}
        iconLeft={back}
        leftAction={() => props.navigation.goBack()}
      />
      <View style={styles.tabRow}>
        {routes.map((route, i) => (
          <PressScale
            key={route.key}
            style={[styles.tabPill, index === i && styles.tabPillActive]}
            onPress={() => setIndex(i)}
          >
            <Text style={[styles.tabLabel, index === i && styles.tabLabelActive]}>{route.title}</Text>
          </PressScale>
        ))}
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={() => null}
      />
    </View>
  )
}

export default AccountStatement

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  tabRow: {
    flexDirection: 'row',
    gap: s(8),
    paddingHorizontal: s(16),
    paddingBottom: s(14),
  },
  tabPill: {
    paddingVertical: s(7),
    paddingHorizontal: s(14),
    borderRadius: s(radiusScale.lg),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
  },
  tabPillActive: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  tabLabel: {
    fontSize: fs(12),
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: brandColors.textDark,
  },
  tabLabelActive: {
    color: brandColors.surface,
    fontWeight: '700',
  },
})
