'use strict'
const path = require('path')

const assetsCDN = {
    externals:{
        'loadlive2d': 'window.loadlive2d',
    }
}

const resolve = (dir) => {
    return path.join(__dirname, dir)
}


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

    // eslint-disable-next-line no-dupe-keys
    configureWebpack: config => {
        config.externals = assetsCDN.externals;
    }
}