import { expect, type Page, test } from '@playwright/test';

const fillSignupForm = async (page: Page, overrides: Partial<Record<string, string>> = {}) => {
  const values = {
    이메일: 'new@muneo.test',
    비밀번호: 'StrongPw!23',
    '비밀번호 확인': 'StrongPw!23',
    이름: '신규유저',
    연락처: '010-1234-5678',
    생년월일: '1995-05-15',
    ...overrides,
  };
  for (const [label, value] of Object.entries(values)) {
    await page.getByLabel(label, { exact: true }).fill(value);
  }
};

test.describe('Signup', () => {
  test('필수 필드 미입력 시 검증 메시지가 노출된다', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('button', { name: '가입하기' }).click();
    await expect(page.getByText(/입력해주세요|필수|올바른/).first()).toBeVisible();
  });

  test('이미 가입된 이메일 입력 시 서버 에러가 노출된다', async ({ page }) => {
    await page.goto('/signup');
    await fillSignupForm(page, { 이메일: 'taken@muneo.test' });
    await page.getByRole('button', { name: '가입하기' }).click();
    await expect(page.getByText(/이미 가입|EMAIL_ALREADY/)).toBeVisible({ timeout: 10_000 });
  });

  test('정상 입력 시 회원가입 후 /home으로 이동한다', async ({ page }) => {
    await page.goto('/signup');
    await fillSignupForm(page);
    await page.getByRole('button', { name: '가입하기' }).click();
    await expect(page).toHaveURL(/\/home/, { timeout: 10_000 });
  });
});
