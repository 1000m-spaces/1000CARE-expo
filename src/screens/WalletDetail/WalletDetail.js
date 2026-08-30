import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import PressScale from '~/design-system/PressScale'
import { Image } from '~/common/index'
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
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandGradients } from '~/design-system/tokens'

const HistoryType = {
  TransHistory: strings.transactionHistory.title,
}

const HistoryCode = {
  Topup: strings.transactionHistory.titleTabBar.titleRecharge,
}

// Màn "Ví theo NCC" viết lại theo cùng ngôn ngữ với BankAccount (Đợt H):
// card số dư gradient teal, lưới 3 nút truy cập nhanh, danh sách giao
// dịch dạng card — thay ImageBackground + hàng phẳng nền xám cũ.
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
        return formatMoney(account.balance, { unit: 'đ' })
      }
    }
    return '0đ'
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
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <Header
        iconLeft={ChevronLeft}
        leftAction={() => navigation.goBack()}
      />
      <View style={styles.scrollContent}>
        <LinearGradient
          colors={brandGradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.walletCard}
        >
          <Text style={styles.walletTitle} numberOfLines={2}>{`Tài khoản của bạn tại ${distributor.name}`}</Text>
          <Text style={styles.walletLabel}>{strings.wallet.existingAmount}</Text>
          <Text style={styles.walletBalance}>{getBalance(distributor)}</Text>
        </LinearGradient>

        <View style={styles.actionRow}>
          <ActionItem
            icon={Money}
            label={strings.wallet.recharge}
            onPress={() => {
              navigation.navigate(NAVIGATION_LIST_BANK_ACCOUNT, {
                distributor: distributor,
                goBack: () => {
                  dispatch(getBalanceOfNeomed(userId))
                },
              })
            }}
          />
          <ActionItem icon={lend} label={strings.wallet.borrow} />
          <ActionItem
            icon={deal}
            label={strings.wallet.deal}
            onPress={() => {
              navigation.navigate(NAVIGATION_TRANSACTION_HISTORY, {
                distributor: distributor,
              })
            }}
          />
        </View>

        <Text style={styles.textHistory}>{strings.wallet.transactionHistory}</Text>
      </View>
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

const ActionItem = ({ icon, label, onPress }) => (
  <PressScale style={styles.actionItem} onPress={onPress}>
    <View style={styles.actionIconWrap}>
      <Image source={icon} style={styles.actionIcon} tintColor={brandColors.tealPrimary} resizeMode="contain" />
    </View>
    <Text style={styles.actionLabel} numberOfLines={2}>{label}</Text>
  </PressScale>
)

export default WalletDetail
