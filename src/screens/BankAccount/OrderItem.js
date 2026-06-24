import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import dropdown from '~/assets/configNeoMed/Wallet/dropdown.png'
import Colors from '~/common/Colors/Colors'
import { CheckBox } from '~/common/index'
import strings from '~/i18n'
import { formatMoney } from '~/utils/format'

const OrderItem = ({ order, textMethod, checkBoxAll, onAddOrder, onRemoveOrder }) => {
  const [checkBox, setCheckBox] = useState(false)
  useEffect(() => {
    setCheckBox(checkBoxAll)
  }, [checkBoxAll])

  const onChange = () => {
    if (checkBox) {
      onRemoveOrder(order)
    } else {
      onAddOrder(order)
    }
    setCheckBox(!checkBox)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={() => onChange()}
    >
      <CheckBox
        disabled={true}
        checked={checkBox}
      />
      <View style={styles.viewPay}>
        <Text style={styles.textPay}>{textMethod}: {order?.order_id}</Text>
        <Text style={styles.numberMoney}>{formatMoney(order?.total, { unit: '' })}<Text style={styles.textUnit}>{strings.currency.unit}</Text></Text>
      </View>
      <TouchableOpacity style={styles.buttonRight}>
        <Image
          style={styles.styleImage}
          source={dropdown}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
export default OrderItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  viewPay: {
    paddingLeft: 20,
    paddingVertical: 10,
    flexGrow: 1,
  },
  textPay: {
    color: Colors.textColor2,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 22,
  },
  numberMoney: {
    color: Colors.priceColor,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 2,
  },
  styleImage: {
    height: 12,
    width: 8,
  },
  buttonRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textUnit: {
    fontSize: 12,
    fontWeight: 'normal',
  },
})