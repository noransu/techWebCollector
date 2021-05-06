const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// Generate pages object
const pagesObj = {}

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

const chromeName = ['popup', 'content', 'background']

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.ts`,
    template: 'public/index.html',
    filename: `${name}.html`
  }
})

const plugins =
  process.env.NODE_ENV === 'production'
    ? [{
      from: path.resolve('src/manifest.production.json'),
      to: `${path.resolve('dist')}/manifest.json`
    }]
    : [{
      from: path.resolve('src/manifest.development.json'),
      to: `${path.resolve('dist')}/manifest.json`
    }]

module.exports = {
  parallel: false,
  pages: pagesObj,
  filenameHashing: false,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [CopyWebpackPlugin(plugins)],
    performance: {
      hints: 'warning',
      // 入口起点的最大体积
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积
      maxAssetSize: 30000000,
    }
  },
  css: {
    extract: process.env.NODE_ENV !== 'development'
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('#', resolve('types'))
      .set('popup', resolve('src/popup'))
  }
}
