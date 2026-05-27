import { expect, test } from '@playwright/test';

/**
 * 시각 회귀 테스트.
 * 첫 실행 시 baseline 스냅샷을 생성하고, 이후 실행에서 픽셀 단위로 비교합니다.
 * baseline은 `__snapshots__/`(또는 `*.spec.ts-snapshots/`)에 저장됨 — 커밋 필요.
 *
 * 폰트 렌더링 차이로 CI/로컬에서 깨질 수 있음 → maxDiffPixelRatio로 허용 범위 조정.
 * 새 baseline 생성: `pnpm test:e2e -- --update-snapshots`
 */

test.describe('Visual regression', () => {
  // 디자인 기준 1440 데스크탑 viewport로 통일
  test.use({ viewport: { width: 1440, height: 900 } });

  test('랜딩 페이지 Hero 영역', async ({ page }) => {
    await page.goto('/');
    // 폰트 로드 + 애니메이션 진정 대기
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const hero = page.getByTestId('hero-section');
    await expect(hero).toHaveScreenshot('landing-hero.png', {
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
  });

  test('랜딩 페이지 풀 페이지', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('landing-full.png', {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      animations: 'disabled',
    });
  });
});
