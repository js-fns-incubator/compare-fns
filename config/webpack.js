var path = require('path');

var config = {
  cache: true,
  entry: {
    'compare_fns': './index.js'
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].js'
  }
};

module.exports = config;

