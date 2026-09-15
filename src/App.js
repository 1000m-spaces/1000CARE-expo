import React, {useEffect, useState} from 'react';
import {Provider as StoreProvider} from 'react-redux';
import {ThemeProvider, lightTheme as theme} from './theme';
import {NetworkProvider} from './network/NetworkProvider';
import RootNavigator from './navigation';
import {store} from './store';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import {TextInput} from 'react-native';
import {Host} from 'react-native-portalize';
import UpdatePrompt from './design-system/UpdatePrompt';

// Design system mới ("1000M Order App") dùng --font-sans: font HỆ THỐNG
// (SF Pro trên iOS, Roboto trên Android), KHÔNG phải font custom đóng gói
// riêng — bỏ hẳn bộ SanFranciscoText*.otf + Font.loadAsync (từng gate cả
// màn hình đầu chờ tải font). fontFamily để undefined = RN tự dùng font
// mặc định của OS.
const customTextInputProps = {
  allowFontScaling: false,
  underlineColorAndroid: 'rgba(0,0,0,0)',
  style: {
    fontWeight: 'normal',
    fontSize: 14,
  },
};

const customTextProps = {
  allowFontScaling: false,
  style: {
    fontWeight: 'normal',
  },
};

const App = () => {
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const prepareApp = async () => {
      console.disableYellowBox = true;

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
              <UpdatePrompt />
            </Host>
          </ThemeProvider>
          {/* </PersistGate> */}
        </NetworkProvider>
      </StoreProvider>
    </>
  );
};

export default App;
