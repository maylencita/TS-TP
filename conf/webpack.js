"use strict"

const path = require('path')
const nodeExternals = require('webpack-node-externals')

const ROOT = path.resolve(__dirname, '..')
const SOURCE = path.resolve(ROOT, 'src')

const conf = {
  tsconfig: path.resolve(ROOT, 'conf'),
  output: path.resolve(ROOT, 'bin'),
  sources: path.resolve(ROOT, 'src')
}

module.exports = {
  context: conf.sources,

  entry: {
    app: './index.ts'
  },

  output: {
    path: conf.output,
    filename: '[name]',
    libraryTarget: "commonjs2"    
  },

  module: {
    loaders: [
      {test: /\.ts(x?)$/, loader: `awesome-typescript-loader?configFileName=${conf.tsconfig}`}
    ]
  },

  resolve: {
    modules: [conf.sources, 'node_modules'],
    extensions: ['.js', '.ts', '.tsx']
  },

  target: 'node',
  
  externals: [nodeExternals()],
  
  devtool: 'source-map'
  
}