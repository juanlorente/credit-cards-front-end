var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    path.resolve('src/index')
  ],
  target: 'web',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.js'
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
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
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: './config/prod.env'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
      favicon: path.resolve('media/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        html5: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
    new ExtractTextPlugin('styles.css')
  ]
};
