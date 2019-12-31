const webpack = require("webpack");
const ASSET_PATH = process.env.NODE_ENV==='production'? './' : '/';


module.exports = {
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
        host: '127.0.0.1',
        port: '8080',
        https: false,
        hotOnly: false,
        proxy: {
            // '/api': {
            //     target: 'http://127.0.0.1:8000',
            //     ws: true,
            //     changeOrigin: true,
            //     pathRewrite: {'^/api':'/api/vue'}
            // },
   
            '/sjfapi': {
                target: 'http://111.229.19.161', //源地址 
                ws: true,
                changeOrigin: true, //改变源 
                pathRewrite: {'^/sjfapi':'http://111.229.19.161'} //路径重写 

            },
        }
    },
};
