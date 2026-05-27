import { test as setup } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const AUTH_STATE_FILE = 'playwright/.auth/user.json';

const MOCK_USER = {
  id: 1,
  email: 'tester@muneo.test',
  name: '문어테스터',
  phoneNumber: '01012345678',
  birthDate: '1995-05-15',
  authProvider: 'LOCAL',
  profileCompleted: true,
  role: 'USER',
};

setup('authenticate', async ({ browser }) => {
  mkdirSync(dirname(AUTH_STATE_FILE), { recursive: true });

  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'access_token',
      value: 'mock-access',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
    {
      name: 'refresh_token',
      value: 'mock-refresh',
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
    },
  ]);

  // zustand persist 'muneo-auth' 키에 user 미리 주입 (UploadPanel 등 client-side 게이트 통과용)
  const page = await context.newPage();
  await page.goto('http://localhost:3000');
  await page.evaluate((user) => {
    window.localStorage.setItem('muneo-auth', JSON.stringify({ state: { user }, version: 0 }));
  }, MOCK_USER);

  await context.storageState({ path: AUTH_STATE_FILE });
  await context.close();
});
