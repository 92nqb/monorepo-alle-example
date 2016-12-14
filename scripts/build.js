// Third party dependency
const glob = require('glob');
const path = require('path');

// scripts dependency
const buildModule = require('./build-module');

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


glob.sync(__dirname + '/../packages/node_modules/*')
  .map(readModuleConfigAndBuildPaths)
  .forEach(buildModule);



  // function buildModule({ target, rawFile, styles }) {
  //   console.log('Build a module with the following configuration:');
  //   console.log(`targetPath: ${target}`);
  //   console.log(`entryPath: ${rawFile}`);
  //   console.log(`stylePath: ${styles}`);
  //   rollup({
  //     entry: rawFile,
  //     plugins: [
  //       vue(vueConfig(styles)),
  //       resolve(),
  //       buble(bubleConfig),
  //     ]
  //   }).then(bundle => bundle.write({
  //     format: 'es',
  //     dest: target,
  //   })).catch(err => {
  //     console.error(err.stack);
  //     process.exit(1);
  //   });
  // }
