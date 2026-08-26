import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

const TitleDetailOrderBox = ({ urlIcon, title, route, navigation, params }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.titleAndIcon}>
        <View style={styles.wrapIcon}>
          <Image
            style={styles.icon}
            source={urlIcon}
            tintColor={brandColors.tealPrimary}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      {route ? (
        <PressScale
          style={styles.viewDetailButton}
          onPress={() => {
            navigation.navigate(route, params)
          }}
        >
          <Text style={styles.textViewDetailButton}>Xem chi tiết</Text>
        </PressScale>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: s(18),
    paddingVertical: s(12),

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleAndIcon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapIcon: {
    width: s(42),
    height: s(42),
    backgroundColor: 'rgba(11,123,138,0.1)',
    borderRadius: s(21),

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: s(24),
    height: s(24),
  },
  title: {
    marginLeft: s(12),
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    color: brandColors.textDark,
    fontWeight: '600',
  },
  viewDetailButton: {
    width: s(100),
    height: s(28),
    borderRadius: s(14),
    borderColor: brandColors.tealPrimary,
    borderStyle: 'solid',
    borderWidth: 1,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textViewDetailButton: {
    fontSize: fs(12),
    color: brandColors.tealPrimary,
    lineHeight: fs(16),
  },
})

export default TitleDetailOrderBox
