var webpack = require('webpack')

module.exports = {
  entry: {
   'react-consumer': './index.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: 'node_modules',
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
}
