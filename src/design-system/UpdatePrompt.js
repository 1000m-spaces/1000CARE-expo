import React, { useCallback, useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import * as Updates from 'expo-updates';
import PressScale from './PressScale';
import { brandColors, radiusScale } from './tokens';
import { Fonts } from '~/assets/config';
import { s, fs } from '~/utils/responsive';

/**
 * Kiểm tra bản cập nhật OTA (expo-updates) khi app mở lên. Nếu có bản mới,
 * tải sẵn rồi hiện popup giữa màn hình — CHỈ áp dụng khi người dùng bấm OK
 * (gọi Updates.reloadAsync()), không tự khởi động lại app.
 */
const UpdatePrompt = () => {
  const [visible, setVisible] = useState(false);
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkForUpdate = async () => {
      // Updates không hoạt động trên Expo Go / dev client build local
      if (!Updates.isEnabled) {
        return;
      }
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
      }
    };

    checkForUpdate();

    return () => {
      cancelled = true;
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
          <Text style={styles.title}>Đã có bản cập nhật mới</Text>
          <Text style={styles.desc}>
            Khởi động lại ứng dụng để áp dụng phiên bản mới nhất.
          </Text>
          <PressScale
            onPress={onReload}
            disabled={reloading}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {reloading ? 'Đang khởi động lại...' : 'OK, khởi động lại'}
            </Text>
          </PressScale>
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
  button: {
    width: '100%',
    minHeight: s(48),
    borderRadius: s(radiusScale.pill),
    backgroundColor: brandColors.tealPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: s(20),
  },
  buttonText: {
    color: brandColors.surface,
    fontFamily: Fonts.bold,
    fontWeight: 'normal',
    fontSize: fs(14),
  },
});

export default UpdatePrompt;
