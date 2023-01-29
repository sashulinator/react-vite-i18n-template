const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    port: 3001,
    historyApiFallback: true,

    proxy: {
      '/api/user-info': 'http://10.4.40.248:8081',
      '/api/schema': 'http://10.4.40.248:8081',
      '/api/constructor': 'http://10.4.40.248:8081',
      '/api/list': 'http://10.4.40.248:8081',
      '/api/task': 'http://10.4.40.248:8005',
      '/api/process': 'http://10.4.40.248:8005',
      '/api/auth': 'http://10.4.40.248:8088',
      '/api/object': 'http://10.4.40.248:8080',
      '/api/link': 'http://10.4.40.248:8080',
      '/api/translation': 'http://10.4.40.248:8081',
      '/api/translation/list': 'http://10.4.40.248:8081',
      '/api/data-import/upload/object': 'http://10.4.40.248:8084',
      '/api/data-import/upload/list': 'http://10.4.40.248:8084',
      '/api/data-import/upload/dimension': 'http://10.4.40.248:8084',
      '/api/data-import/export': 'http://10.4.40.248:8084',
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Vishwas'),
    }),
  ],
}
