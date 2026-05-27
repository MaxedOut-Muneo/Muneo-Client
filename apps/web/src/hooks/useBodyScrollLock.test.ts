import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useBodyScrollLock } from './useBodyScrollLock';

describe('useBodyScrollLock', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.removeProperty('--scrollbar-width');
  });

  afterEach(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    document.documentElement.style.removeProperty('--scrollbar-width');
  });

  it('isLocked=true면 body overflow가 hidden이 된다', () => {
    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('isLocked=false면 body overflow에 영향이 없다', () => {
    document.body.style.overflow = 'auto';
    renderHook(() => useBodyScrollLock(false));
    expect(document.body.style.overflow).toBe('auto');
  });

  it('언마운트 시 이전 overflow 값을 복원한다', () => {
    document.body.style.overflow = 'auto';
    const { unmount } = renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('스크롤바 폭이 있으면 paddingRight 보정과 CSS 변수가 설정된다', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024);
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1008);

    renderHook(() => useBodyScrollLock(true));
    expect(document.body.style.paddingRight).toBe('16px');
    expect(document.documentElement.style.getPropertyValue('--scrollbar-width')).toBe('16px');

    vi.restoreAllMocks();
  });

  it('isLocked=false→true로 바뀌면 lock이 활성화된다', () => {
    const { rerender } = renderHook(({ locked }) => useBodyScrollLock(locked), {
      initialProps: { locked: false },
    });
    expect(document.body.style.overflow).toBe('');
    rerender({ locked: true });
    expect(document.body.style.overflow).toBe('hidden');
  });
});
