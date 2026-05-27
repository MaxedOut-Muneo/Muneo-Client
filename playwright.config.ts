import { defineConfig, devices } from '@playwright/test';

const MOCK_API_PORT = 4000;
const MOCK_API_URL = `http://localhost:${MOCK_API_PORT}`;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
  ],
  webServer: [
    {
      command: 'pnpm e2e:mock',
      url: MOCK_API_URL,
      reuseExistingServer: false,
      stdout: 'pipe',
      stderr: 'pipe',
    },
    {
      command: 'pnpm dev:web',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      env: {
        NEXT_PUBLIC_API_BASE_URL: MOCK_API_URL,
      },
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 240 * 1000,
    },
  ],
});
