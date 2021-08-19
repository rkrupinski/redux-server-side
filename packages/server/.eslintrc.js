module.exports = {
  extends: [
    '../../.eslintrc.base.js',
    'plugin:node/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off',
  },
};
