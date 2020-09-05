const HtmlWebPackPlugin = require("html-webpack-plugin")
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const port = process.env.PORT || 3000 ;

var config = {

  output: {
    publicPath:'/'
  },
  mode: "development",
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [ 
    new HtmlWebPackPlugin({
      template: "./public/index.html",
    }),
  ],
  devServer: {
    contentBase: '../static/react/bundle.[hash].js',
    host: '127.0.0.1',
    port: port,
    historyApiFallback: true,
    open: true,
    hot: true
  }
};

module.exports = (_, argv) => {
  if (argv.mode === 'production') {
    config.output = {
      path: path.resolve(__dirname, '../server/app/templates'),
      filename: '../static/react/bundle.[hash].js'
    }
    config.plugins.push(new CleanWebpackPlugin({
      dry: false,
      dangerouslyAllowCleanPatternsOutsideProject: true,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../server/app/static/react/bundle.*')],
    }))
  }
  return config
}