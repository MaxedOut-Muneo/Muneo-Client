import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('History — authenticated', () => {
  test('이력 페이지에서 mock 데이터 행이 렌더된다', async ({ page }) => {
    await page.goto('/history');
    await expect(page).toHaveURL(/\/history/);
    await expect(page.getByText('A업체').first()).toBeVisible({ timeout: 10_000 });
  });

  test('검색 버튼이 노출되고 필터 드롭다운이 동작한다', async ({ page }) => {
    await page.goto('/history');
    await expect(page.getByRole('button', { name: '검색' })).toBeVisible();
    await page.getByRole('combobox').filter({ hasText: '전체' }).first().click();
    await expect(page.getByRole('option', { name: '리스크 진단', exact: true })).toBeVisible();
  });
});
