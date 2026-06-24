import { StyleSheet } from 'react-native'
import Colors from '~/common/Colors/Colors'
import { DIMENS } from '~/constants/index'
import { s, fs } from '~/utils/responsive'
import { brandColors, liquidGlass } from '~/design-system/tokens'

export default StyleSheet.create({
  listSupplierColumnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  titleSupplierContainer: {
    minHeight: s(56),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    alignItems: 'center',
    marginHorizontal: s(16),
    marginTop: s(12),
    borderRadius: s(20),
    paddingHorizontal: s(10),
    ...liquidGlass.shadow,
  },
  viewTitleSupplier: {
    height: s(40),
    paddingHorizontal: s(14),
    borderRadius: s(14),
    backgroundColor: brandColors.tealPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSupplier: {
    color: brandColors.surface,
    fontSize: fs(12),
    fontWeight: '600',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  viewNameSupplier: {
    height: s(40),
    justifyContent: 'center',
    flex: 1,
  },
  nameSupplier: {
    color: brandColors.textDark,
    fontSize: fs(14),
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingLeft: s(12),
    paddingVertical: s(7),
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  banner: {
    width: '100%',
    height: (DIMENS.common.WINDOW_WIDTH - 100) * 2 / 5,
    marginBottom: s(4),
    borderRadius: s(20),
  },
  listCategoriesContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
    padding: s(10),
  },

  swiper: {
    width: (DIMENS.common.WINDOW_WIDTH - s(116)),
    height: (DIMENS.common.WINDOW_WIDTH - 100) * 2 / 5,
    zIndex: 0,
    borderRadius: s(20),
    overflow: 'hidden',
    marginBottom: s(10),
    borderWidth: 1,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
  },
  swiperItemContainer: {
    backgroundColor: 'transparent',
    height: (DIMENS.common.WINDOW_WIDTH - 100) * 2 / 5,
  },
  swiperItem: {
    width: (DIMENS.common.WINDOW_WIDTH - s(116)),
    height: (DIMENS.common.WINDOW_WIDTH - 100) * 2 / 5,
  },
  textButton: {
    fontSize: fs(12),
    lineHeight: fs(15),
    fontWeight: '600',
    color: brandColors.tealPrimary,
  },
})
