module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    'browser': true,
    'es6': true,
  },
  rules: {
    'brace-style': ['error', '1tbs', {'allowSingleLine': false}],
    'max-len': ['error', 110],
    'no-unused-expressions': 'error',
    'object-curly-spacing': ['error', 'never'],
    'quotes': ['error', 'single'],
    'keyword-spacing': ['error', {'before': true}],
    'space-in-parens': ['error', 'never'],
    'semi': ['error', 'always'],
    'space-unary-ops': ['error', {'nonwords': false}],
  }
};
