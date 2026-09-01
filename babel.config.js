module.exports = function(api) {
  api.cache(true);
  const isProduction = (process.env.BABEL_ENV || process.env.NODE_ENV) === 'production';
  return {
    presets: [['babel-preset-expo', { jsxRuntime: 'automatic' }]],
    plugins: [
      // Toàn bộ lớp gọi API (apiClient/registerClient/accountingClient +
      // từng file *API.js) đang log NGUYÊN request/response ra console cho
      // mỗi lần gọi — kể cả bản production vì babel-preset-expo không tự
      // strip console. console.log trên RN (old bridge) rất tốn khi log
      // object lớn (list sản phẩm...), là 1 nguyên nhân code khiến app có
      // cảm giác load chậm, độc lập với tốc độ backend. Strip hết console.*
      // (trừ warn/error) khỏi bundle production thay vì sửa từng chỗ.
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
      isProduction && ['transform-remove-console', { exclude: ['error', 'warn'] }],
    ].filter(Boolean),
  };
};
