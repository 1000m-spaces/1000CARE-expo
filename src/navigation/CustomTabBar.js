import React, { useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, LayoutAnimation, UIManager } from 'react-native';
import { useSelector } from 'react-redux';
import { Image, Icon } from '~/common/index';
import { shopping_bag, home, gift, account } from '~/assets/constants';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_ORDERS_SCREEN,
  NAVIGATION_TO_HOT_DEAL_SCREEN,
  NAVIGATION_TO_PROFILE_SCREEN,
  NAVIGATION_CHAT_LIST_V2,
} from '~/navigation/routes';
import { getProductMessageThreadsV2 } from '~/store/catalogV2/catalogV2Selector';
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

  // Nút chat marketer nổi (FAB) — theo thống nhất với 1000care-seller-app-f1
  // 2026-09-15: KHÔNG nhét vào pill 4-tab (chật), tách hẳn thành 1 nút
  // tròn riêng kiểu Messenger/Zalo, nổi phía trên-phải pill. Badge đếm số
  // hội thoại còn gợi ý sản phẩm CHƯA áp dụng (dữ liệu thật).
  const chatThreads = useSelector(state => getProductMessageThreadsV2(state));
  const chatUnreadCount = chatThreads.reduce((sum, t) => sum + (t.unappliedCount > 0 ? 1 : 0), 0);

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

      <TouchableOpacity
        style={styles.chatFab}
        activeOpacity={0.85}
        onPress={() => navigation.navigate(NAVIGATION_CHAT_LIST_V2)}
      >
        <Icon type="feather" name="message-circle" color={brandColors.surface} size={s(22)} />
        {chatUnreadCount > 0 && (
          <View style={styles.chatFabBadge}>
            <Text style={styles.chatFabBadgeText}>{chatUnreadCount > 9 ? '9+' : chatUnreadCount}</Text>
          </View>
        )}
      </TouchableOpacity>
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
  chatFab: {
    position: 'absolute',
    right: s(16),
    bottom: s(100), // nổi phía trên pill (height 66 + khoảng cách), không chung 1 khối
    width: s(52),
    height: s(52),
    borderRadius: s(26),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.goldAccent,
    ...brandShadow.sheet,
  },
  chatFabBadge: {
    position: 'absolute',
    top: -s(2),
    right: -s(2),
    minWidth: s(18),
    height: s(18),
    borderRadius: s(9),
    paddingHorizontal: s(4),
    backgroundColor: brandColors.danger,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: brandColors.surface,
  },
  chatFabBadgeText: {
    color: brandColors.surface,
    fontSize: fs(9.5),
    fontWeight: '800',
  },
});

export default CustomTabBar;
