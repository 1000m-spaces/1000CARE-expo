import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Image } from '~/common/index'
import { Icon } from '~/common'
import Colors from '~/common/Colors/Colors'
import { formatMoney } from '~/utils/format'

const BankItem = ({ data, type, onItemPress }) => {

  return (
    <TouchableOpacity
      onPress={() => {
        if(onItemPress) {
          onItemPress(data)
        }
      }}
    >
      <View style={styles.container}>
            
        <Image
          style={styles.image}
          source={data.logo}
        />
        <View style={styles.balanceContainer}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.balance}>{formatMoney(data.balance, { unit: 'VNĐ' })}</Text>
        </View>

        <Icon
          type="antdesign"
          name={'right'}
          color={'#595959'}
          size={13}
        />

      </View>
        
    </TouchableOpacity>
  )
}

export default BankItem

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceContainer: {
    flex:1,
        
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    margin: 4,
    width: 86,
    height: 36,
    resizeMode: 'contain',
  },
  name: {
    color: '#8C8C8C',
    fontSize: 12,
  },
  balance: {
    fontSize: 14,
    color: Colors.priceColor,
    fontWeight: '600',
  },

})