const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
};

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...resolver.sourceExts, 'svg', 'jsx', 'js', 'ts', 'tsx'],
  extraNodeModules: {
    '~': path.resolve(__dirname, 'src'),
    components: path.resolve(__dirname, 'src/components'),
    theme: path.resolve(__dirname, 'src/theme'),
    utils: path.resolve(__dirname, 'src/utils'),
    navigation: path.resolve(__dirname, 'src/navigation'),
    common: path.resolve(__dirname, 'src/common'),
    assets: path.resolve(__dirname, 'src/assets'),
    store: path.resolve(__dirname, 'src/store'),
    http: path.resolve(__dirname, 'src/http'),
    helpers: path.resolve(__dirname, 'src/helpers'),
    localization: path.resolve(__dirname, 'src/localization'),
    // Redirect native modules to Expo versions
    'react-native-linear-gradient': path.resolve(__dirname, 'src/utils/linear-gradient-shim.js'),
    'react-native-device-info': path.resolve(__dirname, 'src/utils/device-info-shim.js'),
    'react-native-image-picker': path.resolve(__dirname, 'src/utils/image-picker-shim.js'),
    'react-native-config': path.resolve(__dirname, 'src/utils/config-shim.js'),
    'react-native-simple-toast': path.resolve(__dirname, 'src/utils/toast-shim.js'),
    'react-native-view-overflow': path.resolve(__dirname, 'src/utils/view-overflow-shim.js'),
  },
};

module.exports = config;
