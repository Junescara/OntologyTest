// vue.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  lintOnSave: true,
  configureWebpack: config => {
    config.plugins = [
      new HtmlWebpackPlugin({
        templateParameters: {
          BASE_URL: `/`
        },
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: 'index2.html'
      }),
      ...config.plugins
    ]
    console.log(`输出最终应用的 config`, JSON.stringify(config, null, 2))
  }
}
