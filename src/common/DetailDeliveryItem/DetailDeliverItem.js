import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { getTime } from '~/utils/date'
import { brandColors } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'

// Dòng thời gian dọc theo spec redesign: chấm tròn teal (đã qua) có dấu ✓,
// chấm vàng có glow (mốc mới nhất), nối bằng đường kẻ mảnh — thay cho bảng
// 2 cột kẻ ô cũ.
const DetailDeliveryItem = ({ data, isLast, isCurrent }) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.railCol}>
        <View style={[styles.dot, isCurrent ? styles.dotCurrent : styles.dotDone]}>
          {isCurrent ? null : <Text style={styles.dotCheck}>✓</Text>}
        </View>
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.wrapInfo}>
        <Text style={[styles.title, isCurrent && styles.titleCurrent]}>{data.sub_state_text}</Text>
        <Text style={styles.date}>{getTime(data.time, 'HH:mm:ss DD/MM/YYYY')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  railCol: {
    width: s(32),
    alignItems: 'center',
  },
  dot: {
    width: s(22),
    height: s(22),
    borderRadius: s(11),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotDone: {
    backgroundColor: brandColors.tealPrimary,
  },
  dotCurrent: {
    backgroundColor: brandColors.goldAccent,
    shadowColor: brandColors.goldAccent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: s(6),
    elevation: 3,
  },
  dotCheck: {
    color: brandColors.surface,
    fontSize: fs(11),
    fontWeight: '700',
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: s(28),
    backgroundColor: brandColors.borderSoft,
    marginVertical: s(2),
  },
  wrapInfo: {
    flex: 1,
    paddingBottom: s(20),
    paddingLeft: s(10),
  },
  title: {
    fontSize: fs(13.5),
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
  },
  titleCurrent: {
    color: brandColors.tealDark,
  },
  date: {
    marginTop: s(3),
    fontSize: fs(11.5),
    color: brandColors.muted,
  },
})

export default DetailDeliveryItem
