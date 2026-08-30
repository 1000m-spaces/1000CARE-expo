import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, FlatList, SafeAreaView } from 'react-native'
import Header from '~/common/Header/index'
import { getInfoWallet, requestGetLoanInfo } from '~/store/actions'
import { getInfoAccount } from '~/store/selector'
import { NAVIGATION_TOPUP_SCREEN } from '~/navigation/routes'
import BankItem from './BankItem'
import { useState } from 'react'
import { log_mb_bank_landscape } from '~/assets/constants'
import EmptyItem from '~/common/EmptyItem/index'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors } from '~/design-system/tokens'

const ListBankAccount = props => {
  const distributor = props.route.params?.distributor
  const goBack = props.route.params?.goBack

  const dispatch = useDispatch()
  const [listBankAccount, setListBankAccount] = useState([])

  const infoAccount = useSelector(state => getInfoAccount(state))

  useEffect(() => {
    setListBankAccount([])
    dispatch(getInfoWallet())
    return () => {
      setListBankAccount([])
    }
  }, [])

  const keyExtractorAccount = (_, idx) => {
    return idx.toString()
  }

  const goToTopup= (item) => {
    props.navigation.navigate(NAVIGATION_TOPUP_SCREEN, {
      distributor,
      bankInfo: item,
      goBack: () => {
        setListBankAccount([])
        dispatch(getInfoWallet())
        dispatch(requestGetLoanInfo())
      },
    })
  }

  useEffect(() => {
    if (infoAccount.mobile) {
      if (listBankAccount.find(a => a.paymentCode === 'MBW')) {
        return
      }
      setListBankAccount([{
        title: 'Tài khoản thanh toán',
        balance: infoAccount?.balanceWallet,
        paymentCode: 'MBW',
        logo: log_mb_bank_landscape,
      }, ...listBankAccount])
    }
  }, [infoAccount])

  return(
    <SafeAreaView style={{ flex: 1, backgroundColor: brandColors.background }}>
      <BackgroundWash />
      <Header
        title={'Tài khoản nạp'}
        leftAction={() => {
          if (goBack) {
            props.navigation.goBack()
            goBack()
          }
        }}
      />
      <FlatList
        style={{ flexGrow: 0, marginTop: 10 }}
        data={listBankAccount}
        keyExtractor={keyExtractorAccount}
        renderItem={({ item }) => {
          return (
            <BankItem
              data={item}
              type={'ASSETS'}
              onItemPress={goToTopup.bind(this, item)}
            />
          )
        }}
        ListEmptyComponent={() => {
          return (
            <EmptyItem text='Không có tài khoản nạp nào' />
          )
        }}
      />
    </SafeAreaView>
  )
}
export default ListBankAccount