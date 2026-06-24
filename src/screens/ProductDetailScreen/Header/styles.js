import { StyleSheet } from 'react-native'
import dimension from '~/constants/dimens'
import { s } from '~/utils/responsive'
import { liquidGlass } from '~/design-system/tokens'

export default StyleSheet.create({
  headerContainer: {
    height: dimension.common.WINDOW_HEIGHT * 0.06,
    marginHorizontal: s(16),
    marginTop: s(6),
    paddingHorizontal: s(6),
    borderRadius: s(22),
    backgroundColor: liquidGlass.background,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: liquidGlass.border,
    overflow: 'hidden',
    ...liquidGlass.shadow,
  },
  cartQuantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: s(6),
  },
  backBtn: {
    padding: s(12),
  },
  heart: {
    height: 24,
    width : 20,
  },
})
