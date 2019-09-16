import webpack from 'webpack'
import merge from 'webpack-merge'

import webpackBaseConfig from './base'

export default merge(webpackBaseConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch'],

  devtool: 'source-map',

  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: process.env.APP_STORE_PORT || 9000,
    hot: true,
    https: true,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
})
