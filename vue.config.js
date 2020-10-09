const isProduction = process.env.NODE_ENV === 'production'
const CompressionWebpackPlugin = require("compression-webpack-plugin")
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// const cdn = {
//   js: {
//     Vue: ['https://cdn.bootcss.com/vue/2.6.10/vue.min.js', '/static/vue.min.js'],
//     VueRouter: ['https://cdn.bootcss.com/vue-router/3.0.4/vue-router.min.js', '/static/vue-router.min.js'],
//     axios: ['https://cdn.bootcss.com/axios/0.18.0/axios.min.js', '/static/axios.min.js']
//   }
// }
const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
const {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  title,
  abbreviation,
  devPort,
  providePlugin,
  build7z,
  donation,
} = require("./src/config/settings");
const mockServer = () => {
  if (process.env.NODE_ENV === "development") {
    return require("./mock/mockServer.js");
  } else {
    return "";
  }
};

module.exports = {
  lintOnSave: false, // 关闭eslint
  productionSourceMap: false,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    after: mockServer(),
    // proxy: {         // 开发环境代理
    //   '/merchant': {
    //     target: 'https://zcg.dev.poopg.com',
    //     // ws: true, //  websockets
    //     // secure: false,  // https
    //     changeOrigin: true
    //   }
    // }
  },
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      scss: {
        /*sass-loader 8.0语法 */
        //prependData: '@import "~@/styles/variables.scss";',

        /*sass-loader 9.0写法，感谢github用户 shaonialife*/
        // additionalData(content, loaderContext) {
        //   const { resourcePath, rootContext } = loaderContext;
        //   const relativePath = path.relative(rootContext, resourcePath);
        //   if (
        //     relativePath.replace(/\\/g, "/") !== "src/styles/variables.scss"
        //   ) {
        //     return '@import "~@/styles/variables.scss";' + content;
        //   }
        //   return content;
        // },
      },
    },
  },
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === "development", (config) => {
      config.devtool("source-map");
    });
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("public", resolve("public"));

    // 移除 prefetch 插件
    // config.plugins.delete('prefetch')

    // 分析打包文件 npm run build --report
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        .end()
      config.plugins.delete('prefetch')
    }
    
    config.when(process.env.NODE_ENV === "production", (config) => { })
    if (isProduction) {
      // cdn 注入
      // config.plugin('html')
      //   .tap(args => {
      //     args[0].cdn = cdn;
      //     return args;
      //   })
    }
  },
  configureWebpack: config => {
    if (isProduction) {
      // 生成环境取消打包的依赖，改为cdn
      // config.externals = {
      //   'vue': "Vue",
      //   "vue-router": "VueRouter",
      //   "element-ui": "ELEMENT",
      //   'axios': "axios"
      // }
      // gzip 压缩
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.html$|.\css/,    // 匹配文件名
        threshold: 10240,               // 对超过10k的数据压缩
        minRatio: 0.8,
        deleteOriginalAssets: false     // 不删除源文件
      }))
      // 去除console
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         // warnings: false,
      //         drop_debugger: true,
      //         drop_console: true,
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      //   })
      // )
    }
    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }
  }
}