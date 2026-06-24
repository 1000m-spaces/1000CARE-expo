import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { Text } from '~/common/index'

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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  styleLabel: {
    color: Colors.textColor3,
    fontFamily: Fonts.medium,
    flex: 1,
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 20,
  },
  styleValue: {
    color: Colors.textColor2,
    fontFamily: Fonts.medium,
    fontWeight: 'normal',
    fontSize: 14,
    flex: 1,
    textAlign: 'right',
    lineHeight: 22,
  },
})

export default InfoItem