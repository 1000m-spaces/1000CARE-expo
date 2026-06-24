import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import Header from '~/common/Header/index'
import styles from './styles'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { NAVIGATION_ADDRESS_UPDATE, NAVIGATION_ADD_ADDRESS_SCREEN } from '~/navigation/routes'
import { getAddressBooks, getAddressRequestStatus, getAddCartInfoStatus } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import { addOptionInfo, deleteAddressRequest, getAddressBooksRequest, updateAddressRequest } from '~/store/actions'
import Status from '~/common/Status/Status'
import AddDeliveryAddress from './AddDeliveryAddress'
import DeliveryItem from './DeliveryItem'
import ErrorView from '~/common/ErrorView/index'
import { LoadingView } from '~/common/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddressChooseScreen = (props) => {
  const { chooseAddress } = props.route?.params || {}
  const dispatch = useDispatch()
  const addCartInfoStatus = useSelector(state => getAddCartInfoStatus(state))
  const [isRequestChangeAddress, setIsRequestChangeAddress] = useState(false)
  const addressData = useSelector(state => getAddressBooks(state))
  const errorMsg = useSelector(state => state.cart.errorMsg)
  const [openError, setOpenError] = useState(false)
  const [isRequest, setIsRequest] = useState(false)
  const addressStatus = useSelector(state => getAddressRequestStatus(state))
  const [isLoading, setLoading] = useState(false)
  const [isAddAddressSuccess, setIsAddAddressSuccess] = useState(false)

  useEffect(() => {
    dispatch(getAddressBooksRequest())
  }, [])

  useEffect(() => {
    if (!isRequestChangeAddress)
      return
    switch (addCartInfoStatus) {
      case Status.LOADING:
        break
      case Status.SUCCESS:
        setIsRequestChangeAddress(false)
        props.navigation.pop()
        break
      case Status.ERROR:
        setIsRequestChangeAddress(false)
        break
    }
  }, [isRequestChangeAddress, addCartInfoStatus])

  useEffect(() => {
    if (!isRequest)
      return
    setIsRequest(false)
    switch (addressStatus) {
      case Status.LOADING:
        setLoading(true)
        break
      case Status.SUCCESS:
        setLoading(false)
        break
      case Status.ERROR:
        break
    }
  }, [isRequest, addressStatus])

  useEffect(() => {
    if (!isAddAddressSuccess || !addressData || addressData.length === 0)
      return
    const address = addressData[addressData.length - 1]
    setIsRequestChangeAddress(true)
    dispatch(addOptionInfo(address?.id, 1))
  }, [addressData, isAddAddressSuccess])

  const onChoose = (address) => {
    if (chooseAddress) {
      setIsRequestChangeAddress(true)
      dispatch(addOptionInfo(address?.id, 1))
    }
  }

  const onAddAddressSuccess = () => {
    if (chooseAddress) {
      setIsAddAddressSuccess(true)
    }
  }

  const onDelete = (address) => {
    dispatch(deleteAddressRequest(address.id))
    setIsRequest(true)
  }

  const onDefault = (address) => {
    console.log('ADDDDREEESSS::::::::::', address)
    dispatch(updateAddressRequest(address.id, {
      full_name: address.full_name,
      country_id: 'vn',
      customer_id: address.customer_id,
      telephone: address.telephone,
      street: address.street,
      province_id: address.province.id,
      district_id: address.district.id,
      ward_id: address.ward.id,
      is_default: true,
    }))
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.mainContainer}
      >
        <Header
          title={strings.addressChoose.title}
          leftAction={() => props.navigation.pop()}
          iconLeft={back}
        />
        <FlatList
          data={addressData}
          scrollEnabled={true}
          ListHeaderComponent={() => {
            return (
              <AddDeliveryAddress
                onPress={() => {
                  props.navigation.navigate(NAVIGATION_ADD_ADDRESS_SCREEN, {
                    goBack: () => {
                      onAddAddressSuccess()
                    },
                  })
                }}
              />
            )
          }}
          renderItem={({ item }) => {
            return (
              <DeliveryItem
                address={item}
                onPress={() => onChoose(item)}
                onChange={() => props.navigation.navigate(NAVIGATION_ADDRESS_UPDATE, { addressOld: item })}
                onDelete={() => onDelete(item)}
                onDefault={() => onDefault(item)}
              />
            )
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.itemSeparator} />
            )
          }}
          keyExtractor={(_, index) => {
            return index.toString()
          }}
        />
      </KeyboardAwareScrollView>
      {isLoading && <LoadingView variant="list" />}
      <ErrorView
        error={errorMsg}
        isOpen={openError}
        onClose={() => setOpenError(false)}
      />
    </SafeAreaView>
  )
}
export default AddressChooseScreen
