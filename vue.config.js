const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
// const BrotliPlugin = require('brotli-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  // pwa: {
  //   serviceWorker: false
  // },
  // chainWebpack: config => {
  //   ['vue-modules', 'vue', 'normal-modules', 'normal'].forEach((match) => {
  //     config.module.rule('sass').oneOf(match).use('sass-loader')
  //       .tap(opt => Object.assign(opt, { data: `@import '~@/sass/main.sass'` }))
  //   })
  // },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       data: `@import "~@/sass/main.scss";`
  //     }
  //   }
  // },
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: [path.resolve(__dirname, './src/sass/main.scss')]
  //   }
  // },
  configureWebpack: config => {
    config.resolve.alias = {
      '@': resolve('client/src'),
      'vue$': 'vue/dist/vue.esm.js'
    }
    config.entry.app = './client/src/main.js'
    // if (process.env.NODE_ENV === 'production') {
    //   return {
    //     plugins: [
    //       new CompressionPlugin({
    //         filename: '[path].gz[query]',
    //         algorithm: 'gzip',
    //         test: /\.js$|\.vue$|\.css$|\.html$/,
    //         threshold: 10240,
    //         minRatio: 0.7
    //       }),
    //       new BrotliPlugin({
    //         asset: '[path].br[query]',
    //         test: /\.js$|\.vue$|\.css$|\.html$/,
    //         threshold: 10240,
    //         minRatio: 0.7
    //       // }),
    //       // new BundleAnalyzerPlugin()
    //       })
    //     ]
    //   }
    // }
  }
}
