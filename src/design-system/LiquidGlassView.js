import React from 'react';
import { Platform, StyleSheet, UIManager, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { liquidGlass } from './tokens';
import NativeLiquidGlassView from './NativeLiquidGlassView';

const webBackdrop = Platform.select({
  web: {
    backdropFilter: 'blur(22px) saturate(160%)',
    WebkitBackdropFilter: 'blur(22px) saturate(160%)',
  },
  default: {},
});

const LiquidGlassView = ({ children, style, intensity = 'regular', variant = 'default', ...props }) => {
  const glassStyle = intensity === 'strong' ? styles.strong : styles.regular;
  const isDroplet = variant === 'droplet';
  const blurIntensity = isDroplet ? 100 : intensity === 'strong' ? 48 : 30;
  const blurTint = isDroplet ? 'systemUltraThinMaterialLight' : 'light';
  const hasNativeBlur = Platform.OS === 'web'
    || Boolean(
      UIManager.getViewManagerConfig?.('ExpoBlurView')
      || UIManager.getViewManagerConfig?.('ViewManagerAdapter_ExpoBlurView')
    );
  const hasNativeLiquidGlass = Platform.OS === 'ios'
    && Boolean(UIManager.getViewManagerConfig?.('RCTLiquidGlassView'));

  if (isDroplet && hasNativeLiquidGlass) {
    return (
      <NativeLiquidGlassView
        glassStyle="clear"
        style={[styles.base, styles.nativeDroplet, style]}
        {...props}
      >
        <View pointerEvents="none" style={styles.nativeDropletShade} />
        {children}
      </NativeLiquidGlassView>
    );
  }

  const regularGradient = !isDroplet && (
    <LinearGradient
      pointerEvents="none"
      colors={liquidGlass.gradient}
      locations={liquidGlass.gradientLocations}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={StyleSheet.absoluteFill}
    />
  );

  if (hasNativeBlur) {
    return (
      <BlurView
        intensity={blurIntensity}
        tint={blurTint}
        experimentalBlurMethod="dimezisBlurView"
        style={[styles.base, glassStyle, style]}
        {...props}
      >
        {regularGradient}
        <View pointerEvents="none" style={[styles.frostWash, isDroplet && styles.frostWashDroplet]} />
        {isDroplet && (
          <>
            <LinearGradient
              pointerEvents="none"
              colors={[
                'rgba(255,255,255,0.68)',
                'rgba(255,255,255,0.08)',
                'rgba(255,255,255,0.32)',
              ]}
              locations={[0, 0.52, 1]}
              start={{ x: 0.08, y: 0 }}
              end={{ x: 0.96, y: 1 }}
              style={styles.lensSheen}
            />
            <View pointerEvents="none" style={styles.innerRim} />
          </>
        )}
        <View pointerEvents="none" style={[styles.highlight, isDroplet && styles.highlightDroplet]} />
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[styles.base, glassStyle, style]} {...props}>
      {regularGradient}
      <View pointerEvents="none" style={[styles.frostWash, isDroplet && styles.frostWashDroplet]} />
      {isDroplet && (
        <>
          <LinearGradient
            pointerEvents="none"
            colors={[
              'rgba(255,255,255,0.68)',
              'rgba(255,255,255,0.08)',
              'rgba(255,255,255,0.32)',
            ]}
            locations={[0, 0.52, 1]}
            start={{ x: 0.08, y: 0 }}
            end={{ x: 0.96, y: 1 }}
            style={styles.lensSheen}
          />
          <View pointerEvents="none" style={styles.innerRim} />
        </>
      )}
      <View pointerEvents="none" style={[styles.highlight, isDroplet && styles.highlightDroplet]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: liquidGlass.border,
    ...liquidGlass.shadow,
    ...webBackdrop,
  },
  regular: {
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
  strong: {
    backgroundColor: 'rgba(255,255,255,0.52)',
  },
  nativeDroplet: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  nativeDropletShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  frostWash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  frostWashDroplet: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.78)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  highlightDroplet: {
    borderTopWidth: 1.5,
    borderTopColor: 'rgba(255,255,255,0.98)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.68)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.01)',
  },
  lensSheen: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  innerRim: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.46)',
  },
});

export default LiquidGlassView;
