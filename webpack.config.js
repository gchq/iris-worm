const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/_entry.js',

  watchOptions: {
    poll: true
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: `bundle${ process.env.NODE_ENV=='production' ? '.min' : '' }.js`,
    library: 'IRISWorm',
    libraryTarget: "umd"
  },

  module: {

    rules: [{
      test: /\.js$/,
      include: [path.resolve(__dirname, "src")],
      use: [{
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-assign']
        }
      }],

    }]
  },

  devServer: {
    host: process.env.HOSTNAME || "localhost",
    port: process.env.PORT || 8080,
    contentBase: path.join(__dirname, '/dist')
  },

  devtool: "source-map",

  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "head"
    })
  ]

}