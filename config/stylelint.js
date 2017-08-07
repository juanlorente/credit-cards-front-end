module.exports = {
  defaultSeverity: 'warning',
  plugins: 'stylelint-scss',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines'
  ],
  rules: {
    'no-missing-end-of-source-newline': null
  }
}