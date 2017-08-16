const path = require('path')
const webpack = require('webpack')

const config = {
  context: path.resolve('./src/docroot', 'js/'),
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve('./dist', 'js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            presets: ['env'],
            plugins: ['lodash']
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
}

if (process.env.NODE_ENV === 'development') {
  config.output.path = path.resolve('./dist-dev', 'js')
  config.watch = true
  config.cache = true
  config.devtool = 'source-map'
  config.plugins = [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
}

module.exports = config
