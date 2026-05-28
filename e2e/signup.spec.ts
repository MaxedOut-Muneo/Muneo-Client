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
  test('필수 필드 미입력 시 각 필드에 검증 메시지가 노출된다', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('button', { name: '가입하기' }).click();
    const alerts = page.getByRole('alert');
    await expect(alerts.first()).toBeVisible();
    expect(await alerts.count()).toBeGreaterThan(1);
  });

  test('잘못된 이메일 형식 입력 시 이메일 필드에 에러가 표시된다', async ({ page }) => {
    await page.goto('/signup');
    await fillSignupForm(page, { 이메일: 'not-an-email' });
    await page.getByRole('button', { name: '가입하기' }).click();
    await expect(page.getByText(/올바른 이메일 형식이 아닙니다/)).toBeVisible();
  });

  test('이미 가입된 이메일 입력 시 서버 에러가 노출된다', async ({ page }) => {
    await page.goto('/signup');
    await fillSignupForm(page, { 이메일: 'taken@muneo.test' });
    const responsePromise = page.waitForResponse(
      (res) => res.url().includes('/api/v1/users/signup') && res.request().method() === 'POST'
    );
    await page.getByRole('button', { name: '가입하기' }).click();
    const response = await responsePromise;
    expect(response.status()).toBe(409);
    // 서버 에러 후 페이지가 /signup에 머무는 것까지만 검증 (메시지 텍스트는 useSignupForm 폴백 정책에 따라 변동 가능)
    await expect(page).toHaveURL(/\/signup/);
    await expect(page.getByRole('alert').first()).toBeVisible();
  });

  test('연락처를 숫자만 입력해도 blur 후 자동 포맷된다', async ({ page }) => {
    await page.goto('/signup');
    const phone = page.getByLabel('연락처', { exact: true });
    await phone.fill('01012345678');
    await phone.blur();
    await expect(phone).toHaveValue('010-1234-5678');
  });

  test('생년월일을 숫자만 입력해도 blur 후 자동 포맷된다', async ({ page }) => {
    await page.goto('/signup');
    const birth = page.getByLabel('생년월일', { exact: true });
    await birth.fill('19950515');
    await birth.blur();
    await expect(birth).toHaveValue('1995-05-15');
  });

  test('정상 입력 시 회원가입 후 /home으로 이동한다', async ({ page }) => {
    await page.goto('/signup');
    await fillSignupForm(page);
    await page.getByRole('button', { name: '가입하기' }).click();
    await expect(page).toHaveURL(/\/home/, { timeout: 10_000 });
  });
});
