/* eslint-env node */
const path = require('path');
const WebpackUserscript = require('webpack-userscript');
const { name, scriptName, description } = require('./package.json');

const dev = process.argv.includes('--dev');

module.exports = {
  mode: dev ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${name}.user.js`,
    // libraryTarget: 'this',
  },
  plugins: [
    new WebpackUserscript({
      headers: {
        name: scriptName,
        description,
        namespace: 'https://uc.feildmaster.com/',
        match: 'https://*.undercards.net/*',
        exclude: 'https://*.undercards.net/*/*',
        updateURL: `https://unpkg.com/${name}/dist/${name}.meta.js`,
        downloadURL: `https://unpkg.com/${name}/dist/${name}.user.js`,
        require: [ // URLS of files to require
        ],
        grant: 'none',
      },
      pretty: true,
    }),
  ],
};
