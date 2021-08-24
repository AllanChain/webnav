module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'cypress/globals': true
  },
  // parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'cypress'],
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'standard'
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
  }
}
