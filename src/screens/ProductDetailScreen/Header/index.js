import React from 'react'
import { Image } from '~/common/index'
import { View } from 'react-native'
import { back } from '~/assets/constants'
import CartHeaderButton from '~/common/CartHeaderButton/CartHeaderButton'
import PressScale from '~/design-system/PressScale'

import styles from './styles'

const Header = ({ navigation, goBack }) => {

  return (
    <View style={styles.headerContainer}>
      <PressScale
        style={styles.backBtn}
        onPress={() => {
          if (goBack) {
            goBack()
          }
          navigation.pop()
        }}
      >
        <Image
          resizeMode={'contain'}
          source={back}
        />
      </PressScale>
      <View style={styles.cartQuantityContainer}>
        <CartHeaderButton 
          navigation={navigation}
        />
      </View>
    </View>
  )
}

export default Header
