module.exports = {
  extends: 'airbnb',
  env: {
    browser: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'max-len': [2, 200, 2, {
      ignoreUrls: true,
      ignoreComments: false
    }],

    'no-constant-condition': [2, { 'checkLoops': false }],

    'react/jsx-filename-extension': [0, { extensions: [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
    'react/no-unused-prop-types': 0,
    'react/no-danger': 0,

    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies':
      ['error', {'devDependencies': true}],
  },
  'globals': {
  }
};
