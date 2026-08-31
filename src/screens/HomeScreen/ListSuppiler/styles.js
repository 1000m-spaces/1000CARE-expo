import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

export default StyleSheet.create({
  categories: {
    minHeight: s(72),
    backgroundColor: liquidGlass.backgroundTint,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: s(18),
    borderBottomWidth: 1,
    borderBottomColor: liquidGlass.border,
  },
  listSupplierColumn: {
    zIndex: 10,
    width: s(96),
    flexGrow: 0,
    backgroundColor: brandColors.surface,
    borderRightWidth: 1,
    borderRightColor: brandColors.borderSoft,
  },
  listSupplier: {
    flexGrow: 0,
    backgroundColor: 'transparent',
    marginTop: s(6),
    marginBottom: s(6),
  },
  itemSeparator: {
    height: 1,
    backgroundColor: brandColors.borderSoft || Colors.gray,
  },
})
