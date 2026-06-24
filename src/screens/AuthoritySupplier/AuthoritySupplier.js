import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getListDistributorAll, getListDistributorSearch, getStatusAuthorizedSupplier, getErrorAuthorizedSupplier, getUser, getPharmacyInfo } from '~/store/selector'
import { addAuthorizedSupplier, getAllDistributors, requestGetPharmacyInfo, resetAddAuthorizedSupplier, resetSearchDistributor } from '~/store/actions'
import Item from './Item'
import Status from '~/common/Status/Status'
import { LoadingView } from '~/common'
import ErrorView from '~/common/ErrorView/index'
import CheckBox from 'react-native-checkbox'
import InputSearchSupplier from './InputSearchSupplier'
import EmptyItem from '~/common/EmptyItem/index'
import Colors from '~/common/Colors/Colors'
import { ic_check_box_checked, ic_check_box_unchecked } from '../../assets/constants'
import styles from './styles'

const AuthoritySupplier = (props) => {
  const dispatch = useDispatch()
  const [checkBox, setCheckBox] = useState(true)
  const [showWarining, setWarining] = useState(false);
  const listDistri = useSelector(state => getListDistributorAll(state))
  const [listDistributors, setListDistributors] = useState([])
  const listSearchDistri = useSelector(state => getListDistributorSearch(state))
  const [searchDistributor, setSearchDistributor] = useState([])
  // const pharmacyInfo = useSelector(state => getUser(state))
  const pharmacyInfo = useSelector(state => getPharmacyInfo(state))
  const statusAddAuthorized = useSelector(state => getStatusAuthorizedSupplier(state))
  const errorAddAuthorized = useSelector(state => getErrorAuthorizedSupplier(state))
  const [distributorAuthorized, setDistributorAuthorized] = useState([])
  const [removedAuthorized, setRemovedAuthorized] = useState([])
  const [isLoading,setLoading] = useState(false)
  const [isModalAuthority, setModalAuthority] = useState(false)
  useEffect(() => {
    initializeListDistributors()
  },[])
  const initializeListDistributors = () => {
    dispatch(requestGetPharmacyInfo())
    dispatch(getAllDistributors(1,80,1,false))
  }
  useEffect(() => {
    if (pharmacyInfo && pharmacyInfo?.id) {
      initializeAuthorized(listDistri, 1)
    }
  }, [pharmacyInfo])
  const initializeAuthorized = (distributors, type) => {
    const safeDistributors = Array.isArray(distributors) ? distributors : []
    if (pharmacyInfo && pharmacyInfo?.accredit && pharmacyInfo?.accredit.length > 0 && safeDistributors.length > 0) {
      const mapListDistributor = new Map(
        safeDistributors.map(item => {
          item.isChecked = false
          item.fromServer = false
          return [item.id, item]
        }),
      )
      pharmacyInfo.accredit.map((accredit) => {
        if (mapListDistributor.has(accredit.id)) {
          const tempItem = mapListDistributor.get(accredit.id)
          tempItem.isChecked = true
          tempItem.fromServer = true
          mapListDistributor.set(accredit.id, tempItem)
        }
      })
      if (type === 1) {
        setListDistributors(Array.from(mapListDistributor.values()))
      } else {
        setSearchDistributor(Array.from(mapListDistributor.values()))
      }
      
    } else {
      const mapListDistributor = new Map(
        safeDistributors.map(item => {
          item.isChecked = false
          item.fromServer = false
          return [item.id, item]
        }),
      )
      setListDistributors(Array.from(mapListDistributor.values()))
    }
    
  }
  useEffect(() => {
    if (listSearchDistri && listSearchDistri.length > 0) {
      initializeAuthorized(listSearchDistri, 2)
    }
  }, [listSearchDistri])

  useEffect(() => {

    switch(statusAddAuthorized){
      case Status.LOADING:
        setLoading(true)
        break
      case Status.SUCCESS:
        setLoading(false)
        dispatch(resetAddAuthorizedSupplier())
        props.navigation.pop()
        break
      case Status.ERROR:
        setLoading(false)
    }
  },[statusAddAuthorized])

  const updateInfo = () => {
    if (!checkBox) {
      setWarining(true)
      return
    }
    const query = {
      add_distributors: Array.from(distributorAuthorized, val => val.id),
      pharmacy_id: parseInt(pharmacyInfo?.id, 10),
      remove_distributors: Array.from(removedAuthorized, val => val.id),
    }
    dispatch(addAuthorizedSupplier(query))
    dispatch(resetSearchDistributor())
  }

  const onErrorClose = () => {
    dispatch(resetAddAuthorizedSupplier())
  }

  const leftAction = () => {
    props.navigation.pop()
    dispatch(resetSearchDistributor())
  }
  const handleSelectDistributor = (dis) => {
    const tempItemSelected = JSON.parse(JSON.stringify(dis))
    if (searchDistributor && searchDistributor.length > 0) {
      setSearchDistributor([])
    }
    listDistributors.map(item => {
      if (item.id === dis.id) {
        item.isChecked = !tempItemSelected.isChecked
      }
    })
    setListDistributors([...listDistributors])
    if (tempItemSelected && tempItemSelected.isChecked === false) {
      if (removedAuthorized && removedAuthorized.length >= 0 && tempItemSelected.fromServer === true) {
        setRemovedAuthorized([...removedAuthorized].filter(item => item.id !== tempItemSelected.id))
      }
      if (tempItemSelected.fromServer === false) {
        const tempAuthorized = [...distributorAuthorized]
        tempAuthorized.push({
          ...tempItemSelected,
          isChecked: true,
        })
        setDistributorAuthorized(tempAuthorized)
      }
      
    }
    if (tempItemSelected && tempItemSelected.isChecked === true) {
      if (dis.fromServer === true) {
        setRemovedAuthorized([...removedAuthorized, { ...dis }])
      } else {
        setDistributorAuthorized([...distributorAuthorized].filter(item => item.id !== dis.id))
      }
    }
    
  }
  useEffect(() => {
    console.log('removed list:::', removedAuthorized)
  }, [removedAuthorized])
  useEffect(() => {
    console.log('list selected :::', distributorAuthorized)
  }, [distributorAuthorized])
  const renderItem = ({ item, index }) => {
    return(
      <Item 
        data={item}
        index={index}
        clickSelectDistri={() => handleSelectDistributor(item)}
        pharmacyInfo={pharmacyInfo}
      />
    )
  }
  return(
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={'Ủy quyền nhà cung cấp'}
        leftAction={leftAction}
        iconLeft={back}
        showRight={true}
        rightAction={updateInfo}
        iconRight='checkmark-sharp'
        titleStyles={{ marginLeft:0 }}
      />
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>SUPPLIER AUTHORITY</Text>
        <Text style={styles.heroTitle}>Ủy quyền nhà cung cấp</Text>
        <Text style={styles.heroSubtitle}>Cho phép nhà cung cấp đã chọn tạo đơn hàng hỗ trợ cửa hàng của bạn.</Text>
      </View>
      <View style={styles.searchPanel}>
        <InputSearchSupplier isEmpty={searchDistributor.length === 0} />
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => `${item.id}_${item.name}`}
        data={searchDistributor.length > 0 ? listSearchDistri : listDistributors}
        renderItem={renderItem}
        ListEmptyComponent={() => {
          return(
            <EmptyItem text='Không tìm thấy NCC nào' />
          )
        }}
      />
      <View style={styles.consentBar}>
        <CheckBox
          checked={checkBox}
          onChange={() => setCheckBox(!checkBox)}
          checkedImage={ic_check_box_checked}
          uncheckedImage={ic_check_box_unchecked}
          label={''}
          containerStyle={styles.consentCheck}
          labelStyle={{ color:'black',fontSize:14 }}
        />
        <Text numberOfLines={3} style={styles.consentText}>Tôi đồng ý <Text onPress={()=>setModalAuthority(true)} style={styles.consentLink}>uỷ quyền</Text> cho các nhà cung cấp đã chọn.</Text>
      </View>
      {isLoading && <LoadingView variant="list" />}
      <ErrorView
        error={errorAddAuthorized}
        isOpen={errorAddAuthorized === Status.ERROR ? true : false }
        onClose={onErrorClose}
      />
      <ErrorView
        error={'Vui lòng đồng ý với các điều khoản'}
        isOpen={showWarining}
        onClose={() => setWarining(false)}
      />
      <ErrorView
        error={'Khi Ủy quyền, bạn đã đồng ý cho Nhà cung cấp quyền Tạo đơn hàng giúp mình. Nếu muốn HỦY Ủy quyền, hãy bỏ chọn Nhà cung cấp đó và lưu lại.'}
        isOpen={isModalAuthority}
        onClose={() => setModalAuthority(false)}
      />
    </SafeAreaView>
  )
}
export default AuthoritySupplier
