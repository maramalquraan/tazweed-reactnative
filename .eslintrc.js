module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@javascript-eslint/parser',
  plugins: ['@javascript-eslint'],
  "rules": {
    "react/prop-types": 0,
    "react/forbid-prop-types": 0,
    "quotes": [2, "double", { "avoidEscape": true }]
  },
  "prettier/prettier": ["error", { "singleQuote": true }]
};
