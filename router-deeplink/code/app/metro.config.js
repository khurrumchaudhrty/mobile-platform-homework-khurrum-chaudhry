const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = {
  resolver: {
    assetRegistryPath: require.resolve("react-native/Libraries/Image/AssetRegistry.js"),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
