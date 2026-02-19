require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,
    env: {
      registrationPath: '/register'
    },
    setupNodeEvents(on, config) {
      return config
    }
  }
})
