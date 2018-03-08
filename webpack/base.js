import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import DotEnv from 'dotenv-webpack'
import path from 'path'

const dist = path.join(__dirname, '..', 'dist')

export default {
  entry: ['./src/index.js'],

  output: {
    path: dist,
    publicPath: '/',
    filename: 'bundle.js',
  },

  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      title: 'Ledger App Store',
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),

    new DotEnv(),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
}
