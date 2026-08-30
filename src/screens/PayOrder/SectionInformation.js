import React from 'react'
import { View, StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

const SectionInformation = ({ children }) => {
  return <View style={styles.wrap}>{children}</View>
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: s(6),
    paddingHorizontal: s(4),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xl),
    marginHorizontal: s(16),
    marginBottom: s(10),
    ...brandShadow.soft,
  },
})

export default SectionInformation
