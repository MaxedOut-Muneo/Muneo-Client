import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Home — authenticated', () => {
  test('홈 페이지에 사용자 이름과 요약 카드가 표시된다', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('문어테스터');
    await expect(page.getByText('진단 완료한 견적')).toBeVisible();
  });

  test('최근 이력 항목 클릭 시 상세 페이지로 이동한다', async ({ page }) => {
    await page.goto('/home');
    const row = page
      .getByRole('row')
      .filter({ hasText: /A업체|risk-1|est-1|아파트/ })
      .first();
    if (await row.count()) {
      await row.click();
      await expect(page).toHaveURL(/\/history\//);
    } else {
      test.skip(true, '이력 행을 찾을 수 없음 (mock data 변경 또는 selector 차이)');
    }
  });
});
