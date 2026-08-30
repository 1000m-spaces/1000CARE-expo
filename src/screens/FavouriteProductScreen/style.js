import { StyleSheet } from 'react-native'
import { brandColors, radiusScale } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'
import { s, fs } from '~/utils/responsive'

// Chip 3 tab theo spec redesign (pill teal khi chọn, trắng viền khi
// chưa chọn) — thay cho tab gạch chân kiểu cũ.
export default StyleSheet.create({
  listViewContainer: {
    flexGrow: 0,
    marginBottom: s(2),
    backgroundColor: 'transparent',
    marginTop: s(6),
  },
  listViewContent: {
    paddingHorizontal: s(16),
    paddingVertical: s(14),
    gap: s(8),
  },
  tabItem: {
    paddingVertical: s(8),
    paddingHorizontal: s(14),
    borderRadius: s(radiusScale.lg),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
  },
  tabSelected: {
    backgroundColor: brandColors.tealPrimary,
    borderColor: brandColors.tealPrimary,
  },
  tabTitle: {
    textAlign: 'center',
    fontSize: fs(12),
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
  },
  tabTitleSelected: {
    color: brandColors.surface,
  },
})
