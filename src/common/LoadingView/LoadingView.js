import React from 'react'
import { StyleSheet, View } from 'react-native'
import Spinner from '../Spinner/Spinner'
import SkeletonLoader from '../SkeletonLoader/SkeletonLoader'
import { liquidGlass } from '~/design-system/tokens'
import { s } from '~/utils/responsive'

const LoadingView = ({
  size = 'large',
  backgroundColor = null,
  compact = false,
  variant = 'screen',
  withHeader = true,
}) => {
  if (compact) {
    return (
      <View style={[styles.compact, backgroundColor && { backgroundColor }]}>
        <Spinner size={size} />
      </View>
    )
  }

  return (
    <View style={styles.overlay}>
      <SkeletonLoader variant={variant} withHeader={withHeader} />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  compact: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: s(48),
    height: s(48),
    marginTop: -s(24),
    marginLeft: -s(24),
    borderRadius: s(24),
    backgroundColor: liquidGlass.background,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    zIndex: 999,
    ...liquidGlass.shadow,
  },
})

export default LoadingView
