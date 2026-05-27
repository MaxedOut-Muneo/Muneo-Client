import { expect, test } from '@playwright/test';

test.describe('Auth — 에러 시나리오', () => {
  test('로그인 5xx 응답 시 일반 에러 메시지가 노출된다', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder('name@example.com').fill('error@muneo.test');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('Correct123');
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: /오류가 발생/ })
        .first()
    ).toBeVisible({ timeout: 10_000 });
  });

  test('네트워크 차단 상황에서 로그인 실패 시 에러 메시지가 노출된다', async ({ page }) => {
    await page.goto('/login');
    await page.route('**/api/v1/users/login', (route) => route.abort('failed'));
    await page.getByPlaceholder('name@example.com').fill('tester@muneo.test');
    await page.getByPlaceholder('비밀번호를 입력하세요').fill('Correct123');
    await page.getByRole('button', { name: '로그인', exact: true }).click();
    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: /오류가 발생|일시적|네트워크/ })
        .first()
    ).toBeVisible({ timeout: 10_000 });
  });
});
