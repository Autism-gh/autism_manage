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

const getIPAdress = () => {
    var interfaces = require('os').networkInterfaces()
    for (var devName in interfaces) {
        var iface = interfaces[devName]
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i]
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}

const port = process.env.port || process.env.npm_config_port || 5168


module.exports = {
    lintOnSave: false,

    publicPath: '/',

    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    devServer: {
        host: getIPAdress(),
        port: port,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            //  /?.app ***** 服务的接口
            '/appapi': {
                // target: 'http://admin.wuchuang.com:8088/',
                target: 'http://admin.vehicle-dev.mokua.com:6080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/appapi': '/'
                }
            },

            // /api/ ***** 服务的接口
            '/api': {
                target: 'http://10.33.0.60:6012/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/'
                }
            },

            // /api. **** 服务的接口
            '/phpapi': {
                // target: 'http://api.wuchuang.com:8088/',
                target: 'http://api.vehicle-dev.mokua.com:6080/',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                  '^/phpapi': '/'
                }
            }
        }
    },

    // eslint-disable-next-line no-dupe-keys
    configureWebpack: config => {
        config.externals = assetsCDN.externals;
    }
}