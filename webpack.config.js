const path = require('path');
const webpack = require('webpack');
const pkg = require('./package');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 是否压缩代码
const isBuild = process.argv.indexOf('--build') !== -1;
const isDev = process.argv.join('').indexOf('webpack-dev-server') !== -1;

const FILENAME_TMPL = isBuild ? '[name]-[hash].min.' : '[name].';
const ASSETNAME_TMPL = '[name]-[md5:hash:base64:7].[ext]';

// 必须是前面带 /，否则 webpack-dev-server 无法识别
const STATIC_URL = '/';
const SRC_PATH = path.resolve('lib');
const DIST_PATH = path.resolve('dist');
const DOCS_PATH = path.resolve('docs');
const DOCS_DIST_PATH = path.join(DIST_PATH, 'docs');

/**
 * Get loader
 */
const loaders = [
  {
    test: /\.(es6|js|jsx)$/,
    exclude: /(dist|build|vendor|node_modules|min\.js)/,
    query: {cacheDirectory: '/tmp/'},
    // cacheDirectory 对 babel 有非常明显的优化效果
    loader: 'babel'
  },
  {
    test: /\.css$/,
    loader: 'style!css'
  },
  {
    test: /\.(ttf|eot|svg|png|jpe?g|gif|ico|woff2?)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url?limit=12000&name=' + ASSETNAME_TMPL
  },
  { test: /snippet\.html$/, loader: 'html'}
];

/**
 * Get Plugins
 */
let plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      // 必须内嵌引号，该值会直接插入到代码中
      NODE_ENV: isBuild ? '"production"' : '"development"'
    }
  }),
  new webpack.NoErrorsPlugin(),
  new HtmlWebpackPlugin({
    // favicon: path.join(DOCS_PATH, 'logo.png'),
    template: path.join(DOCS_PATH, 'index.html'),
    inject: 'body'
  })
];

if (isBuild) {
  plugins = plugins.concat([
    // 开发时不作优化加快编译速度
    new webpack.optimize.DedupePlugin(),
    // NOTE：如果已经压缩过的文件被重复处理，会非常耗时
    new webpack.optimize.UglifyJsPlugin()
  ]);
}

const webpackConfig = {
  // webpack 将要进行打包的入口文件。
  entry: {
    docs: [
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      path.join(DOCS_PATH, 'index.entry.js')
    ]
  },

  // 表示输出文件
  output: {
    filename: FILENAME_TMPL + 'js',
    chunkFilename: FILENAME_TMPL.replace('hash', 'chunkhash') + 'js',
    // NOTE: 必须是绝对路径
    path: path.join(DOCS_DIST_PATH, STATIC_URL),
    publicPath: STATIC_URL,
  },

  devServer: {
    contentBase: DOCS_DIST_PATH,
    // NOTE devServer.publicPath 必须和 output.publicPath 一致
    publicPath: STATIC_URL,
    hot: true,
    // 不显示太多的提示信息
    // quiet: true,
    stats: {
      assets: true,
      chunks: false,
      children: false,
      modules: false,
      colors: true
    },
    // 可通过 IP 地址访问
    host: '0.0.0.0'
  },
  watch: !isBuild,

  module: {loaders},

  plugins,
  // resolve主要配置 require 模块时的模块查找相关功能
  resolve: {
    // 配置模块的根目录，可以是数组。NOTE: 必须是绝对路径
    root: [
      path.resolve('./node_modules'),
      path.resolve(__dirname)
    ]
  },
  /*
      默认情况下，webpack寻找loader的路径是当前entry所在的路径
      通过resolveLoader.root更改loader的寻找路径
  */
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  }
};

if (!isBuild) {
  // devtool 不要用 eval 模式，虽然这能带来初次构建减少 1s 左右的好处，
  // 但是这会导致刷新页面中断无效，影响调试
  webpackConfig.devtool = '#module-source-map';
}

module.exports = webpackConfig;
