import { StyleSheet } from 'react-native'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { fs, s } from '~/utils/responsive'

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  containerConfirm: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(18),
  },
  card: {
    borderRadius: s(28),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    paddingHorizontal: s(18),
    paddingTop: s(22),
    paddingBottom: s(18),
    ...liquidGlass.shadow,
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(24),
    lineHeight: fs(31),
    fontWeight: '600',
  },
  message: {
    marginTop: s(8),
    marginBottom: s(12),
    color: brandColors.muted,
    fontSize: fs(14),
    lineHeight: fs(21),
    fontWeight: '600',
  },
  confirmButton: {
    marginTop: s(18),
  },
})
