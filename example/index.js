const docBuilder = require('../index');
const config = require('./config');

docBuilder.runBuild(config).then(() => {
  // 文档生成完毕
});
