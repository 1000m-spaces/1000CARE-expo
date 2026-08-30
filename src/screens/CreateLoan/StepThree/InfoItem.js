import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '~/common/index'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

const InfoItem = ({ label, value, styleValue, styleLabel }) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.styleLabel, styleLabel]}>{label}</Text>
      <Text style={[styles.styleValue, styleValue]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: s(8),
  },
  styleLabel: {
    color: brandColors.muted,
    flex: 1,
    fontSize: fs(12),
    lineHeight: fs(19),
  },
  styleValue: {
    color: brandColors.textDark,
    fontWeight: '600',
    fontSize: fs(13),
    flex: 1,
    textAlign: 'right',
    lineHeight: fs(20),
  },
})

export default InfoItem
