import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { resetLogin } from '~/store/auth/authActions';
import { getErrMsg } from '~/store/auth/authSelector';
import ErrorView from '~/common/ErrorView';

import styles from './styles';
import strings from '~/i18n';
import { logo_text } from '~/assets/constants';
import { Image } from '~/common/index';
import { NAVIGATION_CONFIRM, NAVIGATION_PHONE_VERIFY } from '~/navigation/routes';
import Header from '~/common/Header/index';
import { back } from '~/assets/constants';
import AppBackground from '~/design-system/AppBackground';
import PremiumInput from '~/design-system/PremiumInput';
import PremiumButton from '~/design-system/PremiumButton';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // Manage State Hooks
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const errorMsg = useSelector(state => getErrMsg(state));

  const onRegisterPress = () => {
    // dispatch(loginWithAccount(username, password, true))
    navigation.navigate(NAVIGATION_PHONE_VERIFY, {
      onSuccess: () => {
        navigation.navigate(NAVIGATION_CONFIRM);
      },
    });
  };

  return (
    <AppBackground>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={styles.scrollContent}>
        <Header
          title={strings.registerScreen.title}
          iconLeft={back}
          leftAction={() => navigation.pop()}
        />
        <View style={styles.content}>
          <View style={styles.logoCard}>
            <Image source={logo_text} resizeMode="contain" style={styles.logo} />
          </View>
          <View style={styles.card}>
            <Text style={styles.title}>
              {strings.registerScreen.title}
            </Text>
            <View style={styles.fullNameContainer}>
              <PremiumInput
                label={strings.registerScreen.firstName}
                value={username}
                onChangeText={value => {
                  setUserName(value);
                }}
                placeholder={strings.registerScreen.firstName}
              />

              <PremiumInput
                label={strings.registerScreen.lastName}
                value={username}
                onChangeText={value => {
                  setUserName(value);
                }}
                placeholder={strings.registerScreen.lastName}
              />
            </View>

            <PremiumInput
              label={strings.registerScreen.username}
              value={username}
              onChangeText={value => {
                setUserName(value);
              }}
              placeholder={strings.registerScreen.username}
            />

            <PremiumInput
              label={strings.registerScreen.password}
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder={strings.registerScreen.password}
              secureTextEntry={true}
            />
            <PremiumInput
              label={strings.registerScreen.re_password}
              value={password}
              onChangeText={value => setPassword(value)}
              placeholder={strings.registerScreen.re_password}
              secureTextEntry={true}
            />
            <PremiumButton
              style={styles.registerButton}
              onPress={onRegisterPress}
              text={strings.registerScreen.register}
            />
          </View>
        </View>
        <View style={styles.footer_views}>
          <Text style={styles.footerText}>{strings.registerScreen.have_account}</Text>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Text style={styles.text_register_now}>
              {strings.registerScreen.login_now}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <ErrorView
        error={errorMsg}
        isOpen={errorMsg && errorMsg !== ''}
        onClose={() => dispatch(resetLogin())}
      />
    </AppBackground>
  );
};

RegisterScreen.navigationOptions = {
  header: null,
};

export default RegisterScreen;
