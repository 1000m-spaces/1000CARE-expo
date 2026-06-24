import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { Image } from '~/common/index'
import { arrow_right } from '~/assets/constants'

const ItemSupplier = ({ data, selected, onItemPress, type }) => {
  const background = () => {
    return selected ? Colors.systemColor2 : 'transparent'
  }

  const textColor = () => {
    return selected ? 'white' : '#828282'
  }
    
  return(
    <TouchableOpacity 
      onPress={onItemPress.bind(this, data)}
    >
      {
        type ? (
          <View style={[styles.container, { backgroundColor: background() }]}>
            <Text style={[styles.category, { color: textColor() }]}>{data.display_name ? data.display_name : data.name}</Text>
          </View>
        ) : (
          <View style={selected ? [styles.containerColumn, styles.selected] : styles.containerColumn}>
            <Image
              style={styles.image}
              widthImage={2*50}
              heightImage={2*(100 - 32)}
              source={{
                uri: data?.logo,
              }}
              tintColor={selected ? Colors.systemColor2: Colors.textColor2}
            />
            <Text style={selected ? [styles.categoryName, styles.alignCenter, styles.categoryNameSelected] : [styles.categoryName, styles.alignCenter]}>
              {data.display_name ? data.display_name : data.name}
            </Text>
            {
              selected && (
                <Image
                  style={styles.seletedIcon}
                  source={arrow_right}
                />
              )
            }
          </View>
        )
      }

    </TouchableOpacity>
  )
}

const ItemHeight = 40
const styles = StyleSheet.create({
  container: {
    height: ItemHeight,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems:'center',
  },
  image: {
    width: 50,
    height: 100 - 32,
    resizeMode: 'contain',
  },
  seletedIcon: {
    position: 'absolute',
    width: 15,
    height: 25,
    right: -2,
    top: 120/2 - 25/2,
    resizeMode: 'contain',
  },
  containerColumn: {
    height: 130,
    width: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
  },
  category:{
    paddingVertical: 9,
    paddingHorizontal: 15,
    fontSize: 14,       
    fontWeight: '600', 
  },
  selected: {
    backgroundColor: 'white',
    borderLeftWidth: 4,
    borderLeftColor: Colors.systemColor2,
  },
  categoryNameSelected: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    color: Colors.systemColor2,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  categoryName: {
    fontSize: 12,
    color: Colors.textColor2,
    textTransform: 'uppercase',
    lineHeight: 18,
    fontWeight: 'normal',
    marginTop: 6,
    marginHorizontal: 2,
  },
  alignCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
})

export default React.memo(ItemSupplier)
