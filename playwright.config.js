const { defineConfig } = require( '@playwright/test' );

module.exports = defineConfig( {
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: process.env.PRW_BASE_URL || 'http://localhost:10003',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure'
  }
} );
