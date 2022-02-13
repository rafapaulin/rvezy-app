const path = require('path');

module.exports = {
    lintOnSave: true,
    configureWebpack: {
        devtool: 'source-map',
        entry: [
            './src/sass/styles.sass',
            './src/main.js'
        ],
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src'),
            }
        },
    },
    css: {
        sourceMap: process.env.NODE_ENV !== 'production',
        loaderOptions: {
            sass: {
                sourceMap: process.env.NODE_ENV !== 'production',
                prependData: '@import src/sass/variables'
            }
        }
    },
};
