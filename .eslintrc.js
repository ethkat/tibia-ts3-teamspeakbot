// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    ecmaVersion: 6,
  },
  env: {
    es6: true,
    browser: true,
  },
  'settings': {
    'import/resolver': {
      'meteor': {
        'extensions': [
          '.js',
          '.jsx',
          '.css',
        ],
        'moduleDirectory': [
          'node_modules',
        ]
      }
    },
    'import/ignore': [
      'node_modules',
      '\.scss$',
    ],
  },
  plugins: ['react', 'import'],
  extends: [
    'airbnb-base',
    'plugin:react/all',
    '@meteorjs/eslint-config-meteor'
  ],
  // add your custom rules here
  'rules': {
    'no-class-assign': 'off',
    'no-await-in-loop': 'off',
    'react/jsx-indent': 'off',
    'jsx-a11y/alt-text': 'off',
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'import/extensions': ['off', 'never'],
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/label-has-for': 'off',
    'react/forbid-prop-types': 'off',
    'import/no-mutable-exports': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }]
  }
}
