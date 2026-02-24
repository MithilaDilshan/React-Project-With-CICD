require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    defaultCommandTimeout: 20000, // 20 seconds
    pageLoadTimeout: 60000,       // 60 seconds for cy.visit()
    env: {
      registrationPath: '/register',
      loginPath: '/'
    },
    setupNodeEvents(on, config) {
      return config
    }
  }
})
