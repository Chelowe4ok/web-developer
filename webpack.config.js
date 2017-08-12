var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './client/main.ts',
  output: {
    path: './dist',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts-loader'},
      {test: /\.html$/, loader: 'raw-loader'},
      {test: /\.css$/, loader: 'raw-loader' },
      {test: /\.(png|jpg)$/, loader: "file-loader", query: {
        name: '[name].[hash:7].[ext]',
        publicPath: '/client/assets/',
          outputPath: '/assets/'
      }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
    new webpack.DefinePlugin({
      app: {
        environment: JSON.stringify(process.env.APP_ENVIRONMENT || 'development')
      }
    })
  ]

};
