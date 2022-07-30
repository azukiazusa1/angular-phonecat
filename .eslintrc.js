module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jasmine: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    "plugin:react-hooks/recommended",
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-this-alias': 'off'
  },
  globals: {
    angular: true,
    module: true,
    inject: true
  }
};
