import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Image } from '~/common/index'
import { delivered } from '~/assets/constants'
import Colors from '~/common/Colors/Colors'
import PressScale from '~/design-system/PressScale'

const DeliveryItem = ({ address, onPress, onChange, onDelete, onDefault }) => {
  return (
    <PressScale
      onPress={onPress}
      style={styles.wrapper}
    >
      <View style={styles.wrapperIcon}>
        <Image
          style={styles.icon}
          source={delivered}
          tintColor="rgba(66, 0, 255, 1)"
        />
      </View>
      <View style={styles.infoDelivery}>
        <View style={styles.addressInfoContainer}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={styles.addressName}>
              {address?.full_name} - {address?.telephone}
            </Text>
            {address.is_default &&
            <View style={styles.viewDefault}>
              <Text style={{color:'white'}}>Mặc định</Text>
            </View>}
          </View>
          <Text style={[styles.addressText, styles.mt6]}>
            {address?.street} - {address?.ward.name} - {address?.district.name} - {address?.province.name} - {address?.country_id}
          </Text>
        </View>
        <View
          style={styles.buttonWrapper}
        >
          <View style={{flexDirection:'row'}}>
            <PressScale
              onPress={onChange}
            >
              <Text
                style={styles.changeAddressText}
              >
              Thay đổi
              </Text>
            </PressScale>
            <PressScale
              onPress={onDelete}
            >
              <Text
                style={styles.deleteAddressText}
              >
              Xóa
              </Text>
            </PressScale>
          </View>
          <PressScale onPress={onDefault}>
            <Text style={styles.defaultAddressText}>Đặt làm mặc định</Text>
          </PressScale>
        </View>
      </View>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: '#FFF',

    paddingHorizontal: 18,
    paddingVertical: 12,

    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderStyle: 'solid',

    display: 'flex',
    flexDirection: 'row',
  },

  buttonWrapper: {
    display: 'flex',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  mt6: {
    marginTop: 6,
  },

  wrapperIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,

    backgroundColor: 'rgba(66, 0, 255, 0.1)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  infoDelivery: {
    width: Dimensions.get('window').width - 90,
    marginLeft: 12,
  },
  titleDelivery: {
    fontSize: 14,
    color: '#595959',
    lineHeight: 22,
  },
  addressInfoContainer: {
    display: 'flex',
    marginTop: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white,
  },

  addressName: {
    color: Colors.textColor1,
    fontWeight: 'normal',
    lineHeight: 22,
    fontSize: 14,
  },
  addressText: {
    color: Colors.textColor2,
    fontWeight: 'normal',
    lineHeight: 22,
    fontSize: 14,
  },

  infoDeliveryItem: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelDeliveryItem: {
    fontSize: 12,
    
    color: '#8C8C8C',
  },
  valueDeliveryItem: {
    fontSize: 12,
    
    color: '#595959',
  },

  changeAddressText: {
    color: Colors.systemColor2,
    textDecorationLine: 'underline',
    fontSize: 12,
    lineHeight: 22,
    fontWeight: 'normal',
  },

  deleteAddressText: {
    color: Colors.errorColor,
    textDecorationLine: 'underline',
    fontSize: 12,
    marginLeft: 12,
    lineHeight: 22,
    fontWeight: 'normal',
  },
  defaultAddressText: {
    marginRight: 15,
    color: Colors.systemColor2,
  },
  viewDefault: {
    backgroundColor: Colors.colorMain,
    padding: 3,
    paddingHorizontal: 10,
    borderRadius: 5
  }
})

export default DeliveryItem
