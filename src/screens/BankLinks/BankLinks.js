import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, View, FlatList, SafeAreaView, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '~/common/Header/index';
import { back } from '~/assets/constants';
import strings from '~/i18n';
import ItemBank from './ItemBank';
import {
  getPaymentAccount,
  getLinkPaymentStatus,
  getLinkPaymentErr,
  getUser,
} from '~/store/selector';
import {
  getProfile,
  getWallet, linkPayment,
  resetLinkPaymentStatus,
} from '~/store/actions';
import { CommonActions } from '@react-navigation/native';

import PressScale from '~/design-system/PressScale';
import BackgroundWash from '~/design-system/BackgroundWash';
import { brandColors, brandGradients, brandShadow } from '~/design-system/tokens';
import { s, fs } from '~/utils/responsive';
import { Fonts } from '~/assets/config';
import { NAVIGATION_BANK_LINKS_CONFIRM, NAVIGATION_TO_MAIN_SCREEN, NAVIGATION_UPDATE_PROFILE } from '~/navigation/routes';
import Status from '~/common/Status/Status';
import { showToast } from '~/utils/toast';
import { useFocusEffect } from '@react-navigation/native';
import DialogInfo from '~/common/DialogInfo/index';

const BankLinks = props => {
  const goBack = props.route.params?.goBack;
  const goHome = props.route.params?.goHome;
  const dispatch = useDispatch();
  const paymentAccount = useSelector(state => getPaymentAccount(state));
  const linkStatus = useSelector(state => getLinkPaymentStatus(state));
  const linkErr = useSelector(state => getLinkPaymentErr(state));
  const user = useSelector(state => getUser(state));
  const [showDialog, setShowDialog] = useState(false);
  const [isErrorDialog, setIsErrorDialog] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
    dispatch(getWallet(1, 500));
  }, []);

  useEffect(() => {
    if (linkStatus === Status.SUCCESS) {
      setShowDialog(false);
      setIsErrorDialog(false);
      props.navigation.navigate(NAVIGATION_BANK_LINKS_CONFIRM, {
        onGoBack: () => {
          dispatch(getWallet(1, 500));
        },
      });
      dispatch(resetLinkPaymentStatus());
    } else if (linkStatus === Status.LOADING) {
      setIsErrorDialog(false);
      setShowDialog(true);
    } else if (linkStatus === Status.ERROR) {
      setIsErrorDialog(true);
    } else {
      setShowDialog(false);
    }
  }, [linkStatus]);

  const onAddBankPress = () => {
    dispatch(linkPayment());
  };

  const onErrorClose = () => {
    setShowDialog(false);
    setIsErrorDialog(false);
    if (linkErr === 'ewallet.register.error-exists-payment-account') {
      dispatch(resetLinkPaymentStatus());
      onBack();
      return;
    }
    dispatch(resetLinkPaymentStatus());
  };

  const goHomeScreen = () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          { name: NAVIGATION_TO_MAIN_SCREEN },
        ],
      }),
    );
  };

  const onBack = () => {
    if (goHome) {
      goHomeScreen();
    } else {
      if (goBack) {
        goBack();
      }
      props.navigation.goBack();
    }
  };

  useFocusEffect(useCallback(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    let backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      backAction();
          });
    return () => backHandler.remove();
  }, []));

  const getError = () => {
    if (linkErr === 'ewallet.register.error-exists-payment-account') {
      return 'Bạn đã liên kết tài khoản MB trước đó';
    } else {
      return linkErr;
    }
  };

  const getButtonAction = () => {
    if (user && user.national_id) {
      return (
        <View style={styles.loginBtnContainer}>
          <PressScale style={styles.ctaButton} onPress={onAddBankPress}>
            <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
              <Text style={styles.ctaText}>Thêm liên kết</Text>
            </LinearGradient>
          </PressScale>
        </View>
      );
    }
    showToast('Bạn cần xác minh danh tính trước khi liên kết tài khoản');
    return (
      <View style={styles.loginBtnContainer}>
        <PressScale
          style={styles.ctaButton}
          onPress={() => {
            props.navigation.navigate(NAVIGATION_UPDATE_PROFILE, {
              onBack: () => {
                dispatch(getProfile());
                dispatch(getWallet(1, 500));
              },
            });
          }}
        >
          <LinearGradient colors={brandGradients.primary} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.ctaGradient}>
            <Text style={styles.ctaText}>Xác minh danh tính</Text>
          </LinearGradient>
        </PressScale>
      </View>
    );
  };

  const renderItem = useCallback((item, index) => <ItemBank data={item.item} />);
  const keyExtractor = useCallback((item, index) => index.toString());
  return (
    <SafeAreaView style={styles.container}>
      <BackgroundWash />
      <View style={styles.container}>
        <Header
          title={strings.BankLinks.title}
          leftAction={() => {
            onBack();
          }}
          iconLeft={back}
        />
        {paymentAccount && paymentAccount.length > 0 ?
          <View style={styles.containerBank}>
            <Text style={styles.textListBank}>Danh sách ngân hàng</Text>
          </View> : null}
        {paymentAccount && paymentAccount.length > 0 ?
          <FlatList
            style={{ flexGrow: 0 }}
            data={paymentAccount}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          /> : null}

        {paymentAccount && paymentAccount.length > 0 ? null :
          getButtonAction()
        }

        <DialogInfo
          isOpen={showDialog}
          isError={isErrorDialog}
          isOrder={false}
          isLoading={true}
          message={getError()}
          closeModal={() => {
            setShowDialog(false);
            onErrorClose();
          }}
        />

      </View>
    </SafeAreaView>
  );
};
export default BankLinks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: brandColors.background,
  },
  containerBank: {
    marginTop: s(15),
    paddingHorizontal: s(16),
    paddingBottom: s(6),
  },
  textListBank: {
    fontSize: fs(13),
    fontFamily: Fonts.bold,
    fontWeight: '800',
    color: brandColors.textDark,
  },
  loginBtnContainer: {
    marginTop: s(24),
    paddingHorizontal: s(16),
  },
  ctaButton: {
    borderRadius: s(16),
    overflow: 'hidden',
    ...brandShadow.button,
  },
  ctaGradient: {
    height: s(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    color: brandColors.surface,
    fontSize: fs(14),
    fontFamily: Fonts.bold,
    fontWeight: '700',
  },
});
