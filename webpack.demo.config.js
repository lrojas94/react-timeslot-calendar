var webpack = require('webpack');
const path = require('path');
const hljs = require('highlight.js');
const marked = require('marked');

const renderer = new marked.Renderer();
renderer.code = function(code, language){
  return '<pre><code class="hljs ' + language + '">' +
    hljs.highlight(language, code).value +
    '</code></pre>';
};


module.exports = {

  entry: './src/js/demo/app.jsx',

  output: {
    filename: './public/build.js',
    libraryTarget: 'umd',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
        }],
      },
      {
        test: /\.md$/,
        use: [{
          loader: 'html-loader',
        }, {
          loader: 'markdown-loader',
          options: {
            renderer,
          },
        }],
      },
    ],
  },
};
