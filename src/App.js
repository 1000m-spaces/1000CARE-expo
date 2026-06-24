import React, {useEffect, useState} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {ThemeProvider, lightTheme as theme} from './theme';
import {NetworkProvider} from './network/NetworkProvider';
import RootNavigator from './navigation';
import {store} from './store';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import {TextInput} from 'react-native';
import {Host} from 'react-native-portalize';
import {Fonts} from './assets/config';
import * as Font from 'expo-font';

const customTextInputProps = {
  allowFontScaling: false,
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    fontFamily: Fonts.base,
    fontWeight: 'normal',
    fontSize: 14,
  },
};

const customTextProps = {
  allowFontScaling: false,
  style: {
    fontFamily: Fonts.base,
    fontWeight: 'normal',
  },
};

const App = () => {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async () => {
      console.disableYellowBox = true;
      const regular = require('../assets/fonts/SanFranciscoText-Regular.otf');
      const semiBold = require('../assets/fonts/SanFranciscoText-Semibold.otf');
      const bold = require('../assets/fonts/SanFranciscoText-Heavy.otf');

      await Font.loadAsync({
        Roboto: regular,
        [Fonts.regular]: regular,
        [Fonts.base]: regular,
        [Fonts.medium]: regular,
        [Fonts.meidum]: regular,
        [Fonts.rounded]: regular,
        [Fonts.semiBold]: semiBold,
        [Fonts.bold]: bold,
      });

      if (!isMounted) {
        return;
      }

      setCustomText(customTextProps);
      setCustomTextInput(customTextInputProps);
      TextInput.defaultProps = TextInput.defaultProps || {};
      TextInput.defaultProps.allowFontScaling = false;
      setFontsReady(true);
    };

    prepareApp();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!fontsReady) {
    return null;
  }

  return (
    <>
      <StoreProvider store={store}>
        <NetworkProvider>
          {/* <PersistGate
            loading={null}
            persistor={persist}
          > */}
          <ThemeProvider theme={theme}>
            <Host>
              <RootNavigator />
            </Host>
          </ThemeProvider>
          {/* </PersistGate> */}
        </NetworkProvider>
      </StoreProvider>
    </>
  );
};

export default App;
