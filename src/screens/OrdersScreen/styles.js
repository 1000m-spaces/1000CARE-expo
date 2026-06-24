import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow, liquidGlass } from '~/design-system/tokens'

const styles = StyleSheet.create({
  mainContainer: { 
    flex:1,
    display: 'flex',
    justifyContent:'space-between',
    backgroundColor: 'transparent',
  },
  ordersHero: {
    marginHorizontal: s(16),
    marginTop: s(10),
    marginBottom: s(12),
    borderRadius: s(28),
    paddingHorizontal: s(20),
    paddingVertical: s(20),
    backgroundColor: liquidGlass.backgroundTint,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.6,
    color: brandColors.tealPrimary,
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(26),
    lineHeight: fs(32),
    fontWeight: '600',
    color: brandColors.textDark,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(13),
    lineHeight: fs(20),
    fontWeight: '600',
    color: brandColors.muted,
  },
  
  listItem: {
    marginVertical: s(12),
    marginHorizontal: s(16),
    backgroundColor: liquidGlass.background,
    borderRadius: s(20),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },

  listProductContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  listStatus: {
    flex: 1,
    maxHeight: s(64),
    marginBottom: s(8),
    backgroundColor: 'transparent',
  },

  contentListStatus: {
    minHeight: s(60),
    paddingHorizontal: s(16),
    alignItems: 'center',
  },

  itemSeparator: {
    height: s(8),
    backgroundColor: 'transparent',
  },

  statusLabel: {
    textAlign: 'center',
    color: brandColors.muted,
    fontFamily: Fonts.medium,
    fontSize: fs(12),
    lineHeight: fs(18),
    fontWeight: '600',
  },

  statusLabelSelected: {
    textAlign: 'center',
    color: brandColors.surface,
    fontSize: fs(12),
    fontFamily: Fonts.medium,
    lineHeight: fs(18),
    fontWeight: '600',
  },

  statusLabelContainer: {
    marginRight: s(8),
  },

  closeBtnContainer: {
    position: 'absolute',
    right: s(8),
    top: s(8),
  },
  closeBtn: {
    height: s(12),
    width: s(12),
  },
  title: {
    // alignSelf: 'center',
    width: '99%',
    fontWeight: '600',
    fontFamily: Fonts.bold,
    textAlign: 'center',
    fontSize: fs(14),
    lineHeight: fs(22),
    color: brandColors.textDark,
  },

  bottomSheetContainer: {
    height: '100%',
    backgroundColor: liquidGlass.backgroundStrong,
  },
  radioButtonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  radioButtonItem: {
    width: '100%',
    marginBottom: s(18),
    marginHorizontal: s(18),
  },
  bottomSheetActionContainer: {
    position: 'absolute',
    height: s(64),
    borderTopWidth: 1,
    borderTopColor: liquidGlass.border,
    bottom: 0,
    width: '100%',
    padding: s(8),
  },
  btnContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: brandColors.danger,
    borderRadius: s(20),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainerDisable: {
    backgroundColor: Colors.gray,
  },
  btnText: {
    color: brandColors.surface,
    borderRadius: s(2),
    fontSize: fs(14),
    fontFamily: Fonts.bold,
  },
  searchInput: {
    marginHorizontal: s(18),
    marginTop: -s(9),
  },
  warningContainer: {
    margin: s(18),
    backgroundColor: '#FFF5D8',
    paddingVertical: s(8),
    paddingHorizontal: s(12),
    borderRadius: s(12),
  },
  warningText: {
    fontFamily: Fonts.bold,
    color: brandColors.warning,
  },
})

export default styles
