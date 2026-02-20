require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    env: {
      registrationPath: '/register',
      loginPath: '/'
    },
    setupNodeEvents(on, config) {
      return config
    }
  }
})
