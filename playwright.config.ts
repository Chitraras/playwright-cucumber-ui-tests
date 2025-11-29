import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/features',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'list',
  use: {
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
});