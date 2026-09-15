import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'
import { Fonts } from '~/assets/config'

export default StyleSheet.create({
  headerContainer: {
    height: s(64),
    marginHorizontal: s(12),
    marginTop: s(6),
    marginBottom: s(8),
    paddingHorizontal: s(4),
    borderRadius: s(24),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  titleContainer: {
    height: s(62),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(18),
    color: brandColors.textDark,
    width: '80%',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginLeft: 0,
  },
  backBtn: {
    padding: s(12),
  },
  cartQuantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: s(12),
  },
  buttonReadAllNoti: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brandColors.tealPrimary,
    marginRight: s(10),
    padding: s(6),
    paddingHorizontal: s(12),
    borderRadius: s(12),
    ...liquidGlass.shadow,
  },
  buttonReadAllNotiText: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontSize: fs(13),
    fontWeight: 'normal',
  },
})
