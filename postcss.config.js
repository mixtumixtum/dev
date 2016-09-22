'use strict' 

const postcss = require('postcss')

module.exports = {
  use: ['postcss-import', 'autoprefixer']
, 'local-plugins' : true
, 'postcss-import': {onImport: sources => global.watchCSS(sources, this.from)}
, 'autoprefixers' : {browsers: 'last 2'}
, input: 'styles/index.css'
, output: 'dist/index.css'
}

