
const glob = require('glob')
const path = require('path')
const fs = require('fs')
const PAGES_PATH = path.resolve(__dirname, './src/views')
const webpack = require("webpack")
const pages = {}
glob.sync(PAGES_PATH + '/*/!(*(router)).js').forEach(filepath => {
    
    const pageName = path.basename(path.dirname(filepath))
    const templateName = path.basename(filepath)
    
    const entry = `${pageName}_${templateName}`.replace('.js', '')
    let template = path.dirname(filepath) + '/' + templateName.replace('.js', '.html')

    if (!fs.existsSync(template)) {
        template = 'public/index.html'
    }

    pages[entry] = {
        entry: filepath,
        filename: `${pageName}/${templateName.replace('.js', '.html')}`,
        template: template
    }
     
})

// pages['index'] = {
//     entry: 'src/views/index.js'
// }

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
