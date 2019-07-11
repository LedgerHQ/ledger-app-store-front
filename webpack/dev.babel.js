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
    port: 9001,
    hot: true,
    https: false,
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
})
