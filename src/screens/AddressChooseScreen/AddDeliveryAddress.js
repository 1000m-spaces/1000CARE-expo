import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import strings from '~/i18n'
import PressScale from '~/design-system/PressScale'

const AddDeliveryAddress = ({ onPress }) => {
  return (
    <PressScale
      style={styles.wrap}
      onPress={onPress}
    >
      <Text style={styles.text}>{strings.addressChoose.addAddressTitle}</Text>
    </PressScale>
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
