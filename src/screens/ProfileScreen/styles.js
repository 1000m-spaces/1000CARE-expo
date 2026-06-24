import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    backgroundColor: 'transparent',
  },
  profileInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: s(18),
    marginVertical: s(12),
    marginHorizontal: s(16),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    borderRadius: s(24),
    ...liquidGlass.shadow,
  },
  infoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatarImg: {
    width: s(64),
    height: s(64),
    borderRadius: s(32),
    marginRight: s(12),
  },
  name: {
    color: brandColors.textDark,
    fontSize: fs(18),
    fontWeight: '600',
  },
  email: {
    color: brandColors.muted,
    fontSize: fs(12),
  },
  listItemContainer: {
    display: 'flex',
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    marginHorizontal: s(16),
    borderRadius: s(24),
    overflow: 'hidden',
    ...liquidGlass.shadow,
    flexDirection: 'column',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: s(18),
    paddingVertical: s(12),
  },
  icon: {
    marginRight: s(12),
  },
  value: {
    color: brandColors.textDark,
    fontSize: fs(14),
  },
  itemIcon: {
    width: s(24),
    height: s(24),
    borderRadius: s(42),
  },
  itemIconContainer: {
    width: s(42),
    height: s(42),
    borderRadius: s(16),
    display: 'flex',
    justifyContent: 'center',
    marginRight: s(12),
    alignItems: 'center',
  },
})
export default styles
