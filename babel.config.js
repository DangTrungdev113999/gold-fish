module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: './src',
        rootPathPrefix: '~/',
      },
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@assets': './assets',
        },
      },
    ],
  ],
};
