import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, SafeAreaView } from 'react-native'
import Header from '~/common/Header/index'
import strings from '~/i18n'
import { getBalance } from '~/store/actions'
import { getAccounts, getUserId } from '~/store/selector'
import { NAVIGATION_TOPUP_SCREEN, NAVIGATION_WALLET_DETAIL } from '~/navigation/routes'
import WalletItem from './WalletItem'
import EmptyItem from '~/common/EmptyItem/index'
import { Text } from '~/common/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const Wallet = props => {
  const type = props.route?.params?.type
  const dispatch = useDispatch()

  const accounts = useSelector(state => getAccounts(state))
  const userId = useSelector(state => getUserId(state))

  useEffect(() => {
    dispatch(getBalance(userId))
  }, [])

  const keyExtractorAccount = (item) => {
    return item.id.toString()
  }

  const goToWalletDetail = (item) => {
    if (type === 'topup') {
      props.navigation.navigate(NAVIGATION_TOPUP_SCREEN, {
        distributor: item,
      })
    } else {
      props.navigation.navigate(NAVIGATION_WALLET_DETAIL, {
        distributor: item,
      })
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: brandColors.background }}>
      <Header
        title={type === 'topup' ? 'Nạp tiền' : strings.walletList.title}
        leftAction={() => props.navigation.goBack()}
      />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>POINT WALLET</Text>
        <Text style={styles.heroTitle}>{type === 'topup' ? 'Chọn ví nạp điểm' : strings.walletList.title}</Text>
        <Text style={styles.heroSubtitle}>Theo dõi số dư điểm mua hàng theo từng nhà phân phối.</Text>
      </View>
      <FlatList
        style={{ flexGrow: 0, marginTop: 10, backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingBottom: 96 }}
        data={accounts}
        keyExtractor={keyExtractorAccount}
        renderItem={({ item }) => {
          return (
            <WalletItem
              data={item}
              type={'ASSETS'}
              onItemPress={goToWalletDetail.bind(this, item)}
            />
          )
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyItem text='Không có thông tin' />
          )
        }}
      />
      <View />
    </SafeAreaView>
  )
}
export default Wallet

const styles = {
  hero: {
    marginHorizontal: s(16),
    marginTop: s(12),
    borderRadius: s(26),
    padding: s(18),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.5,
    color: brandColors.tealPrimary,
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(24),
    lineHeight: fs(30),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: '600',
    color: brandColors.muted,
  },
}
