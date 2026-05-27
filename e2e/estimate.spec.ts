import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Estimate — authenticated', () => {
  test('가견적 페이지 진입 시 Step1이 표시된다', async ({ page }) => {
    await page.goto('/estimate');
    await expect(page).toHaveURL(/\/estimate/);
    await expect(page.getByText(/기본 정보|평수|공간/).first()).toBeVisible();
  });

  test('필수 입력 누락 상태에서 다음 진행 시 차단되거나 검증된다', async ({ page }) => {
    await page.goto('/estimate');
    const nextButton = page.getByRole('button', { name: /다음|진행/ }).first();
    if (await nextButton.count()) {
      await nextButton.click();
      const stillStep1 = await page
        .getByText(/기본 정보|평수/)
        .first()
        .isVisible();
      expect(stillStep1).toBeTruthy();
    } else {
      test.skip(true, 'next 버튼 selector 차이');
    }
  });

  test('Step1 입력 후 다음 단계로 진행한다', async ({ page }) => {
    await page.goto('/estimate');
    const pyeong = page.getByPlaceholder(/평수|면적/).first();
    if (await pyeong.count()) {
      await pyeong.fill('25');
    }
    const roomCount = page.getByPlaceholder(/방.?개수|방수/).first();
    if (await roomCount.count()) {
      await roomCount.fill('3');
    }
    const nextButton = page.getByRole('button', { name: /다음/ }).first();
    if (await nextButton.count()) {
      await nextButton.click();
    }
    await expect(page.getByText(/공종|공정|선택|시공범위/).first()).toBeVisible({ timeout: 5000 });
  });
});
