'use strict'
const path = require('path')

const assetsCDN = {
    externals: {
        'loadlive2d': 'window.loadlive2d',
    }
}

const resolve = (dir) => {
    return path.join(__dirname, dir)
}

// const getIPAdress = () => {
//     var interfaces = require('os').networkInterfaces()
//     for (var devName in interfaces) {
//         var iface = interfaces[devName]
//         for (var i = 0; i < iface.length; i++) {
//             var alias = iface[i]
//             if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
//                 return alias.address
//             }
//         }
//     }
// }

const port = process.env.port || process.env.npm_config_port || 5168

module.exports = {
    lintOnSave: false,

    publicPath: '/',

    devServer: {
        // host: getIPAdress(),
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            /**
             * /?.app 服务的接口
             */
            '/appapi': {
                target: 'http://admin.vehicle-dev.mokua.com:6080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/appapi': '/'
                }
            },

            /**
             *  /api 服务的接口
             */
            '/api': {
                target: 'http://10.33.0.60:6012/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },


            /**
             * /api. 服务的接口
             */
            '/phpapi': {
                target: 'http://api.vehicle-dev.mokua.com:6080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/phpapi': '/'
                }
            }
        }
    },

    configureWebpack: (config) => {
        config.externals = assetsCDN.externals;
    },

    chainWebpack: (config) => {

        // 添加 vh 单位大屏兼容模式
        config.module
            .rule('scssvh')
            .test(/\.scss$/)
            .include.add(resolve('src/pagescreen')).end()
            .oneOf('vue')
            .resourceQuery(/verticalvh=true/)
            .use('postcss-loader')
                .loader('postcss-loader')
                .options({
                    config: {
                        path: path.join(__dirname, './config/verticalvh')
                    }
                })
                .end()
        
        // 添加 vw 单位大屏兼容模式
        config.module
            .rule('scssvw')
            .test(/\.scss$/)
            .include.add(resolve('src/pagescreen')).end()
            .oneOf('vue')
            .resourceQuery(/horizontalvw=true/)
            .use('postcss-loader')
                .loader('postcss-loader')
                .options({
                    config: {
                        path: path.join(__dirname, './config/horizontalvw')
                    }
                })
                .end()
    }
}