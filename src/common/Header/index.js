import React from 'react'
import { Icon, Image } from '~/common/index'
import { View, Text } from 'react-native'
import { close } from '~/assets/constants'
import CartHeaderButton from '../CartHeaderButton/CartHeaderButton'
import PressScale from '~/design-system/PressScale'

import styles from './styles'
import Colors from '../Colors/Colors'

const Header = ({ showLeft = true, showRight = false, leftAction, iconLeft = close, iconRight = 'checkmark-done-sharp', rightAction, title, navigation, cart = false, headerContainerStyles = {}, titleStyles = {}, customTitle = null }) => {
  return (
    <View style={[styles.headerContainer, headerContainerStyles]}>
      {
        showLeft && leftAction && (
          <PressScale
            style={styles.backBtn}
            onPress={leftAction}
          >
            <Image
              resizeMode={'contain'}
              source={iconLeft}
            />
          </PressScale>
        )
      }
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyles]}>{title}</Text>
        {
          customTitle && customTitle()
        }
      </View>
      {
        cart && (
          <View style={styles.cartQuantityContainer}>
            <CartHeaderButton
              navigation={navigation}
            />
          </View>
        )
      }
      {
        (showRight && title === 'Thông báo') ? (
          <Icon
            style={{ marginRight:10 }}
            onPress={rightAction}
            type={'ionicon'}
            name={iconRight}
            color={Colors.systemColor2}
            size={26}
          />
        ) : showRight ? (
          <PressScale
            onPress={rightAction}
            style={styles.buttonReadAllNoti}
          >
            {/* <Icon
              type={'ionicon'}
              name={iconRight}
              color={Colors.systemColor2}
              size={26}
            /> */}
            <Text style={styles.buttonReadAllNotiText}>Lưu</Text>
          </PressScale>
        ) : null
      }
    </View>
  )
}

export default Header
