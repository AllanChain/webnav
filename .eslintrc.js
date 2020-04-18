module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: {
          max: 3,
          allowFirstLine: false
        }
      }
    ],
    'space-infix-ops': 'warn',
    indent: [
      'warn',
      2,
      {
        CallExpression: { arguments: 'first' }
      }
    ],
    curly: ['warn', 'multi-or-nest'],
    'semi': ['warn', 'never'],
    'space-before-blocks': 'warn',
    'quotes': ['warn', 'single'],
    'vue/script-indent': 'warn',
    'no-multi-spaces': 'warn',
    'no-trailing-spaces': 'warn',
    'generator-star-spacing': ['warn', 'before'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
