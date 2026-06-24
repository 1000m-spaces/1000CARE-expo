import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import Header from '~/common/Header/index'
import styles from './styles'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { Button, ModalSelect, TextInput } from '~/common/index'
import { getWards, getProvinces, getDistricts, getAddressRequestStatus, getUserId } from '~/store/selector'
import { useDispatch, useSelector } from 'react-redux'
import { getProvincesRequest, getDistrictsRequest, getWardsRequest, addAddressRequest } from '~/store/actions'
import Status from '~/common/Status/Status'
import { LoadingView } from '~/common'
import ErrorView from '~/common/ErrorView/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddAddressScreen = (props) => {
  const { orgAddress, goBack } = props.route?.params || {}

  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [numberPhone, setNumberPhone] = useState('')
  const [address, setAddress] = useState('')
  const [province, setProvince] = useState({})
  const [district, setDistrict] = useState({})
  const [ward, setWard] = useState({})
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
    if (orgAddress) {

    }
  }, [orgAddress])

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
        if (goBack) {
          goBack()
        }
        break
      case Status.ERROR:
        setLoading(false)
        setIsRequest(false)
        break
    }
  }, [isRequest, addressStatus])

  const onSave = () => {
    if (district.id && ward.id && address.trim() !== '' && name.trim() !== '' && numberPhone.trim() !== '') {
      setIsRequest(true)
      dispatch(addAddressRequest({
        full_name: name,
        country_id: 'vn',
        customer_id: userId,
        telephone: numberPhone,
        street: address,
        province_id: province.id,
        district_id: district.id,
        ward_id: ward.id,
        is_default: true,
      }))
    } else {
      setTextError('Vui lòng điền đầy đủ thông tin')
    }
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <Header
        title={strings.addAddress.title}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
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
                label={strings.addAddress.placeHolderName}
              />
            </View>
            <View style={styles.formItemContainer}>
              <TextInput
                value={numberPhone}
                onChangeText={(value) => setNumberPhone(value)}
                keyboardType='numeric'
                inputContainerStyle={styles.inputContainerStyle}
                labelStyle={styles.labelStyle}
                label={strings.addAddress.placeHolderNumberPhone}
              />
            </View>
            <View style={styles.formItemContainer}>
              <Text style={[styles.labelStyle]}>{strings.addAddress.placeHolderProvince}</Text>
              <ModalSelect
                style={[styles.inputContainerStyle, styles.noBorder]}
                textStyle={styles.modalSelectPlaceHolder}
                onChange={(province) => {
                  setProvince(province)
                }}
                label={strings.addAddress.placeHolderProvince}
                data={provinces}
              />
            </View>
            <View style={styles.formItemContainer}>
              <Text style={[styles.labelStyle]}>{strings.addAddress.placeHolderDistrict}</Text>
              <ModalSelect
                style={[styles.inputContainerStyle, styles.noBorder]}
                textStyle={styles.modalSelectPlaceHolder}
                label={strings.addAddress.placeHolderDistrict}
                data={districts}
                onChange={(district) => {
                  setDistrict(district)
                }}
                disabled={districts.length > 0 ? false : true}
              />
            </View>
            <View style={styles.formItemContainer}>
              <Text style={[styles.labelStyle]}>{strings.addAddress.placeHolderWards}</Text>
              <ModalSelect
                label={strings.addAddress.placeHolderWards}
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
                label={strings.addAddress.placeHolderAddress}
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
              text={strings.addAddress.add}
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

export default AddAddressScreen
