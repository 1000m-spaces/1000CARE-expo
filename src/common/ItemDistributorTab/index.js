import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Image, Text } from '~/common/index'
import {
  logoNeoMed, log_mb_bank_landscape,
} from '~/assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import LiquidGlassView from '~/design-system/LiquidGlassView'

const ItemDistributorTab = ({ data, onItemPress, selected, showLabel = false, selectedScale = 1 }) => {
  let imageSource = {
    uri: data.logo,
  }
  if (!data.logo && data.id == -1) {
    imageSource = logoNeoMed
  }
  if(!data.logo && data.id != -1) {
    imageSource = log_mb_bank_landscape
  }
  return (
    <TouchableOpacity
      onPress={onItemPress.bind(this, data)}
      activeOpacity={0.82}
      style={[styles.touchable, showLabel && styles.touchableWithLabel, selected && { transform: [{ scale: selectedScale }] }]}
    >
      <LiquidGlassView
        intensity="regular"
        style={[styles.container, selected && styles.containerSelected]}
      >
        <Image
          style={imageSource === log_mb_bank_landscape ? styles.imageMB : styles.image}
          resizeMode={'contain'}
          source={imageSource}
        />
      </LiquidGlassView>
      {showLabel && (
        <Text
          style={[styles.label, selected && styles.labelSelected]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {data.nick_name || data.name}
        </Text>
      )}
    </TouchableOpacity>
        
  )
}

const styles = StyleSheet.create({
  touchable: {
    marginRight: s(10),
  },
  touchableWithLabel: {
    width: s(82),
    alignItems: 'center',
    marginRight: s(14),
  },
  container: {
    width: s(68),
    height: s(52),
    borderRadius: s(26),
    backgroundColor: 'rgba(255,255,255,0.42)',
    borderColor: 'rgba(255,255,255,0.82)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerSelected: {
    backgroundColor: 'rgba(11,123,138,0.72)',
    borderColor: 'rgba(255,255,255,0.72)',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.26,
    shadowRadius: 16,
    elevation: 8,
  },
  image: {
    width: s(48),
    height: s(34),
    resizeMode: 'contain',
  },
  imageMB: {
    width: s(54),
    height: s(30),
    resizeMode: 'contain',
  },
  label: {
    marginTop: s(6),
    maxWidth: s(82),
    color: brandColors.muted,
    fontSize: fs(10),
    lineHeight: fs(13),
    fontWeight: '600',
    textAlign: 'center',
  },
  labelSelected: {
    color: brandColors.tealPrimary,
    fontWeight: '600',
  },
})
export default React.memo(ItemDistributorTab)
