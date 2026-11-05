const { defineConfig } = require('cypress')

module.exports = defineConfig({
  expose: {
    WEB_BASE_URL: process.env.CYPRESS_WEB_BASE_URL || 'http://localhost:5173',
    ADMIN_BASE_URL: process.env.CYPRESS_ADMIN_BASE_URL || 'http://localhost:5174',
  },
  env: {
    ADMIN_EMAIL: process.env.CYPRESS_ADMIN_EMAIL || 'admin@eshop.com',
    ADMIN_PASSWORD: process.env.CYPRESS_ADMIN_PASSWORD || 'Admin123!',
    USER_EMAIL: process.env.CYPRESS_USER_EMAIL || 'test@eshop.com',
    USER_PASSWORD: process.env.CYPRESS_USER_PASSWORD || 'Test1234!',
  },
  e2e: {
    specPattern: 'test/test-scripts/**/*.cy.js',
    supportFile: 'test/test-scripts/support/e2e.js',
  },
  screenshotsFolder: '.testrun-artifacts/screenshots',
  videosFolder: '.testrun-artifacts/videos',
  video: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 30000,
  requestTimeout: 10000,
  responseTimeout: 10000,
  retries: 0,
})
