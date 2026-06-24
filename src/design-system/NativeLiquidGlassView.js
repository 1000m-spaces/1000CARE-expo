import { Platform, requireNativeComponent, View } from 'react-native'

const NativeLiquidGlassView = Platform.OS === 'ios'
  ? requireNativeComponent('RCTLiquidGlassView')
  : View

export default NativeLiquidGlassView
