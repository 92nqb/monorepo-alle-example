const glob = require('glob');
const path = require('path');

const buildModule = require('./modules-build-fn');

const PACKAGE_JSON = 'package.json';
const STYLES_CSS = 'styles.css';
const APP_NAME = 'monorepo-alle-app';

function readModuleConfigAndBuildPaths(modulePath) {
  console.log(`read ${PACKAGE_JSON} in ${modulePath}`);
  const {
    main: dest,
    'jsnext:main': entry,
  } = require(path.resolve(modulePath, PACKAGE_JSON));
  return {
    dest: path.resolve(modulePath, dest),
    entry: path.resolve(modulePath, entry),
    styles: path.resolve(modulePath, STYLES_CSS),
  };
};

glob.sync(__dirname + '/../packages/node_modules/*')
  .filter(modulePath => !(modulePath.endsWith(APP_NAME)))
  .map(readModuleConfigAndBuildPaths)
  .forEach(buildModule);
