const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

// Generate pages object
const pagesObj = {}

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

const chromeName = ['popup', 'options']

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.ts`,
    template: 'public/index.html',
    filename: `${name}.html`
  }
})

const plugins =
  process.env.NODE_ENV === 'production'
    ? [
      {
        from: path.resolve('src/manifest.production.json'),
        to: `${path.resolve('dist')}/manifest.json`
      }
    ]
    : [
      {
        from: path.resolve('src/manifest.development.json'),
        to: `${path.resolve('dist')}/manifest.json`
      }
    ]

module.exports = {
  pages: pagesObj,
  configureWebpack: {
    plugins: [CopyWebpackPlugin(plugins)]
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('#', resolve('types'))
      .set('popup', resolve('src/popup'))
  }
}
