import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: s(42),
  },
  actionBar: {
    marginHorizontal: s(16),
    marginTop: s(12),
    paddingHorizontal: s(14),
    paddingVertical: s(12),
    borderRadius: s(18),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    flex: 1,
    color: brandColors.muted,
    fontWeight: '600',
    fontSize: fs(12),
    lineHeight: fs(18),
    marginRight: s(12),
  },
})
export default styles
