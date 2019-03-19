
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const PAGES_PATH = path.join(__dirname, './src/views')
const webpack = require("webpack")
const pages = {}
glob.sync(PAGES_PATH +'/**/!(router).js' ).forEach(filepath => {    
    let template = filepath.replace('.js', '.html')
    if (!fs.existsSync(template)) {
        template = 'public/index.html'
    }
    const pageEntry = path.relative(PAGES_PATH, filepath).replace('.js', '').split(path.sep).join('/')
    pages[pageEntry] = {
        entry: filepath,
        filename: `${pageEntry}.html`,
        template: template
    }
})

// console.log(pages)
module.exports = {
    pages,
    chainWebpack: (config) => {
        config.optimization.splitChunks({
            cacheGroups: {}
        });
    },
    css: {
        modules: false,
        extract: true,
        sourceMap: false
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            })
        ]
    }
}