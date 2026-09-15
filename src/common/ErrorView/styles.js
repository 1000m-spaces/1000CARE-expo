import { StyleSheet } from 'react-native'
import { brandColors, brandShadow, radiusScale } from '~/design-system/tokens'
import { s, fs } from '~/utils/responsive'

// Toast/alert hệ thống dùng chung toàn app (lỗi API, "vui lòng đăng
// nhập"...) — làm lại hẳn theo design system mới: card trắng phẳng có
// viền + shadow trung tính, KHÔNG còn kiểu overlay đen mờ + icon nổi
// giữa màn cũ.
const styles = StyleSheet.create({
  mainContainer: {
    width: '82%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: s(24),
    paddingHorizontal: s(20),
    borderRadius: s(radiusScale.xxxl),
    borderWidth: 1,
    borderColor: brandColors.border,
    backgroundColor: brandColors.surface,
    ...brandShadow.sheet,
  },
  image: {
    width: s(40),
    height: s(40),
  },
  message: {
    marginTop: s(14),
    color: brandColors.textDark,
    fontSize: fs(13.5),
    lineHeight: fs(20),
    fontWeight: '600',
    textAlign: 'center',
  },
})

export default styles
