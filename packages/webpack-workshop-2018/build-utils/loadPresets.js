const webpackMerge = require('webpack-merge');

module.exports = env => {
  const { presets } = env;
  if(!presets) return {};
  /**
   * @type {string[]}
   */
  const mergedPresets = [].concat(...[presets]);
  const mergedConfigs = mergedPresets.map(
    presetName => require(`./presets/webpack.${presetName}`)(env));
  return webpackMerge({}, ...mergedConfigs)
};