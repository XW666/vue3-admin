const path = require('path')
const {
  defineConfig
} = require('@vue/cli-service')

function resolve(dir) {
  return path.join(__dirname, dir);
}
let proxyTarget = 'http://82.157.118.137:8083'


const port = process.env.port || process.env.npm_config_port || 8111
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'dev',
  devServer: {
    proxy: {
      '/admin': {
        target: proxyTarget
      },
    },
    port: port,

  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'admin',
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
})