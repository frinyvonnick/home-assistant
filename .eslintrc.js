module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  extends: [
    'airbnb-base',
    'plugin:vue/essential',
    'plugin:prettier/recommended'
  ],
  rules: {
    semi: 0,
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-param-reassign': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/prefer-default-export': 0,
    'no-use-before-define': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
