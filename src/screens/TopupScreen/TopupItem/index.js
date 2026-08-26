import React from 'react'
import { View, Text } from 'react-native'
import strings from '~/i18n'
import { formatMoney } from '~/utils/index'
import PressScale from '~/design-system/PressScale'

import styles from './styles'

const TopupItem = ({ data, onClick, seleted }) => {
  const getConatinerStyle = () => {
    if (seleted)
      return [styles.wrap, styles.selected]
    return styles.wrap
  }
  return (
    <PressScale
      style={getConatinerStyle()}
      onPress={() => onClick(data)}
    >
      {
        isNaN(data?.amount) ? (
          <Text style={styles.amount}>{data?.amount}</Text>
        ) : (
          <>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{formatMoney(data?.amount, { unit: '' })}</Text>
              <Text style={styles.amountUnit}>{strings.currency.unit}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.pointTitle}>{'Tặng:'}</Text>
              <Text style={styles.point}>{formatMoney(data?.point, { unit: '' })}</Text>
              <Text style={styles.pointTitle}>{'điểm'}</Text>
            </View>
          </>
        )
      }
    </PressScale>
  )
}

export default TopupItem
