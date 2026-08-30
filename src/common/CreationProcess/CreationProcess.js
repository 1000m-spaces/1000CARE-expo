import React from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Image } from '~/common/index'
import { brandColors } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'
const fullWidth = Dimensions.get('window').width

// Thanh tiến trình theo bước (dùng ở CreateLoan/MonthRepayment) chuyển
// sang token thương hiệu: bước xong = chấm tròn teal đặc + dấu ✓, bước
// hiện tại = icon/nhãn teal đậm, bước chưa tới = xám nhạt.
const CreationProcess = ({ imageStep1, imageStep2, imageStep3, imageStep4, imageSuccess, textStep1, textStep2, textStep3, textStep4, active1, active2, active3, active4, success1, success2, success3 }) => {
  return (
    <View>
      <View style={styles.viewConnect} />
      <View style={styles.viewIcon}>
        <View style={styles.viewImage}>
          {
            success1
              ?
              <View style={styles.viewSuccess}>
                <Image
                  style={styles.imageSuccess}
                  source={imageSuccess}
                />
              </View>
              :
              <Image
                resizeMode={'contain'}
                style={styles.image}
                tintColor={active1 ? brandColors.tealDark : brandColors.mutedLight}
                source={imageStep1}
              />
          }
          <Text style={[styles.textImage, { color: active1 ? brandColors.tealDark : brandColors.mutedLight }]}>{textStep1}</Text>
        </View>
        {imageStep2 &&
          <View style={styles.viewImage}>
            {success2
              ? <View style={styles.viewSuccess}>
                <Image
                  style={styles.imageSuccess}
                  source={imageSuccess}
                />
              </View>
              :
              <Image
                style={styles.image}
                source={imageStep2}
                resizeMode={'contain'}
                tintColor={active2 ? brandColors.tealDark : brandColors.mutedLight}
              />
            }
            <Text style={[styles.textImage, { color: active2 ? brandColors.tealDark : brandColors.mutedLight }]}>{textStep2}</Text>
          </View>}
        {imageStep3 &&
          <View style={styles.viewImage}>
            {success3
              ? <View style={styles.viewSuccess}>
                <Image
                  style={styles.imageSuccess}
                  source={imageSuccess}
                />
              </View>
              :
              <Image
                style={styles.image}
                source={imageStep3}
                resizeMode={'contain'}
                tintColor={active3 ? brandColors.tealDark : brandColors.mutedLight}
              />
            }
            <Text style={[styles.textImage, { color: active3 ? brandColors.tealDark : brandColors.mutedLight }]}>{textStep3}</Text>
          </View>}
        {imageStep4 &&
          <View style={styles.viewImage}>
            <Image
              style={styles.image}
              source={imageStep4}
              resizeMode={'contain'}
              tintColor={active4 ? brandColors.tealDark : brandColors.mutedLight}
            />
            <Text style={[styles.textImage, { color: active4 ? brandColors.tealDark : brandColors.mutedLight }]}>{textStep4}</Text>
          </View>}
      </View>
    </View>
  )
}
export default CreationProcess

const styles = StyleSheet.create({
  viewIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: s(26),
    width: s(26),
  },
  viewImage: {
    width: fullWidth / 4,
    paddingHorizontal: s(10),
    alignItems: 'center',
  },
  textImage: {
    fontSize: fs(11.5),
    fontWeight: '600',
    textAlign: 'center',
  },
  viewConnect: {
    height: 2,
    backgroundColor: brandColors.borderSoft,
    marginTop: s(30),
    marginBottom: s(-13),
    marginHorizontal: (fullWidth / 4) / 2,
  },
  viewSuccess: {
    height: s(26),
    width: s(26),
    backgroundColor: brandColors.tealPrimary,
    borderRadius: s(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSuccess: {
    height: s(9),
    width: s(12),
  },
})
