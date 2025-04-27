const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({mode}) => ({
  output: {
    filename: "[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin()
  ]
});