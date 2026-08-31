import React, { useState } from 'react'
import { StyleSheet, View, Text, Image as RNImage } from 'react-native'
import PressScale from '~/design-system/PressScale'
import { brandColors, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const ItemSupplier = ({ data, selected, onItemPress, type }) => {
  const [imageFailed, setImageFailed] = useState(false)
  const label = data.display_name ? data.display_name : data.name
  const initial = (label || '?').trim().charAt(0).toUpperCase()
  const isSvg = typeof data?.logo === 'string' && data.logo.toLowerCase().endsWith('.svg')
  const canShowImage = Boolean(data?.logo) && !isSvg && !imageFailed

  return(
    <PressScale
      onPress={onItemPress.bind(this, data)}
    >
      {
        type ? (
          <View style={[styles.container, selected && styles.containerSelected]}>
            <Text style={[styles.category, selected && styles.categorySelected]}>{label}</Text>
          </View>
        ) : (
          <View style={[styles.containerColumn, selected && styles.selected]}>
            <View style={styles.iconTile}>
              {canShowImage ? (
                <RNImage
                  style={styles.image}
                  source={{ uri: data?.logo }}
                  resizeMode="contain"
                  onError={() => setImageFailed(true)}
                />
              ) : (
                <Text style={styles.iconFallbackText}>{initial}</Text>
              )}
            </View>
            <Text
              numberOfLines={2}
              style={[styles.categoryName, selected && styles.categoryNameSelected]}
            >
              {label}
            </Text>
          </View>
        )
      }

    </PressScale>
  )
}

const styles = StyleSheet.create({
  container: {
    height: s(40),
    borderRadius: s(radiusScale.lg),
    paddingHorizontal: s(6),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
  },
  containerSelected: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  iconTile: {
    width: s(40),
    height: s(40),
    borderRadius: s(20),
    backgroundColor: brandColors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '58%',
    height: '58%',
  },
  iconFallbackText: {
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.tealPrimary,
  },
  containerColumn: {
    height: s(88),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: s(6),
    paddingHorizontal: s(6),
  },
  category: {
    paddingVertical: s(9),
    paddingHorizontal: s(15),
    fontSize: fs(13),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  categorySelected: {
    color: brandColors.surface,
    fontWeight: '700',
  },
  selected: {
    backgroundColor: brandColors.surface,
    borderLeftWidth: 3,
    borderLeftColor: brandColors.tealPrimary,
  },
  categoryNameSelected: {
    fontSize: fs(11),
    lineHeight: fs(15),
    textAlign: 'center',
    color: brandColors.tealPrimary,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  categoryName: {
    fontSize: fs(11),
    color: brandColors.muted,
    textTransform: 'uppercase',
    lineHeight: fs(15),
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default React.memo(ItemSupplier)
