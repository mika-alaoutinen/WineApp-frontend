module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    "jest": true,
  },
  'extends': [
    // 'eslint:recommended',
    'plugin:vue/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module'
  },
  'rules': {
    'vue/script-indent': [
        'warn', 2, {
            'baseIndent': 1
        }
    ],
    'linebreak-style': [
        'error',
        'windows'
    ],
    'quotes': [
        'error',
        'single'
    ],
    'semi': [
        'error',
        'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
        'error',
        'always'
    ],
    'arrow-spacing': [
      'error', {
          'before': true,
          'after': true
        }
    ],
  }
}