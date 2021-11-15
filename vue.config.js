module.exports = {
  publicPath: './',
  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:9500',
        changeOrigin: true,
        pathRewrite: { '^/api' : '' }
      }
    }
  }
}
