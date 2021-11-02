const componentCompilerUtils = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');
const parseTemplate = require('./parseTemplate');
const parseJavaScript = require('./parseJavaScript');
const { combind } = require('../utils');

const parser = async vueFileSource => {
  const vueParseData = componentCompilerUtils.parse({
    source: vueFileSource,
    filename: 'doc',
    compiler,
  });

  const { template, script } = vueParseData;

  const result = combind([parseTemplate(template.content), await parseJavaScript(script.content)]);

  return result;
};

module.exports = parser;
