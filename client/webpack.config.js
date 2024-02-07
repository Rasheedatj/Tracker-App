const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
    port: 3000,
    hot: true,
    open: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'home ',
      filename: 'index.html',
      template: './src/index.html',
      // favicon: './src/assets/favicon.ico',
    }),
    new HtmlWebpackPlugin({
      title: 'Tracker dashboard',
      filename: 'tracker.html',
      template: './src/tracker.html',
      // favicon: './src/assets/favicon.ico',
    }),
    new MiniCssExtractPlugin(),
  ],
};
