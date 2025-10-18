const { defineConfig } = require('cypress');

module.exports = defineConfig({
  retries: {
    openMode: 0,
    runMode: 1
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});