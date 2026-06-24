import { StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  hero: {
    marginHorizontal: s(16),
    marginTop: s(14),
    borderRadius: s(28),
    padding: s(20),
    backgroundColor: brandColors.tealDark,
    ...brandShadow.teal,
  },
  heroEyebrow: {
    fontSize: fs(10),
    lineHeight: fs(14),
    fontWeight: '600',
    letterSpacing: 1.6,
    color: brandColors.goldAccent,
  },
  heroTitle: {
    marginTop: s(6),
    fontSize: fs(25),
    lineHeight: fs(31),
    fontWeight: '600',
    color: brandColors.surface,
  },
  heroSubtitle: {
    marginTop: s(8),
    fontSize: fs(13),
    lineHeight: fs(20),
    fontWeight: '600',
    color: 'rgba(255,255,255,0.7)',
  },
  searchPanel: {
    marginHorizontal: s(16),
    marginTop: s(14),
    borderRadius: s(20),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    overflow: 'hidden',
    ...brandShadow.soft,
  },
  list: {
    flex: 1,
    marginTop: s(10),
    backgroundColor: brandColors.background,
  },
  listContent: {
    paddingHorizontal: s(16),
    paddingBottom: s(16),
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: brandColors.surface,
    marginBottom: s(12),
    borderRadius: s(22),
    padding: s(14),
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    ...brandShadow.soft,
  },
  contentDistri: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: s(52),
    width: s(52),
    borderRadius: s(16),
    marginRight: s(12),
    backgroundColor: brandColors.background,
  },
  nameDistri: {
    fontWeight: '600',
    fontSize: fs(15),
    lineHeight: fs(21),
    color: brandColors.textDark,
    maxWidth: s(220),
  },
  viewCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: s(12),
  },
  textCheckBox: {
    color: brandColors.textDark,
  },
  consentBar: {
    paddingVertical: s(14),
    paddingHorizontal: s(12),
    backgroundColor: brandColors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: brandColors.borderSoft,
  },
  consentCheck: {
    marginHorizontal: s(8),
  },
  consentText: {
    marginRight: s(10),
    flex: 1,
    color: brandColors.textDark,
    fontSize: fs(13),
    lineHeight: fs(19),
    fontWeight: '600',
  },
  consentLink: {
    color: brandColors.tealPrimary,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
})
export default styles
