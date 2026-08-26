import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import dropdown from '~/assets/configNeoMed/Wallet/dropdown.png'
import Colors from '~/common/Colors/Colors'
import { CheckBox } from '~/common/index'
import { formatMoney } from '~/utils/format'
import PressScale from '~/design-system/PressScale'

const ItemWalletDetail = props => {
  const { code,textMethod,money,checkBoxAll } = props
  const [checkBox,setCheckBox] = useState(false)
  useEffect(()=> {
    setCheckBox(checkBoxAll)
  },[checkBoxAll])

  return(
    <PressScale
      style={styles.container}
      onPress={()=> setCheckBox(!checkBox)}
    >
      <CheckBox
        checked={checkBox}
      />
      <View style={styles.viewPay}>
        <Text style={styles.textPay}>{textMethod}: {code}</Text>
        <Text style={styles.numberMoney}>{formatMoney(money, { unit: '' })}<Text style={styles.textUnit}>VNĐ</Text></Text>
      </View>
      <View style={styles.buttonRight}>
        <Image
          style={styles.styleImage}
          source={dropdown}
        />
      </View>
    </PressScale>
  )
}
export default ItemWalletDetail

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor:'white',
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