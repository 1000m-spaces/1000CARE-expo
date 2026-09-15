import React, { useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Image } from '~/common/index';
import { dapLogo, logoNeoMed, MBbank, cart2 } from '../../assets/constants';
import { LinearGradient } from 'expo-linear-gradient';
import {
  NAVIGATION_TO_INFORMATION_ORDER,
  NAVIGATION_TO_CART_SCREEN,
} from '../../navigation/routes';
import { SPACING } from '../../constants';
import { ThemeContext } from '../../theme';

const defaultProps = {};

const HeaderApp = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          flex: 1,
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}>
          <LinearGradient
            colors={['#fff', '#fff', '#fff']} //gradient_header
            style={styles.header_tab_icon}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                // borderTopWidth: isHelioActive ? 3 : 0,
                // borderTopColor: Colors.header_tab_active,
              }}
              onPress={() => { }}>
              <Image source={dapLogo} style={styles.header_tab_logo_helio} />
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#fff', '#fff', '#fff']} //gradient_header
            style={styles.header_tab_icon}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                // borderTopWidth: isHelioActive ? 3 : 0,
                // borderTopColor: Colors.header_tab_active,
              }}
              onPress={() => { }}>
              <Image
                source={logoNeoMed}
                style={styles.header_tab_logo_another}
              />
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#fff', '#fff', '#fff']} //gradient_header
            style={styles.header_tab_icon}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                // borderTopWidth: isHelioActive ? 3 : 0,
                // borderTopColor: Colors.header_tab_active,
              }}
              onPress={() => { }}>
              <Image source={MBbank} style={styles.header_tab_logo_another} />
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>
      <View
        style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={{ alignItems: 'center', marginRight: 5 }}
          onPress={() => navigation.navigate(NAVIGATION_TO_CART_SCREEN)}>
          <ImageBackground
            resizeMode={'contain'}
            style={{ height: 28, width: 28, marginRight: 15 }}
            source={cart2}>
            <View
              style={{
                position: 'absolute',
                right: -8,
                top: -2,
                backgroundColor: 'red',
                height: 18,
                width: 18,
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 12 }}>1</Text>
            </View>
          </ImageBackground>
          <Text style={{ color: 'red', fontSize: 10, marginTop: -2 }}>
            1.000.000 đ
          </Text>
          <View
            style={{
              backgroundColor: '#029E9D',
              marginTop: -2,
              paddingHorizontal: 5,
              borderRadius: 10,
            }}>
            <Text style={{ color: 'white', fontSize: 9 }}>100.000 p</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout: {
    margin: SPACING.large,
  },
  header_tab_logo_helio: { width: 45, height: 45, resizeMode: 'contain' },
  header_tab_logo_another: { width: 45, height: 40, resizeMode: 'contain' },
  header_tab_icon: {
    width: '33.3%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

HeaderApp.defaultProps = defaultProps;

export default HeaderApp;
