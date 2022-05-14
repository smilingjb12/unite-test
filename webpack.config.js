/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const env = dotenv.config().parsed;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/client/index.tsx',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      favicon: './src/client/favicon.ico',
      title: "Itransition unite",
      description: "Itransition unite"
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/client/robots.txt', to: './' },
        { from: './src/client/manifest.json', to: './' }
      ],
    }),
    new webpack.DefinePlugin(envKeys),
    //new WebpackBundleAnalyzer.BundleAnalyzerPlugin()
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]-[fullhash].js',
    chunkFilename: '[name].[chunkHash:6].chunk.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    static: './build',
    compress: true,
    watchFiles: ['./src/client**'],
    hot: true,
    port: 3000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      automaticNameMaxLength: 30,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        },
      }
    }
  },
};