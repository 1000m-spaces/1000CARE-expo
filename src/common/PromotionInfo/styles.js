import { StyleSheet } from 'react-native'
import { Fonts } from '~/assets/config'
import Colors from '~/common/Colors/Colors'
import { DIMENS } from '~/constants/index'

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 9,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    padding: 14,
  },
  itemContainerChecked: {
    borderColor: Colors.systemColor2,
  },
  icon: {
    width: 18,
    height: 18,
  },
  iconContainer: {
    backgroundColor: Colors.systemColor2,
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 42,
    width: 42,
    height: 42,
  },
  promotionInfoContainer: {
    width: DIMENS.common.WINDOW_WIDTH - 28 - 50,
  },
  level: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textColor1,
  },
  promotionName: {
    color: Colors.systemColor2,
    fontFamily: Fonts.bold,
    fontSize: 14,
    marginBottom: 2,
    marginLeft: 12,
    lineHeight: 22,
    marginRight: 30,
  },
  promotionInfo: {
    color: Colors.textColor2,
    fontFamily: Fonts.medium,
    marginTop: 2, 
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 26,
    marginRight: 30,
  },
  iconCheck: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  promotionLevelContainer: {
    marginTop: 1,
    flex: 1, 
    paddingHorizontal: 18,
    backgroundColor: Colors.white,
  },
})

export default styles