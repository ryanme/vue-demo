const webpack = require("webpack");
const ASSET_PATH = process.env.NODE_ENV==='production'? './' : '/';


module.exports = {
    outputDir:"dist",
    assetsDir:"assets",
    indexPath:"index.html",
    runtimeCompiler: true, //加入内容
    publicPath: ASSET_PATH,
        configureWebpack:{
        plugins: [
            // 该插件帮助我们安心地使用环境变量
            new webpack.DefinePlugin({
              'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
            })
          ],
    },

    devServer: {
        host: '0.0.0.0',
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            '/api/blog': {
                target: 'http://localhost:8000',
                // ws: true,
                changeOrigin: true,
                pathRewrite: {'^/api/blog':'/blog/api'}
            }
        }
    },
};
