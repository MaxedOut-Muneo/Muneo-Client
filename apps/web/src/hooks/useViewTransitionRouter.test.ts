import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useViewTransitionRouter } from './useViewTransitionRouter';

const pushMock = vi.fn();
const prefetchMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    prefetch: prefetchMock,
  }),
}));

describe('useViewTransitionRouter', () => {
  beforeEach(() => {
    pushMock.mockClear();
    prefetchMock.mockClear();
  });

  afterEach(() => {
    Reflect.deleteProperty(document, 'startViewTransition');
  });

  it('startViewTransition 미지원 시 router.push를 직접 호출한다', () => {
    const { result } = renderHook(() => useViewTransitionRouter());
    result.current.push('/foo');
    expect(pushMock).toHaveBeenCalledExactlyOnceWith('/foo');
  });

  it('startViewTransition 지원 시 트랜지션 콜백 내에서 router.push를 호출한다', () => {
    const transitionMock = vi.fn((callback: () => void) => {
      callback();
      return {};
    });
    Object.defineProperty(document, 'startViewTransition', {
      value: transitionMock,
      configurable: true,
    });

    const { result } = renderHook(() => useViewTransitionRouter());
    result.current.push('/bar');

    expect(transitionMock).toHaveBeenCalledOnce();
    expect(pushMock).toHaveBeenCalledExactlyOnceWith('/bar');
  });

  it('prefetch는 router.prefetch에 위임한다', () => {
    const { result } = renderHook(() => useViewTransitionRouter());
    result.current.prefetch('/baz');
    expect(prefetchMock).toHaveBeenCalledExactlyOnceWith('/baz');
  });
});
