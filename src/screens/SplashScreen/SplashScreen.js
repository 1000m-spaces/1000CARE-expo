import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, Alert, Platform, StatusBar, Text } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import strings from '~/i18n'
import { NetworkContext } from '../../network/NetworkProvider';
import { NAVIGATION_TO_MAIN_SCREEN } from '../../navigation/routes';
import { Image } from '~/common/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStore, getIsLoadNccFavorite } from '~/store/selector';
import {
  refreshToken as requestRefreshToken,
  getVersion,
} from '~/store/actions';
import Status from '~/common/Status/Status';
import { asyncStorage } from '~/store/index';
import { loadNccFavorite } from '~/store/auth/authActions';
import DeviceInfo from 'react-native-device-info';
import { brandColors } from '~/design-system/tokens';

const splashLogoMark = require('../../assets/configNeoMed/splash-logo-mark.png');
const splashScreenDuration = 3500;
const progressTrackWidth = 184;
const authSessionSchema = '1000care-auth-marketplace-v1';

const SplashScreen = ({ navigation }) => {
  const { isConnected } = useContext(NetworkContext);
  const dispatch = useDispatch();
  const { refreshTokenStatus } = useSelector(state => getAuthStore(state));
  const isLoadNccFavorite = useSelector(state => getIsLoadNccFavorite(state));
  const [isReady, setIsReady] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(false);
  const progressValue = useRef(new Animated.Value(0)).current;
  const hasNavigated = useRef(false);

  const version = DeviceInfo.getVersion();
  const os = Platform.OS === 'android' ? 'android' : 'ios';

  useEffect(() => {
    Animated.timing(progressValue, {
      toValue: 1,
      duration: splashScreenDuration,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        setIsSplashComplete(true);
      }
    });
  }, [progressValue]);

  useEffect(() => {
    internetCheck();
  }, [isConnected]);

  useEffect(() => {
    dispatch(getVersion(os, version));
  }, []);

  useEffect(() => {
    dispatch(loadNccFavorite(true));
  }, [isLoadNccFavorite]);

  useEffect(() => {
    if (isReady) {
      const restoreSession = async () => {
        try {
          const schema = await asyncStorage.getAuthSessionSchema();
          if (schema !== authSessionSchema) {
            await asyncStorage.clearAuthSession();
            await asyncStorage.setAuthSessionSchema(authSessionSchema);
          }
          const value = await asyncStorage.getRefreshToken();
          const refreshToken = value;
          if (refreshToken) {
            if (!isRequest) {
              setIsRequest(true);
              dispatch(requestRefreshToken());
            }
          } else {
            requestGoHomeScreen();
          }
        } catch (e) {
          console.log(e);
          await asyncStorage.clearAuthSession();
          requestGoHomeScreen();
        }
      };
      restoreSession();
    }
  }, [isReady]);

  useEffect(() => {
    if (isRequest) {
      if (
        refreshTokenStatus === Status.ERROR ||
        refreshTokenStatus === Status.SUCCESS
      ) {
        setIsRequest(false);
        requestGoHomeScreen();
      }
    }
  }, [refreshTokenStatus]);

  useEffect(() => {
    if (pendingNavigation && isSplashComplete) {
      goHomeScreen();
    }
  }, [pendingNavigation, isSplashComplete]);

  const requestGoHomeScreen = () => {
    if (isSplashComplete) {
      goHomeScreen();
      return;
    }
    setPendingNavigation(true);
  };

  const goHomeScreen = () => {
    if (hasNavigated.current) {
      return;
    }
    hasNavigated.current = true;
    console.log('goHomeScreen');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: NAVIGATION_TO_MAIN_SCREEN }],
      }),
    );
  };

  const internetCheck = () => {
    if (!isConnected) {
      Alert.alert(
        strings.errors.noInternetTitle,
        strings.splashScreen.noInternetMessage,
        [
          {
            text: strings.common.cancel,
            onPress: () => {},
            style: 'cancel',
          },
          { text: strings.common.ok, onPress: () => internetCheck() },
        ],
        { cancelable: false },
      );
    } else {
      setIsReady(true);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={brandColors.tealPrimary} />
      <View style={styles.brandBlock}>
        <Image source={splashLogoMark} style={styles.logo} resizeMode="contain" />
        <Text
          style={styles.brandName}
          numberOfLines={1}
          allowFontScaling={false}
        >
          1000CARE
        </Text>
        <View style={styles.progressTrack}>
          <Animated.View
            style={[
              styles.progressFill,
              {
                width: progressValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, progressTrackWidth],
                }),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.secureLine}>SECURE SHOPPING MARKET</Text>
        <Text style={styles.editionLine}>MARKETPLACE EDITION V{version}</Text>
        <Text style={styles.copyrightLine}>1000CARE © 2026. All rights reserved.</Text>
        <Text style={styles.protocolLine}>Kết nối người mua, nhà cung cấp và sản phẩm chất lượng.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: brandColors.tealPrimary,
    paddingHorizontal: 32,
  },
  brandBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 84,
  },
  logo: {
    width: 168,
    height: 168,
    marginBottom: 26,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 42,
    lineHeight: 52,
    fontWeight: '600',
    letterSpacing: 4,
    textAlign: 'center',
    width: 330,
    includeFontPadding: false,
  },
  progressTrack: {
    width: progressTrackWidth,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.22)',
    marginTop: 78,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: 42,
    alignItems: 'center',
  },
  secureLine: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '600',
    letterSpacing: 4,
    textAlign: 'center',
    marginLeft: 4,
  },
  editionLine: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    letterSpacing: 3,
    textAlign: 'center',
    marginTop: 14,
    marginLeft: 3,
  },
  copyrightLine: {
    color: 'rgba(255,255,255,0.48)',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 28,
  },
  protocolLine: {
    color: 'rgba(255,255,255,0.44)',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SplashScreen;
