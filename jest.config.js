module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./src/tests/index.js'],

  // Add transform and transformIgnorePatterns to fix vee-validate error in unit tests.
  // See https://github.com/logaretm/vee-validate/issues/2310
  transform: {
   'vee-validate/dist/rules': 'babel-jest'
  },

  transformIgnorePatterns: [
    '<roodDir>/node_modules/(?!vee-validate/dist/rules)',
  ],
}
