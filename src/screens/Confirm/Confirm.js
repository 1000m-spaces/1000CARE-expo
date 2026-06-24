import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Image } from '~/common/index';
import { useDispatch, useSelector } from 'react-redux';
import Header from '~/common/Header/index';
import { back } from '~/assets/constants';
import strings from '~/i18n';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import Logo from '~/assets/configNeoMed/bank/logoConfirm.png';
import DialogInfo from '~/common/DialogInfo/index';
import ErrorView from '~/common/ErrorView/index';
import {
  confirmTopup,
  confirmLoginFirebase,
  confirmSignUp,
  resetConfirmLoginPhone,
  resetConfirmTopup,
  confirmLinkPayment,
  resetConfirmPaymentStatus,
  getWallet,
  resetConfirmSignUp,
  requestPaymentOrderBybankConfirm,
  resetOrder,
  registerFcm,
  resetCreateLoanConfirm,
  requestCreateLoanConfirm,
  resetLoanError,
  resetPreCloseConfirm,
  requestPreCloseConfirm,
  resetLinkResourceConfirm,
  resetLinkResource,
  requestLinkResourceConfirm,
  resetLoan,
  confirmLoginPhone,
  confirmLoginMobile,
  confirmDeleteAcountOtp,
  resetConfirmDeleteAcount,
  deleteAccount,
  requestGetPharmacyInfo,
} from '~/store/actions';
import {
  getTopupReqId,
  getConfirmTopupStatus,
  getSignUpReqId,
  getConfirmSignUpStatus,
  getConfirmLoginStatus,
  getLoginReqId,
  getDeleteAcountId,
  getConfirmToupErr,
  getConfirmLoginErr,
  getConfirmLinkStatus,
  getLinkPaymentReqId,
  getConfirmLinkErr,
  getConfirmSignUpError,
  getConfirmPaymentStatus,
  getPaymentRequestId,
  getConfirmPaymentError,
  getTokenFcm,
  getCreateLoanRequestId,
  getLoanConfirmError,
  getLoanConfirmStatus,
  getPreCloseConfirmStatus,
  getPreCloseRequestId,
  getPreCloseConfirmError,
  getLinkResourceConfirmStatus,
  getLinkResourceRequestId,
  getLinkResourceConfirmError,
  getConfirmDeleteOtpErr,
  getConfirmDeleteOtpStatus,
} from '~/store/selector';
import Status from '~/common/Status/Status';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_MAIN_SCREEN,
  NAVIGATION_LOAN_INFO,
  NAVIGATION_PRE_CLOSE_LOAN_SUCCESS,
} from '~/navigation/routes';
import { CommonActions } from '@react-navigation/native';
import { showToast } from '~/utils/toast';
import AppBackground from '~/design-system/AppBackground';
import PremiumButton from '~/design-system/PremiumButton';
import { brandColors, liquidGlass } from '~/design-system/tokens';
import { fs, s } from '~/utils/responsive';
// import OtpAutocomplete from 'react-native-otp-autocomplete';

const Confirm = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const inputCode = useRef(false);
  const [value, setValue] = useState('');
  const [showDialog, setShowDialog] = useState(true);
  const [showError, setShowError] = useState(false);
  const { type, onGoBack, paidAmount, loanId, accountId } = route.params;

  const tokenFcm = useSelector(state => getTokenFcm(state));
  const confirmStatus = useSelector(state => getConfirmTopupStatus(state));
  const confirmTopupErr = useSelector(state => getConfirmToupErr(state));

  const confirmSignupStatus = useSelector(state =>
    getConfirmSignUpStatus(state),
  );
  const confirmSignupErr = useSelector(state => getConfirmSignUpError(state));

  const confirmLoginStatus = useSelector(state => getConfirmLoginStatus(state));
  const confirmLoginErr = useSelector(state => getConfirmLoginErr(state));

  const topupReqId = useSelector(state => getTopupReqId(state));
  const signupReqId = useSelector(state => getSignUpReqId(state));
  const loginReqId = useSelector(state => getLoginReqId(state));
  const deleteAcountReqId = useSelector(state => getDeleteAcountId(state));

  const confirmLinkStatus = useSelector(state => getConfirmLinkStatus(state));
  const requestLinkId = useSelector(state => getLinkPaymentReqId(state));
  const confirmLinkErr = useSelector(state => getConfirmLinkErr(state));

  const confirmOrderPaymentStatus = useSelector(state =>
    getConfirmPaymentStatus(state),
  );
  const paymentOrderRequestId = useSelector(state =>
    getPaymentRequestId(state),
  );
  const confirmPaymentOrderErr = useSelector(state =>
    getConfirmPaymentError(state),
  );

  const loanConfirmStatus = useSelector(state => getLoanConfirmStatus(state));
  const createLoanRequestId = useSelector(state =>
    getCreateLoanRequestId(state),
  );
  const loanConfirmError = useSelector(state => getLoanConfirmError(state));

  const preCloseConfirmStatus = useSelector(state =>
    getPreCloseConfirmStatus(state),
  );
  const preCloseRequestId = useSelector(state => getPreCloseRequestId(state));
  const preCloseConfirmError = useSelector(state =>
    getPreCloseConfirmError(state),
  );

  const linkResourceConfirmStatus = useSelector(state =>
    getLinkResourceConfirmStatus(state),
  );
  const linkResourceRequestId = useSelector(state =>
    getLinkResourceRequestId(state),
  );
  const linkResourceConfirmError = useSelector(state =>
    getLinkResourceConfirmError(state),
  );
  const confirmDeleteOtpErr = useSelector(state =>
    getConfirmDeleteOtpErr(state),
  );
  const confirmDeleteOtpStatus = useSelector(state =>
    getConfirmDeleteOtpStatus(state),
  );

  const getCellCount = () => {
    switch (type) {
      case 'TOPUP':
      case 'BANKLINK':
      case 'PAYMENT_ORDER':
      case 'LOAN':
      case 'PRE_CLOSE':
      case 'LINK_RESOURCE':
        return 8;
      default:
        return 6;
    }
  };

  const getRequestId = () => {
    switch (type) {
      case 'TOPUP':
        return topupReqId;
      case 'SIGNUP':
        return signupReqId;
      case 'LOGIN':
        return loginReqId;
      case 'LOGIN_BY_BE':
        return loginReqId;
      case 'LOGIN_MOBILE':
        return loginReqId;
      case 'BANKLINK':
        return requestLinkId;
      case 'PAYMENT_ORDER':
        return paymentOrderRequestId;
      case 'LOAN':
        return createLoanRequestId;
      case 'PRE_CLOSE':
        return preCloseRequestId;
      case 'LINK_RESOURCE':
        return linkResourceRequestId;
      case 'DELETE_ACOUNT':
        return deleteAcountReqId;
      default:
        return '';
    }
  };

  const getErrMsg = () => {
    switch (type) {
      case 'TOPUP':
        return confirmTopupErr;
      case 'LOGIN':
        return confirmLoginErr;
      case 'LOGIN_BY_BE':
        return confirmLoginErr;
      case 'LOGIN_MOBILE':
        return confirmLoginErr;
      case 'SIGNUP':
        return confirmSignupErr;
      case 'BANKLINK':
        return confirmLinkErr;
      case 'PAYMENT_ORDER':
        return confirmPaymentOrderErr;
      case 'LOAN':
        return loanConfirmError;
      case 'PRE_CLOSE':
        return preCloseConfirmError;
      case 'LINK_RESOURCE':
        return linkResourceConfirmError;
      case 'DELETE_ACOUNT':
        return confirmDeleteOtpErr;
      default:
        return '';
    }
  };

  const reset = () => {
    setShowError(false);
    switch (type) {
      case 'TOPUP':
        dispatch(resetConfirmTopup());
        return;
      case 'SIGNUP':
        dispatch(resetConfirmSignUp());
        return;
      case 'LOGIN':
        dispatch(resetConfirmLoginPhone());
        return;
      case 'LOGIN_BY_BE':
        dispatch(resetConfirmLoginPhone());
        return;
      case 'LOGIN_MOBILE':
        dispatch(resetConfirmLoginPhone());
        return;
      case 'BANKLINK':
        dispatch(resetConfirmPaymentStatus());
        return;
      case 'PAYMENT_ORDER':
        dispatch(resetOrder());
        return;
      case 'LOAN':
        dispatch(resetCreateLoanConfirm());
        return;
      case 'PRE_CLOSE':
        dispatch(resetPreCloseConfirm());
        return;
      case 'LINK_RESOURCE':
        dispatch(resetLinkResourceConfirm());
        return;
      case 'DELETE_ACOUNT':
        dispatch(resetConfirmDeleteAcount());
        return;
    }
  };

  // const onLogoutPress= () => {
  //   auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'))
  //   dispatch(resetCart())
  //   dispatch(logout())
  // }

  // function signInWithPhoneNumber(phoneNumber) {
  //   if(phoneNumber) {
  //     auth().signInWithPhoneNumber(phoneNumber).then((confirmation) => {
  //       setConfirm(confirmation)
  //       showToast("otp sent!!!")
  //     }).catch((error) => {
  //       console.log('confirmation error', error)
  //       showToast(error.message)
  //     })
  //   }
  // }

  // useEffect(() => {
  //   if (type === 'LOGIN') {
  //     const { phone } = route.params
  //     signInWithPhoneNumber(phone)
  //   }
  // },[])

  useEffect(() => {
    if (loanConfirmStatus === Status.SUCCESS) {
      setShowDialog(false);
      setValue('');
      navigation.pop(2);
      navigation.navigate(NAVIGATION_LOAN_INFO, {
        type: 'CREATE_LOAN_SUCCESS',
      });
    } else if (loanConfirmStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [loanConfirmStatus]);

  useEffect(() => {
    if (preCloseConfirmStatus === Status.SUCCESS) {
      dispatch(resetLoanError());
      dispatch(resetCreateLoanConfirm());
      setShowDialog(false);
      setValue('');
      if (onGoBack) {
        onGoBack();
      }
      navigation.pop(3);
      navigation.navigate(NAVIGATION_PRE_CLOSE_LOAN_SUCCESS, {
        paidAmount,
        loanId,
        accountId,
      });
    } else if (preCloseConfirmStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [preCloseConfirmStatus]);

  useEffect(() => {
    if (linkResourceConfirmStatus === Status.SUCCESS) {
      dispatch(resetLinkResource());
      dispatch(resetLinkResourceConfirm());
      dispatch(resetLoan());
      if (onGoBack) {
        onGoBack(true);
      } else {
        goHomeScreen();
      }
      setShowDialog(false);
      setValue('');
    } else if (linkResourceConfirmStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [linkResourceConfirmStatus]);

  useEffect(() => {
    if (confirmStatus === Status.SUCCESS) {
      setShowDialog(false);
      navigation.pop();
    } else if (confirmStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [confirmStatus]);

  useEffect(() => {
    if (confirmSignupStatus === Status.SUCCESS) {
      setShowDialog(false);
      navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN);
    } else if (confirmSignupStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [confirmSignupStatus]);

  useEffect(() => {
    if (confirmOrderPaymentStatus === Status.SUCCESS) {
      setShowDialog(false);
      dispatch(resetOrder());
      setValue('');
      dispatch(getWallet());
      if (onGoBack) {
        onGoBack();
      }
      navigation.pop(2);
    } else if (confirmOrderPaymentStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [confirmOrderPaymentStatus]);

  useEffect(() => {
    if (confirmLinkStatus === Status.SUCCESS) {
      dispatch(resetConfirmPaymentStatus());
      dispatch(getWallet());
      setValue('');
      if (onGoBack) {
        onGoBack(true);
      }
      navigation.pop();
    } else if (confirmLinkStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [confirmLinkStatus]);

  useEffect(() => {
    if (confirmDeleteOtpStatus === Status.SUCCESS) {
      dispatch(resetConfirmDeleteAcount());
      dispatch(deleteAccount());
      // onLogoutPress()
      // navigation.navigate(NAVIGATION_TO_SPLASH_SCREEN)
      navigation.pop(1);
    } else if (confirmDeleteOtpStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [confirmDeleteOtpStatus]);

  useEffect(() => {
    if (confirmLoginStatus === Status.SUCCESS) {
      goHomeScreen();
      dispatch(resetConfirmLoginPhone());
      dispatch(registerFcm(tokenFcm));
      dispatch(requestGetPharmacyInfo());
    } else if (confirmLoginStatus !== Status.LOADING) {
      setShowDialog(false);
    }
  }, [confirmLoginStatus]);

  const goHomeScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: NAVIGATION_TO_MAIN_SCREEN }],
      }),
    );
  };

  const onConfirmPress = () => {
    console.log('typetypetypetypetypetype:', type);
    // autoOTP()
    setShowError(false);
    setShowDialog(true);
    if (type === 'TOPUP') {
      dispatch(confirmTopup(value, getRequestId()));
    } else if (type === 'SIGNUP') {
      dispatch(confirmSignUp(getRequestId(), value));
    } else if (type === 'LOGIN') {
      // dispatch(confirmLoginPhone(getRequestId(), value))
      confirmCode(value);
    } else if (type === 'LOGIN_BY_BE') {
      dispatch(confirmLoginPhone(getRequestId(), value));
    } else if (type === 'LOGIN_MOBILE') {
      dispatch(confirmLoginMobile(getRequestId(), value));
    } else if (type === 'BANKLINK') {
      dispatch(confirmLinkPayment(getRequestId(), value));
    } else if (type === 'PAYMENT_ORDER') {
      dispatch(requestPaymentOrderBybankConfirm(getRequestId(), value));
    } else if (type === 'LOAN') {
      dispatch(requestCreateLoanConfirm(getRequestId(), value));
    } else if (type === 'PRE_CLOSE') {
      dispatch(requestPreCloseConfirm(getRequestId(), value));
    } else if (type === 'LINK_RESOURCE') {
      dispatch(requestLinkResourceConfirm(getRequestId(), value));
    } else if (type == 'DELETE_ACOUNT') {
      dispatch(confirmDeleteAcountOtp(getRequestId(), value));
    }
  };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged((user) => {
  //     setValue('123456')
  //     console.log('aaaaaaaaaaaaaaaaaaaaaaaaa',user)
  //   })
  //   return subscriber
  // }, [])

  // const otpHandler = async message => {
  //   if (getCellCount() == 6) {
  //     const otp = await /(\d{6})/g.exec(message)[1];
  //     await setValue(otp);
  //   }
  //   if (getCellCount() == 8) {
  //     const otp = await /(\d{8})/g.exec(message)[1];
  //     await setValue(otp);
  //   }
  //   OtpAutocomplete.removeListener();
  //   Keyboard.dismiss();
  // };

  // useEffect(() => {
  //   OtpAutocomplete.getHash()
  //     // .then(p => Alert.alert('hash:',p[0]))
  //     .then()
  //     .catch(console.log);

  //   OtpAutocomplete.getOtp()
  //     .then(p => OtpAutocomplete.addListener(otpHandler))
  //     .catch(p => console.log(p));

  //   return () => OtpAutocomplete.removeListener();
  // }, []);

  async function confirmCode(code) {
    const { confirm } = route.params;
    try {
      // const user = auth().currentUser;
      // if (user) {
      //   user.getIdToken().then(token => {
      //     dispatch(confirmLoginFirebase(token));
      //     console.log('token', token);
      //   });
      // } else {
        const result = await confirm.confirm(code);
        console.log('confirm result: ', result);
        result.user.getIdToken().then(token => {
          dispatch(confirmLoginFirebase(token));
          console.log('token', token);
        });
      // }
    } catch (error) {
      showToast('Invalid code. ' + error.message);
      setShowDialog(false);
    }
  }

  useEffect(() => {
    if (!showDialog) {
      if (Platform.OS === 'ios') {
        setTimeout(() => setShowError(true), 1000);
      } else {
        setShowError(true);
      }
    }
  }, [showDialog]);
  return (
    <AppBackground>
      <View style={styles.screen}>
        <Header
          title={strings.Confirm.title}
          leftAction={() => {
            navigation.pop();
          }}
          iconLeft={back}
        />
        <View style={styles.containerConfirm}>
          <View style={styles.card}>
            <View style={styles.logoWrap}>
              <Image style={styles.image} source={Logo} resizeMode="contain" />
            </View>
            <Text style={styles.title}>{strings.Confirm.title}</Text>
            <Text style={styles.message}>
              {strings.Confirm.notification}
            </Text>
            <CodeField
              cellBorderWidth={1}
              inactiveColor={brandColors.border}
              activeColor={brandColors.tealPrimary}
              ref={inputCode}
              autoFocus={true}
              value={value}
              textContentType="oneTimeCode"
              onChangeText={setValue}
              keyboardType="number-pad"
              cellCount={getCellCount()}
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            <PremiumButton
              onPress={onConfirmPress}
              text={strings.Confirm.confirm}
              style={styles.confirmButton}
            />
          </View>
        </View>
        {(type === 'LOGIN' || type === 'SIGNUP') && (
          <View style={styles.footer_views}>
            <Text style={styles.hotlineLabel}>{'Hotline:'}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:096 649 2818')}>
              <Text style={styles.text_register_now}>{'096 649 2818'}</Text>
            </TouchableOpacity>
          </View>
        )}
        <DialogInfo
          isOpen={showDialog}
          isError={false}
          isOrder={false}
          isLoading={true}
          message={''}
          closeModal={() => setShowDialog(false)}
        />
        {showError && (
          <ErrorView
            error={getErrMsg()}
            isOpen={getErrMsg() ? true : false}
            onClose={reset}
          />
        )}
      </View>
    </AppBackground>
  );
};
export default Confirm;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  containerConfirm: {
    flex: 1,
    paddingHorizontal: s(20),
    paddingTop: s(18),
  },
  card: {
    alignItems: 'center',
    borderRadius: s(28),
    backgroundColor: liquidGlass.backgroundStrong,
    borderWidth: 1,
    borderColor: liquidGlass.border,
    paddingHorizontal: s(18),
    paddingTop: s(24),
    paddingBottom: s(18),
    ...liquidGlass.shadow,
  },
  logoWrap: {
    width: s(86),
    height: s(86),
    borderRadius: s(26),
    backgroundColor: brandColors.surface,
    borderWidth: 1,
    borderColor: brandColors.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: s(16),
  },
  image: {
    width: s(58),
    height: s(58),
  },
  title: {
    color: brandColors.textDark,
    fontSize: fs(24),
    lineHeight: fs(31),
    fontWeight: '600',
    textAlign: 'center',
  },
  message: {
    marginTop: s(8),
    marginBottom: s(20),
    color: brandColors.muted,
    fontSize: fs(14),
    lineHeight: fs(21),
    fontWeight: '600',
    textAlign: 'center',
  },
  cell: {
    width: s(42),
    height: s(48),
    lineHeight: s(46),
    fontSize: fs(22),
    borderColor: brandColors.border,
    textAlign: 'center',
    borderWidth: 1,
    color: brandColors.textDark,
    marginHorizontal: s(3),
    borderRadius: s(14),
    backgroundColor: brandColors.surface,
    fontWeight: '600',
  },
  focusCell: {
    borderColor: brandColors.tealPrimary,
    backgroundColor: brandColors.tealLight,
  },
  buttonConfirm: {
    marginTop: s(20),
    width: '100%',
  },
  viewModal: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: 15,
  },
  textMessgeFailOTP: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  footer_views: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: s(24),
  },
  hotlineLabel: {
    color: brandColors.muted,
    fontWeight: '600',
  },

  text_register_now: {
    color: brandColors.tealPrimary,
    textDecorationLine: 'underline',
    marginLeft: s(6),
    fontWeight: '600',
  },
});
