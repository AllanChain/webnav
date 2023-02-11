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
    project: './tsconfig.eslint.json'
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'standard-with-typescript'
  ],
  rules: {
    '@typescript-eslint/triple-slash-reference': 'off',
    'vue/max-attributes-per-line': ['error', { singleline: 4 }],
    'no-console': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
  }
}
