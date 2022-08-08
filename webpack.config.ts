import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import dotenv from 'dotenv';
dotenv.config();

const ENVIRONMENT = process.env.ENVIRONMENT;
const ASSETS_URL = process.env.ASSETS_URL;

const webpackConfig = () => {
  const publicPath = ENVIRONMENT === 'development' ? '/' : `${ASSETS_URL}/js/`;

  return {
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.(ts|js)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript'],
            },
          },
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'tiny.js',
      publicPath: publicPath,
    },
    devServer: {
      static: path.join(__dirname, 'dist'),
      watchFiles: ['./public/*', './src/*'],
      hot: true,
      host: 'tinyjs.globoi.com',
      compress: true,
      port: 4000,
      open: true,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true,
            },
          },
          // sourceMap: true
        }),
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
    ],
    devtool: 'inline-source-map',
  };
};

export default webpackConfig;
