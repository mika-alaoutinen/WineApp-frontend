module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    "jest": true,
  },

  'extends': [
    'plugin:vue/recommended'
  ],

  'parserOptions': {
    "parser": "babel-eslint",
    'ecmaVersion': 6,
    'sourceType': 'module'
  },

  'rules': {
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'arrow-spacing': [
      'error', {
        'before': true,
        'after': true
      }
    ],
    'eqeqeq': [
      'error'
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],

    // Vue specific rules:
    'vue/script-indent': [
      'warn', 2, {
        'baseIndent': 1,
        'switchCase': 1,
      },
    ],
  }
}