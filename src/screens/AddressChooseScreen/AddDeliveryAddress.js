import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import strings from '~/i18n'

const AddDeliveryAddress = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.wrap}
      onPress={onPress}
    >
      <Text style={styles.text}>{strings.addressChoose.addAddressTitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: '#FFF',

    marginVertical: 6,

    padding: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
  },
  text: {
    color: Colors.systemColor2,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
  },
})

export default AddDeliveryAddress
