const webpack = require('webpack');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

const plugins = [
  new webpack.SourceMapDevToolPlugin({
    test: /\.js/i,
    exclude: /(node_modules|bower_components)/i,
    filename: `sourcemaps/[name].js.map`,
  }),
  new LodashWebpackPlugin({
    currying: true,
    flattening: true,
    placeholders: true,
    paths: true,
  }),
  new webpack.DefinePlugin({
    'process.env.BASE_PATH': JSON.stringify(process.env.BASE_PATH || '/api'),
  }),
];

module.exports = plugins;
