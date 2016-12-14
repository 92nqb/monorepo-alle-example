const { rollup } = require('rollup');
const glob = require('glob');
const path = require('path');
const vue = require('rollup-plugin-vue');
const buble = require('rollup-plugin-buble');
const resolve = require('rollup-plugin-node-resolve');

const vueConfig = require('./config/rollup-plugin-vue.config');
const bubleConfig = require('./config/buble.config');

const PACKAGE_JSON = 'package.json';
const STYLES_CSS = 'styles.css';

function readModuleConfigAndBuildPaths(modulePath) {
  console.log(`read ${PACKAGE_JSON} in ${modulePath}`);
  const {
    main: target,
    'jsnext:main': rawFile,
  } = require(path.resolve(modulePath, PACKAGE_JSON));
  return {
    target: path.resolve(modulePath, target),
    rawFile: path.resolve(modulePath, rawFile),
    styles: path.resolve(modulePath, STYLES_CSS),
  };
};

function buildModule({ target, rawFile, styles }) {
  console.log('Build a module with the following configuration:');
  console.log(`targetPath: ${target}`);
  console.log(`entryPath: ${rawFile}`);
  console.log(`stylePath: ${styles}`);
  rollup({
    entry: rawFile,
    plugins: [
      vue(vueConfig(styles)),
      resolve(),
      buble(bubleConfig),
    ]
  }).then(bundle => bundle.write({
    format: 'es',
    dest: target,
  })).catch(err => {
    console.error(err.stack);
    process.exit(1);
  });
}

glob.sync(__dirname + '/../packages/node_modules/*')
  .map(readModuleConfigAndBuildPaths)
  .forEach(buildModule);
