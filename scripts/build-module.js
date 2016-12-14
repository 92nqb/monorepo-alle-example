const { rollup } = require('rollup');

const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');
const commonjs =  require('rollup-plugin-commonjs');

const vueConfig = require('./config/rollup-plugin-vue.config');
const bubleConfig = require('./config/buble.config');

module.exports = function buildModule({ target, rawFile, styles, plugins = [] }) {
  console.log('Build a module with the following configuration:');
  console.log(`* targetPath: ${target}`);
  console.log(`* entryPath: ${rawFile}`);
  console.log(`* stylePath: ${styles}`);
  rollup({
    entry: rawFile,
    plugins: [
      vue(vueConfig(styles)),
      buble(bubleConfig),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
    ].concat(plugins),
  }).then(bundle => bundle.write({
    format: 'es',
    dest: target,
  })).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
}
