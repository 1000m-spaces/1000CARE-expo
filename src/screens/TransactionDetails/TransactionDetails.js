import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from '~/common/index'
import Header from '~/common/Header/index'
import { back } from '~/assets/constants'
import strings from '~/i18n'
import { successPay } from '~/assets/constants'
import BackgroundWash from '~/design-system/BackgroundWash'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
import { Fonts } from '~/assets/config'

const data = [
  { name: 'Dịch vụ', value: 'Nạp tiền' }, { name: 'Phí giao dịch', value: 'Miễn phí' },
  { name: 'Thời gian', value: '12/2/2021 08:07:45' }, { name: 'Mã giao dịch', value: 'CODE-275612891' },
]

// Màn kết quả giao dịch dùng chung mẫu "success" (vòng tròn xanh + số tiền
// lớn) theo token thương hiệu, card chi tiết trắng bo góc thay khối phẳng
// nền trắng cũ.
const TransactionDetails = props => {
  const renderList = data.map((item, index) => {
    return (
      <View
        key={index}
        style={styles.viewDetail}
      >
        <Text style={styles.textDetail}>{item.name}</Text>
        <Text style={styles.textValue}>{item.value}</Text>
      </View>
    )
  })
  return (
    <View style={styles.container}>
      <BackgroundWash />
      <Header
        title={strings.TransactionDetails.titleRecharge}
        leftAction={() => props.navigation.pop()}
        iconLeft={back}
      />
      <View style={styles.containerInfo}>
        <View style={styles.bigCircle}>
          <View style={styles.smallCircle}>
            <Image
              resizeMode={'contain'}
              source={successPay}
            />
          </View>
        </View>
        <Text style={styles.textNumber}><Text style={styles.number}>+200.000</Text> đ</Text>
        <Text style={styles.textRecharge}>Nạp tiền vào tài khoản NEO</Text>
      </View>
      <View style={styles.containerDetail}>
        {renderList}
      </View>
    </View>
  )
}
export default TransactionDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  bigCircle: {
    backgroundColor: 'rgba(27,158,90,0.15)',
    borderRadius: s(50),
    height: s(100),
    width: s(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: s(20),
    marginBottom: s(10),
  },
  smallCircle: {
    backgroundColor: brandColors.success,
    borderRadius: s(40),
    height: s(80),
    width: s(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInfo: {
    alignItems: 'center',
    marginTop: s(10),
  },
  textNumber: {
    color: brandColors.muted,
    fontSize: fs(12),
  },
  number: {
    color: brandColors.tealDark,
    fontFamily: Fonts.bold,
    fontWeight: '800',
    fontSize: fs(24),
  },
  textRecharge: {
    color: brandColors.muted,
    marginTop: s(10),
    marginBottom: s(10),
    fontSize: fs(13),
  },
  viewDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: s(9),
  },
  containerDetail: {
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    borderRadius: s(radiusScale.xxl),
    marginHorizontal: s(16),
    marginTop: s(10),
    padding: s(16),
    ...brandShadow.soft,
  },
  textDetail: {
    color: brandColors.muted,
    fontSize: fs(12.5),
  },
  textValue: {
    color: brandColors.textDark,
    fontSize: fs(12.5),
    fontWeight: '700',
  },
})
