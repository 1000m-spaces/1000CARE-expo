import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, View, TouchableOpacity, StyleSheet, Dimensions, Platform, LayoutAnimation, UIManager } from 'react-native';
import { Image } from '~/common/index';
import { shopping_bag, home, gift, account } from '~/assets/constants';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_ORDERS_SCREEN,
  NAVIGATION_TO_HOT_DEAL_SCREEN,
  NAVIGATION_TO_PROFILE_SCREEN,
} from '~/navigation/routes';
import { s } from '~/utils/responsive';
import { brandColors } from '~/design-system/tokens';
import LiquidGlassView from '~/design-system/LiquidGlassView';
import { useTabBarVisibility } from './TabBarVisibilityContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');
const PILL_WIDTH = Math.min(width - s(96), s(292));
const PILL_PADDING = s(8);
const BUBBLE_SIZE = s(42);

const CustomTabBar = ({ state, navigation }) => {
  const { visible, setVisible } = useTabBarVisibility();
  const itemWidth = useMemo(() => (PILL_WIDTH - PILL_PADDING * 2) / state.routes.length, [state.routes.length]);
  const initialBubbleX = PILL_PADDING + itemWidth * state.index + (itemWidth - BUBBLE_SIZE) / 2;
  const translateY = useRef(new Animated.Value(0)).current;
  const activeX = useRef(new Animated.Value(initialBubbleX)).current;
  const activeScale = useRef(new Animated.Value(1)).current;
  const icons = {
    [NAVIGATION_TO_HOME_SCREEN]: home,
    [NAVIGATION_ORDERS_SCREEN]: shopping_bag,
    [NAVIGATION_TO_HOT_DEAL_SCREEN]: gift,
    [NAVIGATION_TO_PROFILE_SCREEN]: account,
  };

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : s(112),
      useNativeDriver: true,
      damping: 18,
      stiffness: 180,
      mass: 0.9,
    }).start();
  }, [translateY, visible]);

  useEffect(() => {
    const nextX = PILL_PADDING + itemWidth * state.index + (itemWidth - BUBBLE_SIZE) / 2;

    Animated.parallel([
      Animated.spring(activeX, {
        toValue: nextX,
        useNativeDriver: true,
        damping: 14,
        stiffness: 170,
        mass: 0.82,
      }),
      Animated.sequence([
        Animated.timing(activeScale, {
          toValue: 1.12,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(activeScale, {
          toValue: 1,
          useNativeDriver: true,
          damping: 9,
          stiffness: 140,
        }),
      ]),
    ]).start();
  }, [activeScale, activeX, itemWidth, state.index]);

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={[
        styles.container,
        {
          opacity: translateY.interpolate({
            inputRange: [0, s(112)],
            outputRange: [1, 0.2],
            extrapolate: 'clamp',
          }),
          transform: [{ translateY }],
        },
      ]}
    >
      <LiquidGlassView intensity="strong" variant="droplet" style={styles.tabBar}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.activeBubble,
            {
              transform: [
                { translateX: activeX },
                { scale: activeScale },
              ],
            },
          ]}
        >
          <View style={styles.bubbleShine} />
        </Animated.View>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // Trigger smooth animation before navigating
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setVisible(true);
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={[styles.tabItem, { width: itemWidth }]}
              activeOpacity={0.7}
            >
              <Image
                source={icons[route.name]}
                style={[
                  styles.icon,
                  { tintColor: isFocused ? brandColors.surface : 'rgba(4,86,98,0.95)' },
                ]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          );
        })}
      </LiquidGlassView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? s(22) : s(16),
    backgroundColor: 'transparent',
  },
  tabBar: {
    width: PILL_WIDTH,
    flexDirection: 'row',
    borderRadius: s(32),
    height: s(64),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: PILL_PADDING,
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderWidth: 0,
    borderColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: s(50),
    borderRadius: s(25),
  },
  icon: {
    width: s(24),
    height: s(24),
  },
  activeBubble: {
    position: 'absolute',
    left: 0,
    top: s(11),
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: 'rgba(11,123,138,0.68)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.54)',
    shadowColor: brandColors.tealPrimary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.38,
    shadowRadius: 18,
    elevation: 8,
    overflow: 'hidden',
  },
  bubbleShine: {
    position: 'absolute',
    top: s(4),
    left: s(6),
    width: s(15),
    height: s(15),
    borderRadius: s(8),
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
});

export default CustomTabBar;
