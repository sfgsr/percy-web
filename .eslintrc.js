module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: 'eslint:recommended',
  env: {
    'browser': true
  },
  rules: {
    'no-unused-expressions': 'error',
    'quotes': ['error', 'single'],
    'max-len': ['error', 110],
    'space-unary-ops': ['error', { 'nonwords': false }]
  }
};
