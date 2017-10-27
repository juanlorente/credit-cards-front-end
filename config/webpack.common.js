const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    path.resolve('src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpg|gif)$/,
        include: path.resolve('assets/images'),
        loader: 'file-loader',
        options: {
          name: 'assets/images/[name].[ext]'
        }
      },
      {
        test: /\.mp4$/,
        include: path.resolve('assets/videos'),
        loader: 'file-loader',
        options: {
          name: 'assets/videos/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main']
    })
  ]
};