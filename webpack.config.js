const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
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
      /*
        We include babel babel-polyfill only on our main script file,
        more on this here:
        http://babeljs.io/docs/usage/polyfill/
       */
      main: ['babel-polyfill', './_scripts/main.js'],
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
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        },
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
          test: /\.yml$/,
          loader: 'ignore-loader'
        }
      ]
    },
    plugins: [
      new UglifyJSPlugin(),
      extractStyles,
      new PurifyCSSPlugin({
        paths: glob.sync([
          path.join(__dirname, './_site/**/*.html'),
          path.join(__dirname, './_site/**/*.js')
        ])
      }),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /main\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: { discardComments: { removeAll: true } },
        canPrint: true
      }),
      new CopyWebpackPlugin([
        { from: './_scripts/react.js', to: 'js/react.js' },
        { from: './_assets/' }
      ]),
      new ImageminPlugin({
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        optipng: {
          optimizationLevel: 7
        }
      }),
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
