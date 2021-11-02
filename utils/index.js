/**
 * 从给定字符中解析出 $emit 方法的第一个参数作为 events 事件数据
 * 匹配规则为 /\$emit\(['"](\w*)/g
 * @param {String} code script 或 template 字符
 * @returns {Array | Null} 匹配到的结果数组，无匹配则为 null
 */
const parseEvents = code => {
  const result = [];
  const regexp = /\$emit\(['"](\w*)/g;
  let match = null;
  while ((match = regexp.exec(code))) result.push(match[1]);
  return result.length > 0 ? result.map(key => ({ key })) : null;
};

/**
 * 将 babel type 转为 JS type
 * @param {String} type babel type
 * @returns {String} JS type
 * @example getFormatBabelType('StringLiteral') -> 'String'
 */
const getFormatBabelType = type => {
  return /^Array|Object|Boolean|String|Number|Numeric|Null/.test(type)
    ? type.replace(/^(Array|Object|Boolean|String|Number|Numeric|Null)[\s\S]*$/g, '$1')
    : 'any';
};

/**
 * 从 html 字符中捕获给定节点的指定属性名的值
 * 需注意匹配到节点但未匹配到属性名则值为 undefined
 * @param {String} html html 字符串
 * @param {String} tag 要捕获的节点名称
 * @param {String} attribute 要捕获的属性名称
 * @returns {Array} 捕获到的值组成的数组
 * @example matchTagAttribute('<div id="box"></div><div />', 'div', 'id') -> ['box', undefined]
 */
const matchTagAttribute = (html, tag, attribute) => {
  const result = [];
  const regexp = new RegExp(`<${tag}((.*?)?${attribute}=['"](?<attribute>.*?)['"])?(.*?)>`, 'g');
  let match = null;
  while ((match = regexp.exec(html))) result.push(match.groups.attribute);
  return result;
};

/**
 * 合并对象，这里只写了针对值为数组合并的逻辑
 * @param {Array<object>} objList 需要合并的对象列表
 * @returns {object} 合并后的对象
 * @example [{ a: [1], b: [2] }, { b: [2], c: [3] }] -> { a: [1], b: [2, 2], c: [3] }
 */
const combind = objList => {
  const map = objList.reduce((prev, current, index) => {
    return Object.keys(current).reduce((mapResult, key) => {
      const value = mapResult[key];
      return { ...mapResult, [key]: value ? [...value, index] : [index] };
    }, prev);
  }, {});

  const result = Object.entries(map).reduce((prev, [key, value]) => {
    // 这里写死了合并数组的逻辑，合并其他类型需要另写逻辑
    const combindValue = value
      .map(item => objList[item][key])
      .filter(Boolean)
      .flat(1);
    return { ...prev, [key]: combindValue.length > 0 ? combindValue : null };
  }, {});

  return result;
};

/**
 * 获取给定路径中的文件名
 * @param {String} path 路径
 * @returns {String} 文件名称
 * @example getFileNameInPath('d/abc/index.js') -> 'index'
 */
const getFileNameInPath = path => {
  const match = path.match(/.*\/(?<fileName>.*)\./);
  return match && match.groups.fileName;
};

module.exports = {
  parseEvents,
  getFormatBabelType,
  matchTagAttribute,
  combind,
  getFileNameInPath,
};
