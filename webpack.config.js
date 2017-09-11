var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractPlugin = new ExtractTextPlugin({
    filename: 'main.css'
})

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
      { test: /\.scss$/, loaders: ["raw-loader", "sass-loader"] },
      {test: /\.(png|jpg)$/, loader: "file-loader", query: {
        name: '[name].[hash:7].[ext]',
        publicPath: '/client/assets/',
          outputPath: '/assets/'
      }
      }
    ],
    rules: [
        {
            test: /\.scss$/,
            use: extractPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.html', '.css', '.scss']
  },
  plugins: [
    extractPlugin,
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
