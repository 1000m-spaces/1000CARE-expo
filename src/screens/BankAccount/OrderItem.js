import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import strings from '~/i18n'
import { formatMoney } from '~/utils/format'
import PressScale from '~/design-system/PressScale'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

// Dòng đơn hàng chờ thanh toán theo spec: checkbox vuông bo góc teal khi
// chọn, mã đơn + NCC (nếu có) bên trái, số tiền teal đậm bên phải — thay
// cho hàng có checkbox tròn + mũi tên dropdown cũ.
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

  const subLabel = order?.distributor?.nick_name || order?.distributor?.name || order?.supplier?.name

  return (
    <PressScale
      style={styles.container}
      onPress={() => onChange()}
    >
      <View style={[styles.checkbox, checkBox && styles.checkboxChecked]}>
        {checkBox && <Text style={styles.checkboxMark}>✓</Text>}
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{textMethod}: {order?.order_id}</Text>
        {subLabel ? <Text style={styles.sub} numberOfLines={1}>{subLabel}</Text> : null}
      </View>
      <Text style={styles.amount}>{formatMoney(order?.total, { unit: strings.currency.unit })}</Text>
    </PressScale>
  )
}
export default OrderItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(12),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    padding: s(12),
    marginBottom: s(8),
    ...brandShadow.soft,
  },
  checkbox: {
    width: s(18),
    height: s(18),
    borderRadius: s(5),
    borderWidth: 1.5,
    borderColor: brandColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  checkboxMark: {
    color: brandColors.surface,
    fontSize: fs(11),
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '700',
    color: brandColors.textDark,
  },
  sub: {
    marginTop: s(2),
    fontSize: fs(11),
    color: brandColors.mutedLight,
  },
  amount: {
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.tealDark,
  },
})
