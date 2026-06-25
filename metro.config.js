const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = {};

const cssInput = path.resolve(__dirname, 'global.css');

module.exports = withNativeWind(mergeConfig(getDefaultConfig(__dirname), config), {
  input: cssInput,
});


