const path = require('path')
const { VantResolver } = require('unplugin-vue-components/resolvers')
const ComponentsPlugin = require('unplugin-vue-components/webpack')
module.exports = {
    configureWebpack: {
      plugins: [
        ComponentsPlugin({
          resolvers: [VantResolver()],
        }),
      ],
    },
    devServer: { // 环境配置
      host: '0.0.0.0',
    //   public: '192.168.3.59:8080', // 此处是自己电脑IP地址！
     public: '127.0.0.1:8080', 
      port: '8080',
      https: false,
      disableHostCheck: true,
      open: false // 配置自动启动浏览器
    },
    productionSourceMap: false,
   
    
    
    // chainWebpack: config => {
    //   config.module.rule('images').use('image-webpack-loader').loader('image-webpack-loader').options({bypassOnDebug: true}).end()
    // },
  //  configureWebpack: {
  //   externals: {
  //     vue: 'Vue',
  //     vant: 'vant'
  //   }
  //  }
  pluginOptions: {
    'style-resources-loader': {
      'preProcessor': 'less',
      'patterns': [
        path.resolve(__dirname, './src/style/demo.less'),
      ]
    }
  }
}