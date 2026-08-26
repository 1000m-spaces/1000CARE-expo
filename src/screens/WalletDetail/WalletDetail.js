import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, ImageBackground, FlatList, SafeAreaView } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { Image } from '~/common/index'
import bank from '~/assets/configNeoMed/Wallet/bank.png'
import backgroundWallet from '~/assets/configNeoMed/Wallet/backgroundWallet.png'
import ChevronLeft from '~/assets/configNeoMed/Wallet/ChevronLeft.png'
import Money from '~/assets/configNeoMed/Wallet/Money.png'
import lend from '~/assets/configNeoMed/Wallet/lend.png'
import deal from '~/assets/configNeoMed/Wallet/deal.png'

import strings from '~/i18n'
import styles from './styles'
import { getAccounts, getTransactionHistory, getUserId } from '~/store/selector'
import { NAVIGATION_LIST_BANK_ACCOUNT, NAVIGATION_TRANSACTION_HISTORY } from '~/navigation/routes'
import { formatMoney } from '~/utils/format'
import { requestGetTransactionHistory } from '~/store/actions'
import Item from '~/common/InfoPay/InfoPay'
import { getBalance as getBalanceOfNeomed } from '~/store/actions'
import EmptyItem from '~/common/EmptyItem/index'
import Header from '~/common/Header/index'
import Colors from '~/common/Colors/Colors'

const HistoryType = {
  TransHistory: strings.transactionHistory.title,
}

const HistoryCode = {
  Topup: strings.transactionHistory.titleTabBar.titleRecharge,
}

const WalletDetail = ({ navigation, route }) => {
  const { distributor } = route.params
  const dispatch = useDispatch()
  const transactionHistory = useSelector(state => getTransactionHistory(state))

  const balances = useSelector(state => getAccounts(state))
  const userId = useSelector(state => getUserId(state))

  useEffect(() => {
    dispatch(requestGetTransactionHistory('all', distributor.id))
  }, [balances])

  const getBalance = (distributor) => {
    const npp = balances.find(b => b.id === distributor.id)
    if (npp) {
      const account = npp.accounts.find(account => account.accountType === 'ASSETS')
      if (account) {
        return formatMoney(account.balance)
      }
    }
    return '0'
  }

  const getValue = (item) => {
    const data = JSON.parse(item.data)
    if (item.type === 'TransHistory') {
      return data.amount
    }
    return item.data
  }

  const isCurrentDistributor = (item) => {
    const data = JSON.parse(item.data)
    if (data.distributor_id === distributor.id) {
      return true
    }
    return false
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        iconLeft={ChevronLeft}
        leftAction={() => navigation.goBack()}
        headerContainerStyles={{
          backgroundColor: Colors.systemColor2,
        }}
        titleStyles={{
          color: Colors.white,
        }}
      />
      <ImageBackground
        style={styles.imageInfo}
        source={bank}
      >
        <ImageBackground
          style={styles.imageInfo}
          source={backgroundWallet}
        >
          <Text style={styles.styleTitle}>
            Tài khoản của bạn tại\n`${distributor.name}`
          </Text>
          <Text style={styles.textMoney}>{strings.wallet.existingAmount}</Text>
          <Text style={styles.numberMoney}>{getBalance(distributor)}</Text>
        </ImageBackground>
      </ImageBackground>
      <View style={styles.viewSpace} />
      <View style={styles.viewSelect}>
        <View style={{ alignItems: 'center' }}>
          <PressScale
            onPress={() => {
              navigation.navigate(NAVIGATION_LIST_BANK_ACCOUNT, {
                distributor: distributor,
                goBack: () => {
                  dispatch(getBalanceOfNeomed(userId))
                },
              })
            }}
            style={styles.buttonSelect}
          >
            <Image source={Money} />
          </PressScale>
          <Text style={styles.textSelect}>{strings.wallet.recharge}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <PressScale style={styles.buttonSelect}>
            <Image source={lend} />
          </PressScale>
          <Text style={styles.textSelect}>{strings.wallet.borrow}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <PressScale
            style={styles.buttonSelect}
            onPress={() => {
              navigation.navigate(NAVIGATION_TRANSACTION_HISTORY, {
                distributor: distributor,
              })
            }}
          >
            <Image source={deal} />
          </PressScale>
          <Text style={styles.textSelect}>{strings.wallet.deal}</Text>
        </View>
      </View>
      <Text style={styles.textHistory}>{strings.wallet.transactionHistory}</Text>
      <FlatList
        style={{ flex: 1 }}
        data={transactionHistory}
        ListEmptyComponent={() => {
          return (
            <EmptyItem />
          )
        }}
        renderItem={({ item }) => {
          if (isCurrentDistributor(item)) {
            return (
              <Item
                code={HistoryCode[item.ref_id] || item.ref_id}
                money={getValue(item)}
                textMethod={HistoryType[item.type] || item.type}
                textInfo={strings.transactionHistory.titleTabBar.titleType}
                textMoney={
                  strings.wallet.money}
              />
            )
          } else {
            return <></>
          }
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  )
}
export default WalletDetail