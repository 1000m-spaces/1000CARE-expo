import React, { useEffect } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Platform, LayoutAnimation, UIManager } from 'react-native';
import { Icon } from '~/common/index';
import {
  NAVIGATION_TO_HOME_SCREEN,
  NAVIGATION_ORDERS_SCREEN,
  NAVIGATION_MY_CARTS_V2,
  NAVIGATION_TO_PROFILE_SCREEN,
} from '~/navigation/routes';
import { s, fs } from '~/utils/responsive';
import { brandColors, radiusScale, brandShadow } from '~/design-system/tokens';
import { useTabBarVisibility } from './TabBarVisibilityContext';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  [NAVIGATION_MY_CARTS_V2]: 'Giỏ hàng',
  [NAVIGATION_TO_PROFILE_SCREEN]: 'Tài khoản',
};

// Icon vector (feather) thay PNG tint — đồng bộ luôn với icon dùng ở
// header/màn khác từ đợt redesign, không cần asset riêng cho tab bar.
const TAB_ICON = {
  [NAVIGATION_TO_HOME_SCREEN]: 'home',
  [NAVIGATION_ORDERS_SCREEN]: 'file-text',
  [NAVIGATION_MY_CARTS_V2]: 'shopping-cart',
  [NAVIGATION_TO_PROFILE_SCREEN]: 'user',
};

const BOTTOM_INSET = Platform.OS === 'ios' ? s(22) : s(16);

// Giỏ hàng tách RIÊNG thành 1 nút tròn nổi bên phải (2026-09-19, theo
// ảnh mẫu app giao đồ ăn sếp gửi) — pill chính giờ chỉ còn 3 module
// đều nhau (Trang chủ/Đơn hàng/Tài khoản), route Giỏ hàng vẫn đăng ký
// bình thường trong tab navigator (MainScreen.js) nên vẫn nhận đúng
// `state.index`/điều hướng — chỉ khác chỗ RENDER ở đây.
const CustomTabBar = ({ state, navigation }) => {
  const { visible, setVisible } = useTabBarVisibility();
  const translateY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : s(112),
      useNativeDriver: true,
      damping: 18,
      stiffness: 180,
      mass: 0.9,
    }).start();
  }, [translateY, visible]);

  const goToTab = route => {
    const isFocused = state.routes[state.index].key === route.key;
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

  const cartRoute = state.routes.find(route => route.name === NAVIGATION_MY_CARTS_V2);
  const pillRoutes = state.routes.filter(route => route.name !== NAVIGATION_MY_CARTS_V2);
  const cartFocused = cartRoute && state.routes[state.index].key === cartRoute.key;

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
        {pillRoutes.map((route, index) => {
          const isFocused = state.routes[state.index].key === route.key;
          const tintColor = isFocused ? brandColors.goldAccent : 'rgba(255,255,255,0.75)';

          return (
            <TouchableOpacity
              key={index}
              onPress={() => goToTab(route)}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <Icon type="feather" name={TAB_ICON[route.name]} color={tintColor} size={s(19)} />
              <Text style={[styles.label, { color: tintColor }]} numberOfLines={1}>
                {TAB_LABEL[route.name]}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {!!cartRoute && (
        <TouchableOpacity
          onPress={() => goToTab(cartRoute)}
          style={[styles.cartFab, cartFocused && styles.cartFabActive]}
          activeOpacity={0.85}
        >
          <Icon
            type="feather"
            name="shopping-cart"
            color={cartFocused ? brandColors.goldAccent : brandColors.surface}
            size={s(21)}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // BUG đã sửa (2026-09-16, sếp báo pill bị lệch/đẩy về phải): trước
  // dùng `Dimensions.get('window').width` đọc 1 LẦN lúc module load để
  // tự tính `width - 32` rồi canh giữa bằng `alignItems:'center'` — nếu
  // giá trị width đọc được lúc đó không khớp kích thước thật (rotate,
  // fold, fast-refresh...) thì pill bị lệch hẳn sang 1 bên. Đổi hẳn
  // sang định vị `left`/`right` tuyệt đối — không phụ thuộc Dimensions,
  // luôn đối xứng đúng 16px mỗi bên bất kể kích thước màn hình thật.
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  // BUG đã sửa (2026-09-16, sếp báo pill bị đẩy sát đáy màn hình): con
  // absolute trong RN định vị theo mép BORDER của cha, không theo mép
  // PADDING như CSS — nên `paddingBottom` ở `container` không đẩy được
  // `tabBar` lên nữa khi tabBar tự thành absolute. Ghi thẳng khoảng cách
  // đáy lên `bottom` của chính tabBar thay vì trông chờ padding cha.
  // `right` rút ngắn lại (thay vì s(16) full-width) để chừa chỗ cho
  // `cartFab` nổi riêng bên phải (2026-09-19). Chiều cao rút từ 66→58 +
  // shadow nhẹ lại (2026-09-19, sếp báo thanh to/nặng quá sau khi đổi
  // sang nền tím đặc violet-700 — khối tím lớn + đổ bóng đậm nhìn nặng
  // hơn hẳn bản teal cũ dù cùng 1 kích thước).
  tabBar: {
    position: 'absolute',
    left: s(16),
    right: s(86),
    bottom: BOTTOM_INSET,
    flexDirection: 'row',
    borderRadius: radiusScale.pill,
    height: s(58),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: brandColors.tealPrimary, // --ink đặc, không còn kính mờ
    ...brandShadow.soft,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s(2),
  },
  label: {
    fontSize: fs(9.5),
    fontWeight: '600',
  },
  // Nút tròn Giỏ hàng nổi riêng bên phải — CÙNG `bottom` và CÙNG chiều
  // cao với `tabBar` (không +6 nâng lên như bản trước, sếp báo bị lệch
  // không thẳng hàng với pill) để mép trên/dưới khớp thẳng hàng đúng 1
  // đường với pill chính, nhìn như 1 khối liền chứ không phải 1 FAB nổi
  // lệch tầng. Không viền cứng thường trực (sếp từng báo viền trắng) —
  // chỉ hiện viền vàng khi ĐANG active (`cartFabActive`, borderWidth chỉ
  // đặt ở đó, không đặt sẵn ở `cartFab`).
  cartFab: {
    position: 'absolute',
    right: s(16),
    bottom: BOTTOM_INSET,
    width: s(58),
    height: s(58),
    borderRadius: s(29),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealPrimary,
    ...brandShadow.soft,
  },
  cartFabActive: {
    borderWidth: s(2),
    borderColor: brandColors.goldAccent,
  },
});

export default CustomTabBar;
