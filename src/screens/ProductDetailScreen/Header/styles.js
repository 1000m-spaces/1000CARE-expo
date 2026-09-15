import { StyleSheet } from 'react-native'
import { s } from '~/utils/responsive'

// Bỏ hẳn thanh nền (pill/bar) bọc quanh back+giỏ hàng theo yêu cầu —
// chỉ còn 2 nút tròn nổi độc lập trên nền trong suốt của màn hình.
export default StyleSheet.create({
  headerContainer: {
    marginHorizontal: s(16),
    marginTop: s(6),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  cartQuantityContainer: {
    flexDirection: 'row',
  },
  backBtn: {
    width: s(38),
    height: s(38),
    borderRadius: s(19),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(2, 158, 157,0.12)',
  },
  backIcon: {
    width: s(16),
    height: s(16),
  },
  heart: {
    height: 24,
    width: 20,
  },
})
