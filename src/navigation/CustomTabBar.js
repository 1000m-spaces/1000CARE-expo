import React, { useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, LayoutAnimation, UIManager } from 'react-native';
import { Image } from '~/common/index';
import { shopping_bag, home, gift, account } from '~/assets/constants';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_ORDERS_SCREEN,
  NAVIGATION_TO_HOT_DEAL_SCREEN,
  NAVIGATION_TO_PROFILE_SCREEN,
} from '~/navigation/routes';
import { s, fs } from '~/utils/responsive';
import { brandColors, radiusScale, brandShadow } from '~/design-system/tokens';
import { useTabBarVisibility } from './TabBarVisibilityContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const { width } = Dimensions.get('window');

// Pill nổi nền `--ink` đặc + icon/label vàng gold khi active — theo đúng
// bản handoff thiết kế mới (app Marketer, 2026-09-15), thay bản kính mờ
// + bubble nổi trước đó. Xem [[marketplace-core-business-model]] không
// liên quan — đây là redesign UI thuần theo yêu cầu chủ dự án.
// (Nút chat marketer TỪNG là 1 FAB tròn nổi ở đây, đã DỜI vào header
// màn Home — `HomeScreen/HomeScreen.js` `HomeChatButton` — thu gọn thanh
// tìm kiếm để lấy chỗ, theo yêu cầu 2026-09-15.)
const TAB_LABEL = {
  [NAVIGATION_TO_HOME_SCREEN]: 'Trang chủ',
  [NAVIGATION_ORDERS_SCREEN]: 'Đơn hàng',
  [NAVIGATION_TO_HOT_DEAL_SCREEN]: 'Giỏ quà',
  [NAVIGATION_TO_PROFILE_SCREEN]: 'Tài khoản',
};

const CustomTabBar = ({ state, navigation }) => {
  const { visible, setVisible } = useTabBarVisibility();
  const translateY = React.useRef(new Animated.Value(0)).current;
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
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setVisible(true);
              navigation.navigate(route.name);
            }
          };

          const tintColor = isFocused ? brandColors.goldAccent : 'rgba(255,255,255,0.75)';

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Image
                source={icons[route.name]}
                style={[styles.icon, { tintColor }]}
                resizeMode="contain"
              />
              <Text style={[styles.label, { color: tintColor }]} numberOfLines={1}>
                {TAB_LABEL[route.name]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? s(22) : s(16),
    backgroundColor: 'transparent',
  },
  tabBar: {
    width: width - s(32), // left:16 + right:16 theo bản handoff
    flexDirection: 'row',
    borderRadius: radiusScale.pill,
    height: s(66),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: brandColors.tealPrimary, // --ink đặc, không còn kính mờ
    ...brandShadow.sheet,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(3),
  },
  icon: {
    width: s(22),
    height: s(22),
  },
  label: {
    fontSize: fs(10.5),
    fontWeight: '600',
  },
});

export default CustomTabBar;
