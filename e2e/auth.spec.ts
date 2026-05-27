import { expect, test } from '@playwright/test';

test.describe('Auth — unauthenticated', () => {
  test('정상 자격증명으로 로그인 시 /home으로 이동한다', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('name@example.com').fill('tester@muneo.test');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('Correct123');
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/api/v1/users/login') && res.request().method() === 'POST'
    );
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    const response = await responsePromise;
    expect(response.status(), `login API returned ${response.status()}`).toBe(200);
    await expect(page).toHaveURL(/\/home/, { timeout: 10_000 });
  });

  test('잘못된 비밀번호 입력 시 에러 메시지가 노출된다', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('name@example.com').fill('wrong-user@muneo.test');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('Wrong123');
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: /비밀번호|이메일/ })
        .first()
    ).toBeVisible({
      timeout: 10_000,
    });
  });

  test('이메일 형식 오류 시 즉시 검증 메시지가 표시된다', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('name@example.com').fill('not-an-email');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('Whatever123');
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    await expect(page.getByRole('alert').first()).toBeVisible({ timeout: 5_000 });
  });

  test.describe.serial('protected routes redirect to /login', () => {
    const protectedPaths = ['/home', '/estimate', '/analysis', '/history', '/profile'];
    for (const path of protectedPaths) {
      test(`${path} 직접 접근 시 /login으로 리다이렉트`, async ({ page }) => {
        await page.goto(path);
        await expect(page).toHaveURL(/\/login/);
      });
    }
  });
});

test.describe('Auth — authenticated', () => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('로그아웃 후 랜딩 페이지로 이동한다', async ({ page }) => {
    await page.goto('/profile');
    await page.getByRole('button', { name: /로그아웃/ }).click();
    await expect(page).toHaveURL(/\/(?:\?|$)/);
  });
});
