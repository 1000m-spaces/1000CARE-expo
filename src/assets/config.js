//Config dùng chung cho tất cả các App
import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

export const did = DeviceInfo.getUniqueId()
export const version = DeviceInfo.getSystemVersion()
export const os = DeviceInfo.getSystemName()
export const model = DeviceInfo.getModel()

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height
export const width_90_percent = (deviceWidth / 100) * 90
export const minWidthDevice = (deviceWidth <= 320) ? true : false
export const isAndroid = Platform.OS === 'ios' ? false : true

export const unit_short = 'p'
export const unit_long = 'point'
export const Diamond = 'Diamond'
export const Diamond_short = 'D'

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')
const X_WIDTH = 375
const X_HEIGHT = 812

export const Fonts = {
  regular: 'SanFranciscoText-Regular',
  base: 'SanFranciscoText-Regular',
  medium: 'SanFranciscoText-Regular',
  meidum: 'SanFranciscoText-Regular', // legacy typo alias
  semiBold: 'SanFranciscoText-Semibold',
  bold: 'SanFranciscoText-Heavy',
  rounded: 'SanFranciscoText-Regular',
}

// const { PlatformConstants = {} } = NativeModules;
// const { minor = 0 } = PlatformConstants.reactNativeVersion || {};

export const isIPhoneX = (() => {
  return (
    !isAndroid &&
    ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||(D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
  )
})

export const isIPhone4s = (() => {
  const dimen = Dimensions.get('window')
  return (
    !isAndroid && ((dimen.height === 480 || dimen.width === 320)))
})
// 568

export const isIPhone5 = (() => {
  const dimen = Dimensions.get('window')
  return (
    !isAndroid && ((dimen.height === 568 || dimen.width === 320)))
})
