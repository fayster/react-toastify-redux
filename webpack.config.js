const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  devtool: 'source-map',
  entry: './src/index.ts',
  output: {
    path: __dirname + "/dist",
    filename: 'ReactToastifyRedux.js',
    libraryTarget: 'umd',
    library: 'ReactToastifyRedux'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'awesome-typescript-loader']
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-toasify': path.resolve('./node_modules/react-toastify'),
      'react-redux': path.resolve('./node_modules/react-redux')
    }
  },
  externals: [
    'react',
    'react-dom',
    'react-toastify',
    'react-redux'
  ],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
};