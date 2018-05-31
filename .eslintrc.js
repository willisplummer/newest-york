'use strict';

module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'import', 'flowtype', 'prefer-object-spread'],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  globals: {
    mount: false,
    render: false,
    shallow: false
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack.config.base.js'
      }
    }
  },
  rules: {
    'no-unused-vars': 2,
    'import/no-anonymous-default-export': 2,
    'prefer-object-spread/prefer-object-spread': 2,
    'flowtype/define-flow-type': 1,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true
    }],
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to', 'hrefLeft', 'hrefRight'],
      aspects: ['noHref', 'invalidHref', 'preferButton']
    }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
      }
    ]
  }
}
