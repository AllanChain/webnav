module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    'cypress/globals': true
  },
  plugins: ['@typescript-eslint', 'cypress'],
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: ['.vue'],
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'standard-with-typescript'
  ],
  rules: {
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 4,
        multiline: 3
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
