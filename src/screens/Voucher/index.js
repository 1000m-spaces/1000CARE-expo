import React, { useState } from 'react'
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native'

import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import VoucherItem from '~/common/VoucherItem/index'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { addOptionInfo, requestGetListVoucherByCustomer, requestGetListVoucherValidByCustomer, resetStatusCartInfo, dataSelectVoucher, saveListVoucherExpired } from '~/store/actions'
import { getAddCartInfoStatus, getListVoucher, getListVoucherValid, getListVoucherExpired } from '~/store/selector'
import EmptyItem from '~/common/EmptyItem/index'
import { Text } from '~/common/index'
import styles from './styles'
import Status from '~/common/Status/Status'
import ErrorView from '~/common/ErrorView/index'
import { brandColors } from '~/design-system/tokens'

const Voucher = ({ navigation, route }) => {
  const isSelect = route?.params?.isSelect
  const distributorId = route?.params?.distributorId
  const orgDistributorId = route?.params?.orgDistributorId
  const currentVoucher = route?.params?.currentVoucher
  const orderAmount = route?.params?.orderAmount
  const paymentType = route?.params?.paymentType
  const onVoucherSelected = route?.params?.onVoucherSelected
  const payment_method = route?.params?.payment_method
  const index = route?.params?.index
  console.log('router List voucher:',route)

  const dispatch = useDispatch()
  const [status, setStatus] = useState('assigned')
  const [isRequest, setIsRequest] = useState(false)
  const [openError, setOpenError] = useState(false)
  const [voucher, setVoucher] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const listVoucher = useSelector(state => getListVoucher(state))
  const listVoucherValid = useSelector(state => getListVoucherValid(state))
  const listVoucherExpired = useSelector(state => getListVoucherExpired(state))
  const addCartInfoStatus = useSelector(state => getAddCartInfoStatus(state))
  const errorMsg = useSelector(state => state.cart.errorMsg)

  useEffect(() => {
    setCurrentPage(1)
    console.log('currentVoucher', currentVoucher)
  }, [])
  
  const loadData = (loadMore) => {
    if (!isSelect) {
      dispatch(requestGetListVoucherByCustomer(null, status, currentPage, 10, loadMore))
    } else {
      dispatch(requestGetListVoucherValidByCustomer(distributorId, orderAmount, currentPage, 10, loadMore, payment_method))
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [status])

  useEffect(() => {
    loadData(currentPage > 1)
  }, [status, currentPage])

  const loadMore = () => {
    let vouchersTemp = listVoucher
    if (isSelect) {
      vouchersTemp = listVoucherValid
    }
    if (vouchersTemp && vouchersTemp.length >= 10) {
      setCurrentPage(currentPage + 1)
    }
  }

  useEffect(() => {
    if (!isRequest)
      return
    switch (addCartInfoStatus) {
      case Status.LOADING:
        break
      case Status.SUCCESS:
        setIsRequest(false)
        dispatch(resetStatusCartInfo())
        if (onVoucherSelected) {
          onVoucherSelected(voucher)
        }
        navigation.pop()
        break
      case Status.ERROR:
        setIsRequest(false)
        setOpenError(true)
        break
    }
  }, [isRequest, addCartInfoStatus])
  console.log('voucherrrrrrrrrrr:',listVoucherValid,'\n',listVoucherExpired)

  const onChoose = (item) => {
    dispatch(saveListVoucherExpired({ [orgDistributorId]:item?.id },false))
    setIsRequest(true)
    setVoucher(item)
    dispatch(addOptionInfo(item.id, distributorId === 1 ? 6 : 5, distributorId === 1 ? orgDistributorId : distributorId, paymentType))
    dispatch(dataSelectVoucher(distributorId, orgDistributorId,paymentType, index))
  }

  const onDeleteVoucher = (currentVoucher) => {
    dispatch(saveListVoucherExpired({ [orgDistributorId]:currentVoucher?.id },true))
    setIsRequest(true)
    dispatch(addOptionInfo('', distributorId === 1 ? 6 : 5, distributorId === 1 ? orgDistributorId : distributorId, paymentType))
  }

  return (
    <SafeAreaView
      style={{ 
        flex:1,
        backgroundColor: brandColors.background,
      }}
    >
      <Header
        title={'Voucher của bạn'}
        leftAction={() => navigation.pop()}
        iconLeft={back}
      />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>VOUCHER WALLET</Text>
        <Text style={styles.heroTitle}>Ưu đãi của bạn</Text>
        <Text style={styles.heroSubtitle}>Quản lý voucher có sẵn, đã dùng và hết hạn trong cùng một nơi.</Text>
      </View>
      {
        !isSelect && (
          <View
            style={styles.tabHeaderContainer}
          >
            {[
              { key: 'assigned', label: 'Có sẵn' },
              { key: 'claimed', label: 'Đã sử dụng' },
              { key: 'disabled', label: 'Hết hạn' },
            ].map(item => {
              const selected = item.key === status
              return (
                <TouchableOpacity
                  key={item.key}
                  activeOpacity={0.82}
                  onPress={() => setStatus(item.key)}
                  style={[styles.tabHeader, selected && styles.tabHeaderSelected]}
                >
                  <Text style={[styles.tabHeaderText, selected && styles.tabHeaderTextSelected]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        )
      }
      {
        <FlatList
          horizontal={false}
          style={styles.voucherContainer}
          snapToAlignment={'start'}
          data={isSelect? listVoucherValid || [] : listVoucher || []}
          showsVerticalScrollIndicator={false}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.1}
          keyExtractor={(_, idx)=> idx.toString()}
          ListHeaderComponent={() => {
            console.log('voucher current:',currentVoucher)
            return (
              <>
                {
                  currentVoucher && 
                  (
                    <VoucherItem
                      type={'picked'}
                      data={currentVoucher}
                      onClick={() => onDeleteVoucher(currentVoucher)}
                      listVoucherExpired={listVoucherExpired}
                      orgDistributorId={orgDistributorId}
                    />
                  )
                }
              </>
            )
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyItem
                text={'Hiện tại không có voucher khuyến mãi'} 
              />)
          }}
          renderItem={({ item }) => {
            if (item.id !== currentVoucher?.id) {
              return (
                <VoucherItem
                  type={isSelect ? 'canUse': item.status}
                  data={item}
                  onClick={() => onChoose(item)}
                  listVoucherExpired={listVoucherExpired}
                  orgDistributorId={orgDistributorId}
                />
              )
            } else {
              return null
            }
          }}
        />
      }
      <ErrorView 
        isOpen={openError}
        error={errorMsg}
        onClose={() => setOpenError(false)}
      />
    </SafeAreaView>
  )
}

export default Voucher
