module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'cypress/globals': true
  },
  plugins: ['cypress'],
  extends: [
    'standard',
    'plugin:cypress/recommended',
    'plugin:vue/recommended',
    'eslint:recommended'
  ],
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
    indent: [
      'warn',
      2,
      {
        CallExpression: { arguments: 'first' },
        ignoredNodes: ['TemplateLiteral']
      }
    ],
    'template-curly-spacing': 'off',
    'space-infix-ops': 'warn',
    curly: ['warn', 'multi-or-nest'],
    'space-before-blocks': 'warn',
    'vue/script-indent': 'warn',
    'no-multi-spaces': 'warn',
    'no-trailing-spaces': 'warn',
    'generator-star-spacing': ['warn', 'before'],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
