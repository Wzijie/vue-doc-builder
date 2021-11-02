module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      1,
      {
        proseWrap: 'preserve',
        endOfLine: 'auto',
        printWidth: 120,
        singleQuote: true,
        arrowParens: 'avoid',
      },
    ],
  },
};
