import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Modal, View, Text, StyleSheet, AppState } from 'react-native';
import * as Updates from 'expo-updates';
import PressScale from './PressScale';
import { brandColors, radiusScale } from './tokens';
import { Fonts } from '~/assets/config';
import { s, fs } from '~/utils/responsive';

/**
 * Kiểm tra bản cập nhật OTA (expo-updates) khi app mở lên VÀ mỗi lần quay
 * lại foreground (2026-09-19, theo góp ý app Marketer — trước chỉ check 1
 * lần lúc mount nên phiên đang mở dài không bao giờ thấy popup dù bản mới
 * đã lên từ lâu). Có bản mới → tải sẵn rồi hiện popup giữa màn hình — CHỈ
 * áp dụng khi người dùng bấm "Đồng ý" (gọi Updates.reloadAsync()), không
 * tự khởi động lại app. `app.json` đã đặt `checkAutomatically:
 * "ON_ERROR_RECOVERY"` (không phải mặc định "ON_LOAD") để expo-updates
 * không tự âm thầm tải + áp dụng bản mới ở lần mở kế tiếp trước khi
 * component này kịp hỏi ý người dùng.
 */
const UpdatePrompt = () => {
  const [visible, setVisible] = useState(false);
  const [reloading, setReloading] = useState(false);
  const checkingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    const checkForUpdate = async () => {
      // Updates không hoạt động trên Expo Go / dev client build local
      if (!Updates.isEnabled || checkingRef.current) {
        return;
      }
      checkingRef.current = true;
      try {
        const result = await Updates.checkForUpdateAsync();
        if (!result.isAvailable || cancelled) {
          return;
        }
        await Updates.fetchUpdateAsync();
        if (!cancelled) {
          setVisible(true);
        }
      } catch (e) {
        // Mất mạng / server lỗi -> bỏ qua âm thầm, không chặn người dùng dùng app
      } finally {
        checkingRef.current = false;
      }
    };

    checkForUpdate();
    const subscription = AppState.addEventListener('change', nextState => {
      if (nextState === 'active') checkForUpdate();
    });

    return () => {
      cancelled = true;
      subscription.remove();
    };
  }, []);

  const onReload = useCallback(async () => {
    setReloading(true);
    try {
      await Updates.reloadAsync();
    } catch (e) {
      setReloading(false);
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
      onRequestClose={() => {}} // chặn nút back Android đóng popup mà không cập nhật
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Có bản cập nhật mới</Text>
          <Text style={styles.desc}>
            Ứng dụng vừa tải xong bản cập nhật mới. Khởi động lại ngay để áp dụng?
          </Text>
          <View style={styles.buttonRow}>
            <PressScale
              onPress={() => setVisible(false)}
              disabled={reloading}
              style={styles.buttonSecondary}
            >
              <Text style={styles.buttonSecondaryText}>Để sau</Text>
            </PressScale>
            <PressScale
              onPress={onReload}
              disabled={reloading}
              style={styles.buttonPrimary}
            >
              <Text style={styles.buttonPrimaryText}>
                {reloading ? 'Đang khởi động...' : 'Đồng ý'}
              </Text>
            </PressScale>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,32,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(28),
  },
  card: {
    width: '100%',
    maxWidth: s(320),
    backgroundColor: brandColors.surface,
    borderRadius: s(radiusScale.xxxl),
    padding: s(24),
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(16),
    color: brandColors.textDark,
    marginBottom: s(8),
    textAlign: 'center',
  },
  desc: {
    fontFamily: Fonts.base,
    fontWeight: 'normal',
    fontSize: fs(13),
    color: brandColors.muted,
    textAlign: 'center',
    lineHeight: s(19),
    marginBottom: s(20),
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: s(10),
  },
  buttonSecondary: {
    flex: 1,
    minHeight: s(48),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(16),
  },
  buttonSecondaryText: {
    color: brandColors.textDark,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(14),
  },
  buttonPrimary: {
    flex: 1,
    minHeight: s(48),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(16),
  },
  buttonPrimaryText: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(14),
  },
});

export default UpdatePrompt;
