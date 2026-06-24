import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import CartHeaderButton from '~/common/CartHeaderButton/CartHeaderButton'
import { Icon } from '~/common'
import { NAVIGATION_TO_SEARCH } from '~/navigation/routes'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import LiquidGlassView from '~/design-system/LiquidGlassView'
import { Fonts } from '~/assets/config'

const CustomHeader = ({ navigation, search = true, title }) => {

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {
          search && (
            <TouchableOpacity
              onPress={() => navigation.navigate(NAVIGATION_TO_SEARCH)}
              style={styles.searchContainer}
              activeOpacity={0.8}
            >
              <LiquidGlassView intensity="regular" style={styles.searchInner}>
                <Icon
                  type="antdesign"
                  name={'search'}
                  color={brandColors.tealPrimary}
                  size={s(18)}
                />
                <Text style={styles.searchPlaceholder}>Nhập tên sản phẩm, cửa hàng...</Text>
              </LiquidGlassView>
            </TouchableOpacity>
          )
        }

        {
          title && !search && (
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{title}</Text>
            </View>
          )
        }
        <View style={styles.cartContainer}>
          <CartHeaderButton
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: 'transparent',
    paddingBottom: s(10),
  },
  container: {
    width: '100%',
    height: s(68),
    paddingHorizontal: s(16),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  searchContainer: {
    flex: 1,
    height: s(48),
    borderRadius: s(24),
    marginRight: s(12),
    justifyContent: 'center',
    overflow: 'hidden',
  },
  searchInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: s(24),
    paddingHorizontal: s(16),
    backgroundColor: 'rgba(255,255,255,0.42)',
    borderColor: liquidGlass.border,
  },
  searchPlaceholder: {
    marginLeft: s(10),
    fontFamily: Fonts.base,
    fontSize: fs(14),
    color: brandColors.mutedLight,
    fontWeight: 'normal',
  },
  cartContainer: {
    width: s(48),
    height: s(48),
    borderRadius: s(24),
    backgroundColor: liquidGlass.background,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    ...liquidGlass.shadow,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(20),
    color: brandColors.textDark,
    letterSpacing: 0,
  },
})
