import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { Image } from '~/common/index'
import Colors from '~/common/Colors/Colors'
import { formatMoney } from '~/utils/format'

const OrderProductItem = ({ item }) => {
  console.log('item', item?.from?.image)

  const getItem = (key) => {
    return item?.items[key === 'from' ? (item.items.length - 1) : 0][key]
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.wrapImage}>
        <Image
          style={styles.image}
          source={{
            uri: getItem('from')?.image,
          }}
        />
      </View>
      <View style={styles.wrapInfo}>
        <Text style={styles.title}>
          {getItem('from')?.product_name}
        </Text>
        <View style={styles.wrapAmountAndPrice}>
          <View style={styles.amountAndPrice}>
            <Text>
              <Text style={styles.prevLabelAmount}>SL: </Text>
              <Text style={styles.prevAmount}>x{getItem('from')?.qty}</Text>
            </Text>
            <Text style={styles.prevPrice}>{formatMoney(getItem('from').price * getItem('from')?.qty)}</Text>
          </View>
          <View style={styles.amountAndPrice}>
            <Text>
              <Text style={styles.labelAmount}>SL: </Text>
              <Text style={styles.amount}>x{getItem('to')?.qty}</Text>
            </Text>
            <Text style={styles.price}>{formatMoney(getItem('to').price * getItem('to').qty)}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 120,
    backgroundColor: '#FFF',

    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderStyle: 'solid',

    display: 'flex',
    flexDirection: 'row',
  },
  wrapImage: {
    width: 140,
    height: 120,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 64,
    width: 64,
    resizeMode: 'contain',
  },
  wrapInfo: {
    width: Dimensions.get('window').width - 140,
    height: 120,

    padding: 18,

    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#595959',
    lineHeight: 20,
  },
  wrapAmountAndPrice: {
    width: '100%',
    flexDirection: 'column',
  },
  amountAndPrice: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelAmount: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#8C8C8C',
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#595959',
  },
  price: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: Colors.priceColor,
  },
  prevLabelAmount: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#CCCCCC',
    textDecorationLine: 'line-through',
  },
  prevAmount: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#CCCCCC',
    textDecorationLine: 'line-through',
  },
  prevPrice: {
    fontSize: 12,
    fontFamily: 'Roboto',
    color: '#CCCCCC',
    textDecorationLine: 'line-through',
  },
})

export default OrderProductItem
