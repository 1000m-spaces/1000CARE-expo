import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getListDistributorAll, getPharmacyInfo, getStatusAddFavouriteSupplier, getErrorAddFavouriteSupplier, getListDistributorSearch } from '~/store/selector'
import { getAllDistributors, requestGetPharmacyInfo, getAddFavouriteSupplier, resetAddFavouriteSupplier, resetSearchDistributor } from '~/store/actions'
import Item from './Item'
import Status from '~/common/Status/Status'
import { LoadingView, Text } from '~/common'
import ErrorView from '~/common/ErrorView/index'
import InputSearchSupplier from './InputSearchSupplier'
import EmptyItem from '~/common/EmptyItem/index'
import styles from './styles'

const FavouriteSupplier = (props) => {
  const dispatch = useDispatch()
  const listDistri = useSelector(state => getListDistributorAll(state))
  const listSearchDistri = useSelector(state => getListDistributorSearch(state))
  const pharmacyInfo = useSelector(state => getPharmacyInfo(state))
  const statusAddFavourite = useSelector(state => getStatusAddFavouriteSupplier(state))
  const errorAddFavourite = useSelector(state => getErrorAddFavouriteSupplier(state))

  const [dataItemDistri, setDataItemDistri] = useState({ id:pharmacyInfo?.favourite_distributor?.id })
  const [isLoading,setLoading] = useState(false)
  console.log('bienbuonbucccccccccc:',listSearchDistri,listDistri)
  useEffect(() => {
    dispatch(requestGetPharmacyInfo())
    dispatch(getAllDistributors(1,80,1,false))
  },[])

  useEffect(() => {
    switch(statusAddFavourite){
      case Status.LOADING:
        setLoading(true)
        break
      case Status.SUCCESS:
        setLoading(false)
        dispatch(requestGetPharmacyInfo())
        dispatch(resetAddFavouriteSupplier())
        props.navigation.pop()
        break
      case Status.ERROR:
        setLoading(false)
    }
  },[statusAddFavourite])

  const updateInfo = () => {
    dispatch(getAddFavouriteSupplier(pharmacyInfo?.id, dataItemDistri?.id))
    dispatch(resetSearchDistributor())
  }

  const onErrorClose = () => {
    dispatch(resetAddFavouriteSupplier())
  }

  const leftAction = () => {
    props.navigation.pop()
    dispatch(resetSearchDistributor())
  }

  return(
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={'Nhà cung cấp yêu thích'}
        leftAction={leftAction}
        iconLeft={back}
        showRight={true}
        rightAction={updateInfo}
        iconRight='checkmark-sharp'
        titleStyles={{ marginLeft:0 }}
      />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>PREFERRED SUPPLIER</Text>
        <Text style={styles.heroTitle}>Nhà cung cấp yêu thích</Text>
        <Text style={styles.heroSubtitle}>Chọn một nhà cung cấp mặc định để ưu tiên dữ liệu sản phẩm và đơn hàng.</Text>
      </View>
      <View style={styles.searchPanel}>
        <InputSearchSupplier />
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={(listSearchDistri == null || listSearchDistri == undefined) ? [] : listSearchDistri.length > 0 ? listSearchDistri : listDistri}
        renderItem={(item) => {
          return(
            <Item 
              data={item.item}
              index={item.index}
              clickSelectDistri={(dataItem) => setDataItemDistri(dataItem)}
              distriSelect = {dataItemDistri}
              pharmacyInfo={pharmacyInfo}
            />
          )
        }}
        ListEmptyComponent={() => {
          return(
            <EmptyItem text='Không tìm thấy NCC nào' />
          )
        }}
      />
      {isLoading && <LoadingView variant="list" />}
      <ErrorView
        error={errorAddFavourite}
        isOpen={errorAddFavourite ? true : false}
        onClose={onErrorClose}
      />
    </SafeAreaView>
  )
}
export default FavouriteSupplier
