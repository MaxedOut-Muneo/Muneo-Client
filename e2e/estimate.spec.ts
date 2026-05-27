import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Estimate — authenticated', () => {
  test('가견적 페이지 진입 시 Step1 기본 정보가 표시된다', async ({ page }) => {
    await page.goto('/estimate');
    await expect(page).toHaveURL(/\/estimate/);
    await expect(page.getByRole('heading', { name: /기본 정보/ })).toBeVisible();
    await expect(page.getByRole('button', { name: '다음 단계' })).toBeVisible();
  });

  test('전용 면적에 음수 입력 시 브라우저 유효성 검사가 차단한다', async ({ page }) => {
    await page.goto('/estimate');
    const area = page.getByLabel('전용 면적');
    await area.fill('-5');
    const validity = await area.evaluate((el) => (el as HTMLInputElement).validity.rangeUnderflow);
    expect(validity).toBe(true);
  });

  test('Step1 입력 후 다음 단계로 진행하면 Step2가 표시된다', async ({ page }) => {
    await page.goto('/estimate');
    await page.getByRole('button', { name: '서울' }).click();
    await page.getByRole('button', { name: '아파트' }).click();
    await page.getByLabel('전용 면적').fill('25');
    await page.getByRole('button', { name: '3' }).first().click();
    await page.getByRole('button', { name: '다음 단계' }).click();
    await expect(page.getByText(/공종|공정 선택|시공범위|공사 범위/).first()).toBeVisible();
  });
});
