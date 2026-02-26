require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    defaultCommandTimeout: 20000, // 20 seconds
    pageLoadTimeout: 60000,       // 60 seconds for cy.visit()
    env: {
      registrationPath: '/register',
      loginPath: '/',
      groupPath: '/v3/student-dashboard/Test/student-group',
      dashboardPath: '/v3/student-dashboard/Test',
    },
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    }
  }
})
