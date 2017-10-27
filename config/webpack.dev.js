const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve('src'),
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    port: 3001
  },
  plugins: [
    new Dotenv({
      path: './config/dev.env'
    }),
    new HtmlPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
      favicon: path.resolve('assets/favicon.ico')
    })
  ]
});