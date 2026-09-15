import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Image } from '~/common/index'
import { logoNeoMed } from '~/assets/constants'
import { DIMENS } from '~/constants/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

const ItemDistributor = ({ data, onItemPress, selected, itemWidth }) => {
  let imageSource = { uri: data.logo || data.images }
  if (!imageSource.uri) {
    imageSource = logoNeoMed
  }

  const isPending = data.status === 2 || data.distributor?.status === 2

  return (
    <PressScale
      onPress={() => {
        if (!isPending && onItemPress) {
          onItemPress()
        }
      }}
    >
      <View
        style={[styles.container, itemWidth && { width: itemWidth, minHeight: itemWidth * 0.92, marginHorizontal: 0 }, selected && styles.containerSelected, isPending && styles.containerPending]}
      >
        {isPending && (
          <View style={styles.overlay}>
            <Text style={styles.pending}>{'Sắp ra mắt'}</Text>
          </View>
        )}
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            source={imageSource}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={2}>
          {data.nick_name ? data.nick_name : data.name}
        </Text>
        {selected && <View style={styles.activeIndicator} />}
      </View>
    </PressScale>
  )
}

const ItemWidth = (DIMENS.common.WINDOW_WIDTH - 5 * 6 - 12) / 3

const styles = StyleSheet.create({
  container: {
    width: ItemWidth,
    minHeight: ItemWidth * 0.9,
    backgroundColor: brandColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(24),
    marginHorizontal: s(5),
    marginBottom: s(8),
    paddingVertical: s(12),
    paddingHorizontal: s(6),
    borderWidth: 1,
    borderColor: brandColors.border,
    ...liquidGlass.shadow,
    overflow: 'hidden',
  },
  containerSelected: {
    borderColor: 'rgba(2, 158, 157,0.28)',
    backgroundColor: 'rgba(224,244,246,0.62)',
  },
  containerPending: {
    opacity: 0.7,
  },
  imageWrapper: {
    width: s(52),
    height: s(52),
    borderRadius: s(18),
    backgroundColor: 'rgba(255,255,255,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: s(8),
  },
  image: {
    width: s(48),
    height: s(48),
    resizeMode: 'contain',
  },
  label: {
    fontFamily: Fonts.bold,
    fontSize: fs(11),
    color: brandColors.textDark,
    fontWeight: 'normal',
    textAlign: 'center',
    lineHeight: s(16),
    marginHorizontal: s(2),
  },
  labelSelected: {
    color: brandColors.tealPrimary,
    fontWeight: 'normal',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: s(3),
    backgroundColor: brandColors.tealPrimary,
    borderBottomLeftRadius: s(24),
    borderBottomRightRadius: s(24),
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2, 158, 157, 0.6)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(16),
  },
  pending: {
    color: '#FFFFFF',
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(10),
    textAlign: 'center',
    paddingHorizontal: s(4),
  },
})

export default React.memo(ItemDistributor)
