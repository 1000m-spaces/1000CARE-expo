import React from 'react'

import { StyleSheet, View, Text } from 'react-native'
import { Image } from '~/common/index'
import PressScale from '~/design-system/PressScale'

const ChooseItem = ({ data, navigation }) => {
  return (
    <PressScale
      onPress={() => {
        navigation.push(data.routePath)
      }}
    >
      <View style={styles.wrap}>
        <View style={styles.wrapInfo}>
          <View style={[styles.wrapIcon, { backgroundColor: data.background }]}>
            <Image
              style={styles.icon}
              source={data.icon}
              tintColor={data.colorIcon}
            />
          </View>
          <Text style={styles.text}>{data.text}</Text>
        </View>
        <Image
          style={styles.iconNext}
          source={require('../../assets/icons/next.png')}
        />
      </View>
    </PressScale>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#FFF',

    borderColor: '#F5F5F5',
    borderTopWidth: 1,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapInfo: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapIcon: {
    width: 42,
    height: 42,
    borderRadius: 42,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    marginLeft: 12,
    fontSize: 14,
    color: '#595959',
    fontWeight: 'normal',
    fontFamily: 'Roboto',
  },
  iconNext: {
    width: 12,
    height: 12,
    flexShrink: 0,
  },
})

export default ChooseItem
