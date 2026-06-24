module.exports = function(api) {
  api.cache(true);
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '~': './src',
            components: './src/components',
            theme: './src/theme',
            utils: './src/utils',
            navigation: './src/navigation',
            common: './src/common',
            assets: './src/assets',
            store: './src/store',
            http: './src/http',
            helpers: './helpers',
            localization: './src/localization',
            'react-native-linear-gradient': './src/utils/linear-gradient-shim.js',
            'react-native-device-info': './src/utils/device-info-shim.js',
            'react-native-image-picker': './src/utils/image-picker-shim.js',
            'react-native-config': './src/utils/config-shim.js',
            'react-native-simple-toast': './src/utils/toast-shim.js',
            'react-native-view-overflow': './src/utils/view-overflow-shim.js',
          },
        },
      ],
    ],
  };
};
