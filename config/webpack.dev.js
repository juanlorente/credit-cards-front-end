import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';
var HtmlWebpackPlugin = require('html-webpack-plugin');
import path from 'path';

export default {
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
        loaders: ['babel-loader']
      },
      {
        test: /\.s?css$/,
        include: path.resolve('src/stylesheets'),
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|gif)$/,
        include: path.resolve('media/images'),
        loaders: ['file-loader']
      },
      {
        test: /\.mp4$/,
        include: path.resolve('media/videos'),
        loaders: ['file-loader']
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
