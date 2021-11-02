const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const { parseEvents, getFormatBabelType } = require('../utils');

// 因为 data 数据是 function 执行的返回结果，所以直接从 AST 节点解析出数据
const parseData = expressionDeclarationAST => {
  const dataProperties = expressionDeclarationAST.properties.find(item => item.key.name === 'data');

  if (!dataProperties) return null;

  return dataProperties.body.body[0].argument.properties.map(item => {
    const { key, value } = item;
    return {
      key: key.name,
      value: value.value,
      type: getFormatBabelType(value.type),
    };
  });
};

// props 解析需要注意值为对象或数组
const parseProps = vueOptions => {
  const props = vueOptions.props;

  if (!props) return null;

  if (Array.isArray(props)) return props.map(key => ({ key }));

  return Object.entries(props).map(([key, value]) => {
    if (Object.prototype.toString.call(value) === '[object Object]') {
      const { type, default: defaultValue, required } = value;
      return {
        key,
        type: type && type.name,
        defaultValue,
        required,
      };
    } else {
      return {
        key,
        type: value && value.name,
      };
    }
  });
};

// methods 仅解析出 key 数据
const parseMethods = vueOptions => {
  const methods = vueOptions.methods;

  if (!methods) return null;

  return Object.keys(methods).map(key => ({ key }));
};

const parseJavaScript = scriptSource => {
  const ast = parser.parse(scriptSource, { sourceType: 'module' });

  return new Promise(resolve => {
    traverse(ast, {
      // 针对 export default 表达式进行处理
      ExportDefaultDeclaration(path) {
        // vue option 对象 AST 节点
        let vueObjectExpressionDeclaration = {};

        // 如果 export 为一个对象则直接使用这个对象作为 vue option AST 节点
        if (path.node.declaration.type === 'ObjectExpression') {
          vueObjectExpressionDeclaration = path.node.declaration;
        }

        // 如果 export 为一个变量则从父级全局作用域找到该变量定义的值作为 vue option AST 节点
        if (path.node.declaration.type === 'Identifier') {
          path.parent.body
            .filter(({ type }) => type === 'VariableDeclaration')
            .forEach(({ declarations }) => {
              const variableDeclarator = declarations.find(item => item.id.name === path.node.declaration.name);
              if (variableDeclarator) {
                vueObjectExpressionDeclaration = variableDeclarator.init;
              }
            });
        }

        // 将 AST 转换成代码
        const { code } = generate(vueObjectExpressionDeclaration);

        // 运行代码拿到 vue option JS 对象
        const fn = new Function(`return ${code}`);

        const vueOptions = fn();

        const name = vueOptions.name || 'vue component';

        const data = parseData(vueObjectExpressionDeclaration);

        const props = parseProps(vueOptions);

        const methods = parseMethods(vueOptions);

        const events = parseEvents(code);

        resolve({
          name,
          data,
          props,
          methods,
          events,
        });
      },
    });
  });
};

module.exports = parseJavaScript;
