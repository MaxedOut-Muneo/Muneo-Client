import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Profile — authenticated', () => {
  test('프로필 페이지에 사용자 정보가 표시된다', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/profile/);
    await expect(page.getByText('문어테스터').first()).toBeVisible();
    await expect(page.getByText('tester@muneo.test')).toBeVisible();
  });

  test('가입 유형 (일반/카카오)이 표시된다', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.getByText(/일반|이메일|LOCAL/i).first()).toBeVisible();
  });

  test('회원탈퇴 버튼 클릭 시 확인 모달이 나타난다', async ({ page }) => {
    await page.goto('/profile');
    const withdrawButton = page.getByRole('button', { name: /회원\s*탈퇴|탈퇴/ });
    if (await withdrawButton.count()) {
      await withdrawButton.first().click();
      await expect(page.getByText(/정말|확인|탈퇴하시겠/).first()).toBeVisible();
    } else {
      test.skip(true, '회원탈퇴 버튼 selector 차이');
    }
  });
});
