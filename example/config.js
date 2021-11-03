const path = require('path');

// 获取 ./components 目录下的所有组件，参考如下
// const glob = require('glob');
// const entry = glob.sync(path.resolve(__dirname, './components/*.vue')).map(item => {
//   return {
//     path: item,
//     name: item.split('/').reverse()[0].replace('.vue', '.md'),
//   };
// });

module.exports = {
  entry: [
    {
      name: 'Button.md',
      path: path.resolve(__dirname, './components/Button.vue'),
    },
    {
      name: 'Text.md',
      path: path.resolve(__dirname, './components/Text.vue'),
    },
  ],
  output: {
    path: path.resolve(__dirname, './docs'),
  },
};
