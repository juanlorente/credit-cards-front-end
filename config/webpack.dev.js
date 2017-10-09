const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.resolve('src/index')
  ],
  target: 'web',
  output: {
    path: '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve('src')
  },
  module: {
   loaders: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        loader: 'babel-loader'
      },
      {
        test: /\.s?css$/,
        include: path.resolve('src/stylesheets'),
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|gif)$/,
        include: path.resolve('media/images'),
        loader: 'file-loader',
        options: {
          name: 'media/images/[name].[ext]'
        }
      },
      {
        test: /\.mp4$/,
        include: path.resolve('media/videos'),
        loader: 'file-loader',
        options: {
          name: 'media/videos/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: './config/dev.env'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
      favicon: path.resolve('media/favicon.ico')
    })
  ]
};