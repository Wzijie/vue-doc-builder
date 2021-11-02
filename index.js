const fs = require('fs');
const parser = require('./parser');
const render = require('./render');
const checkConfig = require('./utils/checkConfig');

const parseTask = async file => {
  const source = fs.readFileSync(file.path).toString();
  return { ...file, parseData: await parser(source) };
};

const createFiles = async (files, outputPath) => {
  await new Promise(resolve => {
    fs.mkdir(outputPath, { recursive: true }, err => {
      if (err) throw err;
      resolve();
    });
  });

  const createTasks = files.map(({ name, source }) => {
    return new Promise(resolve => {
      fs.writeFile(`${outputPath}/${name}`, source, err => {
        if (err) throw err;
        resolve();
      });
    });
  });

  await Promise.all(createTasks);
};

const runBuild = async config => {
  checkConfig(config);

  const { entry, output } = config;
  const { path } = output;

  console.log('解析 vue 文件中...');
  const parseDataList = await Promise.all(entry.map(item => parseTask(item)));
  console.log('解析 vue 文件完成');

  console.log('生成渲染内容中...');
  const buildTaskList = parseDataList.map(({ parseData, ...file }) => {
    return { ...file, source: render(parseData) };
  });
  console.log('生成渲染内容完成');

  console.log('构建文档中...');
  await createFiles(buildTaskList, path);
  console.log('构建文档完毕');
};

module.exports = {
  runBuild,
};
