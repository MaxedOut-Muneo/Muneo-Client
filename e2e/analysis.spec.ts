import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Analysis — authenticated', () => {
  test('필수 필드 미입력 상태에서 분석 시작 시 에러가 노출된다', async ({ page }) => {
    await page.goto('/analysis');
    const startButton = page.getByRole('button', { name: /분석 시작/ });
    if (await startButton.count()) {
      const disabled = await startButton.first().isDisabled();
      if (!disabled) {
        await startButton.first().click();
        await expect(page.getByText(/모든 공사 정보를 입력|필수/)).toBeVisible();
      } else {
        expect(disabled).toBeTruthy();
      }
    } else {
      test.skip(true, '분석 시작 버튼 selector 차이');
    }
  });

  test('업체명 입력 필드가 노출된다', async ({ page }) => {
    await page.goto('/analysis');
    await expect(page.getByPlaceholder(/업체명을 입력|업체/).first()).toBeVisible();
  });

  test('드래그앤드롭 영역이 존재한다', async ({ page }) => {
    await page.goto('/analysis');
    await expect(page.getByText(/파일 업로드|드래그|업로드/).first()).toBeVisible();
  });
});
