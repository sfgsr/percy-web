module.exports = {
  env: {
    'embertest': true,
  },
  globals: {
    'describe': true,
    'it': true,
    'percySnapshot': true,
    'expect': true,
    'context': true,
    'server': true
  },
  rules: {
    'max-len': ['error', 100]
  }
};
