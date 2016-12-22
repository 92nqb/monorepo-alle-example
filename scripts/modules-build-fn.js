const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const nodeGlobals = require('rollup-plugin-node-globals');
const {
  rollup
} = require('rollup');

module.exports = function moduleBuild({ dest, entry, styles: css }) {
  console.log('Build a module with the following configuration:');
  console.log(`* dest: ${dest}`);
  console.log(`* entry: ${entry}`);
  console.log(`* css: ${css}`);
  rollup({
    entry,
    plugins: [
      vue({ css, compileTemplate: true }),
      buble({}),
      nodeResolve({ jsnext: true, main: true, browser: true }),
      commonjs(),
      nodeGlobals(),
    ],
  }).then(bundle => bundle.write({
    format: 'cjs',
    dest,
  })).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
};
