# vue-doc-builder

解析 Vue 组件生成 markdown 文档

输入：

```html
<template>
  <p :style="{ fontSize }" @click="onClick">
    <slot />
    <slot name="desc" />
  </p>
</template>

<script>
export default {
  name: 'Text',

  props: {
    color: String,
  },

  data() {
    return {
      fontSize: '14px',
    };
  },

  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
};
</script>
```

输出：

```markdown
# Text

### Data

| key | description | defaultValue | type |
| --- | ----------- | ------------ | ---- |
| fontSize | - | - | String |

### Props

| key | description | type | defaultValue | required |
| --- | ----------- | ---- | ------------ | -------- |
| color | - | String | - | - |

### Methods

| key | description | arguments |
| --- | ----------- | --------- |
| onClick | - | - |

### Events

| key | description | arguments |
| --- | ----------- | --------- |
| click | - | - |

### Slots

| key | description |
| --- | ----------- |
| default | - |
| desc | - |
```

## 安装

```shell
yarn add vue-doc-builder -D
```

## 使用

```javascript
const path = require('path');
const docBuilder = require('vue-doc-builder');

const config = {
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

docBuilder.runBuild(config).then(() => {
  // 文档生成完毕
});
```
- entry 为需要解析的 vue 文件组成的对象数组，其中 name 字段为最终输出的文件名称，path 则是 vue 文件路径
- output 为文档输出目录

完整例子可参考 [使用示例](https://github.com/Wzijie/vue-doc-builder/tree/main/example)

## 配置

| key | description | required | type |
| --- | ----------- | -------- | ---- |
| entry | 需要解析的 vue 文件组成的对象数组，`entry[0].name` 为输出的文档文件名称，`entry[0].path` 为输入的 vue 文件路径 | true | Object[] |
| output | 资源输出相关配置，`output.path` 为文档输出目录 | true | Object |

## LICENSE

[MIT](LICENSE)
