import { Dimensions, StyleSheet } from 'react-native'
import { s, fs } from '~/utils/responsive'
import { brandColors, brandShadow } from '~/design-system/tokens'
const fullWith = Dimensions.get('window').width

const styles = StyleSheet.create({
  imageTitle: {
    width: fullWith,
    minHeight: 50,
  },
  imageInfo: {
    width: fullWith,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.9,
  },
  viewTitle: {
    flexDirection: 'row',
    padding: s(10),
  },
  viewNeo: {
    width: fullWith-60,
    alignItems: 'center',
  },
  styleTitle: {
    color: brandColors.surface,
    fontSize: fs(22),
  },
  numberMoney: {
    textAlign: 'center',
    fontSize: fs(25),
    color: brandColors.surface,
    fontWeight: '600',
    marginTop: s(20),
  },
  textMoney: {
    color: brandColors.surface,
    textAlign: 'center',
    fontSize: fs(16),
    marginTop: s(15),
  },
  viewSelect: {
    height: s(92),
    marginHorizontal: s(16),
    width: fullWith - s(32),
    backgroundColor: brandColors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: s(24),
    ...brandShadow.soft,
  },
  buttonSelect: {
    height: 40,
    width: 40,
    backgroundColor: brandColors.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(16),
  },
  textHistory: {
    fontSize: fs(16),
    paddingLeft: s(20),
    paddingTop: s(10),
    paddingBottom: s(10),
    backgroundColor: brandColors.surface,
    marginBottom: 1,
  },
  textSelect: {
    marginTop: 5,
  },
  viewSpace: {
    backgroundColor: brandColors.background,
    height: s(50),
  },
  viewStatement: {
    height: 85,
    width: fullWith,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: brandColors.surface,
  },
  buttonStatement: {
    width: fullWith-70,
    backgroundColor: brandColors.tealPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: s(18),
    padding: s(10),
  },
  textStatement: {
    color: brandColors.surface,
    fontSize: fs(16),
  },

})
export default styles
