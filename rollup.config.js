const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const { rollup } = require('rollup');

const vueConfig = require('./config/rollup-plugin-vue.config');
const bubleConfig = require('./config/buble.config');

let cache;

const config = {
  entry: 'packages/node_modules/header/src/index.vue',
  targets: [
    { format: 'es', dest: `packages/node_modules/header/lib/index.js` },
    { format: 'cjs', dest: `packages/node_modules/header/lib/index.common.js` },
  ],
  plugins: [
    vue(vueConfig),
    buble(bubleConfig),
  ],
  useStrict: false,
  cache,
};

module.exports = config;
