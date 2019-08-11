const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require('./build-utils/loadPresets');

module.exports = ({mode, presets} = {mode: "production", presets: []}) => {
  console.log('ini presets asli', presets);
  return webpackMerge({
    devtool: "cheap-module-source-map",
    output: {
      filename: "bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.jp?g$/,
          use: [{loader: "url-loader", options: {
            limit: 100
          }}]
        }
      ]
    },
    mode,
    plugins: [new HtmlWebPackPlugin(), new webpack.ProgressPlugin()]
  }, modeConfig(mode), presetConfig({mode, presets}));
};