import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Home — authenticated', () => {
  test('홈 페이지에 사용자 이름과 요약 카드가 표시된다', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('문어테스터');
    await expect(page.getByText('진단 완료한 견적')).toBeVisible();
  });

  test('최근 이력 행 클릭 시 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('/home');
    const rows = page.getByRole('link').filter({ hasText: /월|아파트|가견적|리스크/ });
    await expect(rows.first()).toBeVisible({ timeout: 10_000 });
    await Promise.all([page.waitForURL(/\/history\//, { timeout: 10_000 }), rows.first().click()]);
  });
});
