import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.describe('Profile — authenticated', () => {
  test('프로필 페이지에 사용자 이름과 이메일이 표시된다', async ({ page }) => {
    await page.goto('/profile');
    await expect(page).toHaveURL(/\/profile/);
    await expect(page.getByText('문어테스터').first()).toBeVisible();
    await expect(page.getByLabel('이메일')).toHaveValue('tester@muneo.test');
  });

  test('일반 가입 유저는 이메일 필드와 비밀번호 변경 필드를 본다', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.getByLabel('이메일')).toBeVisible();
    await expect(page.getByLabel('새 비밀번호')).toBeVisible();
  });

  test('회원 탈퇴 버튼 클릭 시 확인 모달이 표시된다', async ({ page }) => {
    await page.goto('/profile');
    await page.getByRole('button', { name: '회원 탈퇴' }).click();
    await expect(page.getByText('회원탈퇴 하시겠습니까?')).toBeVisible();
    await expect(page.getByRole('button', { name: '탈퇴', exact: true })).toBeVisible();
  });
});
