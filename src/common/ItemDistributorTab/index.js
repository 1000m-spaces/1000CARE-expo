import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Image, Text } from '~/common/index'
import {
  logoNeoMed, log_mb_bank_landscape,
} from '~/assets/constants'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'

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
      <View style={[styles.container, selected && styles.containerSelected]}>
        <Image
          style={imageSource === log_mb_bank_landscape ? styles.imageMB : styles.image}
          resizeMode={'contain'}
          source={imageSource}
        />
      </View>
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
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerSelected: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 6,
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
