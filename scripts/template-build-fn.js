const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const FILE_JS = 'bundle.js';
const FILE_HTML = 'index.html';
const PACKAGE_JSON = 'package.json';
const rootPath = __dirname + '/../packages/node_modules';
const distPath = __dirname + '/../dist';

function getTemplate(templatePath) {
  console.log('load template in ' + templatePath);
  return fs.readFileSync(templatePath, 'utf8');
}

function writeFile({ pathToDist, fileContent }) {
  console.log('write file in ' + pathToDist);
  fs.writeFileSync(pathToDist, fileContent);
}

function readModuleConfigAndBuildPath(modulePath) {
  console.log(`read ${PACKAGE_JSON} in ${modulePath}`);
  const {
    'jsnext:main': entry,
  } = require(path.resolve(modulePath, PACKAGE_JSON));
  return path.resolve(modulePath, entry);
};

// {{ appPath }}
const jsTemplate = handlebars.compile(
  getTemplate(path.resolve(__dirname, 'templates', FILE_JS))
);
// {{ moduleName }}
const htmlTemplate = handlebars.compile(
  getTemplate(path.resolve(__dirname, 'templates', FILE_HTML))
);

function writeTemplates({ appPath, moduleName }) {
  const jsFile = jsTemplate({ appPath });
  const pathToDistJsFile = path.resolve(distPath, FILE_JS);
  writeFile({
    pathToDist: pathToDistJsFile,
    fileContent: jsFile,
  });
  const htmlFile = htmlTemplate({ moduleName });
  const pathToDistHtmlFile = path.resolve(distPath, FILE_HTML);
  writeFile({
    pathToDist: pathToDistHtmlFile,
    fileContent: htmlFile
  });
  return {
    bundleJSPath: pathToDistJsFile,
  };
}

function run(moduleName) {
  return writeTemplates({
    appPath: readModuleConfigAndBuildPath(path.resolve(rootPath, moduleName)),
    moduleName,
  });
}

module.exports = run;
