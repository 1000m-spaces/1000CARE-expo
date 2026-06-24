import React, { useCallback, useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ScrollView, SafeAreaView, PermissionsAndroid, Platform } from 'react-native'
import { Button, Image, ModalSelect, TextInput } from '~/common/index'
import styles from './styles'
import { getUpdatePharmacy, resetUpdatePharmacy, requestGetPharmacyInfo, deleteAccount, deleteAccountOtp, resetDeleteAccountOtp, logout, resetCart, getProvincesRequest, getDistrictsRequest, getWardsRequest } from '~/store/actions'
import { getStatusUpdatePharmacy, getErrorUpdatePharmacy, getPharmacyInfo, getUser, getDeleteAcountStatus, getDeleteAcountPharmaStatus, getProvinces, getDistricts, getWards } from '~/store/selector'
import { getListByPassFirebase } from '~/store/auth/authSelector'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import camera from '~/assets/camera/camera.png'
import pictureModal from '~/assets/camera/pictureModal.png'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import axios from 'axios'
import { back } from '~/assets/constants'
import Header from '~/common/Header/index'
import { LoadingView } from '~/common'
import Status from '~/common/Status/Status'
import ErrorView from '~/common/ErrorView/index'
import { showToast } from '~/utils/toast'
import { convertToObjectData } from '~/utils'
import { BASEPATH } from '~/constants/config'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import LegalInformation from './LegalInformation'
import UserInformation from './UserInformation'
import InvoiceInformation from './InvoiceInformation'
import Colors from '~/common/Colors/Colors'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { NAVIGATION_CONFIRM, NAVIGATION_TO_SPLASH_SCREEN } from '~/navigation/routes'
import strings from '~/i18n'
import { convertBirth } from '~/utils/date'

const InfoField = ({ label, placeholder, value, onChangeText, keyboardType, style }) => (
  <View style={[styles.field, style]}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      inputContainerStyle={styles.fieldInput}
      inputStyle={styles.fieldInputText}
    />
  </View>
)

const FormSection = ({ eyebrow, title, children }) => (
  <View style={styles.infoCard}>
    <Text style={styles.sectionEyebrow}>{eyebrow}</Text>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.sectionBody}>{children}</View>
  </View>
)

const list = [
  { name: 'Ảnh cửa hàng', star: true, url: '' },
  { name: 'Ảnh giấy chứng nhận cửa hàng', star: true, url: '' },
  { name: 'Ảnh giấy chứng nhận đăng ký kinh doanh', star: true, url: '' },
  { name: 'Ảnh Giấy chứng nhận đủ điều kiện kinh doanh', star: true, url: '' },
]

const InfoCustomer = props => {
  const dispatch = useDispatch()

  const statusUpdatePharmacy = useSelector(state => getStatusUpdatePharmacy(state))
  const errorUpdatePharmacy = useSelector(state => getErrorUpdatePharmacy(state))
  const pharmacyInfo = useSelector(state => getPharmacyInfo(state))
  const infoUser = useSelector(state => getUser(state))
  const deleteAccountStatus = useSelector(state => getDeleteAcountStatus(state))
  const deleteAcountPharmaStatus = useSelector(state => getDeleteAcountPharmaStatus(state))
  // const listPhoneByPass = useSelector(state => getListByPassFirebase(state))
  const provinces = useSelector(state => getProvinces(state))
  const districts = useSelector(state => getDistricts(state))
  const wards = useSelector(state => getWards(state))

  const [isSelectCamera, setSelectCamera] = useState('')
  const [isUrlDrugstore, setUrlDrugstore] = useState('')
  const [isUrlPracticingCertificate, setUrlPracticingCertificate] = useState('')
  const [isUrlBusinessCertificate, setUrlBusinessCertificate] = useState('')
  const [isUrlCertifiedPharmacy, setUrlCertifiedPharmacy] = useState('')
  const [isUrlQualifiedToPractice, setUrlQualifiedToPractice] = useState('')
  const [isOwnerFullName, setOwnerFullName] = useState('')
  const [isNameShop, setNameShop] = useState('')
  const [isOwnerEmail, setOwnerEmail] = useState('')
  const [isPhone, setPhone] = useState('')

  const [invoiceName, setInvoiceName] = useState('')
  const [invoiceAddress, setInvoiceAddress] = useState('')
  const [taxCode, setTaxCode] = useState('')

  const [isDate, setDate] = useState(new Date())
  const [isLoading, setLoading] = useState(false)
  const [updateErr, setUpdateError] = useState('')
  const [isOpenModal, setOpenModal] = useState(false)
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const [disable, setDisable] = useState(false)
  const formData = new FormData()
  const [province, setProvince] = useState({})
  const [district, setDistrict] = useState({})
  const [ward, setWard] = useState({})

  useEffect(() => {
    dispatch(getProvincesRequest())
  }, [])

  useEffect(() => {
    dispatch(getDistrictsRequest(province?.id))
  }, [province])
  useEffect(() => {
    dispatch(getWardsRequest(district?.id))
  }, [district])

  useEffect(() => {
    dispatch(requestGetPharmacyInfo())
  }, [])

  useEffect(() => {
    setDate(pharmacyInfo ? convertToObjectData(pharmacyInfo?.owner_birthday, 'DD/MM/YYYY HH:mm:ss')._d : '')
    setUrlDrugstore(pharmacyInfo?.general_verify_images)
    setUrlPracticingCertificate(pharmacyInfo?.practicing_cert_images)
    setUrlBusinessCertificate(pharmacyInfo?.business_registration_cert_images)
    setUrlCertifiedPharmacy(pharmacyInfo?.gpp_certificate_images)
    setUrlQualifiedToPractice(pharmacyInfo?.practicing_eligible_cert_images)
    setOwnerFullName(pharmacyInfo?.owner_full_name)
    setNameShop(pharmacyInfo?.name)
    setOwnerEmail(pharmacyInfo?.owner_email)
    setPhone(pharmacyInfo?.owner_phone)
    setTaxCode(pharmacyInfo?.tax_code)
    setInvoiceName(pharmacyInfo?.name_invoice)
    setInvoiceAddress(pharmacyInfo?.address_invoice)
    setProvince(pharmacyInfo?.invoice_info?.address_invoice?.province)
    setDistrict(pharmacyInfo?.invoice_info?.address_invoice?.district)
    setWard(pharmacyInfo?.invoice_info?.address_invoice?.ward)
  }, [pharmacyInfo])

  useEffect(() => {
    list[0].url = pharmacyInfo?.general_verify_images
    list[1].url = pharmacyInfo?.practicing_cert_images
    list[2].url = pharmacyInfo?.business_registration_cert_images
    list[3].url = pharmacyInfo?.practicing_eligible_cert_images
  }, [pharmacyInfo])

  const showDatePicker = () => {
    setDatePickerOpen(true)
  }

  const hideDatePicker = () => {
    setDatePickerOpen(false)
  }

  const handleConfirm = (date) => {
    hideDatePicker()
    setDate(date)
  }

  const uploadImage = async (data) => {
    setLoading(true)
    formData.append('images', { uri: data.uri, type: 'image/jpg', name: data.fileName })
    const res = await axios.post(BASEPATH + '/cdn/images', formData)
    console.log('Success on cdn/images: ', res)
    list[isSelectCamera].url = res?.data?.media_link
    setLoading(false)
  }

  const openModal = useCallback((id) => {
    setOpenModal(true)
    setSelectCamera(id)
  })

  const openCamera = () => {
    var option = {
      saveToPhotos: true,
      mediaType: 'photo',
    }
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ],
      ).then((results) => {
        console.log(results['android.permission.READ_EXTERNAL_STORAGE'])
        if (results['android.permission.CAMERA'] === 'granted' &&
          (results['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' || results['android.permission.READ_EXTERNAL_STORAGE'] === 'never_ask_again') &&
          (results['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted' || results['android.permission.WRITE_EXTERNAL_STORAGE'] === 'never_ask_again')) {
          launchCamera(option, reponse => {
            console.log('response', reponse)
            if (reponse && reponse.assets) {
              setOpenModal(false)
              uploadImage(reponse.assets[0])
            }
          })
        }
      })
    } else {
      launchCamera(option, reponse => {
        console.log('response', reponse)
        if (reponse && reponse.assets) {
          setOpenModal(false)
          uploadImage(reponse.assets[0])
        }
      })
    }
  }

  const openLibrary = async () => {
    var option = {
      selectionLimit: 0,
      mediaType: 'photo',
    }
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        )
        console.log('thu viennnnnnnnnnnnn:', granted, PermissionsAndroid.RESULTS.GRANTED)
        if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === 'never_ask_again') {
          launchImageLibrary(option, reponse => {
            console.log('response', reponse)
            if (reponse && reponse.assets) {
              setOpenModal(false)
              uploadImage(reponse.assets[0])
            }
          })
        } else {
          console.log('Camera permission denied')
        }
      } catch (err) {
        console.warn(err)
      }
    } else {
      launchImageLibrary(option, reponse => {
        console.log('response', reponse)
        if (reponse && reponse.assets) {
          setOpenModal(false)
          uploadImage(reponse.assets[0])
        }
      })
    }
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()
    if (month.length < 2)
      month = '0' + month
    if (day.length < 2)
      day = '0' + day
    return [year, month, day].join('-')
  }
  useEffect(() => {
    setUrlDrugstore(list[0].url)
    setUrlPracticingCertificate(list[1].url)
    setUrlBusinessCertificate(list[2].url)
    setUrlQualifiedToPractice(list[3].url)
  })

  useEffect(() => {
    switch (statusUpdatePharmacy) {
      case Status.LOADING:
        setLoading(true)
        break
      case Status.SUCCESS:
        setLoading(false)
        dispatch(resetUpdatePharmacy())
        break
      case Status.ERROR:
        setLoading(false)
        break
    }
  }, [statusUpdatePharmacy])

  useEffect(() => {
    if (statusUpdatePharmacy == Status.SUCCESS) {
      dispatch(requestGetPharmacyInfo())
      showToast('Cập nhập dữ liệu thành công')
      setTimeout(() => props.navigation.goBack(), 500)
    }
  }, [statusUpdatePharmacy])

  useEffect(() => {
    setUpdateError(errorUpdatePharmacy)
  }, [errorUpdatePharmacy])

  const updateInfo = useCallback(() => {
    if (!isOwnerFullName || !isPhone || !isNameShop || !province?.id || !district?.id || !ward?.id || !invoiceAddress) {
      if (!isNameShop) {
        setUpdateError('Vui lòng điền tên cửa hàng')
      } else if (!isOwnerFullName) {
        setUpdateError('Vui lòng điền tên chủ cửa hàng')
        // } else if (!isOwnerEmail) {
        //   setUpdateError('Vui lòng điền Email')
        // } else if (!isDate) {
        //   setUpdateError('Vui lòng chọn ngày tháng')
      } else if (!invoiceAddress) {
        setUpdateError('Vui lòng nhập số nhà, đuờng phố...')
      } else if (!province?.id) {
        setUpdateError('Vui lòng chọn Tỉnh Thành')
      } else if (!district?.id) {
        setUpdateError('Vui lòng chọn Quận/Huyện')
      } else if (!ward?.id) {
        setUpdateError('Vui lòng chọn Xã/Phường')
      } else {
        setUpdateError('Vui lòng điền số điện thoại')
      }
    } else {
      var date = formatDate(isDate)
      dispatch(getUpdatePharmacy({
        address: {},
        owner_full_name: isOwnerFullName,
        name: isNameShop,
        owner_phone: isPhone,
        owner_birthday: date,
        owner_email: isOwnerEmail,
        business_registration_cert_images: isUrlBusinessCertificate,
        general_verify_images: isUrlDrugstore,
        gpp_certificate_images: isUrlCertifiedPharmacy,
        practicing_cert_images: isUrlPracticingCertificate,
        practicing_eligible_cert_images: isUrlQualifiedToPractice,
        tax_code: taxCode,
        address_invoice: invoiceAddress,
        name_invoice: invoiceName,
        invoice_info: {
          address: invoiceAddress,
          address_invoice: {
            country_id: pharmacyInfo?.address?.country_id,
            district_id: district?.id,
            id: pharmacyInfo?.invoice_info?.address_invoice?.id,
            province_id: province?.id,
            street: pharmacyInfo?.invoice_info?.address_invoice?.street,
            ward_id: ward?.id,
          },
          id: pharmacyInfo?.invoice_info?.id,
          name_invoice: pharmacyInfo?.invoice_info?.name_invoice,
        },
      }))
    }
  })

  const onErrorClose = () => {
    dispatch(resetUpdatePharmacy())
    setUpdateError('')
  }

  const onLogoutPress = () => {
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'))
    dispatch(resetCart())
    dispatch(logout())
  }

  const deleteAccounts = () => {
    // dispatch(deleteAccount())
    dispatch(deleteAccountOtp(infoUser?.mobile.replace('+', ''), true))
  }

  useEffect(() => {
    if (deleteAccountStatus == Status.LOADING) {
      setDisable(true)
    }
    if (deleteAccountStatus == Status.ERROR) {
      setDisable(false)
    }
    if (deleteAccountStatus == Status.SUCCESS) {
      setDisable(false)
      props.navigation.navigate(NAVIGATION_CONFIRM, {
        type: 'DELETE_ACOUNT',
      })
      dispatch(resetDeleteAccountOtp())
    }
  }, [deleteAccountStatus])

  useEffect(() => {
    switch (deleteAcountPharmaStatus) {
      case Status.LOADING:
        setLoading(true)
        break
      case Status.SUCCESS:
        setLoading(false)
        onLogoutPress()
        props.navigation.navigate(NAVIGATION_TO_SPLASH_SCREEN)
        break
      case Status.ERROR:
        setLoading(false)
        break
    }
  }, [deleteAcountPharmaStatus])

  return (
    <SafeAreaView style={[styles.container, { opacity: isOpenModal ? 0.2 : 1 }]}>
      <Header
        title={'Thông tin khách hàng'}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
        showRight={true}
        rightAction={updateInfo}
        iconRight='checkmark-sharp'
        titleStyles={{ marginLeft: 0 }}
      />
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.heroEyebrow}>CUSTOMER PROFILE</Text>
          <Text style={styles.heroTitle}>Hồ sơ cửa hàng</Text>
          <Text style={styles.heroSubtitle}>Cập nhật thông tin cửa hàng, chủ tài khoản và dữ liệu xuất hóa đơn.</Text>
        </View>

        <FormSection eyebrow="STORE" title="Thông tin cửa hàng">
          <InfoField
            label="Tên cửa hàng"
            placeholder="Nhập tên cửa hàng"
            value={isNameShop}
            onChangeText={setNameShop}
          />
          <InfoField
            label="Chủ cửa hàng"
            placeholder="Nhập tên chủ cửa hàng"
            value={isOwnerFullName}
            onChangeText={setOwnerFullName}
          />
          <InfoField
            label="Email"
            placeholder="email@domain.com"
            value={isOwnerEmail}
            onChangeText={setOwnerEmail}
            keyboardType="email-address"
          />
          <View style={styles.twoColumn}>
            <TouchableOpacity style={[styles.field, styles.columnField]} onPress={showDatePicker} activeOpacity={0.84}>
              <Text style={styles.fieldLabel}>Ngày sinh</Text>
              <View style={styles.readonlyInput}>
                <Text style={styles.readonlyText}>{isDate ? convertBirth(isDate, 'DD/MM/YYYY HH:mm:ss') : '__/__/____'}</Text>
              </View>
            </TouchableOpacity>
            <InfoField
              label="Số điện thoại"
              placeholder="Số điện thoại"
              value={isPhone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              style={styles.columnFieldRight}
            />
          </View>
        </FormSection>

        <FormSection eyebrow="INVOICE" title="Thông tin xuất hóa đơn">
          <InfoField
            label="Tên trên hóa đơn"
            placeholder="Tên"
            value={invoiceName}
            onChangeText={setInvoiceName}
          />
          <InfoField
            label="Địa chỉ"
            placeholder="Số nhà, đường phố..."
            value={invoiceAddress}
            onChangeText={setInvoiceAddress}
          />
          <InfoField
            label="Mã số thuế"
            placeholder="MST"
            value={taxCode}
            onChangeText={setTaxCode}
          />
        </FormSection>

        <FormSection eyebrow="ADDRESS" title="Khu vực xuất hóa đơn">
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>{strings.addAddress.placeHolderProvince}</Text>
            <ModalSelect
              style={styles.selectInput}
              inputContainerStyle={styles.selectInnerInput}
              textStyle={styles.modalSelectPlaceHolder}
              onChange={(province) => {
                setProvince(province)
                setDistrict({})
                setWard({})
              }}
              label={province?.name || strings.addAddress.placeHolderProvince}
              data={provinces}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>{strings.addAddress.placeHolderDistrict}</Text>
            <ModalSelect
              style={styles.selectInput}
              inputContainerStyle={styles.selectInnerInput}
              textStyle={styles.modalSelectPlaceHolder}
              label={district?.name || strings.addAddress.placeHolderDistrict}
              data={districts}
              onChange={(district) => {
                setDistrict(district)
                setWard({})
              }}
              disabled={districts.length > 0 ? false : true}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>{strings.addAddress.placeHolderWards}</Text>
            <ModalSelect
              label={ward?.name || strings.addAddress.placeHolderWards}
              textStyle={styles.modalSelectPlaceHolder}
              style={styles.selectInput}
              inputContainerStyle={styles.selectInnerInput}
              data={wards}
              onChange={(ward) => {
                setWard(ward)
              }}
              disabled={wards.length > 0 ? false : true}
            />
          </View>
        </FormSection>

        <TouchableOpacity
          style={styles.deleteButton}
          disabled={disable}
          onPress={() => deleteAccounts()}
        >
          <Text style={styles.textDelete}>Xóa tài khoản</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {/* <Button
        text={"Xóa tài khoản"}
        onPressEvent={() => deleteAccounts()}
        styleView={{paddingHorizontal:0}}
        styleButton={{borderRadius:0}}
        disabled={disable}
      /> */}
      <DateTimePickerModal
        isVisible={datePickerOpen}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Modal
        onBackdropPress={() => setOpenModal(false)}
        visible={isOpenModal}
      >
        <View style={styles.containerModal}>
          <Text style={styles.titleModal}>Lựa chọn hình thức tải lên</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View>
              <TouchableOpacity
                onPress={openCamera}
                style={styles.selectCamera}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={camera}
                />
              </TouchableOpacity>
              <Text style={styles.textSelect}>Chụp ảnh</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={openLibrary}
                style={styles.selectCamera}
              >
                <Image
                  style={{ height: 25, width: 25 }}
                  source={pictureModal}
                />
              </TouchableOpacity>
              <Text style={styles.textSelect}>Thư viện</Text>
            </View>
          </View>
        </View>
      </Modal>
      {isLoading && <LoadingView variant="form" />}
      <ErrorView
        error={updateErr}
        isOpen={updateErr ? true : false}
        onClose={onErrorClose}
      />
    </SafeAreaView>
  )
}
export default InfoCustomer
