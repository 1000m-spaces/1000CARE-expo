import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Image } from '~/common/index'
import { s, fs } from '~/utils/responsive'
import { brandColors } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import PressScale from '~/design-system/PressScale'

// Section header theo spec: nhãn hoa hết-cỡ nhỏ + muted, icon chỉ còn làm
// dấu hiệu phụ nhỏ gọn, link "Xem chi tiết" rút về dạng chevron chữ đơn giản
// — thay cho icon-bubble lớn + nút viền cũ.
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
          <Text style={styles.textViewDetailButton}>Xem chi tiết ›</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapIcon: {
    width: s(28),
    height: s(28),
    backgroundColor: brandColors.tealLight,
    borderRadius: s(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: s(15),
    height: s(15),
  },
  title: {
    marginLeft: s(10),
    fontSize: fs(12),
    fontFamily: Fonts.bold,
    color: brandColors.muted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  viewDetailButton: {
    paddingVertical: s(4),
    paddingLeft: s(10),
  },
  textViewDetailButton: {
    fontSize: fs(12.5),
    fontFamily: Fonts.bold,
    fontWeight: '600',
    color: brandColors.tealPrimary,
  },
})

export default TitleDetailOrderBox
