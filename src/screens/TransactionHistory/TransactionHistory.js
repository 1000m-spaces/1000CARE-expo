import React from 'react'
import { SafeAreaView, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
// import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
// import Pay from './Pay/Pay'
import AllHistory from './AllHistory/AllHistory'
// import Recharge from './Recharge/Recharge'

const TransactionHistory = props => {
  const { distributor } = props.route.params
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        title={strings.transactionHistory.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      {/* <ScrollableTabView
        // locked={true}
        renderTabBar={() => <ScrollableTabBar />}
        style={{ marginTop:10 }}
        tabBarBackgroundColor={'white'}
        tabBarActiveTextColor={'#029E9D'}
        tabBarInactiveTextColor ={'#8C8C8C'}
        tabBarUnderlineStyle={{ backgroundColor:'#029E9D',height:1 }}
      >
        <AllHistory
          data={data}
          tabLabel={strings.transactionHistory.titleTabBar.titleAllHistory')}
        />
        <Recharge
          data={data}
          tabLabel={strings.transactionHistory.titleTabBar.titleRecharge')}
        />
        <Pay
          data={data}
          tabLabel={strings.transactionHistory.titleTabBar.titlePay')}
        />
      </ScrollableTabView> */}

      <AllHistory
        distributorId={distributor.id}
        tabLabel={strings.transactionHistory.titleTabBar.titleAllHistory}
      />
    </SafeAreaView>
  )
}
export default TransactionHistory