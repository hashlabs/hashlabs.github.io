const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob-all');

const extractStyles = new ExtractTextPlugin({
  filename: '../assets/css/main.css'
});

module.exports = function (env) {
  var precacheFilePatterns = env && env.prod ? ['_site/**/*.{css,js}'] : [];

  return {
    context: path.resolve(__dirname),
    entry: {
      'contact-form': './_scripts/contact-form.js',
      go: './_scripts/go.js',
      main: './_scripts/main.js',
      'navbar-sticky': './_scripts/navbar-sticky.js',
      'react-native': './_scripts/react-native.js',
      'process': './_scripts/process.js',
      work: './_scripts/work.js',
      'service-worker-registration': './_scripts/service-worker-registration.js'
    },
    output: {
      filename: 'js/[name].js',
      path: path.resolve(__dirname, 'assets')
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: extractStyles.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader']
          })
        },
        {
          test: /\.(eot|ttf|otf|woff|woff2)$/,
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '/assets/'
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: '/assets/'
          }
        },
        {
          test: /\.yml$/,
          loader: 'ignore-loader'
        }
      ]
    },
    plugins: [
      new UglifyJSPlugin(),
      extractStyles,
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /main\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new CopyWebpackPlugin([
        { from: './_scripts/react.js', to: 'js/react.js' }
      ]),
      new SWPrecacheWebpackPlugin({
        staticFileGlobs: precacheFilePatterns,
        stripPrefix: '_site/',
        cacheId: 'labcoat-landing',
        filepath: './service-worker.js',
        runtimeCaching: [{
          urlPattern: /(\/assets\/\w+\/(.+))|(\/img\/(.+))|(\.woff2$)/,
          handler: 'networkFirst'
        }, {
          urlPattern: /\?external=true$/,
          handler: 'networkFirst'
        }, {
          urlPattern: /\/$/,
          handler: 'networkFirst'
        }],
        minify: true,
        handleFetch: true,
        maximumFileSizeToCacheInBytes: 10485760
      }),
    ]
  }
};
