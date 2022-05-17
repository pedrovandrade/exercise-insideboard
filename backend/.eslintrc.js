module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: false,
    commonjs: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    ecmaFeatures: {
      impliedStrict: true,
    },
    requireConfigFile: false,
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  rules: {
    'no-unsafe-optional-chaining': 'off',
    'no-nonoctal-decimal-escape': 'off',
  },
};
