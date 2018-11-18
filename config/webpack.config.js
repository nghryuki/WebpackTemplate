const path = require('path');
const SRC_PATH    = path.resolve(__dirname, '../src');
const DIST_PATH = path.resolve(__dirname, '../dist');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    // ディレクトリが増えた場合はここに追記する
    top: SRC_PATH + '/js/top.js',
    about: SRC_PATH + '/js/about.js'
  },

  output: {
    filename  : 'js/[name].js',
    path      : DIST_PATH
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['@babel/preset-env']
            ]
          }
        }
      },
      {
        test: /\.glsl$/,
        use: {
          loader: 'webpack-glsl-loader'
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.styl$/,
        use:  [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: 
            {
              minimap: true,
              sourceMap: true
            }
          },
          {
            loader: 'stylus-loader',
            options: {sourceMap: true}
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/top.pug'
    })
  ]

  // 共通のモジュールがバンドルされたファイル vendor.budle.js が出力される
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /node_modules/,
  //         name: 'vendor',
  //         chunks: 'initial',
  //         enforce: true
  //       }
  //     }
  //   }
  // }
};
