// 必要配置项
const requireConfigField = ['entry', 'output', 'output.path'];

/**
 * 读取对象的值，支持 '.' 字符连接的 key
 * @param {Object} obj 要读取值的对象
 * @param {String} keys 要读取的 key
 * @returns {any} 该对象给定 key 的 value
 */
const getObjectValueByKeys = (obj, keys) => {
  return keys.includes('.')
    ? keys.split('.').reduce((prev, current) => {
        return prev ? prev[current] : undefined;
      }, obj)
    : obj[keys];
};

const checkConfig = config => {
  const emptyField = requireConfigField.filter(item => !getObjectValueByKeys(config, item));
  if (emptyField.length > 0) throw new Error(`缺少必要配置项：${emptyField.join('、')}`);
};

module.exports = checkConfig;
