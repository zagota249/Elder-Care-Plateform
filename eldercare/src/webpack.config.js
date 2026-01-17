
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // adjust to your main JS file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // cleans old files
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // if you use Babel
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // for CSS
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // your HTML template
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
  },
  mode: 'development',
};
