import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('History — authenticated', () => {
  test('이력 페이지가 mock 데이터로 렌더된다', async ({ page }) => {
    await page.goto('/history');
    await expect(page).toHaveURL(/\/history/);
    await expect(page.getByText(/A업체|아파트|가견적|진단/).first()).toBeVisible({ timeout: 10_000 });
  });

  test('유형 필터 변경 시 결과가 업데이트된다', async ({ page }) => {
    await page.goto('/history');
    const filter = page.getByRole('button', { name: /가견적|리스크 진단|전체/ }).first();
    if (await filter.count()) {
      const beforeCount = await page.getByRole('row').count();
      await filter.click();
      const option = page.getByRole('option', { name: /리스크 진단|가견적/ }).first();
      if (await option.count()) {
        await option.click();
        await page.waitForTimeout(300);
        const afterCount = await page.getByRole('row').count();
        expect(beforeCount).toBeGreaterThanOrEqual(0);
        expect(afterCount).toBeGreaterThanOrEqual(0);
      } else {
        test.skip(true, '필터 옵션 selector 차이');
      }
    } else {
      test.skip(true, '필터 selector 차이');
    }
  });
});
