import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import Header from '~/common/Header/index'
import styles from './styles'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { Button, ModalSelect, TextInput } from '~/common/index'
import { getWards, getProvinces, getDistricts, getAddressRequestStatus, getUserId } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import { getProvincesRequest, getDistrictsRequest, getWardsRequest, updateAddressRequest, deleteAddressRequest } from '~/store/actions'
import Status from '~/common/Status/Status'
import { LoadingView } from '~/common'
import ErrorView from '~/common/ErrorView/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddressUpdate = (props) => {
  const addressOld = props.route?.params?.addressOld
  const idAddress = addressOld?.id
  const dispatch = useDispatch()

  const [name, setName] = useState(addressOld.full_name)
  const [numberPhone, setNumberPhone] = useState(addressOld.telephone)
  const [address, setAddress] = useState(addressOld.street)
  const [province, setProvince] = useState(addressOld.province)
  const [district, setDistrict] = useState(addressOld.district)
  const [ward, setWard] = useState(addressOld.ward)
  const addressStatus = useSelector(state => getAddressRequestStatus(state))
  const [isRequest, setIsRequest] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [textError, setTextError] = useState(null)

  const provinces = useSelector(state => getProvinces(state))
  const districts = useSelector(state => getDistricts(state))
  const wards = useSelector(state => getWards(state))

  const userId = useSelector(state => getUserId(state))

  useEffect(() => {
    dispatch(getProvincesRequest())
  }, [])

  useEffect(() => {
    dispatch(getDistrictsRequest(province.id))
  }, [province])

  useEffect(() => {
    dispatch(getWardsRequest(district.id))
  }, [district])
  useEffect(() => {
    if (!isRequest)
      return
    switch (addressStatus) {
      case Status.LOADING:
        setLoading(true)
        break
      case Status.SUCCESS:
        props.navigation.pop()
        break
      case Status.ERROR:
        break
    }
  }, [isRequest, addressStatus])

  const onSave = () => {
    if (district.id && ward.id && address.trim() !== '' && name.trim() !== '' && numberPhone.trim() !== '') {
      setIsRequest(true)
      dispatch(updateAddressRequest(idAddress, {
        full_name: name,
        country_id: 'vn',
        customer_id: userId,
        telephone: numberPhone,
        street: address,
        province_id: province.id,
        district_id: district.id,
        ward_id: ward.id,
        is_default: false,
      }))
    } else {
      setTextError('Vui lòng điền đầy đủ thông tin')
    }
  }

  const deleteAddressReq = () => {
    dispatch(deleteAddressRequest(idAddress))
    setIsRequest(true)
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Header
        title={strings.addressUpdate.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <TouchableOpacity
        onPress={deleteAddressReq}
        style={styles.buttonDelete}
      >
        <Text style={styles.textDelete}>Xóa</Text>
      </TouchableOpacity>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={styles.mainContainer}>
          <View style={[styles.formContainer, styles.mt12]}>
            <View style={styles.formItemContainer}>
              <TextInput
                value={name}

                onChangeText={(value) => setName(value)}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                label={strings.addressUpdate.placeHolderName}
              />
            </View>
            <View style={styles.formItemContainer}>
              <TextInput
                value={numberPhone}
                onChangeText={(value) => setNumberPhone(value)}
                keyboardType='numeric'
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                label={strings.addressUpdate.placeHolderNumberPhone}
              />
            </View>
            <View style={styles.formItemContainer}>
              <Text style={[styles.labelStyle]}>{strings.addressUpdate.placeHolderProvince}</Text>
              <ModalSelect
                style={[styles.inputContainerStyle, styles.noBorder]}
                textStyle={styles.modalSelectPlaceHolder}
                onChange={(province) => {
                  setProvince(province)
                }}
                label={addressOld.province?.name}
                data={provinces}
              />
            </View>
            <View style={styles.formItemContainer}>
              <Text style={[styles.labelStyle]}>{strings.addressUpdate.placeHolderDistrict}</Text>
              <ModalSelect
                style={[styles.inputContainerStyle, styles.noBorder]}
                textStyle={styles.modalSelectPlaceHolder}
                label={addressOld.district?.name}
                data={districts}
                onChange={(district) => {
                  setDistrict(district)
                }}
                disabled={districts.length > 0 ? false : true}
              />
            </View>
            <View style={styles.formItemContainer}>
              <Text style={[styles.labelStyle]}>{strings.addressUpdate.placeHolderWards}</Text>
              <ModalSelect
                label={addressOld.ward?.name}
                textStyle={styles.modalSelectPlaceHolder}
                style={[styles.inputContainerStyle, styles.noBorder]}
                data={wards}
                onChange={(ward) => {
                  setWard(ward)
                }}
                disabled={wards.length > 0 ? false : true}
              />
            </View>
            <View style={styles.formItemContainer}>
              <TextInput
                value={address}
                onChangeText={(value) => setAddress(value)}
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                label={strings.addressUpdate.placeHolderAddress}
              />
            </View>
          </View>
          <View
            style={styles.bottomContainer}
          >
            <Button
              styleView={styles.nextStepBtnContainer}
              styleButton={styles.nextStepBtn}
              onPressEvent={onSave}
              text={strings.addressUpdate.update}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      {isLoading && <LoadingView variant="form" />}
      <ErrorView
        error={textError}
        isOpen={textError ? true : false}
        onClose={() => setTextError(null)}
      />
    </SafeAreaView>
  )
}

export default AddressUpdate
