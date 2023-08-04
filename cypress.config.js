const { defineConfig } = require("cypress");

module.exports = defineConfig({
  "chromeWebSecurity": false,
  numTestsKeptInMemory: 100,
  e2e: {
    watchForFileChanges: true,
    execTimeout: 50000,
    defaultCommandTimeout: 50000,
    requestTimeout: 50000,
    pageLoadTimeout: 50000,
    responseTimeout: 50000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
