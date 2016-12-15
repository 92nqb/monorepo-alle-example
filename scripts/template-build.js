const minimist = require('minimist');
const templateBuild = require('./template-build-fn');

const {
  module : moduleName
} = minimist(process.argv.slice(2));

templateBuild(moduleName);
